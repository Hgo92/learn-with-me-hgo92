export default async function changeCarte(newName : string, newTrad : string, id : number) {
    const url = `${import.meta.env.VITE_API_URL}/changecarte`;
    const response = await fetch(url, {
        method : 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            mot: newName,
            traduction : newTrad,
            id: id
        })
    })
    const changeCarte = await response.json();
    return changeCarte;
}

export async function changeDeck(newName : string, deckId : number) {
    const url = `${import.meta.env.VITE_API_URL}/changedeck`;
    const response = await fetch(url, {
        method : 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            name: newName,
            id: deckId
        })
    })
    const changeDeck = await response.json();
    return changeDeck;
}