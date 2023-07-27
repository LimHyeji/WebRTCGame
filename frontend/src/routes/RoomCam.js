"use client";
// import { OpenVidu } from 'openvidu-browser';
import OpenViduSession from 'openvidu-react';
import axios from 'axios';
import React, { Component } from 'react';
import UserVideoComponent from '../app/room/UserVideoComponent';
import './RoomCam.css';

//const APPLICATION_SERVER_URL = process.env.NODE_ENV === 'production' ? '' : 'https://demos.openvidu.io/';

/* 혜지 : openvidu-react가 아닌, openvidu-library-react 적용을 위한 수정 */
class RoomCam extends Component {
    constructor(props) {
        super(props);
        this.APPLICATION_SERVER_URL = process.env.NODE_ENV === 'production' ? '' : 'http://localhost:5000/';
        
        this.state = {
            mySessionId: 'SessionA',
            myUserName: '익명 ' + Math.floor(Math.random() * 100),
            //session: undefined,
            token:undefined,
            mainStreamManager: undefined,  
            publisher: undefined,
            subscribers: [],
        };

        this.joinSession = this.joinSession.bind(this);
        this.leaveSession = this.leaveSession.bind(this);
        
        /* 혜지 : 새로 구현하는 메소드 */
        this.handlerJoinSessionEvent = this.handlerJoinSessionEvent.bind(this);
        this.handlerLeaveSessionEvent = this.handlerLeaveSessionEvent.bind(this);
        this.handlerErrorEvent = this.handlerErrorEvent.bind(this);
        /* 혜지 : 새로 구현하는 메소드 끝 */

        this.switchCamera = this.switchCamera.bind(this);
        this.handleChangeSessionId = this.handleChangeSessionId.bind(this);
        this.handleChangeUserName = this.handleChangeUserName.bind(this);
        this.handleMainVideoStream = this.handleMainVideoStream.bind(this);
        this.onbeforeunload = this.onbeforeunload.bind(this);
    }

    /* 혜지 : 새로 구현하는 메소드 */
    handlerJoinSessionEvent() {
        console.log('Join session');
    }

    handlerLeaveSessionEvent() {
        console.log('Leave session');
        this.setState({
            session: undefined,
        });
    }

    handlerErrorEvent() {
        console.log('Leave session');
    }

    /* 혜지 : 새로 구현하는 메소드 끝 */

    componentDidMount() {
        window.addEventListener('beforeunload', this.onbeforeunload);
    }

    componentWillUnmount() {
        window.removeEventListener('beforeunload', this.onbeforeunload);
    }

    onbeforeunload(event) {
        this.leaveSession();
    }

    handleChangeSessionId(e) {
        this.setState({
            mySessionId: e.target.value,
        });
    }

    handleChangeUserName(e) {
        this.setState({
            myUserName: e.target.value,
        });
    }

    handleMainVideoStream(stream) {
        if (this.state.mainStreamManager !== stream) {
            this.setState({
                mainStreamManager: stream
            });
        }
    }

    deleteSubscriber(streamManager) {
        let subscribers = this.state.subscribers;
        let index = subscribers.indexOf(streamManager, 0);
        if (index > -1) {
            subscribers.splice(index, 1);
            this.setState({
                subscribers: subscribers,
            });
        }
    }

    async joinSession(event) {
        event.preventDefault();
        if (this.state.mySessionId && this.state.myUserName) {
            const token = await this.getToken();
            this.setState({
                token: token,
                session: true,
            });
        }
    }

    // joinSession() {
    //     // --- 1) OpenVidu 객체 생성 ---

    //     this.OV = new OpenVidu();

    //     // --- 2) 세션 초기화 ---

    //     this.setState(
    //         {
    //             session: this.OV.initSession(),
    //         },
    //         () => {
    //             var mySession = this.state.session;

    //             // --- 3) 세션 내 이벤트 ---                

    //             // 새 스트리밍을 받을 때마다
    //             mySession.on('streamCreated', (event) => {
    //                 // 참여자들이 이를 처리함
    //                 var subscriber = mySession.subscribe(event.stream, undefined);
    //                 var subscribers = this.state.subscribers;
    //                 subscribers.push(subscriber);

    //                 // 참여자 리스트 업데이트
    //                 this.setState({
    //                     subscribers: subscribers,
    //                 });
    //             });

