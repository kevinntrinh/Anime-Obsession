import React, { useEffect, useState} from 'react'
import Search from './components/Search.jsx'
import Spinner from './components/Spinner.jsx'
import AnimeCard from './components/AnimeCard.jsx';
import useDebounce from './components/useDebounce.js';


const API_BASE_URL = 'https://api.myanimelist.net/v2';

const API_KEY = import.meta.env.VITE_MAL_API_KEY;

const API_OPTIONS = {
    method: 'GET',
    headers: {
        accept: 'application/json',
        Authorization: `Bearer ${API_KEY}`
    }
}

const App = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [animeList, setAnimeList] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const debouncedSearchTerm = useDebounce(searchTerm, 500);

    const fetchAnimes = async (query = '') => {
        setIsLoading(true);
        setErrorMessage('');

        try {
            const endpoint = query
                ? `http://localhost:3001/api/animes?q=${encodeURIComponent(query)}`
                : 'http://localhost:3001/api/animes';

            const response = await fetch(endpoint);

            if (!response.ok) {
                throw new Error('Failed to fetch animes');
            }

            const data = await response.json();

            if(data.Response == 'False') {
                setErrorMessage(data.Error || 'Failed to fetch animes');
                setAnimeList([]);
                return;
            }
            setAnimeList(data.data || []);
        } catch (error) {
            console.error(`Error fetching animes: ${error}`);
            setErrorMessage('Error fetching animes. Please try again later.');
        } finally {
            setIsLoading(false);
        }
    }

    useEffect(() => {
        fetchAnimes(debouncedSearchTerm);
    }, [debouncedSearchTerm]);

    return (
        <main>
            <div className={"pattern"} />

            <div className={"wrapper"}>
                <header>
                    <img src={"./anime-poster.png"} alt={"naruto banner"}/>
                    <h1>Find your next <span className={"text-gradient"}>Anime</span> Obsession</h1>

                    <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
                </header>

                <section className={"all-animes"}>
                    <h2 className={"mt-[40px]"}>All Animes</h2>


                    {isLoading ? (
                        <Spinner />
                    ) : errorMessage ? (
                        <p className={"text-red-500"}>{errorMessage}</p>
                    ) : (
                        <ul>
                            {animeList.map((anime) => (
                                <AnimeCard key={anime.node.id} anime={anime.node}/>
                            ))}
                        </ul>
                    )}
                </section>
            </div>
        </main>
    )
}
export default App
