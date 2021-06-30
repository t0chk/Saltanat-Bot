function sortJson(r){
  let symbol=""
  let lastFundingRate=0
  for (i1 in r){
    for (i in r ){
      if (r[Number(i)+1]!=undefined){
        if (r[i].lastFundingRate<r[Number(i)+1].lastFundingRate){
          symbol=r[i].symbol
          lastFundingRate=r[i].lastFundingRate
          r[i].symbol=r[Number(i)+1].symbol
          r[i].lastFundingRate=r[Number(i)+1].lastFundingRate
          r[Number(i)+1].symbol=symbol
          r[Number(i)+1].lastFundingRate=lastFundingRate
        }
      }
      else{
        break
      }
    }
  }
  return r 
}



function showpair(){
  binanceFru.BinanceFundingGetInfoFutures()
  r=binanceFru.binanceConnect()
  let znach = fundingSheet.getRange("B2").getValue() 
  let kol = fundingSheet.getRange("A2").getValue() 
  index=2
  index1=2
  fundingSheet.getRange("G2:G100").clear();
  fundingSheet.getRange("H2:H100").clear();

  let spisokpair=[]
  let ind=2
  let i=1
  while (i<2){
    if (fundingSheet.getRange("C"+ind).getValue()!=""){
      spisokpair.push(fundingSheet.getRange("C"+ind).getValue())
    }
    else {
      i=3
    }
    ind++
  }

  r=sortJson(r)
  let pairList=[]
  for (i in r){
    if ((r[i].symbol!=undefined) && (spisokpair.indexOf(r[i].symbol)==-1)){
      let val=(r[i].lastFundingRate*100)

      if (znach<=val){
        if (index<(index1+kol)){
          fundingSheet.getRange("G"+index).setValue(r[i].symbol)
          fundingSheet.getRange("H"+index).setValue(val)
          pairList[index-2]=r[i].symbol
          index++      
        }
    }
  }
  }
  return pairList
}

function startfunding(){
  binanceFru.BinanceFundingGetInfoFutures()
  r=binanceFru.binanceConnect()
  let znach = fundingSheet.getRange("B2").getValue() 
  let kol = fundingSheet.getRange("A2").getValue() 
  let summa = fundingSheet.getRange("F2").getValue() 
  index=2
  index1=2
  let spisokpair=[]
  let ind=2
  let i=1
  while (i<2){
    if (fundingSheet.getRange("C"+ind).getValue()!=""){
      spisokpair.push(fundingSheet.getRange("C"+ind).getValue())
    }
    else {
      i=3
    }
    ind++
  }
  fundingSheet.getRange("G2:G100").clear();
  fundingSheet.getRange("H2:H100").clear();
  fundingSheet.getRange("D2:D100").clear();
  fundingSheet.getRange("E2:E100").clear();
  fundingSheet.getRange("I2:I100").clear();
  r=sortJson(r)

  for (i in r){
    if ((r[i]!=undefined) && (spisokpair.indexOf(r[i].symbol)==-1)){
      let val=(r[i].lastFundingRate*100)
      if (znach<=val){
        if (index<(index1+kol)){
          fundingSheet.getRange("G"+index).setValue(r[i].symbol)
          fundingSheet.getRange("I"+index).setValue(r[i].symbol)
          fundingSheet.getRange("H"+index).setValue(val)
          creatOrderFunding(r[i].symbol,summa,kol,index)
          index++      
        }
      }
    }
  }

// создание триггера нужно добавить 
let minut=fundingSheet.getRange("A4").getValue()
let triggerid=ScriptApp.newTrigger("checkfunding").timeBased().everyMinutes(minut).create().getUniqueId()
fundingSheet.getRange("M2").setValue(triggerid)

}


