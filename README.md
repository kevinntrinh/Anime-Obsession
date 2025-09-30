My try at creating a Full-Stack Web App using ReactJS and NodeJS. Anime Obsession is a website that allows users to search for anime using the MyAnimeList database / API. react-app contains the code that is used for the website, while server includes the proxy server used to handle API requests.

## Setup
1. Clone repo
2. Run `npm install`
3. Copy `.env.example` → `.env` and add your own API key
4. Go into the server directory and run `node server.js` to run the proxy server for the MAL API 
5. Go into the react-app directory and run `npm run dev` to run the anime search website
