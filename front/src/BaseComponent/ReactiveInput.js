import React, { useRef, useState, useEffect } from 'react'

export default function ReactiveInput({value, handleChange, dataAttribut, classes, errors}) {
    const [isActive, setIsActive] = useState(value === "")
    const [toFocus, setFocus] = useState(false)
    const inputRef = useRef(null)

    useEffect(()=>{
        if(isActive && toFocus) inputRef.current.focus();
     },[isActive,toFocus])

    function handleBlur(newValue){
        //On pourra vérifier la validité de la donnée ici
        if(newValue) setIsActive(false)
    }

    return (
        <div className={classes} onClick={() => {
                setIsActive(true)
                setFocus(true)
            }}>
            {isActive ?
                <input 
                    className={`inputReactif pl-2  ${value === "" ? ' border ' : ''} ${errors[dataAttribut] ? ' ring-red-400 ring-2 ring-inset' : ''}`} 
                    value={value}
                    ref={inputRef}
                    onChange={(e) => {
                        let newValue = e.target.value
                        handleChange(dataAttribut,newValue)
                    }}
                    onBlur={(e) => {
                        handleBlur(e.target.value)
                    }}
                />
            : <p className="px-2 py-1"> {value} </p>
            }
        </div>
    )
}
