var gulp = require('gulp');
var gutil = require('gulp-util');
var argv = require('yargs').argv;
var inquirer = require('inquirer');
var rp = require('request-promise');
var oDataConfig = require('./oDataConfiguration.json');
var messageConfig = require('./messagesConfiguration.json');
var base64 = require('js-base64').Base64;
var MessageGenerator = require('./MessageGenerator.js').MessageGenerator();

gulp.task('mock-sensor', function() {
  // mocks a sensor sending messages to a SAP HCP IoT Service instance
  var url = "";
  var hcpCredentials = {};

  var options = {
    method: 'POST',
    uri: oDataConfig.url,
    body: {
        "messageType": oDataConfig.messageType,
        "messages":  [],
        "method": oDataConfig.method,
        "sender": oDataConfig.sender
    },
    headers: {

    },
    json: true // Automatically stringifies the body to JSON 
  };
  
  

  //RECEIVE DATA FROM ARDUINO
  inquirer.prompt({
      type: 'input',
      name: 'token',
      message: 'Please enter your device token'
  }).then(function(res){
      hcpCredentials.token = res.token;
      options.headers.Authorization = 'Bearer '+ hcpCredentials.token;
      gutil.log(options.headers.Authorization);
      gutil.log('this is my config URL: '+ oDataConfig.url);

      var intervalPromise = [];

        intervalPromise.push(setInterval(function(){
          options.body.messages = MessageGenerator.fnGenerateMessage(messageConfig.messages);
          console.log('Message: ', options.body.messages);

          rp(options)
          .then(function (parsedBody) {
            gutil.log('Ye y, sent to HCP. ' + JSON.stringify(parsedBody));
          }, function(err){
            gutil.log('Not sent ' + err);
          })
          .catch(function (err) {
            gutil.log('something went bad: ' + JSON.stringify(err));

            if(err.statusCode === 401){
              gutil.log('401 - Unauthorized');
              process.exit();
            } 
            
          });

        },argv.interval || 5000));

  });


  //SEND DATA TO ARDUINO
  /*inquirer.prompt({
      type: 'input',
      name: 'username',
      message: 'Please enter your HCP username'
  }).then(function(res){
      hcpCredentials.username = res.username;

      inquirer.prompt({
        type: 'password',
        name: 'pass',
        message: 'Please enter your password'
      }).then(function(res){
          hcpCredentials.password = res.pass;
          options.headers.Authorization = 'Basic ' + base64.encode(hcpCredentials.username + ':' + hcpCredentials.password);
          gutil.log(options.headers.Authorization);
          gutil.log('this is my config URL: '+ oDataConfig.url);
          
          var intervalPromise = [];

          intervalPromise.push(setInterval(function(){
            options.body.messages = MessageGenerator.fnGenerateMessage(messageConfig.messages);
            console.log('Message: ', options.body.messages);

            rp(options)
            .then(function (parsedBody) {
              gutil.log('Ye y, sent to HCP. ' + JSON.stringify(parsedBody));
            }, function(err){
              gutil.log('Not sent ' + err);
            })
            .catch(function (err) {
              gutil.log('something went bad: ' + JSON.stringify(err));

              if(err.statusCode === 401){
                gutil.log('401 - Unauthorized');
                process.exit();
              } 
              
            });

          },argv.interval || 5000));
      });
  });*/
});