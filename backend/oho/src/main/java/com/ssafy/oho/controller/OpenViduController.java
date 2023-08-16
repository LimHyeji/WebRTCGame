package com.ssafy.oho.controller;

import com.ssafy.oho.model.dto.request.PlayerRequestDto;
import com.ssafy.oho.model.service.PlayerService;
import com.ssafy.oho.model.service.RoomService;
import io.openvidu.java.client.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@Controller
@RequestMapping
@CrossOrigin
public class OpenViduController {

    private final OpenVidu openVidu;

    @Autowired
    private OpenViduController(OpenVidu openVidu){
        this.openVidu=openVidu;
    }

    @PostMapping("/token/{roomId}")
    public ResponseEntity<String> createConnection(@PathVariable("roomId") String roomId, PlayerRequestDto playerRequestDto)
            throws OpenViduJavaClientException, OpenViduHttpException {
        Session session = openVidu.getActiveSession(roomId);
        if (session == null) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        ConnectionProperties properties = new ConnectionProperties
                .Builder()
                .role(OpenViduRole.PUBLISHER)
                .data(playerRequestDto.getNickname()) /* 혜지: data로 nickname 실어 보내기 */
                .build();
        Connection connection = session.createConnection(properties);
        return new ResponseEntity<>(connection.getToken(), HttpStatus.OK);
    }
}
