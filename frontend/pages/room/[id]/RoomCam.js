import React,{useState,useEffect} from 'react';
import OpenViduVideoComponent from './OvVideo';
import { useSelector } from "react-redux";
import Roomstyles from '@/styles/RoomPage.module.css';
import Videostyles from '@/styles/UserVideo.module.css';
import { OpenVidu } from 'openvidu-browser'
import axios from 'axios';

export default function RoomCam() {

  /* 혜지 : 첫 렌더링 시에 OV, session 세팅 */
  let OV = new OpenVidu();
  let session = OV.initSession();

  const roomId = useSelector(state => state.room.currentRoomId);
  const nickname = useSelector(state => state.player.currentNick);

  const [publisher, setPublisher] = useState(undefined); //비디오, 오디오 송신자
  const [participants, setParticipants] = useState([]);//참여자들

  useEffect(() => {
    window.addEventListener('beforeunload', onbeforeunload);
    joinSession();
    return () => {
      window.removeEventListener('beforeunload', onbeforeunload);
    }
  }, []);

  /* 혜지 : OpenVidu 연결 관련 메소드 시작 */
  const onbeforeunload = async (e) => {
    leaveSession();
  };

  const deleteParticipant = (streamManager) => {
    let tempParticipants = participants;
    let index = tempParticipants.indexOf(streamManager, 0);
    if (index > -1) {
      tempParticipants.splice(index, 1);
      setParticipants(tempParticipants);
    }
  };

  const joinSession=()=> {
    try {
      session.on("streamCreated", (event) => {
        let participant = session.subscribe(event.stream, undefined);
        let tempParticipants = participants;
        tempParticipants.push(participant);
        setParticipants(tempParticipants);
      });

      session.on("streamDestroyed", (event) => {
        deleteParticipant(event.stream.streamManager);
      });

      session.on("exception", (exception) => {
        console.warn(exception);
      });

      /* 혜지 : 모든 사용자 PUBLISHER 지정 필수 */
      getToken().then((token) => {
        session.connect(token, { clientData: nickname, publisher: true })
          .then(async () => {
            /* 카메라 세팅 */
            let pub = await OV.initPublisherAsync(undefined, {
              audioSource: undefined, // 오디오
              videoSource: undefined, // 비디오
              publishAudio: true, // 오디오 송출
              publishVideo: true, // 비디오 송출
              resolution: "640x480",
              frameRate: 30,
              insertMode: "APPEND", // 비디오 컨테이너 적재 방식
              mirror: false,
            });

            session.publish(pub);

            let deviceList = await OV.getDevices();
            var videoDevices = deviceList.filter((device) => device.kind === "videoinput");
            var currentVideoDeviceId = pub.stream
              .getMediaStream()
              .getVideoTracks()[0]
              .getSettings().deviceId;
            var currentVideoDevice = videoDevices.find(
              (device) => device.deviceId === currentVideoDeviceId
            );

            setPublisher(pub);
          }).catch((error) => {
            console.log(error);
            router.push({
              pathname: "/exception",
              query: { msg: "화상 연결에 문제가 있어요!" },
            });
          });
      });
    }catch(error){
      console.log(error);
    }
  }

    const leaveSession = () => {
      if (session) {
        session.disconnect();
      }

      setPublisher(undefined);
      setParticipants([]);
    };
    /* 혜지 : OpenVidu 연결 관련 메소드 완료 */

    const getToken = async () => {
      const response = await axios.post(`http://localhost:80/token/${roomId}`, { nickname:nickname }, {
        headers: { 'Content-Type': 'application/json', },
      });
      return response.data;
    };

    return (
      <div className="container">
        {session !== undefined ? (
          <div id="session">
            <div id="video-container" className={Roomstyles.camList}>
              {participants != null ? participants.map((par, i) => (
                <span key={par.id} className={Videostyles.streamcomponent} >
                  <OpenViduVideoComponent className={Roomstyles.cam} streamManager={par} />
                  <div className={Videostyles.nickname}>{JSON.parse(par.stream.connection.data.split("%")[0]).clientData}</div>
                </span>
              )) : null}
              {publisher !== undefined ? (
                <span className={Videostyles.streamcomponent}>
                  <OpenViduVideoComponent className={Roomstyles.cam}
                    streamManager={publisher} />
                  <div className={Videostyles.nickname}>{nickname}</div>
                </span>
              ) : null}

            </div>
          </div>
        ) : null}
      </div>
    );
  }
