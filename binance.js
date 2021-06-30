// запись листов таблицы в переменную
var ss = SpreadsheetApp.getActiveSpreadsheet();
var sheet = ss.getSheetByName("API");
var telebot = ss.getSheetByName("telebot");
var logiSheet = ss.getSheetByName("log");
var signalSheet = ss.getSheetByName("signal");
var formulaSheet = ss.getSheetByName("formula");
var settingSheet = ss.getSheetByName("settings");
var driveSheet = ss.getSheetByName("drive");
var swapSheet = ss.getSheetByName("bswap");
var com = ss.getSheetByName("com");
var filterSheet = ss.getSheetByName("filter");
var terSheet = ss.getSheetByName("terminal");
var triggerSheet = ss.getSheetByName("trigger");
var fundingSheet = ss.getSheetByName("funding");
var customsheet = ss.getSheetByName("testhook");

var binanceSheet = ss.getSheetByName("apibinance");

var vol24sheet = ss.getSheetByName("24v");


class binanceClass {
  constructor() {
    // api key 
    this.orderId=0
    this.fundingSumma=0
    this.priceprocdown=undefined
    this.priceprocup=undefined
    this.priceprocauto=undefined

    this.positionSide="BOTH"
    this.stopLimitPrice=0
    this.sideeffecttype="NO_SIDE_EFFECT"
    this.dualsideposition="no"
    this.oco="false"
    this.stopLimitTimeInForce="FOK"
    this.key = ""
    this.zaim=""
    this.asset=""
    this.amount=0
    this.isIsolated="FALSE"
    this.startTime=16000000
    this.endTime=19000000
    this.timefrime="1h"
    this.cancelOrder="false"
    this.origClientOrderId=""
    this.newClientOrderId	=""
    // api secret
    this.secret = ""
    this.baseUrl = ""
    this.typeExchange = "/dapi";
    this.marketType = "spot";
    // статус фильтра если true тогда скрипт будет фильтровать цену и количетсов по правилам биржы бинанс
    this.filterStatus = false;
    // словарь в который при запуске скрипта будет записан фильтры по всем парам выбранной биржы
    this.filterDict = {};
    this.pos = 0
    this.command = "";
    this.param = "";
    this.pair = "BTCUSD_201225";
    this.side = "";
    this.type = "";
    this.timeInForce = "GTC";
    this.quantity = 0;
    this.price = 0;
    this.newOrderRespType = "ACK";
    this.stopPrice = 0;
    this.quoteOrderQty = 0;
    this.callbackRate = 0.5;
    this.market = "";
    this.leverage = 0;
    this.reduceOnly = "false";
    this.closePosition = "false";
    this.allClose = "false";
    this.signalCount = "";
    this.signalID = "";
    this.formula = "false";
    this.rowid = "";
    this.rowText = "";
    
    // цена за один контракт 
    this.contractSize = 0
    // первая валюта в валютной пары нужно будет для указаные количество в процентах
    this.baseAsset = "";
    // вторая валюта в валютной пары нужно будет для указаные количество в процентах
    this.quoteAsset = "";
    // фильтрация цены шаг
    this.tickSize = "";
    // фильтрация количество шаг
    this.stepSize = "";

    this.activationPrice = 0;
    // ниже команды которые необходимы для работы от баланса 
    this.quantityProc = 0;
    this.leverageProc = 0;
  }
  // соединитель через которое отправляються команды в биржу 
  klines(){
    this.command="/api/v3/klines"
    this.param = "symbol="+this.pair+"&interval="+this.timefrime+"&limit=1000";
    this.pos = 0;

  }
  
  updateParametr(){
    this.priceprocdown=undefined
    this.priceprocup=undefined
    this.priceprocauto=undefined
    this.positionSide="BOTH"
    this.stopLimitTimeInForce="FOK"
    this.dualsideposition="no"
    this.sideeffecttype="NO_SIDE_EFFECT"
    this.oco="false"
    this.cancelOrderID="false"
    this.pair = "BTCUSD_201225";
    this.origClientOrderId=""
    this.newClientOrderId	=""
    this.side = "";
    this.type = "";
    this.timeInForce = "GTC";
    this.quantity = 0;
    this.price = 0;
    this.newOrderRespType = "ACK";
    this.stopPrice = 0;
    this.quoteOrderQty = 0;
    this.callbackRate = 0.5;
    this.market = "";
    this.leverage = 0;
    this.reduceOnly = "false";
    this.closePosition = "false";
    this.allClose = "false";
    this.signalCount = "";
    this.signalID = "";
    this.formula = "false";
    this.rowid = "";
    this.rowText = "";
    
    // цена за один контракт 
    this.contractSize = 0
    // первая валюта в валютной пары нужно будет для указаные количество в процентах
    this.baseAsset = "";
    // вторая валюта в валютной пары нужно будет для указаные количество в процентах
    this.quoteAsset = "";
    // фильтрация цены шаг
    this.tickSize = "";
    // фильтрация количество шаг
    this.stepSize = "";

    this.activationPrice = 0;
    // ниже команды которые необходимы для работы от баланса 
    this.quantityProc = 0;
    this.leverageProc = 0;
  }
  // Dmytro | 30/06/21
  
