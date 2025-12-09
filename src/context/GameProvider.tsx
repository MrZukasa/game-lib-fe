import axios from "axios";
import { useState, type ReactElement, type ReactNode } from "react";
import { ENDPOINT } from "../config/const";
import type { Game, Loading, XboxAuthResponse, XboxGame, XboxTitleResponse } from "../config/interfaces";
import { GameContext } from "./GameContext";

const GameProvider = ({ children }: { children: ReactNode }): ReactElement => {
  const [steamGames, setSteamGames] = useState<Game[]>([]);
  const [gogGames, setGogGames] = useState<Game[]>([]);
  const [xboxGames, setXboxGames] = useState<Game[]>([]);
  const [loading, setLoading] = useState<Loading>({
    steam: false,
    gog: false,
    xbox: false
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

  const fetchXboxGames = async (): Promise<void> => {
    setLoading({ ...loading, xbox: true });
    try {
      const tokenRes = await axios.post<XboxAuthResponse>(`${ENDPOINT}xbox/token`);
      const res = await axios.get<XboxTitleResponse>(`${ENDPOINT}xbox/games`, {
        headers: {
          Authorization: `${tokenRes.data.Token}`,
          Accept: "application/json",
        },
      });
      const input = res.data.titles;
      const parsedGame = (games: XboxGame[]): Game[] => {
        return games.map(game => ({
          id: game.titleId,
          title: game.name,
          platform: game.devices.join(", "),
          image: game.displayImage
        }))
      }
      const xboxGameLibrary = parsedGame(input)
      setXboxGames(xboxGameLibrary);
    } catch {
      throw new Error("Error fetching Xbox games");
    } finally {
      setLoading({ ...loading, xbox: false });
    }
  };

  return (
    <GameContext.Provider value={{ loading, steamGames, gogGames, xboxGames, fetchSteamGames, fetchGogGames, fetchXboxGames }}>
      {children}
    </GameContext.Provider>
  );
}
export default GameProvider
