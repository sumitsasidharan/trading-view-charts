import React from 'react';

const DemoSelectComp = () => {
   return (
      <div>
         <optgroup label="Measures">
            <option value="sub-filter">Sub-Filter/Group</option>
            <option value="number">Number</option>
         </optgroup>
         <optgroup label="Stock attributes">
            <option value="symbol">Symbol</option>
            <option value="industry">Industry</option>
            <option value="sector">Sector</option>
            <option value="marketcapname">Marketcapname</option>
            <option value="open">Open</option>
            <option value="high">High</option>
            <option value="low">Low</option>
            <option value="close">Close</option>
            <option value="volume">Volume</option>
            <option value="change">% Change</option>
         </optgroup>
      </div>
   );
};

export default DemoSelectComp;
