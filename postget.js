// запись листов таблицы в переменную
var ss = SpreadsheetApp.getActiveSpreadsheet();
var sheet = ss.getSheetByName("API");
var telebot = ss.getSheetByName("telebot");
var logiSheet = ss.getSheetByName("log");
var signalSheet = ss.getSheetByName("signal");
var formulaSheet = ss.getSheetByName("formula");
var settingSheet = ss.getSheetByName("settings");
var filterSheet = ss.getSheetByName("filter");
var com = ss.getSheetByName("com");
//// функция которое принимает запросы по web hook
function doPost(e) {
  let res = JSON.stringify(e.postData.contents);
  loggi.messageAnswerExchange = (res).toString();
  loggi.addLog();
  teleg.answerMarket = (res).toString();
  teleg.telegramSendLog();
  if (e.postData.type == "text/plain") {
    let message = e.postData.contents;
    let status=settingSheet.getRange("B5").getValue();
    if (status=="выкл"){
      obrabotkaMesageClass(message)
    }
    else if (status=="вкл"){
      obrabotkaMesageClassTurbo(message)
    }
  }
}
