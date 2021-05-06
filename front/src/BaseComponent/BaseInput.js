import React from 'react'

export default function BaseInput({handleChange,placeholder="",IconLeft=null, value="",dataAttribut="", label="", type="text", fullWidth=false, required=true, errors={}}) {
    return (
        <div className={`relative mx-auto xs:mx-0 min-w-181 flex-1 ${fullWidth ? 'max-w-full' : 'max-w-280'}`}>
            {IconLeft ? <IconLeft className="h-5 w-5 absolute top-15px left-7px" /> : null}
            <input 
                placeholder={placeholder}
                className={`
                    ${errors[dataAttribut] ? ' inputError ' : ''} 
                    ${IconLeft ? ' pl-32px' : ''} 
                    input `
                }
                onChange={(e) => handleChange({newValue:e.target.value, attr:dataAttribut})}
                value={value}
                type={type}
                required={required}
            />   
            <label className={[" label ", IconLeft ? ' left-8' : '']}> {label} </label>
            <div className=" line "></div>
            {errors[dataAttribut] ? <div className="error"> {errors[dataAttribut]} </div> : ''}

        </div> 
    )
}
