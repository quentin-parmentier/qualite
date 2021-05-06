import React from 'react'

export default function BaseButton({label="",handleClick=()=>{}, color="blue", errors={}, dataAttribut="", disabled=false}) {
    return (
        <div>
            <button 
                className= {`min-w-max w-full p-2 text-white font-semibold rounded-md
                focus:outline-none transition duration-300 hover:bg-${color}-700 hover:shadow-md bg-${color}-500`}
                onClick={(e) => handleClick(e)}
                disabled={disabled}> 
                {label}
            </button>
            {errors[dataAttribut] ? <div className="error"> {errors[dataAttribut]} </div> : ''}
        </div>
    )
}
