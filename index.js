'use strict';

var admin = require('firebase-admin');
const {WebhookClient} = require('dialogflow-fulfillment');
const express = require('express');
const bodyParser = require('body-parser');
const request = require('request-promise');
process.env.DEBUG = 'actions-on-google';

const server = express();
server.use(bodyParser.urlencoded({
    extended: true
}));

server.use(bodyParser.json());
/*
var serviceAccount = require("./botdbkey.json");
 
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://botdb-b2b78.firebaseio.com/'
});

var db = admin.database();
var ref = db.ref("/");

function addUserMessage(userId, message) {
  var itemsRef = ref.child("userMessage");
  var newItemRef = itemsRef.push();
  newItemRef.set({
    "User ID": userId,
    "Message": message,
    "Message Created Time": new Date().toString()
  });
 
  var itemId = newItemRef.key;
  console.log("A new Todo item with ID " + itemId + " is created.");  
  return itemId;
}
*/
server.post('/',function (request,response) {
  const agent = new WebhookClient({ request, response });
  
  function add(agent) {
    const number = agent.parameters.number;
    const number1 = agent.parameters.number1;
	
    const sum = number + number1;
    agent.add('ผลบวกคือ '+ sum);
	//const userId = request.body.originalDetectIntentRequest.payload.data.source.userId;
	//addUserMessage(userId, "สวัสดี Firebase");
	
	
  }
  
  function welcome(agent) {
    agent.add(`Welcome to my agent!`);
  }
 
  function fallback(agent) {
    agent.add(`I didn't understand`);
    agent.add(`I'm sorry, can you try again?`);
    
    
}
  let intentMap = new Map();
  
  intentMap.set('Default Welcome Intent', welcome);
  intentMap.set('Default Fallback Intent', fallback);
  intentMap.set('add', add);
  
  agent.handleRequest(intentMap);
});

server.listen((process.env.PORT || 8000), () => {
    console.log("Server is up and running...");
});
