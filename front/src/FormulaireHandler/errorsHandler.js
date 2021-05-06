import { useEffect, useState } from "react"

export default function useErrors(object, setObject, ObjectClass, isObjectOk, enregistrer){

    const [errors, setErrors] = useState({})
    const [touched, setTouched] = useState({})

    useEffect(() => {
        setErrors((err) => {
            const {errors} = isObjectOk(object, err, touched)
            return errors
        })
    },[touched,object,isObjectOk])

    function handleChange({newValue,attr}){
        setTouched((actualTouched) => {return {...actualTouched, [attr]:true}})
        setObject((currentObject) => new ObjectClass(currentObject.set(attr,newValue)))
    }

    function handleClickEnregistrer() {
        const {valid, errors:err} = isObjectOk(object, errors, touched, true)
        if(valid) enregistrer()
        setErrors(() => err)
    }

    return {handleChange,handleClickEnregistrer,errors}
}