function sendNodejs(text) {
  let params = {
          'method': 'POST',
          'contentType': 'text/plain',
          'payload':text,
        };
  let url=settingSheet.getRange("B8").getValue()

  r=UrlFetchApp.fetch(url, params);

}

function alonesend(){
  let url = customsheet.getRange("B2").getValue()
  let command = customsheet.getRange("A2").getValue()
  sendonlyonecommand(url,command)
}


function sendonlyonecommand(baseUrl,command){
  let params = {
          'method': 'POST',
          'contentType': 'text/plain',
          'payload':command,
          muteHttpExceptions: true
        };
  UrlFetchApp.fetch(baseUrl, params);
}
