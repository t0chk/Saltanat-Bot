///////////////обработка сообщение 
function obrabotkaMesageClassTurbo(mesage) {
  mesage = mesage.toLowerCase();
  let t = mesage.split("::");
  for (var i = 0; i < t.length; i++) {
    let massiv = t[i].split(';')
    let dictCommand = new Map()
    for (index in massiv) {
      dictCommand[massiv[index].split('=')[0]] = massiv[index].split('=')[1]
    }

    let market = dictCommand['market'];
    let marketClass = marketDict[market];

    if (dictCommand['api'] != undefined) {
      marketClass.key = ss.getSheetByName(("api" + dictCommand['market'])).getRange("B" + dictCommand['api']).getValue()
      marketClass.secret = ss.getSheetByName(("api" + dictCommand['market'])).getRange("C" + dictCommand['api']).getValue()
    }

    if (dictCommand['symbol'] != undefined) {
      marketClass.pair = dictCommand['symbol'].toUpperCase();
      // команда perpcut для обрезки в валютной паре слова perp пример если был BTCUSDTPERP то после этой команды станет BTCUSDT
      if (dictCommand['perpcut'] == "true") {
        marketClass.pair = marketClass.pair.split("PERP")[0]
      }
    }

    if (dictCommand['origclientorderid'] != undefined) { marketClass.origClientOrderId = dictCommand['origclientorderid'] }
    if (dictCommand['newclientorderid'] != undefined) { marketClass.newClientOrderId = dictCommand['newclientorderid'] }
    if (dictCommand['isisolated'] != undefined) {marketClass.isIsolated = dictCommand['isisolated'].toUpperCase()}
    if (dictCommand['sideeffecttype'] != undefined) { marketClass.sideeffecttype = dictCommand['sideeffecttype'].toUpperCase() }
    if (dictCommand['positionside'] != undefined) { marketClass.positionSide = dictCommand['positionside'].toUpperCase() }

    if (dictCommand['stoplimittimeinforce'] != undefined) { marketClass.stopLimitTimeInForce = dictCommand['stoplimittimeinforce'].toUpperCase()}



    if (dictCommand['oco'] != undefined) { marketClass.oco = dictCommand['oco'].toLowerCase() }

    if (dictCommand['dualsideposition'] != undefined) { marketClass.dualsideposition = dictCommand['dualsideposition'].toLowerCase() }
    if (dictCommand['side'] != undefined) { marketClass.side = dictCommand['side'].toUpperCase(); }
    if (dictCommand['ordertype'] != undefined) { marketClass.type = dictCommand['ordertype'].toUpperCase(); }
    if (dictCommand['timeinforce'] != undefined) { marketClass.timeInForce = dictCommand['timeinforce']; }
    if (dictCommand['quantity'] != undefined) { marketClass.quantity = dictCommand['quantity']; }
    if (dictCommand['price'] != undefined) { marketClass.price = dictCommand['price']; }
    if (dictCommand['neworderresptype'] != undefined) { marketClass.newOrderRespType = dictCommand['neworderresptype']; }
    if (dictCommand['stopprice'] != undefined) { marketClass.stopPrice = dictCommand['stopprice']; }
    if (dictCommand['quoteorderqty'] != undefined) { marketClass.quoteOrderQty = dictCommand['quoteorderqty']; }
    if (dictCommand['callbackrate'] != undefined) { marketClass.callbackRate = dictCommand['callbackrate']; }
    if (dictCommand['reduceonly'] != undefined) { marketClass.reduceOnly = dictCommand['reduceonly']; }
    if (dictCommand['closeposition'] != undefined) { marketClass.closePosition = dictCommand['closeposition']; }
    if (dictCommand['allclose'] != undefined) { marketClass.allClose = dictCommand['allclose']; }
    if (dictCommand['activationprice'] != undefined) { marketClass.activationPrice = dictCommand['activationprice']; }
    let res = marketClass.binanceStartTurbo();
  }
}
