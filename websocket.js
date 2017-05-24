var config = require('./webSocketConfiguration.json');
var messageConfig = require('./messagesConfiguration.json');
var MessageGenerator = require('./MessageGenerator.js').MessageGenerator();
var gutil = require('gulp-util');
var argv = require('yargs').argv;


var WebSocket = require('ws');
var ws = new WebSocket(config.url,{
	headers: { Authorization: "Bearer " + config.token },
});

var triggerWS = function(){

	var sequenceCounter = 0; //u asked for it.

	ws.on('open', function open() {
		var sendObject = {
			mode: config.mode,
			sequence: sequenceCounter,
			messageType: config.messageType
		};

		setInterval(function(){
			sendObject.messages = MessageGenerator.fnGenerateMessage(messageConfig.messages);
			ws.send(JSON.stringify(sendObject), function(){
		    	if (arguments[0]){
			  		gutil.log('Something just broke', arguments[0]);
		    	}
			});	
		}, argv.interval || 5000);
	});

	ws.on('message', function(data, flags) {
	  gutil.log('Message: ', data);
	});

} 	

exports.triggerWS = triggerWS;