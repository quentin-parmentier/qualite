export function generateId(){
    return Math.random().toString(36).substr(2, 9)
}

export function getToday(){
    return new Date().toISOString().substr(0,10)
}