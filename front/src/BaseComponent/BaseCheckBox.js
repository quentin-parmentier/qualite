import React from 'react'

export default function BaseCheckBox({label, handleChange, dataAttribut, value}) {
    return (
        <div className="flex-1 flex justify-center gap-x-2 ">
            <input type="checkbox" className=" h-7 w-7"
                checked={value}
                onChange={(e) => handleChange({newValue:e.target.checked,attr:dataAttribut})}
            />
            <p className=" font-semibold"> {label}</p>
        </div>
    )
}
