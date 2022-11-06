import React, { useState } from 'react';

import './SelectList.css';

const SelectList = ({
   options,
   setAllSelectedOptions,
   allSelectedOptions,
}) => {
   // const [selectedOption, setSelectedOption] = useState();

   const handleChangeValue = (e) => {
      setAllSelectedOptions((prev) => {
         return {
            ...prev,
            [e.target.name]: e.target.value,
         };
      });
   };

   return (
      <div className="selectList_Wrapper">
         <div className="select_List">
            {/* <label htmlFor="cars">LABEL</label> */}
            <select
               name={options.name}
               id={options.name}
               autoFocus
               defaultValue={allSelectedOptions[options.name]}
               onChange={handleChangeValue}>
               <option value="">{options.mainLabel}</option>
               {options.subLists.map((item) => {
                  return (
                     <optgroup key={item.id} label={item.subLabel}>
                        {item.values.map((option, index) => {
                           return (
                              <option key={option} value={option}>
                                 {option}
                              </option>
                           );
                        })}
                     </optgroup>
                  );
               })}
            </select>
         </div>
      </div>
   );
};

export default SelectList;
