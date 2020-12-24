《WebRTC技术详解：从0到1构建多人视频会议系统》示例代码，示例支持部署在Mac或者linux系统，使用Chrome浏览器打开页面

## chroma-keying 
采集本地媒体流,结合Canvas实现虚拟背景.
## media_constraints
打印当前浏览器的媒体约束
## peerconnection 
ICE建连过程
## rtpmedia
媒体流交换,实现了以下功能:
- 动态设置视频码率
- vp8/vp9/h264编码切换
- 将chroma-keying实现的虚拟背景视频传输到对等端
## signaling
使用Typescript + Express + Socket.IO实现了一个完整的信令服务器
- 能够同时支撑多个WebRTC通话环境，即多个房间，房间之间互不影响.
- 每个房间参与人数不受限制.
- 支持可靠信令传输。能够准确知道信令是否发送成功，如果因为网络故障等原因导致发送失败，能够收到通知，并支持进行重试。
- 实现了信令客户端
## stats
RTC 统计数据,使用Chart.js绘制图表,实时展现收发码率.
## cordova
使用Cordova构建的Android/IOS端WebRTC示例,演示了getUserMedia()获取摄像头并显示在首页.
## ionic-webrtc
基于Ionic4的WebRTC移动应用
* 支持WebRTC音视频通话
* 基于数据通道的文字聊天
* 支持Android和IOS
## allinone
整合了以上示例的大部分功能，也是ionic-webrtc的服务器端。
