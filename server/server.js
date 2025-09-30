// A simple Node.js server to proxy requests to the MyAnimeList API,
// resolving CORS issues.

const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3001;
const API_BASE_URL = 'https://api.myanimelist.net/v2';
const MAL_API_KEY = process.env.MAL_API_KEY;

// Middleware to allow cross-origin requests from your React app
app.use(cors({
    origin: 'http://localhost:5173'
}));

// A proxy endpoint to fetch anime data
app.get('/api/animes', async (req, res) => {
    try {
        const { q } = req.query;

        const fields = "id,title,main_picture,start_date,mean,source";

        let endpoint;

        if (q && q.trim().length > 0) {
            // Search endpoint only if q is non-empty
            endpoint = `${API_BASE_URL}/anime?q=${encodeURIComponent(q)}&limit=20&fields=${fields}`;
        } else {
            // Fallback: popular ranking
            endpoint = `${API_BASE_URL}/anime/ranking?ranking_type=bypopularity&limit=20&fields=${fields}`;
        }

        const response = await fetch(endpoint, {
            method: 'GET',
            headers: {
                'accept': 'application/json',
                'X-MAL-CLIENT-ID': MAL_API_KEY
            }
        });

        if (!response.ok) {
            const errorText = await response.text();
            console.error('API Error Response:', errorText);
            return res.status(response.status).json({ error: 'Failed to fetch animes from MAL API.' });
        }

        const data = await response.json();
        res.json(data);
    } catch (error) {
        console.error(`Proxy Error: ${error.message}`);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});



// Start the server
app.listen(PORT, () => {
    console.log(`Proxy server is running on http://localhost:${PORT}`);
});