// триггер который проверяе каждые 10 минут ставку финансирования 
function checkfunding(){
  binanceFru.BinanceFundingGetInfoFutures()
  let r=binanceFru.binanceConnect()
  let znach = fundingSheet.getRange("B2").getValue() 
  let kol = fundingSheet.getRange("L2").getValue() 
  let summa = fundingSheet.getRange("F2").getValue() 
  let obbkol = fundingSheet.getRange("A2").getValue() 

  let pair=[]
  for (let i =2;i<=(kol+1);i++){
    pair[i-2]=fundingSheet.getRange("I"+i).getValue() 
  }
  for (va in r ){
    for (let p=0;p<pair.length;p++){
      if (pair[p]==r[va].symbol){
        if ((r[va].lastFundingRate*100)<znach){
          closeOrderFunding(r[va].symbol,p+2)
          let symbol=checkFundingPair(pair)
          // нету валюты на замену удаляем строку
          if (symbol==0){
            fundingSheet.getRange("D"+(p+2)).deleteCells(SpreadsheetApp.Dimension.ROWS)
            fundingSheet.getRange("E"+(p+2)).deleteCells(SpreadsheetApp.Dimension.ROWS)
            fundingSheet.getRange("G"+(p+2)).deleteCells(SpreadsheetApp.Dimension.ROWS)
            fundingSheet.getRange("H"+(p+2)).deleteCells(SpreadsheetApp.Dimension.ROWS)
            fundingSheet.getRange("I"+(p+2)).deleteCells(SpreadsheetApp.Dimension.ROWS)
            fundingSheet.getRange("J"+(p+2)).deleteCells(SpreadsheetApp.Dimension.ROWS)
            fundingSheet.getRange("K"+(p+2)).deleteCells(SpreadsheetApp.Dimension.ROWS)
            let index11 = pair.indexOf(pair[p]);
            if (index11 > -1) {
              pair.splice(index11, 1);
            }
            fundingSheet.getRange("L2").setValue(pair.length) 
            p=p-1
          }
          else{
            // есть валюта на замену добавляем 
            creatOrderFundingTrigger(symbol,summa,kol,p+2)
          }
        }
      }
    }

  }
  kol = fundingSheet.getRange("L2").getValue() 








  for (let i=kol;i<obbkol;i++){
      let symbol=checkFundingPair(pair)
      if (symbol!=0){
        pair[pair.length]=symbol
        creatOrderFundingTrigger(symbol,summa,kol,i+2)
        fundingSheet.getRange("L2").setValue(pair.length) 

      }

  }

  
}





function checkFundingPair(pair){

  let fundPair=showpair()
  let targetPair=0
  console.log(fundPair)
  for (i in fundPair){
    found=0
    if (pair.indexOf(fundPair[i])==-1){
      targetPair=fundPair[i]
      break;
    }
  }
  return targetPair
}




function creatOrderFunding(symbol,summa,kol,index){

    binanceFru.updateParametr();
    let kol1=100/kol
    binanceFru.pair=symbol
    binanceFru.side="SELL"
    binanceFru.type="MARKET" 
    binanceFru.leverage=1
    binanceFru.BinanceLeverageFutures();
    binanceFru.binanceConnect();

    binanceFru.fundingSumma=summa;
    binanceFru.quantityProc = kol1;
    binanceFru.leverageProc = 1;
    binanceFru.filterStatus=true

    binanceFru.BinanceQuantityProcFutures();
    binanceFru.BinanceCreatOrderFutures();
    binanceFru.updateParametr();
    r11=binanceFru.binanceConnect();
    fundingSheet.getRange("E"+index).setValue(r11.orderId)
    fundingSheet.getRange("K"+index).setValue(r11.origQty)

  
    binance.pair=symbol
    binance.side="BUY"
    binance.type="MARKET" 
    binance.newOrderRespType="FULL"
    binance.quoteOrderQty = summa;
    binance.filterStatus=true
    binance.BinanceCreatOrderSpot();
    binance.updateParametr();
    r11=binance.binanceConnect();
    fundingSheet.getRange("D"+index).setValue(r11.orderId)
    fundingSheet.getRange("J"+index).setValue(r11.origQty-(r11.origQty*0.001))

    fundingSheet.getRange("L2").setValue(index-1) 

  

}



