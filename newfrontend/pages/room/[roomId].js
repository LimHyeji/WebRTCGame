'use client'

import RoomCam from './RoomCam.js'
import RoomChat from './RoomChat.js'
import RoomBtn from './RoomBtn.js'
import { useRouter } from "next/router"
import '../../styles/RoomPage.module.css'

export default function RoomPage() {

  const router = useRouter();
  console.log(router)
  let info = JSON.parse(router.query.currentName)
  // console.log('JSON 변환', info)

  const tmp = (
    <div>
      {/* <h1>대기실입니다.</h1>
      <h3>방 번호 : {info.roomId}</h3>
      <h3>게임시작 : {info.progress}</h3>
      <h3>비밀방 : {info.secret}</h3>
      <h3>닉네임 : {info.nick}</h3>
      <h3>아이디 : {info.playerId}</h3>
      <h3>준비 : {info.ready}</h3> */}
    </div>
  )

  return (
    <div>
      <div className="roof"></div>
      <div id="room">
        <div id="camList">
          <div className="cam"></div>
          <div className="cam"></div>
          <div className="cam"></div>
          <div className="cam"></div>
        </div>
        <div className="chatContainer outerChat">
          <div className="chatContainer innerChat">
            <div className="chatUnit">
              <div className="sender">오스틴</div><div className="time">오늘 오후 3:27</div>
              <div className="message">목욕 중인데 심심해서 들어왔습니다. 목욕 중인데 심심해서 들어왔습니다.</div>
            </div>
            <div className="chatUnit">
              <div className="sender">제이슨</div><div className="time">오늘 오후 3:28</div>
              <div className="message">저도 힙합 중입니다. 저도 힙합 중입니다. 저도 힙합 중입니다.</div>
            </div>
          </div>
        </div>
        <RoomChat info={info} />
        <RoomCam />
        <RoomBtn info={info} />
      </div>
    </div>
  )
}