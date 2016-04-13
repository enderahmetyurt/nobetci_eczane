var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/webhook/', function(req, res, next) {
if (req.query['hub.verify_token'] === 'nobetci') {
    res.send(req.query['hub.challenge']);
  }
  res.send('Error, wrong validation token');
});

router.post('/webhook/', function (req, res) {
  var token = "CAAXls4rOxl4BAKPJz4YEGP6rtcm0UR68PQaZApwIYlztoHztDINghAXVt0LGpefY2OZCkwTHDmEJ5DZBQdMgy4J3OBrTRyUtBOc2pD2qZAFlZA7eDRuI23dSVZCjbVTckfOuwMptqbo0yhheUwHCbxiVn3vtZBB3AB0TfOr4G5J5aN3tgS9ZA9nLplYnJuWH9ZAgRLIpw5oQf0QZDZD";
  
  function sendTextMessage(sender, text) {
    console.log("IN method")
    console.log(sender)
    console.log(text)
    messageData = {
      text:text
    }
    request({
      url: 'https://graph.facebook.com/v2.6/me/messages',
      qs: {access_token: token},
      method: 'POST',
      json: {
        recipient: {id:sender},
        message: messageData,
      }
    }, function(error, response, body) {
      if (error) {
        console.log('Error sending message: ', error);
      } else if (response.body.error) {
        console.log('Error: ', response.body.error);
      }
    });
  }

  messaging_events = req.body.entry[0].messaging;
  for (i = 0; i < messaging_events.length; i++) {
    event = req.body.entry[0].messaging[i];
    sender = event.sender.id;
    if (event.message && event.message.text) {
      text = event.message.text;
      console.log(sender)
      console.log(text)
      sendTextMessage(sender, "Text received, echo: "+ text.substring(0, 200));
    }
  }
  res.sendStatus(200);
  
});

module.exports = router;
