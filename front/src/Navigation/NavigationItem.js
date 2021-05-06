import React from 'react'
import {NavLink} from 'react-router-dom'

export default function NavigationItem({title, to}) {
    return (
        <NavLink className=" font-semibold text-lg px-2 h-full items-center flex" activeClassName=" bg-red-300" to={to} >
            {title}
        </NavLink>
    )
}
