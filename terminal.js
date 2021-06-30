function balanceTer() {
  let mar = terSheet.getRange("B1").getValue()
  if (mar=="spot"){
    binance.BinanceAccountInfoSpot()
    let res=binance.binanceConnect()
    console.log(res)
    let st=3
    let count =res.balances.length
    terSheet.getRange("A2").setValue("asset")
    terSheet.getRange("B2").setValue("free")
    terSheet.getRange("C2").setValue("locked")
    console.log(res.balances[0])
    let v=""
    for (let i=0;i<count;i++){
        v=res.balances[i]
          if ((v.free!=0)||(v.locked!=0)){
          terSheet.getRange("A"+st).setValue(v.asset)
          terSheet.getRange("B"+st).setValue(v.free)
          terSheet.getRange("C"+st).setValue(v.locked)        
          st=st+1
        }
    }
    addbalstrika(st)
  }
  else if (mar=="margin"){
    binance.BinanceAccountInfoMargin()
    let res=binance.binanceConnect()
    console.log(res)
    let st=3
    let count =res.userAssets.length
    terSheet.getRange("A2").setValue("asset")
    terSheet.getRange("B2").setValue("free")
    terSheet.getRange("C2").setValue("locked")
    terSheet.getRange("D2").setValue("borrowed")
    terSheet.getRange("E2").setValue("interest")
    terSheet.getRange("F2").setValue("netAsset")



    let v=""
    for (let i=0;i<count;i++){
        v=res.userAssets[i]
          terSheet.getRange("A"+st).setValue(v.asset)
          terSheet.getRange("B"+st).setValue(v.free)
          terSheet.getRange("C"+st).setValue(v.locked)      
          terSheet.getRange("D"+st).setValue(v.borrowed)
          terSheet.getRange("E"+st).setValue(v.interest)
          terSheet.getRange("F"+st).setValue(v.netAsset)
          st=st+1
    }
    addbalstrika(st)
  }
  else if (mar=="binancefru"){
    binanceFru.BinanceAccountInfoFuturesV2()
    let res=binanceFru.binanceConnect()
    console.log(res)
    let st=3
    let count =res.length
    terSheet.getRange("A2").setValue("asset")
    terSheet.getRange("B2").setValue("balance")
    terSheet.getRange("C2").setValue("crossWalletBalance")
    terSheet.getRange("D2").setValue("crossUnPnl")
    terSheet.getRange("E2").setValue("availableBalance")
    terSheet.getRange("F2").setValue("maxWithdrawAmount")



    let v=""
    for (let i=0;i<count;i++){
        v=res[i]
          terSheet.getRange("A"+st).setValue(v.asset)
          terSheet.getRange("B"+st).setValue(v.balance)
          terSheet.getRange("C"+st).setValue(v.crossWalletBalance)      
          terSheet.getRange("D"+st).setValue(v.crossUnPnl)
          terSheet.getRange("E"+st).setValue(v.availableBalance)
          terSheet.getRange("F"+st).setValue(v.maxWithdrawAmount)
          st=st+1
    }
    addbalstrika(st)
  
  }
  else if (mar=="binancefro"){
    binanceFro.BinanceAccountInfoFutures()
    let res=binanceFro.binanceConnect()
    console.log(res)
    let st=3
    let count =res.length
    terSheet.getRange("A2").setValue("asset")
    terSheet.getRange("B2").setValue("balance")
    terSheet.getRange("C2").setValue("crossWalletBalance")
    terSheet.getRange("D2").setValue("crossUnPnl")
    terSheet.getRange("E2").setValue("availableBalance")
    terSheet.getRange("F2").setValue("maxWithdrawAmount")



    let v=""
    for (let i=0;i<count;i++){
        v=res[i]
          terSheet.getRange("A"+st).setValue(v.asset)
          terSheet.getRange("B"+st).setValue(v.balance)
          terSheet.getRange("C"+st).setValue(v.crossWalletBalance)      
          terSheet.getRange("D"+st).setValue(v.crossUnPnl)
          terSheet.getRange("E"+st).setValue(v.availableBalance)
          terSheet.getRange("F"+st).setValue(v.maxWithdrawAmount)
          st=st+1
    }
  addbalstrika(st)
  
  }
  
}

function addbalstrika(st){
  terSheet.getRange("A"+st).setValue("")
    terSheet.getRange("B"+st).setValue("")
    terSheet.getRange("C"+st).setValue("")      
    terSheet.getRange("D"+st).setValue("")
    terSheet.getRange("E"+st).setValue("")
    terSheet.getRange("F"+st).setValue("")
}

