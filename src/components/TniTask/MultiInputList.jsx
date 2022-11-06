import React, { useState } from 'react';
import MultiInput from './MultiInput';
import { MdAddCircle } from 'react-icons/md';

import './MultiInputList.css';

import { selectListArray } from '../../demoData';

const MultiInputList = () => {
   const [message, setMessage] = useState('');
   const [inputListData, setInputListData] = useState([]);
   const [allSelectedOptions, setAllSelectedOptions] = useState({
      measureRoot: '',
      operation: '',
      measure: '',
      disableFilter: false,
   });
// console.log(inputListData);
// console.log(allSelectedOptions);
   const addMultiList = () => {
      const randID = Math.round(new Date().getTime() / 1000);
      setInputListData((prev) => {
         // console.log(prev)
         return [
            ...prev,
            {
               id: randID,
               multiListArray: selectListArray,
            },
         ];
      });

      showMessage('New List Added!');
   };

   

   // COPY LIST
   const copyList = () => {
      const randID = Math.round(new Date().getTime() / 1000);
      setInputListData((prev) => {
         return [
            ...prev,
            {
               id: randID,
               multiListArray: selectListArray,
            },
         ];
      });

      const { measureRoot, operation, measure, disableFilter,} = allSelectedOptions;
      setAllSelectedOptions({ measureRoot, operation, measure, disableFilter});
      showMessage('List Copied!');
   }

   const deleteList = (id) => {
      setInputListData((prev) => {
         return prev.filter((list) => list.id !== id);
      });

      showMessage('List Deleted!');
   };

   const handleBtnClick = () => {
      showMessage('Button not working as of now!');
   };

   // SHOW MESSAGE UTILITY FUNCTION
   function showMessage(msg) {
      setMessage(msg);
      setTimeout(() => {
         setMessage('');
      }, 9000);
   }

   const handleRunScan = () => {
      const { measureRoot, operation, measure } = allSelectedOptions;
      const showMsg = `You selected '${measureRoot.toUpperCase()}', '${operation.toUpperCase()}' & '${measure.toUpperCase()}'`;

      showMessage(showMsg);
   }

   return (
      <div className="multiInputList_Wrapper">
         {inputListData.map((list) => {
            return (
               <MultiInput
                  key={list.id}
                  listId={list.id}
                  deleteList={deleteList}
                  selectListArray={list.multiListArray}
                  allSelectedOptions={allSelectedOptions}
                  setAllSelectedOptions={setAllSelectedOptions}
                  showMessage={showMessage}
                  copyList={copyList}
               />
            );
         })}

         <div onClick={addMultiList} className="addBtn_Wrapper">
            <MdAddCircle size="2em" color="green" />
         </div>

         <div className="btns_Wrapper">
            <button onClick={handleRunScan} className="runBtn btn">
               Run Scan
            </button>
            <button disabled onClick={handleBtnClick} className="saveBtn btn">
               Save Scan
            </button>
            <button disabled onClick={handleBtnClick} className="alertBtn btn">
               Create Alert
            </button>
         </div>

         <p className="message">
            Message: <span>{message}</span>
         </p>
      </div>
   );
};

export default MultiInputList;
