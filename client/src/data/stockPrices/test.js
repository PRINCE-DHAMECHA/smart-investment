// const fs = require("fs");

// const data1 = require(`./1`);
// const data2 = require(`./2`);
// const data3 = require(`./3`);
// const data4 = require(`./4`);
// const data5 = require(`./5`);
// const data6 = require(`./6`);
// const data7 = require(`./7`);
// const data8 = require(`./8`);
// const data9 = require(`./9`);
// const data10 = require(`./10`);
// const dataFinal = [
//   data1["price"],
//   data2["price"],
//   data3["price"],
//   data4["price"],
//   data5["price"],
//   data6["price"],
//   data7["price"],
//   data8["price"],
//   data9["price"],
//   data10["price"],
// ];
// const maxis = [
//   data1["mx"],
//   data2["mx"],
//   data3["mx"],
//   data4["mx"],
//   data5["mx"],
//   data6["mx"],
//   data7["mx"],
//   data8["mx"],
//   data9["mx"],
//   data10["mx"],
// ];

// let arr = [];
// for (let j = 0; j < 28800; j++) {
//   let maxInd = -1;
//   let maxValue = -1;
//   let currentPrice = -1;
//   let possibleGain = -1;
//   for (let i = 0; i < 10; i++) {
//     let localMax =
//       (Number(maxis[i]) - Number(dataFinal[i][j])) / dataFinal[i][j];
//     if (localMax > maxValue) {
//       possibleGain = localMax;
//       maxInd = i;
//       maxPrice = maxis[i];
//       currentPrice = dataFinal[i][j];
//       maxValue = localMax;
//     }
//   }
//   let data = {
//     stockIndex: maxInd,
//     maxPrice: maxis[maxInd],
//     currentPrice: currentPrice,
//     possibleGain: possibleGain,
//   };
//   arr.push(data);
// }
// const jsonString = JSON.stringify(arr);
// fs.writeFile(`./preferenc.json`, jsonString, (err) => {
//   if (err) {
//     console.log("Error writing file", err);
//   } else {
//     console.log("Successfully wrote file");
//   }
// });

// console.log(dataFinal, maxis);
