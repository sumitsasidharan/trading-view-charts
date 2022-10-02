// const {generateCandlestickData} = require('./dataFunc')
import { generateCandlestickData } from './dataFunc.js';
import { apiData } from './apiData.js';
import { apiData2 } from './apiData2.js';
import { dateFormatter } from './utils.js';

const FILTERED_DATA = apiData2.data.map((item) => {
   // console.log(item.lastUpdateTime);
   return {
      open: parseFloat(item.open),
      close: parseFloat(item.previousClose),
      high: parseFloat(item.dayHigh),
      low: parseFloat(item.dayLow),
      time: dateFormatter(item.lastUpdateTime),
      // time: new Date(item.lastUpdateTime),
   };
});
console.log(FILTERED_DATA);

const chartContainerLayoutOptions = {
   layout: {
      background: { color: '#222' },
      textColor: '#DDD',
   },
   grid: {
      vertLines: { color: '#444' },
      horzLines: { color: '#444' },
   },
};

// Create the Lightweight Chart within the container element
const container = document.getElementById('container');
const chart = LightweightCharts.createChart(
   container,
   chartContainerLayoutOptions
);

// Setting the border color for the vertical axis
chart.priceScale().applyOptions({
   borderColor: '#71649C',
});

// Setting the border color for the horizontal axis
chart.timeScale().applyOptions({
   borderColor: '#71649C',
});

// Generate sample data to use within a candlestick series
// const candleStickData = generateCandlestickData();

// Generate sample data to use within a candlestick series
const candleStickData = generateCandlestickData().map((datapoint) => {
   // map function is changing the color for the individual
   // candlestick points that close above 205
   if (datapoint.close < 205) {
      return datapoint;
   }
   // we are adding 'color' and 'wickColor' properties to the datapoint.
   // Using spread syntax: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Spread_syntax#spread_in_object_literals
   return { ...datapoint, color: 'orange', wickColor: 'orange' };
});

// Create the Main Series (Candlesticks)
const mainSeries = chart.addCandlestickSeries();
// Set the data for the Main Series
mainSeries.setData(candleStickData);

// Changing the Candlestick colors
mainSeries.applyOptions({
   wickUpColor: 'rgb(54, 116, 217)',
   upColor: 'rgb(54, 116, 217)',
   wickDownColor: 'rgb(225, 50, 85)',
   downColor: 'rgb(225, 50, 85)',
   borderVisible: false,
});




/****************************  
      PRICE FORMAT
*****************************/
// Get the current users primary locale
const currentLocale = window.navigator.languages[0];
// Create a number format using Intl.NumberFormat
const myPriceFormatter = Intl.NumberFormat(currentLocale, {
   style: 'currency',
   currency: 'EUR', // Currency for data points
}).format;

// Apply the custom priceFormatter to the chart
chart.applyOptions({
   localization: {
      priceFormatter: myPriceFormatter,
   },
});

/****************************  
SETTINGS FOR THE PRICE SCALE
*****************************/
// Adjust the options for the priceScale of the mainSeries
mainSeries.priceScale().applyOptions({
   autoScale: false, // disables auto scaling based on visible content
   scaleMargins: {
      top: 0.1,
      bottom: 0.2,
   },
});

/****************************  
   TIME SCALE
*****************************/
// Setting the border color for the horizontal axis, and Adjusting the starting bar width (essentially the horizontal zoom)
chart.timeScale().applyOptions({
   borderColor: '#71649C',
   barSpacing: 10,
});

// chart.timeScale().fitContent();

/****************************  
   CUSTOMIZING THE CROSSHAIR
*****************************/
// Customizing the Crosshair
chart.applyOptions({
   crosshair: {
      // Change mode from default 'magnet' to 'normal'.
      // Allows the crosshair to move freely without snapping to datapoints
      mode: LightweightCharts.CrosshairMode.Normal,

      // Vertical crosshair line (showing Date in Label)
      vertLine: {
         width: 8,
         color: '#C3BCDB44',
         style: LightweightCharts.LineStyle.Solid,
         labelBackgroundColor: '#9B7DFF',
      },

      // Horizontal crosshair line (showing Price in Label)
      horzLine: {
         color: '#9B7DFF',
         labelBackgroundColor: '#9B7DFF',
      },
   },
});

/****************************  
   ADDING A SECOND SERIES (LINE SERIES)
*****************************/
// Generate sample data to use within a candlestick series
// const candleStickData = generateCandlestickData();

// Convert the candlestick data for use with a line series
const lineData = candleStickData.map((datapoint) => ({
   time: datapoint.time,
   value: (datapoint.close + datapoint.open) / 2,
}));

// Add an area series to the chart,
// Adding this before we add the candlestick chart
// so that it will appear beneath the candlesticks
const areaSeries = chart.addAreaSeries({
   lastValueVisible: false, // hide the last value marker for this series
   crosshairMarkerVisible: false, // hide the crosshair marker for this series
   lineColor: 'transparent', // hide the line
   topColor: 'rgba(56, 33, 110,0.6)',
   bottomColor: 'rgba(56, 33, 110, 0.1)',
});
// Set the data for the Area Series
areaSeries.setData(lineData);

