export function renderCellColor({value,key}) {
    return <div key={key} className={["h-25 my-auto ", value ? ' bg-green-400' : ' bg-red-500']}></div>
}

export function renderCellDate({value,key}) {
    const date = value ? new Date(value).toLocaleString('fr-FR').split(',')[0] : ''
    return <div key={key} className='text-center self-center'> {date} </div>
}

export function renderCellText({value,key}) {
    return <div key={key} className='text-center self-center'> {value} </div>
}