  binanceConnect() {
    console.log(this.param);
    let max_fetch_trys=Number(settingSheet.getRange("B10").getValue());
    let fetch_trys=0;
    let responseContent = {};
    while(fetch_trys<max_fetch_trys){
      let timestamp = Number(new Date().getTime()).toFixed(0);
      if (this.pos == 0) {
        let params = {
          'method': 'get',
          'headers': { 'X-MBX-APIKEY': this.key },
          'muteHttpExceptions': true
        };
        let string = this.param
        let query = "?" + string
        var response = UrlFetchApp.fetch(this.baseUrl + this.command + query, params);
        return response.getContentText();
      }
      if (this.pos == 1) {
        let params = {
          'method': 'get',
          'muteHttpExceptions': true
        };
        let string = this.param
        let query = "?" + string
        var response = UrlFetchApp.fetch(this.baseUrl + this.command + query,params);
      }
      else if (this.pos == 2) {
        let string = this.param + "&timestamp=" + timestamp;

        let signature = Utilities.computeHmacSha256Signature(string, this.secret);

        signature = signature.map(function (e) {
          let v = (e < 0 ? e + 256 : e).toString(16); return v.length == 1 ? "0" + v : v;
        }).join("");
        let query = "?" + string + "&signature=" + signature;
        let params = {
          'method': 'get',
          'headers': { 'X-MBX-APIKEY': this.key },
          muteHttpExceptions: true
        };
        var response = UrlFetchApp.fetch(this.baseUrl + this.command + query, params);
      }
      else if (this.pos == 3) {
        let string = this.param + "&timestamp=" + timestamp;
        let signature = Utilities.computeHmacSha256Signature(string, this.secret);

        signature = signature.map(function (e) {
          let v = (e < 0 ? e + 256 : e).toString(16); return v.length == 1 ? "0" + v : v;
        }).join("");
        let query = "?" + string + "&signature=" + signature;
        let params = {
          'method': 'POST',
          'headers': { 'X-MBX-APIKEY': this.key },
          muteHttpExceptions: true
        };
        var response = UrlFetchApp.fetch(this.baseUrl + this.command + query, params);
      }
      else if (this.pos == 4) {
        let string = this.param + "&timestamp=" + timestamp;
        let signature = Utilities.computeHmacSha256Signature(string, this.secret);
        signature = signature.map(function (e) {
          let v = (e < 0 ? e + 256 : e).toString(16); return v.length == 1 ? "0" + v : v;
        }).join("");
        let query = "?" + string + "&signature=" + signature;
        let params = {
          'method': 'DELETE',
          'headers': { 'X-MBX-APIKEY': this.key },
          muteHttpExceptions: true
        };
        var response = UrlFetchApp.fetch(this.baseUrl + this.command + query, params);
      }
      var responseCode=response.getResponseCode()
      Logger.log("responseCode: "+ responseCode);
      Logger.log("Content-Type:" + response.getHeaders()["Content-Type"]);
      Logger.log("Content:" + response.getContentText());
      try{
        responseContent = JSON.parse(response.getContentText());
        if (responseContent.code!=-1003&&(responseCode == 200||responseCode == 400)){
          break;
        };
      } catch(e){
        console.error('Ошибка при парсинге ответа биржи:', e.message);
        // responseContent.responseContentText=response.getContentText()
        responseContent.exception=e.message
      }
      responseContent.responseContentText=response.getContentText()
      fetch_trys++;
    };
    responseContent.responseCode=responseCode;
    responseContent.indexban=fetch_trys;
    return responseContent;
    
  }


  klinesSpot(){
    this.command="/api/v3/klines"
    this.param = "symbol="+this.pair+"&interval="+this.timefrime+"&limit=1000"+"&startTime="+this.startTime;
    this.pos = 1;
  }

// spot
  // liquid swap info
  BinanceBSwap(){
    this.command="/sapi/v1/bswap/liquidity"
    this.param = "poolId=8";
    this.pos = 2;
  }

    //////создание ордеров oco для спот
  BinanceCreatOrderOcoSpot() {
    let param = "symbol=" + this.pair + "&side=" + this.side + "&quantity=" + this.quantity + "&price=" + this.price + "&stopPrice=" + this.stopPrice+"&stopLimitTimeInForce="+this.stopLimitTimeInForce+"&stopLimitPrice="+this.stopLimitPrice
    this.command = "/api/v3/order/oco"
    this.param = param
    this.pos = 3
  }