function addorderstrika(st){
        terSheet.getRange(st,9) .setValue("")
        terSheet.getRange(st,10).setValue("")
        terSheet.getRange(st,11).setValue("")
        terSheet.getRange(st,12).setValue("")
        terSheet.getRange(st,13).setValue("")
        terSheet.getRange(st,14).setValue("")
        terSheet.getRange(st,15).setValue("")
        terSheet.getRange(st,16).setValue("")
        terSheet.getRange(st,17).setValue("")
        terSheet.getRange(st,18).setValue("")
        terSheet.getRange(st,19).setValue("")
        terSheet.getRange(st,20).setValue("")
        terSheet.getRange(st,21).setValue("")
        terSheet.getRange(st,22).setValue("")
        terSheet.getRange(st,23).setValue("")
        terSheet.getRange(st,24).setValue("")
        terSheet.getRange(st,25).setValue("")
}



function allorderTer() {
  let mar = terSheet.getRange("J1").getValue()
  if (mar=="spot"){
    binance.BinanceOpenOrderSpot()
    let res=binance.binanceConnect()
    console.log(res)
    let st=3
    let count =res.length
    terSheet.getRange(2,9) .setValue("symbol")
    terSheet.getRange(2,10).setValue("orderId")
    terSheet.getRange(2,11).setValue("clientOrderId")
    terSheet.getRange(2,12).setValue("price")
    terSheet.getRange(2,13).setValue("origQty")
    terSheet.getRange(2,14).setValue("executedQty")
    terSheet.getRange(2,15).setValue("cummulativeQuoteQty")
    terSheet.getRange(2,16).setValue("status")
    terSheet.getRange(2,17).setValue("timeInForce")
    terSheet.getRange(2,18).setValue("type")
    terSheet.getRange(2,19).setValue("side")
    terSheet.getRange(2,20).setValue("stopPrice")
    terSheet.getRange(2,21).setValue("icebergQty")
    terSheet.getRange(2,22).setValue("time")
    terSheet.getRange(2,23).setValue("updateTime")
    terSheet.getRange(2,24).setValue("isWorking")
    terSheet.getRange(2,25).setValue("origQuoteOrderQty")
    let v=""
    for (let i=0;i<count;i++){
        v=res[i]
        terSheet.getRange(st,9) .setValue(v.symbol)
        terSheet.getRange(st,10).setValue(v.orderId)
        terSheet.getRange(st,11).setValue(v.clientOrderId)
        terSheet.getRange(st,12).setValue(v.price)
        terSheet.getRange(st,13).setValue(v.origQty)
        terSheet.getRange(st,14).setValue(v.executedQty)
        terSheet.getRange(st,15).setValue(v.cummulativeQuoteQty)
        terSheet.getRange(st,16).setValue(v.status)
        terSheet.getRange(st,17).setValue(v.timeInForce)
        terSheet.getRange(st,18).setValue(v.type)
        terSheet.getRange(st,19).setValue(v.side)
        terSheet.getRange(st,20).setValue(v.stopPrice)
        terSheet.getRange(st,21).setValue(v.icebergQty)
        terSheet.getRange(st,22).setValue(v.time)
        terSheet.getRange(st,23).setValue(v.updateTime)
        terSheet.getRange(st,24).setValue(v.isWorking)
        terSheet.getRange(st,25).setValue(v.origQuoteOrderQty)
        st=st+1
    }
    addorderstrika(st)
  }
  else if (mar=="margin"){
    binance.BinanceOpenOrderMar()
    let res=binance.binanceConnect()
    console.log(res)
    let st=3
    let count =res.length
    terSheet.getRange(2,9) .setValue("symbol")
    terSheet.getRange(2,10).setValue("orderId")
    terSheet.getRange(2,11).setValue("clientOrderId")
    terSheet.getRange(2,12).setValue("price")
    terSheet.getRange(2,13).setValue("origQty")
    terSheet.getRange(2,14).setValue("executedQty")
    terSheet.getRange(2,15).setValue("cummulativeQuoteQty")
    terSheet.getRange(2,16).setValue("status")
    terSheet.getRange(2,17).setValue("timeInForce")
    terSheet.getRange(2,18).setValue("type")
    terSheet.getRange(2,19).setValue("side")
    terSheet.getRange(2,20).setValue("stopPrice")
    terSheet.getRange(2,21).setValue("icebergQty")
    terSheet.getRange(2,22).setValue("time")
    terSheet.getRange(2,23).setValue("updateTime")
    terSheet.getRange(2,24).setValue("isWorking")
    terSheet.getRange(2,25).setValue("origQuoteOrderQty")
    let v=""
    for (let i=0;i<count;i++){
        v=res[i]
        terSheet.getRange(st,9) .setValue(v.symbol)
        terSheet.getRange(st,10).setValue(v.orderId)
        terSheet.getRange(st,11).setValue(v.clientOrderId)
        terSheet.getRange(st,12).setValue(v.price)
        terSheet.getRange(st,13).setValue(v.origQty)
        terSheet.getRange(st,14).setValue(v.executedQty)
        terSheet.getRange(st,15).setValue(v.cummulativeQuoteQty)
        terSheet.getRange(st,16).setValue(v.status)
        terSheet.getRange(st,17).setValue(v.timeInForce)
        terSheet.getRange(st,18).setValue(v.type)
        terSheet.getRange(st,19).setValue(v.side)
        terSheet.getRange(st,20).setValue(v.stopPrice)
        terSheet.getRange(st,21).setValue(v.icebergQty)
        terSheet.getRange(st,22).setValue(v.time)
        terSheet.getRange(st,23).setValue(v.updateTime)
        terSheet.getRange(st,24).setValue(v.isWorking)
        terSheet.getRange(st,25).setValue(v.origQuoteOrderQty)
        st=st+1
    }
    addorderstrika(st)
  }
  else if (mar=="binancefru"){
    binanceFru.BinanceOpenOrderFutures()
    let res=binanceFru.binanceConnect()
    console.log(res)
    let st=3
    let count =res.length
    terSheet.getRange(2,9) .setValue("symbol")
    terSheet.getRange(2,10).setValue("orderId")
    terSheet.getRange(2,11).setValue("clientOrderId")
    terSheet.getRange(2,12).setValue("price")
    terSheet.getRange(2,13).setValue("origQty")
    terSheet.getRange(2,14).setValue("executedQty")
    terSheet.getRange(2,15).setValue("avgPrice")
    terSheet.getRange(2,16).setValue("status")
    terSheet.getRange(2,17).setValue("timeInForce")
    terSheet.getRange(2,18).setValue("type")
    terSheet.getRange(2,19).setValue("side")
    terSheet.getRange(2,20).setValue("stopPrice")
    terSheet.getRange(2,21).setValue("cumQuote")
    terSheet.getRange(2,22).setValue("time")
    terSheet.getRange(2,23).setValue("updateTime")
    terSheet.getRange(2,24).setValue("reduceOnly")
    terSheet.getRange(2,25).setValue("closePosition")
    terSheet.getRange(2,26).setValue("positionSide")
    terSheet.getRange(2,27).setValue("workingType")
    terSheet.getRange(2,28).setValue("priceProtect")
    let v=""
    for (let i=0;i<count;i++){
        v=res[i]
        terSheet.getRange(st,9) .setValue(v.symbol)
        terSheet.getRange(st,10).setValue(v.orderId)
        terSheet.getRange(st,11).setValue(v.clientOrderId)
        terSheet.getRange(st,12).setValue(v.price)
        terSheet.getRange(st,13).setValue(v.origQty)
        terSheet.getRange(st,14).setValue(v.executedQty)
        terSheet.getRange(st,15).setValue(v.avgPrice)
        terSheet.getRange(st,16).setValue(v.status)
        terSheet.getRange(st,17).setValue(v.timeInForce)
        terSheet.getRange(st,18).setValue(v.type)
        terSheet.getRange(st,19).setValue(v.side)
        terSheet.getRange(st,20).setValue(v.stopPrice)
        terSheet.getRange(st,21).setValue(v.cumQuote)
        terSheet.getRange(st,22).setValue(v.time)
        terSheet.getRange(st,23).setValue(v.updateTime)
        terSheet.getRange(st,24).setValue(v.reduceOnly)
        terSheet.getRange(st,25).setValue(v.closePosition)
        terSheet.getRange(st,26).setValue(v.positionSide)
        terSheet.getRange(st,27).setValue(v.workingType)
        terSheet.getRange(st,28).setValue(v.priceProtect)
        st=st+1
    }
    addorderstrika(st)
  
  }
  else if (mar=="binancefro"){
    binanceFro.BinanceOpenOrderFutures()
    let res=binanceFro.binanceConnect()
    console.log(res)
    let st=3
    let count =res.length
    terSheet.getRange(2,9) .setValue("symbol")
    terSheet.getRange(2,10).setValue("orderId")
    terSheet.getRange(2,11).setValue("clientOrderId")
    terSheet.getRange(2,12).setValue("price")
    terSheet.getRange(2,13).setValue("origQty")
    terSheet.getRange(2,14).setValue("executedQty")
    terSheet.getRange(2,15).setValue("avgPrice")
    terSheet.getRange(2,16).setValue("status")
    terSheet.getRange(2,17).setValue("timeInForce")
    terSheet.getRange(2,18).setValue("type")
    terSheet.getRange(2,19).setValue("side")
    terSheet.getRange(2,20).setValue("stopPrice")
    terSheet.getRange(2,21).setValue("cumQuote")
    terSheet.getRange(2,22).setValue("time")
    terSheet.getRange(2,23).setValue("updateTime")
    terSheet.getRange(2,24).setValue("reduceOnly")
    terSheet.getRange(2,25).setValue("closePosition")
    terSheet.getRange(2,26).setValue("positionSide")
    terSheet.getRange(2,27).setValue("workingType")
    terSheet.getRange(2,28).setValue("priceProtect")
    let v=""
    for (let i=0;i<count;i++){
        v=res[i]
        terSheet.getRange(st,9) .setValue(v.symbol)
        terSheet.getRange(st,10).setValue(v.orderId)
        terSheet.getRange(st,11).setValue(v.clientOrderId)
        terSheet.getRange(st,12).setValue(v.price)
        terSheet.getRange(st,13).setValue(v.origQty)
        terSheet.getRange(st,14).setValue(v.executedQty)
        terSheet.getRange(st,15).setValue(v.avgPrice)
        terSheet.getRange(st,16).setValue(v.status)
        terSheet.getRange(st,17).setValue(v.timeInForce)
        terSheet.getRange(st,18).setValue(v.type)
        terSheet.getRange(st,19).setValue(v.side)
        terSheet.getRange(st,20).setValue(v.stopPrice)
        terSheet.getRange(st,21).setValue(v.cumQuote)
        terSheet.getRange(st,22).setValue(v.time)
        terSheet.getRange(st,23).setValue(v.updateTime)
        terSheet.getRange(st,24).setValue(v.reduceOnly)
        terSheet.getRange(st,25).setValue(v.closePosition)
        terSheet.getRange(st,26).setValue(v.positionSide)
        terSheet.getRange(st,27).setValue(v.workingType)
        terSheet.getRange(st,28).setValue(v.priceProtect)
        st=st+1
    }
    addorderstrika(st)
  
  }
  
}

