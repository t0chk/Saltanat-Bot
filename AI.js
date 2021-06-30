var aiData = ss.getSheetByName("AI");
let global = globalThis; 

// // data settings
// const FEATURE_COLUMN_FROM = 1; // column for input
// const FEATURE_COLUMN_TO = 12; // column for input
// const TARGET_COLUMN = 13; // column for target
// const rowSplit = 336; // <0; rowSplit> = train data, <rowSplit; lastRow> test data

// // deep-learning model settings
// const LEARNING_RATE = 0.01;
// const BATCH_SIZE = 40; // 
// const EPOCHS = 200; // number of iterations 

  
// /*
//   Load Boston dataset into Spreadsheet
// */
// function loadBostonData() {
//   const train = {
//     features: 'train-data.csv',
//     target: 'train-target.csv'
//   }
//   const test = {
//     features: 'test-data.csv',
//     target: 'test-target.csv'
//   }

//   function loadCSV(type) {
//     let csv;
//     const BASE_URL = 'https://storage.googleapis.com/tfjs-examples/multivariate-linear-regression/data/';
//     csv = UrlFetchApp.fetch(BASE_URL + type.features).getContentText();
//     let features = Utilities.parseCsv(csv);
//     csv = UrlFetchApp.fetch(BASE_URL + type.target).getContentText();
//     let target = Utilities.parseCsv(csv)
//     let data = features.map((row, index) => {
//       row.push(target[index][0]);
//       return row
//     });
//     return data;
//   }
//   let sheet = SpreadsheetApp.getActiveSheet();
//   let trainRows = loadCSV(train);
//   let testRows = loadCSV(test);
//   let data = trainRows.concat(testRows);
//   sheet.getRange(sheet.getLastRow() + 1, 1, data.length, data[0].length).setValues(data);
// }


// function getData_(sheet) {
//   let data = { trainFeatures: [], trainTarget: [], testFeatures: [], testTarget: [], prediction: [] };
//   let range = sheet.getActiveRange();
//   //let labelColumn = range.getColumn();
//   let fromRow = range.getRow();
//   let toRow = fromRow + range.getNumRows() - 1;
//   Logger.log("Prediction rows: %s - %s", fromRow, toRow);
//   let values = sheet.getDataRange().getValues();
//   values.forEach((row, _index) => {
//     let rowIndex = _index + 1;
//     if (rowIndex === 1) return
//     let features = row.slice(FEATURE_COLUMN_FROM - 1, FEATURE_COLUMN_TO);
//     let label = row[TARGET_COLUMN - 1];
//     if (fromRow <= rowIndex && rowIndex <= toRow) {
//       data.prediction.push(features);
//     } else {
//       if (rowSplit <= rowIndex) {
//         data.testFeatures.push(features)
//         data.testTarget.push([label]);
//       } else {
//         data.trainFeatures.push(features);
//         data.trainTarget.push([label]);
//       }
//     }
//   });
//   Logger.log("Train: %s. Test: %s. Prediction: %s", data.trainFeatures.length, data.testFeatures.length, data.prediction.length);
//   return data;
// }


// async function main() {
//   let sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet()
//   let data = getData_(sheet);

//   let trainFeatures = createTensor_(data.trainFeatures);
//   let trainTarget = createTensor_(data.trainTarget);
//   let testFeatures = createTensor_(data.testFeatures);
//   let testTarget = createTensor_(data.testTarget);

//   //computeBaseline_(trainTarget, testTarget);

//   let { dataMean, dataStd } = determineMeanAndStddev_(trainFeatures); // Normalize mean standard 
//   trainFeatures = normalizeTensor_(trainFeatures, dataMean, dataStd);
//   testFeatures = normalizeTensor_(testFeatures, dataMean, dataStd);

//   let ml = await createModel_(trainFeatures, trainTarget);

//   const evalResult = ml.model.evaluate(testFeatures, testTarget, { batchSize: BATCH_SIZE })
//   const testLoss = evalResult[0].dataSync()[0];
//   console.log(`Train-set loss: ${ml.trainLoss.toFixed(4)}\n\tValidation-set loss: ${ml.valLoss.toFixed(4)}\n\tTest-set loss: ${testLoss.toFixed(4)}`);

//   let predictionFeatures = createTensor_(data.prediction);
//   predictionFeatures = normalizeTensor_(predictionFeatures, dataMean, dataStd);
//   let result = ml.model.predict(predictionFeatures).dataSync();
//   Logger.log("Prediction: %s", result);
//   let values= Object.keys(result).map( index => [result[index]]);
//   let range = sheet.getActiveRange();
//   sheet.getRange( range.getRow(),range.getLastColumn(), values.length, 1 ).setNotes(values)
// }