  //////создание ордеров для спот
  BinanceCreatOrderSpot() {
    let param = "symbol=" + this.pair + "&side=" + this.side + "&type=" + this.type + "&newOrderRespType=" + this.newOrderRespType;
    if (this.type == "LIMIT") {
      param = param + "&timeInForce=" + this.timeInForce + "&quantity=" + this.quantity + "&price=" + this.price;
    }
    else if ((this.type == "MARKET") && (this.quoteOrderQty == 0)) {
      param = param + "&quantity=" + this.quantity;
    }
    else if ((this.type == "MARKET") && (this.quoteOrderQty != 0)) {
      param = param + "&quoteOrderQty=" + this.quoteOrderQty;
    }
    else if ((this.type == "STOP_LOSS") || (this.type == "TAKE_PROFIT")) {
      param = param + "&quantity=" + this.quantity + "&stopPrice=" + this.stopPrice;
    }
    else if ((this.type == "STOP_LOSS_LIMIT") || (this.type == "TAKE_PROFIT_LIMIT")) {
      param = param + "&timeInForce=" + this.timeInForce + "&quantity=" + this.quantity + "&price=" + this.price + "&stopPrice=" + this.stopPrice;
    }
    else if (this.type == "LIMIT_MAKER") {
      param = param + "&quantity=" + this.quantity + "&price=" + this.price;
    }
    if (this.newClientOrderId!=""){
      param=param+"&newClientOrderId="+this.newClientOrderId
    }
    this.command = "/api/v3/order"
    this.param = param
    console.log(param)
    this.pos = 3
  }
  ////закрытие всех ордеров спота по выбранной валютной пары
  BinanceCloseAllOrderSpot() {
    this.command = "/api/v3/openOrders"
    this.param = "symbol=" + this.pair
    this.pos = 4
  }
  BinanceCloseOrderIdSpot(){
      this.command = "/api/v3/order"
      this.param = "symbol=" + this.pair+"&origClientOrderId="+this.origClientOrderId
      this.pos = 4
  }
  // Информация о пользователе спот
  BinanceAccountInfoSpot() {

    this.command = "/api/v3/account"
    this.param = ""
    this.pos = 2
  }
  BinanceFilterSpot() {

    this.command = "/api/v3/exchangeInfo"
    this.param = ""
    this.pos = 1
  }
  BinanceSymbolOrderBookSpot() {
    this.command = "/api/v3/ticker/bookTicker";
    this.param = "symbol=" + this.pair;
    this.pos = 1;
  }
  // все ордера
  BinanceOpenOrderSpot() {

    this.command = "/api/v3/openOrders"
    this.param = ""
    this.pos = 2
  }
  //  метод для получение количество от процента от баланса для спотового рынка
  BinanceQuantityProcSpot() {
    if (this.price == 0) {
      this.BinanceSymbolOrderBookSpot();
      let res = this.binanceConnect();

      if (this.side == 'BUY') { if (res[0] != undefined) { this.price = res[0]['askPrice']; } else if (res['askPrice'] != undefined) { this.price = res['askPrice']; } }
      else if (this.side == 'SELL') { if (res[0]!= undefined) { this.price = res[0]['bidPrice']; } else if (res['bidPrice'] != undefined) { this.price = res['bidPrice']; } }

    }


    this.BinanceAccountInfoSpot();
    let res = this.binanceConnect();
    
    this.quoteOrderQty = 0;
    if(this.side=='BUY'){
      let balance = 0;
      for (let i in res['balances']){
        if (res['balances'][i]['asset']==this.quoteAsset){
          balance=res['balances'][i]['free'];
          break;
        }
      }
      
      this.quantity=Number(balance)/(100/Number(this.quantityProc));
      this.quantity=this.quantity/Number(this.price);

    }
    else if(this.side=='SELL'){  


      let balance = 0;
      for (let i in res['balances']){
        if (res['balances'][i]['asset']==this.baseAsset){
          balance=res['balances'][i]['free'];
          break;
        }
      }
      this.quantity=Number(balance)/(100/Number(this.quantityProc));

      
    }
    this.binancefilterStart();
  }
  




//////////фьючерсы


  BinanceFundingGetInfoFutures() {
    this.command = this.typeExchange + "/v1/premiumIndex";
    this.param = "";
    this.pos = 1;
  }

  BinanceAccountInfoFuturesV2account() {
    this.command = this.typeExchange + "/v2/account";
    this.param = "";
    this.pos = 2;
  }

    BinanceOpenPositon() {
    this.command = this.typeExchange + "/v2/positionRisk";
    this.param = "";
    this.pos = 2;
  }
 
