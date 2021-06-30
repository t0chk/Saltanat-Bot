function updateVolume(){
    var response = UrlFetchApp.fetch("https://fapi.binance.com/fapi/v1/ticker/24hr");
    let data = JSON.parse(response.getContentText());
    b=2
    for (d in data){
      vol24sheet.getRange("A"+b).setValue(data[d].symbol)
      vol24sheet.getRange("B"+b).setValue(data[d].quoteVolume)
      b++
    }

}

function buttonCheckcom() {

  let  message = com.getRange("B2").getValue();
  let status=settingSheet.getRange("B5").getValue();
  if (status=="выкл"){
    obrabotkaMesageClass(message)
  }
  else if (status=="вкл"){
    obrabotkaMesageClassTurbo(message)
  }
}

// функция для обновления фильтров 
function updateFilter() {
  // start
  filterSheet.getRange("F2").setValue("start");


  // binance fto filter
  binanceFto.BinanceFilterFutures();
  filterComman.json = binanceFto.binanceConnect();
  filterComman.table = filterSheet.getRange("B2");
  filterComman.jsonFromDictFutures();
  // binance spot filter

  binance.BinanceFilterSpot();
  filterComman.json = binance.binanceConnect();
  filterComman.jsonFromDictSpot()

  // binance ftu filter

  binanceFtu.BinanceFilterFutures();
  filterComman.json = binanceFtu.binanceConnect();
  filterComman.table = filterSheet.getRange("C2");
  filterComman.jsonFromDictFutures();
  // binance fru filter

  binanceFru.BinanceFilterFutures();
  filterComman.json = binanceFru.binanceConnect();
  filterComman.table = filterSheet.getRange("D2");
  filterComman.jsonFromDictFutures();
  // binance fro filter

  binanceFro.BinanceFilterFutures();
  filterComman.json = binanceFro.binanceConnect();
  filterComman.table = filterSheet.getRange("E2");
  filterComman.jsonFromDictFutures();
  // done 
  filterSheet.getRange("F2").setValue("done");
}


function BswapSend(){
  binance.BinanceBSwap()
  let res =binance.binanceConnect()
  let count = swapSheet.getLastRow()
  swapSheet.getRange("A"+(count+1)).setValue(res[0].share.asset.EUR)
  swapSheet.getRange("B"+(count+1)).setValue(res[0].share.asset.BUSD)
  
  teleg.text="eur="+res[0].share.asset.EUR+" \n"+"busd="+res[0].share.asset.BUSD
  teleg.telegramSendText()
}

function clearLogi(){
  let count = logiSheet.getLastRow()
  for (let i = 2; i<=count;i++){
    logiSheet.getRange("B"+i).setValue("")
    logiSheet.getRange("C"+i).setValue("")
  }
    logiSheet.getRange("A1").setValue(0)

}

function testtrig(s){
   let maxantiban=Number(settingSheet.getRange("B10").getValue())
   console.log(maxantiban)
}





