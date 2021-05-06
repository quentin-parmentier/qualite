export function getNotesOfCommande(notes, numeroCommande){
    return notes[numeroCommande]
}

export function notesFromBaseToFront(notes){
    let noteTraduites = {}
    notes.forEach(note => {
        noteTraduites = {...noteTraduites,[note.id_commande]:note.notes}
    });
    return noteTraduites
}