  ////Change Position Mode
  BinanceChangePositionModeFutures() {
      this.command = this.typeExchange + "/v1/positionSide/dual"
      this.param = "dualSidePosition=" + this.dualsideposition
      this.pos = 3
  }
  //  метод для получение количество от процента от баланса для фьючерсного рынка
  BinanceQuantityProcFutures() {
    // нужно определить указана ли цена если нет то берем цену ask для sell и bid для buy
    if (this.price == 0) {
      this.BinanceSymbolBookFutures();
      let res = this.binanceConnect();

      if (this.side == 'BUY') { if (res[0] != undefined) { this.price = res[0]['askPrice']; } else if (res['askPrice'] != undefined) { this.price = res['askPrice']; } }
      else if (this.side == 'SELL') { if (res[0] != undefined) { this.price = res[0]['bidPrice']; } else if (res['bidPrice'] != undefined) { this.price = res['bidPrice']; } }
    }

    // нужно выяснить какой фьючерс coin или usdt
    // тут будет обработка coin фьючерсов
    if (this.typeExchange == "/dapi") {
      let balance = 0

      this.BinanceAccountInfoFutures();
      let res = this.binanceConnect();

      for (let i in res) {
        if (res[i]['asset'] == this.baseAsset) {
          balance = Number(res[i]['balance'])
          break;
        }
      }

      this.quantity = (balance / (100 / Number(this.quantityProc)));// процент от баланса 
      this.quantity = this.quantity * this.price; // узнаем сколько это будет стоит 
      this.quantity = this.quantity / Number(this.contractSize); // делим на контракт 
      this.quantity = this.quantity * Number(this.leverageProc); // умножаем на плечо
      this.quantity = Number(this.quantity).toFixed(0);

    }
    // тут будет обработка usdt фьючерсов
    else if (this.typeExchange == "/fapi") {
      let balance =0
      this.BinanceAccountInfoFuturesV2();
      let res = this.binanceConnect();
      for (let va in res){
        if (res[va].asset==this.quoteAsset){
            balance = Number(res[1]['balance'])
            break;
        }
      }
      if (this.fundingSumma!=0){
        this.quantity = this.fundingSumma/this.price;
      }
      else{
        this.quantity = (balance / (100 / Number(this.quantityProc))) * Number(this.leverageProc);
        this.quantity = Number(this.quantity) / Number(this.price);
      }
      this.binancefilterStart();
    }
  }
  //////создание ордеров для фьючерсов
  BinanceCreatOrderFutures() {
    let param = "symbol=" + this.pair + "&side=" + this.side + "&type=" + this.type +  "&newOrderRespType=" + this.newOrderRespType
      param=param+"&quantity=" + this.quantity
    if (this.type == "LIMIT") {
      param = param + "&timeInForce=" + this.timeInForce + "&price=" + this.price
    }
    else if (this.type == "MARKET") {
      if (this.reduceOnly=="true"){
        param = param + "&reduceOnly=" + this.reduceOnly;
      }
    }
    else if ((this.type == "STOP") || (this.type == "TAKE_PROFIT")) {
      param = param + "&price=" + this.price + "&stopPrice=" + this.stopPrice
    }
    else if ((this.type == "STOP_MARKET") || (this.type == "TAKE_PROFIT_MARKET")) {
      if (this.closePosition == "true") {
        param = param + "&timeInForce=" + this.timeInForce + "&stopPrice=" + this.stopPrice + "&closePosition=" + this.closePosition;
      }
      else {
        param = param + "&timeInForce=" + this.timeInForce + "&stopPrice=" + this.stopPrice
      }
    }
    else if (this.type == "TRAILING_STOP_MARKET") {
      param = param + "&callbackRate=" + this.callbackRate;
      if (this.activationPrice != 0) {
        param = param + "&activationPrice=" + this.activationPrice;
        this.activationPrice = 0
      }
    }
    if (this.newClientOrderId!=""){
      param=param+"&newClientOrderId="+this.newClientOrderId
    }
    if (this.reduceOnly=="true"){
        param = param + "&reduceOnly=" + this.reduceOnly;
    }
    if (this.positionSide!="BOTH"){
        param = param + "&positionSide=" + this.positionSide;
    }
    this.command = this.typeExchange + "/v1/order"
    this.param = param
    this.pos = 3

  }
  ////закрытие всех ордеров фьючерсов по выбранной валютной пары
  BinanceCloseAllOrderFutures() {
      this.command = this.typeExchange + "/v1/allOpenOrders"
      this.param = "symbol=" + this.pair
      this.pos = 4
  }
   ////закрытие ордера по id 
  BinanceCloseOrderIdFutures() {
      this.command = this.typeExchange + "/v1/order"
      this.param = "symbol=" + this.pair+"&origClientOrderId="+this.origClientOrderId

      this.pos = 4

  }
  BinanceCloseOrderIdFutures1() {
      this.command = this.typeExchange + "/v1/order"
      this.param = "symbol=" + this.pair+"&orderId="+this.orderId

      this.pos = 4

  }
  /////изменение плеча во фьючерсах
  BinanceLeverageFutures() {
    this.param = "symbol=" + this.pair + "&leverage=" + Number(this.leverage);
    this.command = this.typeExchange + "/v1/leverage";
    this.pos = 3;
  }
  // Информация о пользователе фьючерсах
  BinanceAccountInfoFutures() {
    this.command = this.typeExchange + "/v1/balance";
    this.param = "";
    this.pos = 2;
  }
  // открытые ордера 
  BinanceOpenOrderFutures() {
    this.command = this.typeExchange + "/v1/openOrders";
    this.param = "";
    this.pos = 2;
  }
  // Информация о пользователе фьючерсах
  BinanceAccountInfoFuturesV2() {
    this.command = this.typeExchange + "/v2/balance";
    this.param = "";
    this.pos = 2;
  }
  // нужно чтобы узнать текущие настройки leverage
  BinancePositionRiskInfo() {
    this.command = this.typeExchange + "/v1/positionRisk";
    this.param = "";
    this.pos = 2;
  }
  BinanceSymbolBookFutures() {
    this.command = this.typeExchange + "/v1/ticker/bookTicker";
    this.param = "symbol=" + this.pair;
    this.pos = 2;
  }
  BinanceFilterFutures() {
    this.command = this.typeExchange + "/v1/exchangeInfo";
    this.param = "";
    this.pos = 1;
  }
// margin
  // все ордера
  BinanceOpenOrderMar(){
    this.command = "/sapi/v1/margin/openOrders"
    this.param = ""
    this.pos = 2
  }
  
