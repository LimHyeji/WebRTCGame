(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[926],{4184:function(e,t){var n;/*!
	Copyright (c) 2018 Jed Watson.
	Licensed under the MIT License (MIT), see
	http://jedwatson.github.io/classnames
*/!function(){"use strict";var a={}.hasOwnProperty;function r(){for(var e=[],t=0;t<arguments.length;t++){var n=arguments[t];if(n){var i=typeof n;if("string"===i||"number"===i)e.push(n);else if(Array.isArray(n)){if(n.length){var o=r.apply(null,n);o&&e.push(o)}}else if("object"===i){if(n.toString!==Object.prototype.toString&&!n.toString.toString().includes("[native code]")){e.push(n.toString());continue}for(var s in n)a.call(n,s)&&n[s]&&e.push(s)}}}return e.join(" ")}e.exports?(r.default=r,e.exports=r):void 0!==(n=(function(){return r}).apply(t,[]))&&(e.exports=n)}()},3637:function(e,t,n){(window.__NEXT_P=window.__NEXT_P||[]).push(["/enter",function(){return n(7567)}])},2513:function(e,t,n){"use strict";n.r(t);var a=n(5893),r=n(7294);t.default=()=>{let[e,t]=(0,r.useState)(!0);return(0,r.useEffect)(()=>{if(e){let e=document.querySelector("audio");e.play()}},[e]),(0,a.jsxs)("div",{children:[(0,a.jsx)("button",{onClick:()=>{t(!e)},children:e?"Pause":"Play"}),(0,a.jsx)("audio",{controls:!0,autoPlay:e,children:(0,a.jsx)("source",{src:"music/enter_bgm.mp3",type:"audio/mpeg"})})]})}},5799:function(e,t,n){"use strict";n.r(t),n.d(t,{default:function(){return c}});var a=n(5893),r=n(7294),i=[{title:"즐거운 게임을 위한 TIP!",pic:"/tip1.png",txt1:"카메라 ON 모드로 입장하면",txt2:"다양한 사람들의 표정을 즐길 수 있어요"},{title:"즐거운 게임을 위한 TIP!",pic:"/tip2.png",txt1:"불쾌감을 유발하는 언행을 하면",txt2:"강제 퇴장 당할 수 있음에 유의하세요"},{title:"즐거운 게임을 위한 TIP!",pic:"/tip3.png",txt1:"미니게임 ON/OFF를 통해",txt2:"모두의 포차차를 다채롭게 즐겨보세요"},{title:"즐거운 게임을 위한 TIP!",pic:"/tip4.png",txt1:"메뉴판으로 여러분이 좋아하는",txt2:"다양한 음식을 즐겨보세요."}],o=n(6217),s=n.n(o);function c(){let[e,t]=(0,r.useState)(0),[n,o]=(0,r.useState)(!1);(0,r.useEffect)(()=>{let e=setInterval(()=>{o(!0),setTimeout(()=>{t(e=>e===i.length-1?0:e+1),o(!1)},200)},4e3);return()=>{clearInterval(e)}},[e]);let c=i[e];return(0,a.jsxs)("div",{className:s().innerBox,children:[(0,a.jsx)("div",{className:s().tipTitle,children:c.title}),(0,a.jsxs)("div",{className:s().tipContainer,children:[(0,a.jsx)("button",{onClick:()=>{o(!0),setTimeout(()=>{t(e=>0===e?i.length-1:e-1),o(!1)},200)},children:(0,a.jsx)("img",{className:s().arrow,src:"/main/leftArrow.png",alt:"Left Arrow"})}),(0,a.jsxs)("div",{className:"".concat(s().tipContent," ").concat(n?s().hidden:""),children:[(0,a.jsx)("img",{src:c.pic,alt:c.title}),(0,a.jsx)("p",{children:c.txt1}),(0,a.jsx)("p",{children:c.txt2})]}),(0,a.jsx)("button",{onClick:()=>{o(!0),setTimeout(()=>{t(e=>e===i.length-1?0:e+1),o(!1)},200)},children:(0,a.jsx)("img",{className:s().arrow,src:"/main/rightArrow.png",alt:"Right Arrow"})})]})]})}},7567:function(e,t,n){"use strict";n.r(t),n.d(t,{default:function(){return j}});var a=n(5893),r=n(7294),i=n(1163),o=n(5799),s=n(2513),c=n(6217),l=n.n(c),d=n(4184),p=n.n(d),u=n(8e3),_=n.n(u),m=n(4593),g=n(6154),h=n(1649),x=n(5019),f=n(5989);function j(){let e=(0,i.useRouter)(),t=(0,h.I0)();(0,r.useEffect)(()=>{let e=new(_())("https://ohogame.shop/ws"),t=m.L.over(e);t.connect({},()=>{console.log("Socket Connected.")})},[]);let n={},c=(0,r.useRef)(null),d=()=>{navigator.mediaDevices.getUserMedia({video:!0}).then(e=>{let t=c.current;t.srcObject=e,t.play()}).catch(e=>{console.log(e)})};(0,r.useEffect)(()=>{d()},[c]);let[u,j]=(0,r.useState)(""),v=()=>{(0,g.Z)({url:"https://ohogame.shop/api/enter",header:{Accept:"application/json","Content-type":"application/json;charset=UTF-8"},method:"POST",data:{nickname:u}}).then(a=>{n={roomId:a.data.room.id,progress:a.data.room.progress,secret:a.data.room.secret,nick:u||a.data.player.nickname,playerId:a.data.player.id,ready:a.data.player.ready};let r={playerId:a.data.player.id,nick:u||a.data.player.nickname,ready:a.data.player.ready,head:!0};t((0,x.el)({roomId:a.data.room.id,progress:a.data.room.progress,secret:a.data.room.secret})),t((0,f.p)(r)),console.log(),e.push({pathname:"/room/".concat(a.data.room.id),query:{currentName:JSON.stringify(n)}},"/room/".concat(a.data.room.id))}).catch(t=>{t.response?e.push({pathname:"/exception",query:{msg:t.response.data}}):console.log(t)})},[y,C]=(0,r.useState)(null);return(0,a.jsxs)("div",{className:l().container,children:[(0,a.jsx)("div",{style:{display:"none"},children:(0,a.jsx)(s.default,{})}),(0,a.jsx)("div",{className:"roof",children:(0,a.jsx)("img",{className:l().title,src:"/main/title.png"})}),(0,a.jsxs)("div",{className:l().boxContainer,children:[(0,a.jsxs)("div",{className:p()({[l().box]:!0,[l().leftBox]:!0}),children:[(0,a.jsx)("video",{className:l().cam,ref:c})," ",(0,a.jsx)("div",{className:l().inputContainer,children:(0,a.jsx)("input",{className:l().nickname,spellCheck:"false",placeholder:"닉네임을 입력해주세요.",value:u,onChange:e=>{j(e.target.value)},onKeyDown:e=>{"Enter"===e.key&&v()}})}),(0,a.jsx)("button",{className:l().startContainer,onClick:v,children:(0,a.jsx)("img",{className:l().startBtn,onClick:()=>{y&&(y.pause(),y.currentTime=0);let e=new Audio("/music/pop.mp3");e.play(),C(e)},src:"/main/startBtn.png"})})]}),(0,a.jsx)("div",{className:l().box,children:(0,a.jsx)(o.default,{})})]})]})}n(7667),j.useClient=!0},6217:function(e){e.exports={jello_horizontal:"EnterPage_jello_horizontal__V_Ik5",container:"EnterPage_container___dvdZ",fadein:"EnterPage_fadein__s6Rsl",title:"EnterPage_title__VoPCb",boxContainer:"EnterPage_boxContainer__Vc5Sx",box:"EnterPage_box__6qLrU",leftBox:"EnterPage_leftBox__Ls28V",cam:"EnterPage_cam__WcSXz",inputContainer:"EnterPage_inputContainer__8KCUW",nickname:"EnterPage_nickname__57Zbv",startContainer:"EnterPage_startContainer__ZFMXC",startBtn:"EnterPage_startBtn__nhgW9",innerBox:"EnterPage_innerBox__QG1xT",tipTitle:"EnterPage_tipTitle__Lhrbs",tipContainer:"EnterPage_tipContainer__VJ1iP",tipContent:"EnterPage_tipContent__Cmtv4",hidden:"EnterPage_hidden__XVQch",arrow:"EnterPage_arrow__b_VQg"}}},function(e){e.O(0,[154,774,888,179],function(){return e(e.s=3637)}),_N_E=e.O()}]);