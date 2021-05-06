import React from 'react'

export default function Tab({array,idSelected="",handleChange, dataAttribut, errors={}}) {
    
    return (
        <>
            <div className={`
                ${errors[dataAttribut] ? ' tabError ' : ''} 
                w-full flex flex-1 justify-center bg-gray-100 border-l-2 border-gray-200 max-w-560 min-w-max`}>
                {array.map((elem) => 
                    <div 
                        key={elem.value} 
                        className={["tabItem min-w-90 flex-1 ",idSelected === elem.value ? ' tabItemSelected ' : ' hover:bg-indigo-100']}
                        onClick={(e) => handleChange({newValue:elem.value, attr:dataAttribut})}
                    >
                            {elem.label} 
                    </div>
                )}
            </div>
            {errors[dataAttribut] ? <div className="error"> {errors[dataAttribut]} </div> : ''}
            
        </>
    )

    
}