  // borrow margin
  BinanceBorrowMargin() {
    this.command = "/sapi/v1/margin/loan"
    if (this.isIsolated=="TRUE"){
        this.param = "asset="+this.asset+"&amount="+this.amount+"&isIsolated="+this.isIsolated +"&symbol=" + this.pair
    }
    else{
        this.param = "asset="+this.asset+"&amount="+this.amount
    }
    this.pos = 3
  }
  // repay margin
  BinanceRepayMargin() {
    this.command = "/sapi/v1/margin/repay"
    if (this.isIsolated=="TRUE"){
        this.param = "asset="+this.asset+"&amount="+this.amount+"&isIsolated="+this.isIsolated +"&symbol=" + this.pair
    }
    else{
        this.param = "asset="+this.asset+"&amount="+this.amount
    }
    this.pos = 3
  } 
  BinanceCloseAllOrderMargin() {
    this.command = "/sapi/v1/margin/order"
    this.param = "symbol=" + this.pair+"&isIsolated="+this.isIsolated
    this.pos = 4
  }
  BinanceCloseOrderIdMargin(){
    this.command = "/sapi/v1/margin/order"
    this.param = "symbol=" + this.pair+"&origClientOrderId="+this.origClientOrderId+"&isIsolated="+this.isIsolated
    this.pos = 4
  }

  // info account margin
  BinanceAccountInfoMargin() {
    this.command = "/sapi/v1/margin/account"
    this.param = ""
    this.pos = 2
  }
  // info account isoleted margin
  BinanceAccountInfoMarginIso() {
    this.command = "/sapi/v1/margin/isolated/account"
    this.param = ""
    this.pos = 2
  }
  
  //  метод для получение количество от процента от баланса для спотового рынка
  BinanceQuantityProcMar() {
    if (this.price == 0) {
      if (this.side == 'BUY'){
        this.BinanceSymbolOrderBookSpot();
        let res = this.binanceConnect();
        if (res[0] != undefined) { this.price = res[0]['askPrice']; } else if (res['askPrice'] != undefined) { this.price = res['askPrice']; }
      }
    }
    if (this.isIsolated=="TRUE"){
      this.BinanceAccountInfoMarginIso();
      let res = this.binanceConnect();
      let balance = 0 
      for(let i = 0; i<res.assets.length;i++){
        if (res.assets[i].symbol==this.pair){
          if(this.side=="BUY"){
            balance=res.assets[i].quoteAsset.free
            this.quantity=Number(balance)/(100/Number(this.quantityProc));
            this.quantity=this.quantity/Number(this.price);

            break;
          }
          else if(this.side=="SELL"){
            balance=res.assets[i].baseAsset.free
            this.quantity=Number(balance)/(100/Number(this.quantityProc));
            break;
          }
        }

      }
    }
    else if (this.isIsolated=="FALSE"){
      this.BinanceAccountInfoMargin();
      let res = this.binanceConnect();
      let balance=0
      let sPair=""
      if (this.side=="BUY"){
        sPair=this.quoteAsset
      }
      else if (this.side=="SELL"){
        sPair=this.baseAsset
      }
      for(let i = 0; i<res.userAssets.length;i++){
        if (res.userAssets[i].asset==sPair){
          if (this.side=="BUY"){
            balance=res.userAssets[i].free
            this.quantity=Number(balance)/(100/Number(this.quantityProc));
            this.quantity=this.quantity/Number(this.price);
            break;
          }
          else if (this.side=="SELL"){
            balance=res.userAssets[i].free
            this.quantity=Number(balance)/(100/Number(this.quantityProc));
            break;
          }
        }

      }
    }

    
    this.quoteOrderQty = 0;
    this.binancefilterStart();
  }

