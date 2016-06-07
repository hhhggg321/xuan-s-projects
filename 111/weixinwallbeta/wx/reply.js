/**
* 相应公众号用户发送的数据
*msg,为响应的消息名，msg为用户发来的消息
*/
function replyText(msg, replyText){

  //将要返回的消息通过一个简单的tmpl模板（npm install tmpl）返回微信
  var tmpl = require('tmpl');
  var replyTmpl = '<xml>' +
    '<ToUserName><![CDATA[{toUser}]]></ToUserName>' +
    '<FromUserName><![CDATA[{fromUser}]]></FromUserName>' +
    '<CreateTime><![CDATA[{time}]]></CreateTime>' +
    '<MsgType><![CDATA[{type}]]></MsgType>' +
    '<Content><![CDATA[{content}]]></Content>' +
    '</xml>';

  return tmpl(replyTmpl, {
    toUser: msg.xml.FromUserName[0],
    fromUser: msg.xml.ToUserName[0],
    type: 'text',
    time: Date.now(),
    content: replyText
  });
}

module.exports = {
  replyText: replyText
};