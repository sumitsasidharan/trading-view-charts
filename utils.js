const months = {
   JAN: '01',
   FEB: '02',
   MAR: '03',
   APR: '04',
   MAY: '05',
   JUN: '06',
   JUL: '07',
   AUG: '08',
   SEP: '09',
   OCT: '10',
   NOV: '11',
   DEC: '12',
};

// function to convert '20-SEP-2022'date format into '2018-10-19' format
export function dateFormatter(dateParam) {
   const reversedArray = dateParam.split('-').reverse();
   const temp = reversedArray[1];
   reversedArray[1] = months[temp];
   reversedArray[0] = reversedArray[0] === '2999' ? '2022' : reversedArray[0];

   return reversedArray.join('-');
}


// converting a js date to seconds (unix UTCtimestamp)
export function dateToSeconds(dateParam) {
   const date = new Date(dateParam);
   let seconds = Math.round(date.getTime() / 1000);
   return seconds;
}