  // создание ордера в margin 
  BinanceCreatOrderMargin() {
    let param = "symbol=" + this.pair + "&side=" + this.side + "&type=" + this.type + "&newOrderRespType=" + this.newOrderRespType+"&isIsolated="+this.isIsolated+"&sideEffectType="+this.sideeffecttype;
    if (this.type == "LIMIT") {
      param = param + "&timeInForce=" + this.timeInForce + "&quantity=" + this.quantity + "&price=" + this.price;
    }
    else if ((this.type == "MARKET") && (this.quoteOrderQty == 0)) {
      param = param + "&quantity=" + this.quantity;
    }
    else if ((this.type == "MARKET") && (this.quoteOrderQty != 0)) {
      param = param + "&quoteOrderQty=" + this.quoteOrderQty;
    }
    else if ((this.type == "STOP_LOSS") || (this.type == "TAKE_PROFIT")) {
      param = param + "&quantity=" + this.quantity + "&stopPrice=" + this.stopPrice;
    }
    else if ((this.type == "STOP_LOSS_LIMIT") || (this.type == "TAKE_PROFIT_LIMIT")) {
      param = param + "&timeInForce=" + this.timeInForce + "&quantity=" + this.quantity + "&price=" + this.price + "&stopPrice=" + this.stopPrice;
    }
    else if (this.type == "LIMIT_MAKER") {
      param = param + "&quantity=" + this.quantity + "&price=" + this.price;
    }
    if (this.newClientOrderId!=""){
      param=param+"&newClientOrderId="+this.newClientOrderId
    }
    this.command = "/sapi/v1/margin/order"
    this.param = param
    this.pos = 3
  }
// логика работы 
  //// фильтрация цены и количество согласно фильтрам бинанс
  binancefilterStart() {
    if (this.priceprocdown!=undefined){
      this.price=this.price*(1-(this.priceprocdown/100))
    }
    else if (this.priceprocup!=undefined){
      this.price=this.price*(1+(this.priceprocup/100))
    }
    else if (this.priceprocauto!=undefined){
      if (this.side=="BUY"){
        this.price=this.price*(1-(this.priceprocauto/100))

      }
      else if (this.side=="SELL"){
        this.price=this.price*(1+(this.priceprocauto/100))

      }
    }

    if (this.filterStatus) {
      this.tickSize = this.filterDict[this.pair]['tickSize'];
      this.stepSize = this.filterDict[this.pair]['stepSize'];
      this.baseAsset = this.filterDict[this.pair]['baseAsset'];
      this.quoteAsset = this.filterDict[this.pair]['quoteAsset'];
      // начало фильтрации цена по правилам биржы
      if (this.typeExchange == '/dapi') {
        this.contractSize = this.filterDict[this.pair]['contractSize'];
      }
      this.tickSize = Number(this.tickSize).toFixed(8);
      let dot = (this.tickSize).indexOf('.');
      let position = (this.tickSize).indexOf('1');

      if (dot > position) {

        this.tickSize = Number(this.tickSize).toFixed(8);
        this.price = this.price - (this.price % this.tickSize);
        this.stopPrice = this.stopPrice - (this.stopPrice % this.tickSize);
        this.stopLimitPrice = this.stopLimitPrice - (this.stopLimitPrice % this.tickSize);


      }
      else if (dot < position) {

            this.price = ((this.price).toString()).substr(0,((this.price).toString()).indexOf('.')+position) 
            this.stopPrice = ((this.stopPrice).toString()).substr(0,((this.stopPrice).toString()).indexOf('.')+position) 
            this.stopLimitPrice = ((this.stopLimitPrice).toString()).substr(0,((this.stopLimitPrice).toString()).indexOf('.')+position) 

      }
      // конец фильтрации цена по правилам биржы
      // начало фильтрации количество по правилам биржы

      this.stepSize = Number(this.stepSize).toFixed(8);
      this.stepSize = (this.stepSize).toString();

      dot = (this.stepSize).indexOf('.');

      position = (this.stepSize).indexOf('1');

      
      if (dot > position) {

        this.stepSize = Number(this.stepSize).toFixed(8);
        this.quantity = this.quantity - (this.quantity % this.stepSize);

      }
      else if (dot < position) {
        this.quantity = ((this.quantity).toString()).substr(0,((this.quantity).toString()).indexOf('.')+position)

      }

      // конец фильтрации количество по правилам биржы

    }

  }
// обычный режим
  binanceStart() {
    this.binancefilterStart();
    if (this.marketType == "spot") {
      if (this.allClose != "false") {
        if (this.allClose=="true"){
          this.BinanceCloseAllOrderSpot();
          this.updateParametr();
          return this.binanceConnect();
        }
        else if (this.allClose=="order"){
          this.BinanceCloseOrderIdSpot();
          this.updateParametr();
          return this.binanceConnect();
        }

      }
      else {
        if (this.oco=="true"){
          this.BinanceCreatOrderOcoSpot();
          this.updateParametr();
          return this.binanceConnect();
        }
        else{
          if(this.quantityProc!=0){
            this.BinanceQuantityProcSpot();
          }
          this.BinanceCreatOrderSpot();
          this.updateParametr();
          return this.binanceConnect();
        }


      }
    }
    else if (this.marketType == "futures") {
      if (this.leverage != 0) {
        // плечо
        this.BinanceLeverageFutures();
        let r = this.binanceConnect();
      }

      if (this.allClose != "false") {
        if (this.allClose=="true"){
          /////// запуск команды закрытие ордеров фьючерсный рынок
          this.BinanceCloseAllOrderFutures();
          this.updateParametr();
          return this.binanceConnect();
        }
        else if (this.allClose=="order"){}
          this.BinanceCloseOrderIdFutures();
          this.updateParametr();
          return this.binanceConnect();
      }
      else {
        if ((this.dualsideposition=="true") || (this.dualsideposition=="false")){
          this.BinanceChangePositionModeFutures()
          this.updateParametr();
          return this.binanceConnect();
        }
        else if (this.dualsideposition=="no"){
          if (this.quantityProc != 0) {
            this.BinanceQuantityProcFutures();
          }
          // запуск создание ордера
          this.BinanceCreatOrderFutures();
          this.updateParametr();
          return this.binanceConnect();
        }
        else{
          return "вы ввели не правильное значение dualsideposition"
        }
      }
    }
    else if (this.marketType == "margin") {
      if (this.allClose != "false") {
        if (this.allClose=="true"){
          this.BinanceCloseAllOrderMargin();
          this.updateParametr();
          return this.binanceConnect();
        }
        else if (this.allClose=="order"){
          this.BinanceCloseOrderIdMargin();
          this.updateParametr();
          return this.binanceConnect();
        }

      }
      else {
        if (this.zaim=="borrow"){
          this.BinanceBorrowMargin();
          this.updateParametr();
          return this.binanceConnect();

        }
        else if (this.zaim=="repay"){
          this.BinanceRepayMargin();
          this.updateParametr();
          return this.binanceConnect();
        }
        else{
          if(this.quantityProc!=0){
            this.BinanceQuantityProcMar();
          }
          this.BinanceCreatOrderMargin();
          this.updateParametr();
          return this.binanceConnect();
          }
      }
    }
    
    
  }
 // turbo режим
  binanceStartTurbo() {
    if (this.marketType == "spot") {
      if (this.allClose != "false") {
        if (this.allClose=="true"){
          this.BinanceCloseAllOrderSpot();
          this.updateParametr();
          return this.binanceConnect();
        }
        else if (this.allClose=="order"){
          this.BinanceCloseOrderIdSpot();
          this.updateParametr();
          return this.binanceConnect();
        }

      }
      else {
        if (this.oco=="true"){
          this.BinanceCreatOrderOcoSpot();
          this.updateParametr();
          settingSheet.getRange("C2").setValue("ssss")
          return this.binanceConnect();
        }
        else{
          this.BinanceCreatOrderSpot();
          this.updateParametr();
          return this.binanceConnect();
        }
      }
    }
    else if (this.marketType == "futures") {
      if (this.allClose != "false") {
        if (this.allClose=="true"){
          /////// запуск команды закрытие ордеров фьючерсный рынок
          this.BinanceCloseAllOrderFutures();
          this.updateParametr();
          return this.binanceConnect();
        }
        else if (this.allClose=="order"){}
          this.BinanceCloseOrderIdFutures();
          this.updateParametr();
          return this.binanceConnect();
      }
      else {
        if ((this.dualsideposition=="true") || (this.dualsideposition=="false")){
          this.BinanceChangePositionModeFutures()
          this.updateParametr();
          return this.binanceConnect();
        }
        else if (this.dualsideposition=="no"){
          // запуск создание ордера
          this.BinanceCreatOrderFutures();
          this.updateParametr();
          return this.binanceConnect();
        }
        else{
          return "вы ввели не правильное значение dualsideposition"
        }
      }
    }
    else if (this.marketType == "margin") {
      if (this.allClose != "false") {
        if (this.allClose=="true"){
          this.BinanceCloseAllOrderMargin();
          this.updateParametr();
          return this.binanceConnect();
        }
        else if (this.allClose=="order"){
          this.BinanceCloseOrderIdMargin();
          this.updateParametr();
          return this.binanceConnect();
        }

      }
      else {
        this.BinanceCreatOrderMargin();
        this.updateParametr();
        return this.binanceConnect();
      }
    }
    
  }
}

