import { useState, type FC, type ReactElement } from "react";
import axios from "axios";
import GameList from "../components/GameList";
import type { Game } from "../interfaces";
import { ENDPOINT, GOG_CLIENT_ID, GOG_LOGIN_URL, GOG_REDIRECT_URI } from "../config/const";

const Home: FC = (): ReactElement => {
  const [steamGames, setSteamGames] = useState<Game[]>([]);
  const [gogGames, setGogGames] = useState<Game[]>([]);

  const fetchSteamGames = async (): Promise<void> => {
    const res = await axios.get<Game[]>(`${ENDPOINT}steam/games`);
    setSteamGames(res.data);
  };

  const fetchGogGames = async (): Promise<void> => {
    let token: string;

    try {
      const res = await axios.post<string>(`${ENDPOINT}/gog/token`);
      token = res.data;
    } catch (err) {
      console.error("Errore nello scambio del codice:", err);
      return;
    }

    try {
      const res = await axios.get<Game[]>(`${ENDPOINT}gog/games`, {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
        },
      });
      setGogGames(res.data);
    } catch (err) {
      console.error("Errore nel caricamento giochi GOG:", err);
    }
  };

  return (
    <div className="p-8 space-y-6">
      <p className="text-3xl font-bold">La mia libreria di giochi</p>
      <div className="space-y-3">
        <a
          href={`${GOG_LOGIN_URL}?client_id=${GOG_CLIENT_ID}&redirect_uri=${GOG_REDIRECT_URI}`}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 underline block"
        >
          Login GOG
        </a>

        <button onClick={fetchSteamGames} className="px-4 py-2 bg-blue-700 text-white rounded cursor-pointer active:bg-blue-300 active:text-black">
          Carica giochi Steam
        </button>
        <GameList games={steamGames} />

        <button onClick={fetchGogGames} className="px-4 py-2 bg-violet-700 text-white rounded cursor-pointer active:bg-violet-300 active:text-black">
          Carica giochi GOG
        </button>
        <GameList games={gogGames} />
      </div>
    </div>);
}
export default Home