function creatOrderFundingTrigger(symbol,summa,kol,index){
    fundingSheet.getRange("I"+index).setValue(symbol)

    binanceFru.updateParametr();
    let kol1=100/kol
    binanceFru.pair=symbol
    binanceFru.side="SELL"
    binanceFru.type="MARKET" 
    binanceFru.leverage=1
    binanceFru.BinanceLeverageFutures();
    binanceFru.binanceConnect();
    binanceFru.fundingSumma=summa;
    binanceFru.quantityProc = kol1;
    binanceFru.leverageProc = 1;
    binanceFru.filterStatus=true

    binanceFru.BinanceQuantityProcFutures();
    binanceFru.BinanceCreatOrderFutures();
    binanceFru.updateParametr();
    r11=binanceFru.binanceConnect();
    fundingSheet.getRange("E"+index).setValue(r11.orderId)
    fundingSheet.getRange("K"+index).setValue(r11.origQty)
    console.log(r11)
  
    binance.pair=symbol
    binance.side="BUY"
    binance.type="MARKET" 
    binance.newOrderRespType="FULL"
    binance.quoteOrderQty = summa;
    binance.filterStatus=true
    binance.BinanceCreatOrderSpot();
    binance.updateParametr();
    r11=binance.binanceConnect();
    fundingSheet.getRange("D"+index).setValue(r11.orderId)
    fundingSheet.getRange("J"+index).setValue(r11.origQty-(r11.origQty*0.001))
    console.log(r11)

    
}

function closeOrderFunding(symbol,index){

    binanceFru.updateParametr();
    let kol1=fundingSheet.getRange("K"+index).getValue()

    binanceFru.pair=symbol
    binanceFru.side="BUY"
    binanceFru.type="MARKET" 
    binanceFru.leverage=1
    binanceFru.BinanceLeverageFutures();
    binanceFru.binanceConnect();
    binanceFru.quantity=kol1
    binanceFru.filterStatus=true
    binanceFru.binancefilterStart()
    binanceFru.BinanceCreatOrderFutures();
    binanceFru.updateParametr();
    r11=binanceFru.binanceConnect();
    console.log(r11)
  

    kol1=fundingSheet.getRange("J"+index).getValue()

    binance.pair=symbol
    binance.side="SELL"
    binance.type="MARKET" 
    binance.newOrderRespType="FULL"
    binance.quantity = kol1;
    binance.filterStatus=true
    binance.binancefilterStart()

    binance.BinanceCreatOrderSpot();
    binance.updateParametr();
    r11=binance.binanceConnect();
    console.log(r11)
}



function closeALL(){
  let pair=[]
  let kol = fundingSheet.getRange("L2").getValue() 

  for (let i =2;i<=(kol+1);i++){
    pair[i-2]=fundingSheet.getRange("I"+i).getValue() 
  }

  for (let p=0;p<pair.length;p++){
    closeOrderFunding(pair[p],p+2)
    fundingSheet.getRange("D"+(p+2)).deleteCells(SpreadsheetApp.Dimension.ROWS)
    fundingSheet.getRange("E"+(p+2)).deleteCells(SpreadsheetApp.Dimension.ROWS)
    fundingSheet.getRange("G"+(p+2)).deleteCells(SpreadsheetApp.Dimension.ROWS)
    fundingSheet.getRange("H"+(p+2)).deleteCells(SpreadsheetApp.Dimension.ROWS)
    fundingSheet.getRange("I"+(p+2)).deleteCells(SpreadsheetApp.Dimension.ROWS)
    fundingSheet.getRange("J"+(p+2)).deleteCells(SpreadsheetApp.Dimension.ROWS)
    fundingSheet.getRange("K"+(p+2)).deleteCells(SpreadsheetApp.Dimension.ROWS)
    let index11 = pair.indexOf(pair[p]);
    if (index11 > -1) {
      pair.splice(index11, 1);
    }
    fundingSheet.getRange("L2").setValue(pair.length) 
    p=p-1
  }

  deleteTrigger1()
}

function updateTrigger(){
  deleteTrigger1()
  let minut=fundingSheet.getRange("A4").getValue()
  let triggerid=ScriptApp.newTrigger("checkfunding").timeBased().everyMinutes(minut).create().getUniqueId()
  fundingSheet.getRange("M2").setValue(triggerid)
}


function deleteTrigger1(){
 var triggers = ScriptApp.getProjectTriggers();
 let triggerId=fundingSheet.getRange("M2").getValue()
 for (i in triggers){
   if (triggers[i].getUniqueId()==Number(triggerId)){
      let r=ScriptApp.deleteTrigger(triggers[i])
      console.log(r)
      fundingSheet.getRange("M2").setValue(0)

   }

 }
}


