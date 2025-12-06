import axios from "axios";
import { useState, type ReactElement, type ReactNode } from "react";
import { ENDPOINT } from "../config/const";
import type { Game, Loading } from "../config/interfaces";
import { GameContext } from "./GameContext";

const GameProvider = ({ children }: { children: ReactNode }): ReactElement => {
  const [steamGames, setSteamGames] = useState<Game[]>([]);
  const [gogGames, setGogGames] = useState<Game[]>([]);
  const [loading, setLoading] = useState<Loading>({
    steam: false,
    gog: false,
  });

  const fetchSteamGames = async (): Promise<void> => {
    setLoading({ ...loading, steam: true });
    try {
      const res = await axios.get<Game[]>(`${ENDPOINT}steam/games`);
      setSteamGames(res.data);
    } catch {
      throw new Error("Error fetching Steam games");
    } finally {
      setLoading({ ...loading, steam: false });
    }
  };

  const fetchGogGames = async (): Promise<void> => {
    setLoading({ ...loading, gog: true })
    try {
      const tokenRes = await axios.post<string>(`${ENDPOINT}gog/token`);
      const res = await axios.get<Game[]>(`${ENDPOINT}gog/games`, {
        headers: {
          Authorization: `Bearer ${tokenRes.data}`,
          Accept: "application/json",
        },
      });
      setGogGames(res.data);
    } catch {
      throw new Error("Error fetching GOG games");
    } finally {
      setLoading({ ...loading, gog: false });
    }
  };

  return (
    <GameContext.Provider value={{ loading, steamGames, gogGames, fetchSteamGames, fetchGogGames }}>
      {children}
    </GameContext.Provider>
  );
}
export default GameProvider