// function computeBaseline_(trainTarget, testTarget) {
//   const avgPrice = tf.mean(trainTarget);
//   console.log(`Average (trainTarget) value: ${avgPrice.dataSync()[0]}`);
//   const baseline = tf.mean(tf.pow(tf.sub(testTarget, avgPrice), 2));
//   console.log(`Baseline loss: ${baseline.dataSync()[0]}`);
// };


// /**
//  * Calculates the mean and standard deviation of each column of an array.
//  *
//  * @param {Tensor2d} data Dataset from which to calculate the mean and
//  *                        std of each column independently.
//  *
//  * @returns {Object} Contains the mean and std of each vector
//  *                   column as 1d tensors.
//  */
// function determineMeanAndStddev_(data) {
//   const dataMean = data.mean(0);
//   const diffFromMean = data.sub(dataMean);
//   const squaredDiffFromMean = diffFromMean.square();
//   const variance = squaredDiffFromMean.mean(0);
//   const dataStd = variance.sqrt();
//   return { dataMean, dataStd };
// }

// /**
//  * Given expected mean and standard deviation, normalizes a dataset by
//  * subtracting the mean and dividing by the standard deviation.
//  *
//  * @param {Tensor2d} data: Data to normalize.
//  *    Shape: [numSamples, numFeatures].
//  * @param {Tensor1d} mean: Expected mean of the data. Shape [numFeatures].
//  * @param {Tensor1d} std: Expected std of the data. Shape [numFeatures]
//  *
//  * @returns {Tensor2d}: Tensor the same shape as data, but each column
//  * normalized to have zero mean and unit standard deviation.
//  */
// function normalizeTensor_(data, dataMean, dataStd) {
//   return data.sub(dataMean).div(dataStd);
// }

// /*
//   Convert JavaScript Array into Tensor
// */
// function createTensor_(array) {
//   //Logger.log("shape[%s,%s]", array.length, array[0].length);
//   const tensor = tf.tensor2d(array, [array.length, array[0].length]);
//   return tensor;
// }


// /*
//   Create neural networks
// */
// async function createModel_(features, target) {
//   const model = tf.sequential();
//   model.add(tf.layers.dense({units: 50, activation: "sigmoid", kernelInitializer: 'leCunNormal', inputShape: [features.shape[1]] }));
//   model.add(tf.layers.dense({units: 50, activation: "sigmoid", kernelInitializer: 'leCunNormal',}));
//   model.add(tf.layers.dense({units: 1}));
//   model.compile({
//     optimizer: tf.train.sgd(LEARNING_RATE),
//     loss: tf.losses.meanSquaredError,
//     metrics: ['mae']
//   });
//   let trainLoss;
//   let valLoss;
//   var history = await model.fit(features, target, {
//     batchSize: BATCH_SIZE,
//     epochs: EPOCHS,
//     validationSplit: 0.2,
//     yieldEvery: "never",
//     callbacks: {
//       onEpochEnd: async (epoch, logs) => {
//         trainLoss = logs.loss;
//         valLoss = logs.val_loss;
//         console.log(`Epoch ${epoch + 1} / ${EPOCHS}. Train loss: ${trainLoss}`);
//       }
//     }
//   });
//   return { model, trainLoss, valLoss };
// }



var timefrimeStep={
'1m': 29940000,
'3m':89820000,
'5m':149700000,
'15m':449100000,
'30m':898200000,
'1h':1796400000,
'2h':3592800000,
'4h':7185600000,
'6h':10778400000,
'8h':14371200000,
'12h':21556800000,
'1d':43113600000,
'3d':129340800000,
'1w':301795200000,
'1M':1207180800000
}

function spot(startTime,pair,timefrime) {
  binance.startTime=startTime
  // binance.endTime=endTime
  binance.pair=pair
  binance.timefrime=timefrime
  binance.klinesSpot()
  return binance.binanceConnect()
}

function asd(){
  
  let startTime=aiData.getRange("A"+aiData.getLastRow()).getValue()
  // let endTime=(aiData.getRange("D1").getValue()).getTime()
  let pair=aiData.getRange("A1").getValue()
  let timefrime=aiData.getRange("B1").getValue()
  // let stepTime=timefrimeStep[timefrime]
  // let endTime1=Number(startTime)+Number(stepTime)
  let data=spot(Number(startTime)+1,pair,timefrime) 
  for (let val in data){
      let coun=aiData.getLastRow()+1
      aiData.getRange("A"+coun).setValue(data[val][0])
      aiData.getRange("B"+coun).setValue(data[val][1])
      aiData.getRange("C"+coun).setValue(data[val][2])
      aiData.getRange("D"+coun).setValue(data[val][3])
      aiData.getRange("E"+coun).setValue(data[val][4])
      aiData.getRange("F"+coun).setValue(data[val][5])
  }
}