// класс для загрузки и обработки фильтров для бирж
class filterBinanceClass {
  constructor() {
    this.table = '';
    this.countDictIn = 0;
    this.countDictOut = 0;
    this.dict = new Map();
    this.json = {};
    this.text = {};
    this.pair = "BTCUSDT";
    this.razdelitel = 300;
    this.loadFilspot = {}
    this.loadFilFutures = {}
    this.symbol = 'A'
  }
  // функция загрузки фильтров из биржы и сохранение для фьючерсов 
  jsonFromDictFutures() {
    let r = this.json;
    this.dict = new Map();
    for (let i in r['symbols']) {
      this.dict[r['symbols'][i]['symbol']] = {
        'baseAsset': r['symbols'][i].baseAsset,
        'quoteAsset': r['symbols'][i].quoteAsset,
        'tickSize': r['symbols'][i]['filters'][0].tickSize,
        'stepSize': r['symbols'][i]['filters'][1].stepSize,
        'contractSize': r['symbols'][i].contractSize
      }
    }
    this.dict = JSON.stringify(this.dict)
    this.table.setValue(this.dict)
  }
  stringToDictFutures() {
    this.text = this.table.getValue();
    this.dict = JSON.parse(this.text)
    this.dict = this.dict[this.pair]
  }
  // функция загрузки фильтров из биржы и сохранение для спот 
  jsonFromDictSpot() {
    let kk = {};
    let r = this.json;
    this.countDictIn = 0
    kk[this.countDictIn] = {};

    for (let i in r['symbols']) {

      if ((i % this.razdelitel == 0) && (i > 0)) {
        this.countDictIn++;

        kk[this.countDictIn] = {};
      }
      let pair1 = r['symbols'][i]['symbol'];

      kk[this.countDictIn][r['symbols'][i]['symbol']] = {
        'baseAsset': r['symbols'][i].baseAsset,
        'quoteAsset': r['symbols'][i].quoteAsset,
        'tickSize': r['symbols'][i]['filters'][0].tickSize,
        'stepSize': r['symbols'][i]['filters'][2].stepSize
      }


    }
    let range = 2;
    for (let i = 0; i <= this.countDictIn; i++) {
      let res = JSON.stringify(kk[i])
      res = res.toString()
      res = res.slice(1, res.length - 1)
      filterSheet.getRange("A" + (range + i)).setValue(res);
    }
    filterSheet.getRange("G1").setValue(this.countDictIn);

  }
  // функция загрузки фильтров для спот

