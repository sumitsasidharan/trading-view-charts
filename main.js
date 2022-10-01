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
   ADDING A SECOND SERIES
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

// Adding a window resize event handler to resize the chart when
// the window size changes.
// Note: for more advanced examples (when the chart doesn't fill the entire window)
// you may need to use ResizeObserver -> https://developer.mozilla.org/en-US/docs/Web/API/ResizeObserver
window.addEventListener('resize', () => {
   chart.resize(window.innerWidth, window.innerHeight);
});
