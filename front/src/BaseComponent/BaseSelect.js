import React from 'react'

export default function BaseSelect({array,idSelected,handleChange,dataAttribut,label="",firstEmpty=false,errors={}}) {
    return (
        <div className=" flex-1 min-w-181 max-w-280 relative mx-auto xs:mx-0">
            <select
                className={`${errors[dataAttribut] ? ' inputError ' : ''} input `}
                value={idSelected}
                id={dataAttribut}
                required
                onChange={(e) => handleChange({newValue:e.target.value, attr:dataAttribut})}>
                {firstEmpty ? <option className=""></option> : ''}
                {array.map((item) => <option key={item.value} className="" value={item.value}> {item.label} </option> )}
            </select>
            <label className=" label " htmlFor={dataAttribut}> {label} </label>
            <div className=" line "></div>
            {errors[dataAttribut] ? <div className="error"> {errors[dataAttribut]} </div> : ''}

        </div>
    )
}