  loadFilterSpot() {
    let count = filterSheet.getRange("G1").getValue();
    count += 2;

    let textToDict = '{';
    for (let i = 2; i <= count; i++) {

      textToDict += filterSheet.getRange("A" + i).getValue();
      if (i < count) {
        textToDict += ',';
      }
    }
    textToDict += '}'

    this.loadFilspot = JSON.parse(textToDict);
  }
  // функция загрузки фильтров для фьючерсов
  loadFilterFutures() {
    this.loadFilFutures = JSON.parse(filterSheet.getRange(this.symbol + "2").getValue());
  }
}

// Dmytro @ 30|06|2021
class marketResponseClass{
    constructor(){
    this.responseCode=0;
    this.responseContentText="";
    this.indexban=0;
    };
  }

//// создание переменной класса фильтр
var filterComman = new filterBinanceClass();


////binance
var binance = new binanceClass();
binance.secret = sheet.getRange("B3").getValue();
binance.key = sheet.getRange("B2").getValue();
binance.baseUrl = "https://api.binance.com";
binance.marketType = "spot"
filterComman.loadFilterSpot();
binance.filterDict = filterComman.loadFilspot;

////margin
var binanceMar = new binanceClass();
binanceMar.secret = sheet.getRange("B3").getValue();
binanceMar.key = sheet.getRange("B2").getValue();
binanceMar.baseUrl = "https://api.binance.com";
binanceMar.marketType = "margin"
filterComman.loadFilterSpot();
binanceMar.filterDict = filterComman.loadFilspot;

///// binance futures REAL usdt
var binanceFru = new binanceClass();
binanceFru.key = sheet.getRange("B2").getValue();
binanceFru.secret = sheet.getRange("B3").getValue();
binanceFru.baseUrl = "https://fapi.binance.com";
binanceFru.typeExchange = "/fapi";
binanceFru.marketType = "futures"
filterComman.symbol = "D"
filterComman.loadFilterFutures();
binanceFru.filterDict = filterComman.loadFilFutures;
///// binance futures real coin
var binanceFro = new binanceClass();
binanceFro.key = sheet.getRange("B2").getValue();
binanceFro.secret = sheet.getRange("B3").getValue();
binanceFro.baseUrl = "https://dapi.binance.com";
binanceFro.typeExchange = "/dapi";
binanceFro.marketType = "futures"
filterComman.symbol = "E"
filterComman.loadFilterFutures();
binanceFro.filterDict = filterComman.loadFilFutures;
///// binance futures testnet usdt
var binanceFtu = new binanceClass();
binanceFtu.key = sheet.getRange("C2").getValue();
binanceFtu.secret = sheet.getRange("C3").getValue();
binanceFtu.baseUrl = "https://testnet.binancefuture.com";
binanceFtu.typeExchange = "/fapi";
binanceFtu.marketType = "futures"
filterComman.symbol = "C"
filterComman.loadFilterFutures();
binanceFtu.filterDict = filterComman.loadFilFutures;
///// binance futures testnet coin
var binanceFto = new binanceClass();
binanceFto.key = sheet.getRange("C2").getValue();
binanceFto.secret = sheet.getRange("C3").getValue();
binanceFto.baseUrl = "https://testnet.binancefuture.com";
binanceFto.typeExchange = "/dapi";
binanceFto.marketType = "futures"
filterComman.symbol = "B"
filterComman.loadFilterFutures();
binanceFto.filterDict = filterComman.loadFilFutures;
/////dict market 
var marketDict = {
  'binance': binance,
  'binanceftu': binanceFtu,
  'binancefto': binanceFto,
  'binancefru': binanceFru,
  'binancefro': binanceFro,
  'binancemar':binanceMar
}