// Create the Main Series (Candlesticks)
// const mainSeries = chart.addCandlestickSeries();

/****************************  
   CHANGING THE FONT
*****************************/
// Changing the font
chart.applyOptions({
   layout: {
      fontFamily: "'Roboto', sans-serif",
   },
});




/****************************  
   BAR SERIES CHART
*****************************/
// Create the Lightweight Chart within the container element
// const barContainer = document.getElementById('container');
// const barChart = LightweightCharts.createChart(
//    barContainer,
//    chartContainerLayoutOptions
// );

// const barSeries = barChart.addBarSeries();
// barSeries.setData(candleStickData);


const chartOptions = {
   layout: {
      textColor: 'black',
      background: { type: 'solid', color: 'white' },
   },
};
const barChart = LightweightCharts.createChart(
   document.getElementById('bar'),
   chartOptions
);
const barSeries = barChart.addBarSeries({
   upColor: '#26a69a',
   downColor: '#ef5350',
});

const data = [
   { open: 10, high: 10.63, low: 9.49, close: 9.55, time: 1642427876 },
   { open: 9.55, high: 10.3, low: 9.42, close: 9.94, time: 1642514276 },
   { open: 9.94, high: 10.17, low: 9.92, close: 9.78, time: 1642600676 },
   { open: 9.78, high: 10.59, low: 9.18, close: 9.51, time: 1642687076 },
   { open: 9.51, high: 10.46, low: 9.1, close: 10.17, time: 1642773476 },
   { open: 10.17, high: 10.96, low: 10.16, close: 10.47, time: 1642859876 },
   { open: 10.47, high: 11.39, low: 10.4, close: 10.81, time: 1642946276 },
   { open: 10.81, high: 11.6, low: 10.3, close: 10.75, time: 1643032676 },
   { open: 10.75, high: 11.6, low: 10.49, close: 10.93, time: 1643119076 },
   { open: 10.93, high: 11.53, low: 10.76, close: 10.96, time: 1643205476 },
];

barSeries.setData(data);

barChart.timeScale().fitContent();


/****************************  
   BASELINE SERIES CHART
*****************************/
// const chartOptions = {
//    layout: {
//       textColor: 'black',
//       background: { type: 'solid', color: 'white' },
//    },
// };
const baselineChart = LightweightCharts.createChart(
   document.getElementById('baseline'),
   chartOptions
);
const baselineSeries = baselineChart.addBaselineSeries({
   baseValue: { type: 'price', price: 25 },
   topLineColor: 'rgba( 38, 166, 154, 1)',
   topFillColor1: 'rgba( 38, 166, 154, 0.28)',
   topFillColor2: 'rgba( 38, 166, 154, 0.05)',
   bottomLineColor: 'rgba( 239, 83, 80, 1)',
   bottomFillColor1: 'rgba( 239, 83, 80, 0.05)',
   bottomFillColor2: 'rgba( 239, 83, 80, 0.28)',
});

const baselineData = [
   { value: 1, time: 1642425322 },
   { value: 8, time: 1642511722 },
   { value: 10, time: 1642598122 },
   { value: 20, time: 1642684522 },
   { value: 3, time: 1642770922 },
   { value: 43, time: 1642857322 },
   { value: 41, time: 1642943722 },
   { value: 43, time: 1643030122 },
   { value: 56, time: 1643116522 },
   { value: 46, time: 1643202922 },
];

baselineSeries.setData(baselineData);

baselineChart.timeScale().fitContent();


/****************************  
   HISTOGRAM SERIES CHART
*****************************/
// const chartOptions = {
//    layout: {
//       textColor: 'black',
//       background: { type: 'solid', color: 'white' },
//    },
// };
const histogramChart = LightweightCharts.createChart(
   document.getElementById('histogram'),
   chartOptions
);
const histogramSeries = histogramChart.addHistogramSeries({ color: '#26a69a' });

const histogramData = [
   { value: 1, time: 1642425322 },
   { value: 8, time: 1642511722 },
   { value: 10, time: 1642598122 },
   { value: 20, time: 1642684522 },
   { value: 3, time: 1642770922, color: 'red' },
   { value: 43, time: 1642857322 },
   { value: 41, time: 1642943722, color: 'red' },
   { value: 43, time: 1643030122 },
   { value: 56, time: 1643116522 },
   { value: 46, time: 1643202922, color: 'red' },
];

histogramSeries.setData(histogramData);

chart.timeScale().fitContent();











// Adding a window resize event handler to resize the chart when
// the window size changes.
// Note: for more advanced examples (when the chart doesn't fill the entire window)
// you may need to use ResizeObserver -> https://developer.mozilla.org/en-US/docs/Web/API/ResizeObserver
window.addEventListener('resize', () => {
   chart.resize(window.innerWidth, window.innerHeight);
});
