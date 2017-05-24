(function(){

	var MessageGenerator = function(){
		var fnGenerateInteger = function(min, max){
		  return Math.random() * (max - min) + min;
		};

		var fnGenerateBoolean = function(){
		  return Math.random() > 0.5;
		};

		var fnGenerateString = function(defaultSizeLimit){
		  var text = "";
		  var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
		  var limit = defaultSizeLimit * Math.random();

		  for( var i=0; i < limit; i++ ){
		    text += possible.charAt(Math.floor(Math.random() * possible.length));
		  }

		  return text;
		};

		var fnGenerateMessage = function(aMessagesDefinition){
		  var message = {};
		  aMessagesDefinition.forEach(function(oConfiguration){
		    switch(oConfiguration.type){
		      case 'integer':
		        message[oConfiguration.fieldName]=fnGenerateInteger(oConfiguration.min, oConfiguration.max);
		        break;
		      case 'string':
		        message[oConfiguration.fieldName]=fnGenerateString(oConfiguration.defaultSizeLimit);
		        break;
		      case 'boolean':
		        message[oConfiguration.fieldName]=fnGenerateBoolean();
		        break;
		      default:
		        message[oConfiguration.fieldName]="";
		    }
		  });
		  return [message];
		};	
		return {fnGenerateMessage : fnGenerateMessage};
	};

	exports.MessageGenerator = MessageGenerator;

})();