    //             // 스트리밍 종료 때마다
    //             mySession.on('streamDestroyed', (event) => {

    //                 // 참여자 리스트 비우기
    //                 this.deleteSubscriber(event.stream.streamManager);
    //             });

    //             // 모든 비동기 예외 처리
    //             mySession.on('exception', (exception) => {
    //                 console.warn(exception);
    //             });

    //             // --- 4) 유효한 토큰을 가진 세션에 연결 작업 ---


    //             // OpenVidu 배포 서버로부터 토큰 받음
    //             this.getToken().then((token) => {
    //                 // OpenVidu 배포 서버에서 받는 데이터 중 첫번째 인자는 토큰이고, 두번째 인자는 이벤트 발생 시의 사용자임.
    //                 // 'streamCreated' (property Stream.connection.data), and will be appended to DOM as the user's nickname
    //                 mySession.connect(token, { clientData: this.state.myUserName })
    //                     .then(async () => {

    //                         // --- 5) 카메라 스트리밍 받아오는 작업 ---

    //                         // Init a publisher passing undefined as targetElement (we don't want OpenVidu to insert a video
    //                         // element: we will manage it on our own) and with the desired properties
    //                         let publisher = await this.OV.initPublisherAsync(undefined, {
    //                             audioSource: undefined, // The source of audio. If undefined default microphone
    //                             videoSource: undefined, // The source of video. If undefined default webcam
    //                             publishAudio: true, // Whether you want to start publishing with your audio unmuted or not
    //                             publishVideo: true, // Whether you want to start publishing with your video enabled or not
    //                             resolution: '640x480', // The resolution of your video
    //                             frameRate: 30, // The frame rate of your video
    //                             insertMode: 'APPEND', // How the video is inserted in the target element 'video-container'
    //                             mirror: false, // Whether to mirror your local video or not
    //                         });

    //                         // --- 6) 스트리밍 시작 ---

    //                         mySession.publish(publisher);

    //                         // Obtain the current video device in use
    //                         var devices = await this.OV.getDevices();
    //                         var videoDevices = devices.filter(device => device.kind === 'videoinput');
    //                         var currentVideoDeviceId = publisher.stream.getMediaStream().getVideoTracks()[0].getSettings().deviceId;
    //                         var currentVideoDevice = videoDevices.find(device => device.deviceId === currentVideoDeviceId);

    //                         // Set the main video in the page to display our webcam and store our Publisher
    //                         this.setState({
    //                             currentVideoDevice: currentVideoDevice,
    //                             mainStreamManager: publisher,
    //                             publisher: publisher,
    //                         });
    //                     })
    //                     .catch((error) => {
    //                         console.log('There was an error connecting to the session:', error.code, error.message);
    //                     });
    //             });
    //         },
    //     );
    // }

    leaveSession() {

        // --- 7) 'disConnect' 메소드 호출로 세션 떠나기 실행 ---

        const mySession = this.state.session;

        if (mySession) {
            mySession.disconnect();
        }

        // Empty all properties...
        this.OV = null;
        this.setState({
            session: undefined,
            subscribers: [],
            mySessionId: 'SessionA',
            myUserName: 'Participant' + Math.floor(Math.random() * 100),
            mainStreamManager: undefined,
            publisher: undefined
        });
    }

    async switchCamera() {
        try {
            const devices = await this.OV.getDevices()
            var videoDevices = devices.filter(device => device.kind === 'videoinput');

            if (videoDevices && videoDevices.length > 1) {

                var newVideoDevice = videoDevices.filter(device => device.deviceId !== this.state.currentVideoDevice.deviceId)

                if (newVideoDevice.length > 0) {
                    // Creating a new publisher with specific videoSource
                    // In mobile devices the default and first camera is the front one
                    var newPublisher = this.OV.initPublisher(undefined, {
                        videoSource: newVideoDevice[0].deviceId,
                        publishAudio: true,
                        publishVideo: true,
                        mirror: true
                    });

                    //newPublisher.once("accessAllowed", () => {
                    await this.state.session.unpublish(this.state.mainStreamManager)

                    await this.state.session.publish(newPublisher)
                    this.setState({
                        currentVideoDevice: newVideoDevice[0],
                        mainStreamManager: newPublisher,
                        publisher: newPublisher,
                    });
                }
            }
        } catch (e) {
            console.error(e);
        }
    }

