import React from "react";
import Select from "react-select";



function CustomSelect({options,onChange,defaultValue,isMulti}){
   
    return <div > 
        
        <Select isMulti={isMulti} options={options} defaultValue={defaultValue} onChange={onChange} />
    </div>
}

export default CustomSelect;