import React from 'react'

export default function BaseModal({children, closeModal}) {
    return (
        <div className="w-screen h-screen top-0 left-0 fixed flex items-center justify-center bg-gray-300-06" onClick={() => closeModal()}>
            <div className="bg-white opacity-100 px-6 py-4 min-w-max w-1/2 flex flex-col items-center rounded-lg gap-y-6" onClick={(e) => e.stopPropagation()}>
                {children}
            </div>
        </div>
    )
}