    render() {
        const mySessionId = this.state.mySessionId;
        const myUserName = this.state.myUserName;
        
        const token = this.state.token;

        return (
            <div className="container">
                {this.state.session === undefined ? (
                    <div id="join">
                        <div id="join-dialog" className="jumbotron vertical-center">
                            <h1> Join a video session </h1>
                            <form className="form-group" onSubmit={this.joinSession}>
                                <p>
                                    <label>Participant: </label>
                                    <input
                                        className="form-control"
                                        type="text"
                                        id="userName"
                                        value={myUserName}
                                        onChange={this.handleChangeUserName}
                                        required
                                    />
                                </p>
                                <p>
                                    <label> Session: </label>
                                    <input
                                        className="form-control"
                                        type="text"
                                        id="sessionId"
                                        value={mySessionId}
                                        onChange={this.handleChangeSessionId}
                                        required
                                    />
                                </p>
                                <p className="text-center">
                                    <input className="btn btn-lg btn-success" name="commit" type="submit" value="JOIN" />
                                </p>
                            </form>
                        </div>
                    </div>
                )  : (
                    <div id="session">
                        <OpenViduSession
                            id="opv-session"
                            sessionName={mySessionId}
                            user={myUserName}
                            token={token}
                            joinSession={this.handlerJoinSessionEvent}
                            leaveSession={this.handlerLeaveSessionEvent}
                            error={this.handlerErrorEvent}
                        />
                    </div>
                )                /*: null*/}

                {/* {this.state.session !== undefined ? (
                    <div id="session">
                        <div id="session-header">
                            <h1 id="session-title">{mySessionId}</h1>
                            <input
                                className="btn btn-large btn-danger"
                                type="button"
                                id="buttonLeaveSession"
                                onClick={this.leaveSession}
                                value="Leave session"
                            />
                            <input
                                className="btn btn-large btn-success"
                                type="button"
                                id="buttonSwitchCamera"
                                onClick={this.switchCamera}
                                value="Switch Camera"
                            />
                        </div>

                        {this.state.mainStreamManager !== undefined ? (
                            <div id="main-video" className="col-md-6">
                                <UserVideoComponent streamManager={this.state.mainStreamManager} />

                            </div>
                        ) : null}
                        <div id="video-container" className="col-md-6">
                            {this.state.publisher !== undefined ? (
                                <div className="stream-container col-md-6 col-xs-6" onClick={() => this.handleMainVideoStream(this.state.publisher)}>
                                    <UserVideoComponent
                                        streamManager={this.state.publisher} />
                                </div>
                            ) : null}
                            {this.state.subscribers.map((sub, i) => (
                                <div key={sub.id} className="stream-container col-md-6 col-xs-6" onClick={() => this.handleMainVideoStream(sub)}>
                                    <span>{sub.id}</span>
                                    <UserVideoComponent streamManager={sub} />
                                </div>
                            ))}
                        </div>
                    </div>
                ) : null} */}
            </div>
        );
    }


    /**
     * --------------------------------------------
     * GETTING A TOKEN FROM YOUR APPLICATION SERVER
     * --------------------------------------------
     * The methods below request the creation of a Session and a Token to
     * your application server. This keeps your OpenVidu deployment secure.
     *
     * In this sample code, there is no user control at all. Anybody could
     * access your application server endpoints! In a real production
     * environment, your application server must identify the user to allow
     * access to the endpoints.
     *
     * Visit https://docs.openvidu.io/en/stable/application-server to learn
     * more about the integration of OpenVidu in your application server.
     */
    async getToken() {
        const sessionId = await this.createSession(this.state.mySessionId);
        return await this.createToken(sessionId);
    }

    async createSession(sessionId) {
        const response = await axios.post(APPLICATION_SERVER_URL + 'api/sessions', { customSessionId: sessionId }, {
            headers: { 'Content-Type': 'application/json', },
        });
        return response.data; // The sessionId
    }

    async createToken(sessionId) {
        const response = await axios.post(APPLICATION_SERVER_URL + 'api/sessions/' + sessionId + '/connections', {}, {
            headers: { 'Content-Type': 'application/json', },
        });
        return response.data; // The token
    }
}

export default RoomCam;
