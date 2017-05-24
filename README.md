# Gulp Mock Sensors

A Gulp task to mock sensor messages to HCP IoT Service.

## Dependencies
  1. `npm install`

## HTTP Request
  1. `gulp mock-sensor` or `gulp mock-sensor --interval <interval number, default is 5000>` 
  2. Enter your user and password of HCP

## Configuration
  To configure this application you must manually change the configuration.json file.

  
  - For http requests:
    You must use the following structure of the json:

      `{ 
        "url":"https://iotmms<your_url>/com.sap.iotservices.mms/v1/api/http/<push || data>/<your_id_device>",
        "messageType": "<your_message_type>",
        "messages":  [
          {
            "fieldName": "<field_name>",
            "defaultSizeLimit": "<max_size_allowed, i.e: 5>",
            "type": "<any_type_allowed_from_iot, i.e: string or integer>",
            "defaultValue" : "<default_value, i.e: >"
          }
          ]
      }`