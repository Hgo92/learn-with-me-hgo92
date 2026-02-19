import { BrowserRouter, Routes, Route } from 'react-router';
import { useEffect, useState } from 'react';
import Home from './pages/Home';
import Decks from './pages/Decks';
import Play from './pages/Play';

import './App.css';

export interface dataDecksProps {
  id : number,
  name : string
}

export interface dataCartesProps {
  id : number,
  mot : string,
  traduction : string, 
  deck_id : number
}

function App() {  

const [dataDecks, setDataDecks] = useState<dataDecksProps[]>([]);
const [dataCartes, setDataCartes] = useState<dataCartesProps[]>([]);

async function getDecks() {
    const url = `https://learn-with-me-back.vercel.app/decks`;
    const response = await fetch(url);
    const data = await response.json();
    setDataDecks(data);
}

const reloadDecks = async () => {
    await getDecks();
}

useEffect(() => {
getDecks()
}, [])

async function getCartes() {
    const url = `https://learn-with-me-back.vercel.app/decks`;
    const response = await fetch(url);
    const data = await response.json();
    setDataCartes(data);
}

useEffect(() => {
getCartes()
}, [])

const reloadCartes = async () => {
  await getCartes()
}

  return (
    <>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/decks" element={<Decks decks={dataDecks} cartes={dataCartes} onReloadCartes={reloadCartes} onReloadDecks={reloadDecks}/>} />
        <Route path="/play" element={<Play decks={dataDecks} cartes={dataCartes}/>} />
      </Routes>
    </BrowserRouter>
      
    </>
  )
}

export default App