function AllPositionTerminal(){
    terSheet.getRange(1,9).setValue("Позиции")
    let mar = terSheet.getRange("J1").getValue();
    let count = terSheet.getLastRow()
    terSheet.getRange(2,9,count,28).clear({contentsOnly: true})
    let res=new marketResponseClass();
    try{
      if (mar=="binancefru"){
        binanceFru.BinanceAccountInfoFuturesV2account()
        res=binanceFru.binanceConnect()
        console.log(res)
        let positions=res.positions
        let st=3
        let count =positions.length
        terSheet.getRange(2,9 ).setValue("symbol")
        terSheet.getRange(2,10).setValue("positionSide")
        terSheet.getRange(2,11).setValue("positionAmt")
        terSheet.getRange(2,12).setValue("notional")
        terSheet.getRange(2,13).setValue("entryPrice")
        terSheet.getRange(2,14).setValue("leverage")
        terSheet.getRange(2,15).setValue("unrealizedProfit")
        terSheet.getRange(2,16).setValue("maintMargin")
        terSheet.getRange(2,17).setValue("initialMargin")
        terSheet.getRange(2,18).setValue("positionInitialMargin")
        terSheet.getRange(2,19).setValue("openOrderInitialMargin")
        terSheet.getRange(2,20).setValue("maxNotional")
        terSheet.getRange(2,21).setValue("isolated")
        terSheet.getRange(2,22).setValue("isolatedWallet")
        terSheet.getRange(2,23).setValue("updateTime")
        let v=""
        for (let i=0;i<count;i++){
            v=positions[i]
            if (v.positionAmt!=0){
              terSheet.getRange(st,9) .setValue(v.symbol)
              terSheet.getRange(st,10).setValue(v.positionSide)
              terSheet.getRange(st,11).setValue(v.positionAmt)
              terSheet.getRange(st,12).setValue(v.notional)
              terSheet.getRange(st,13).setValue(v.entryPrice)
              terSheet.getRange(st,14).setValue(v.leverage)
              terSheet.getRange(st,15).setValue(v.unrealizedProfit)
              terSheet.getRange(st,16).setValue(v.maintMargin)
              terSheet.getRange(st,17).setValue(v.initialMargin)
              terSheet.getRange(st,18).setValue(v.positionInitialMargin)
              terSheet.getRange(st,19).setValue(v.openOrderInitialMargin)
              terSheet.getRange(st,20).setValue(v.maxNotional)
              terSheet.getRange(st,21).setValue(v.isolated)
              terSheet.getRange(st,22).setValue(v.isolatedWallet)
              terSheet.getRange(st,23).setValue(v.updateTime)
              st++
            }
        }
        // terSheet.getRange(st++,9).setValue("responseCode: "+res.responseCode)
        // terSheet.getRange(st++,9).setValue("indexban: " +res.indexban)
        // terSheet.getRange(st++,9).setValue("ответ: " + res.responseContentText)
        printResponse(st,9,res)
      }
      else if (mar=="binanceftu"){
        binanceFtu.BinanceAccountInfoFuturesV2account()
        res=binanceFtu.binanceConnect()
        console.log(res)
        let positions=res.positions
        let st=3
        let count =positions.length
        terSheet.getRange(2,9 ).setValue("symbol")
        terSheet.getRange(2,10).setValue("positionSide")
        terSheet.getRange(2,11).setValue("positionAmt")
        terSheet.getRange(2,12).setValue("notional")
        terSheet.getRange(2,13).setValue("entryPrice")
        terSheet.getRange(2,14).setValue("leverage")
        terSheet.getRange(2,15).setValue("unrealizedProfit")
        terSheet.getRange(2,16).setValue("maintMargin")
        terSheet.getRange(2,17).setValue("initialMargin")
        terSheet.getRange(2,18).setValue("positionInitialMargin")
        terSheet.getRange(2,19).setValue("openOrderInitialMargin")
        terSheet.getRange(2,20).setValue("maxNotional")
        terSheet.getRange(2,21).setValue("isolated")
        terSheet.getRange(2,22).setValue("isolatedWallet")
        terSheet.getRange(2,23).setValue("updateTime")
        let v=""
        for (let i=0;i<count;i++){
            v=positions[i]
            if (v.positionAmt!=0){
              terSheet.getRange(st,9) .setValue(v.symbol)
              terSheet.getRange(st,10).setValue(v.positionSide)
              terSheet.getRange(st,11).setValue(v.positionAmt)
              terSheet.getRange(st,12).setValue(v.notional)

            terSheet.getRange(st,13).setValue(v.entryPrice)
            terSheet.getRange(st,14).setValue(v.leverage)
            terSheet.getRange(st,15).setValue(v.unrealizedProfit)
            terSheet.getRange(st,16).setValue(v.maintMargin)
            terSheet.getRange(st,17).setValue(v.initialMargin)
            terSheet.getRange(st,18).setValue(v.positionInitialMargin)
            terSheet.getRange(st,19).setValue(v.openOrderInitialMargin)
            terSheet.getRange(st,20).setValue(v.maxNotional)
            terSheet.getRange(st,21).setValue(v.isolated)
            terSheet.getRange(st,22).setValue(v.isolatedWallet)
            terSheet.getRange(st,23).setValue(v.updateTime)
            st++
          }
      }
      // terSheet.getRange(st++,9).setValue("responseCode: "+res.responseCode)
      // terSheet.getRange(st++,9).setValue("indexban: " +res.indexban)
      // terSheet.getRange(st++,9).setValue("ответ: " + res.responseContentText)
      printResponse(st,9,res)
    }
  }
  catch(e){
    console.error('Ошибка при парсинге ответа биржи:', e.message);
    terSheet.getRange("I3").setValue('Ошибка при парсинге ответа биржи: '+(e).toString())
    terSheet.getRange("I4").setValue("responseCode: "+res.responseCode)
    terSheet.getRange("I5").setValue("indexban: " +res.indexban)
    terSheet.getRange("I6").setValue("ответ: " + res.responseContentText)
  }
}
