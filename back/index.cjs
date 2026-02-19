require('dotenv').config();

const express = require('express');
const { neon } = require('@neondatabase/serverless');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 4242;

app.use(cors({
  origin: ["http://localhost:3000", "https://learn-with-me-hgo92.vercel.app"],
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true,
}));

// Répondre aux preflight OPTIONS
app.options('*', cors());

app.use(express.json()); // ← MANQUAIT ! Sans ça req.body est undefined

app.use((req, res, next) => {
  res.setHeader('Cache-Control', 'no-store');
  next();
});

const sql = neon(`${process.env.DATABASE_URL}`);

app.get('/decks', async (_, res) => {
    const response = await sql`SELECT * FROM decks`;
    res.json(response);
});

app.get('/cartes', async (req, res) => {
    const response = await sql`SELECT * FROM cartes`;
    res.json(response);
});

app.delete('/deletedeck', async (req, res) => {
    const {id} = req.body;
    await sql`DELETE FROM cartes WHERE deck_id = ${id}`;
    const response = await sql`DELETE FROM decks WHERE id = ${id}`;
    res.json({ success: true, message: 'Deck supprimé', deleted: response });
});

app.delete('/deletecarte', async (req, res) => {
    const {id} = req.body;
    const response = await sql`DELETE FROM cartes WHERE id = ${id}`;
    res.json({ success: true, message: 'Carte supprimée', deleted: response });
});

app.put('/changedeck', async (req, res) => {
    const {name, id} = req.body;
    const response = await sql`UPDATE decks SET name = ${name} WHERE id = ${id}`;
    res.json({ success: true, message: 'Deck modifié', updated: response });
});

app.put('/changecarte', async (req, res) => {
    const {mot, traduction, id} = req.body;
    const response = await sql`UPDATE cartes SET mot = ${mot}, traduction = ${traduction} WHERE id = ${id}`;
    res.json({ success: true, message: 'Carte modifiée', updated: response });
});

app.post('/adddeck', async (req, res) => {
    const {name} = req.body;
    const response = await sql`INSERT INTO decks (name) VALUES (${name})`;
    res.json({ success: true, message: 'Deck ajouté', created: response });
});

app.post('/addcarte', async (req, res) => {
    const {mot, traduction, deck_id} = req.body;
    const response = await sql`INSERT INTO cartes (mot, traduction, deck_id) VALUES (${mot},${traduction},${deck_id})`;
    res.json({ success: true, message: 'Carte ajoutée', created: response });
});

app.listen(PORT, () => {
    console.log(`Listening to http://localhost:${PORT}`);
});

module.exports = app;
