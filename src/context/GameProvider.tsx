import axios from "axios";
import { useState, type ReactElement, type ReactNode } from "react";
import { ENDPOINT } from "../config/const";
import type { AmazonAuthResponse, AmazonGame, AmazonTitleResponse, Game, Loading, XboxAuthResponse, XboxGame, XboxTitleResponse } from "../config/interfaces";
import { GameContext } from "./GameContext";

const GameProvider = ({ children }: { children: ReactNode }): ReactElement => {
  const [steamGames, setSteamGames] = useState<Game[]>([]);
  const [gogGames, setGogGames] = useState<Game[]>([]);
  const [xboxGames, setXboxGames] = useState<Game[]>([]);
  const [amazonGames, setAmazonGames] = useState<Game[]>([]);
  const [loading, setLoading] = useState<Loading>({
    steam: false,
    gog: false,
    xbox: false,
    amazon: false
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
        params: {
          uhs: tokenRes.data.DisplayClaims.xui[0].uhs
        }
      });
      const parsedGame = (games: XboxGame[]): Game[] => {
        return games.map(game => ({
          id: game.titleId,
          title: game.name,
          platform: game.devices.join(", "),
          image: game.displayImage
        }))
      }
      const input = res.data.titles;
      const xboxGameLibrary = parsedGame(input)
      setXboxGames(xboxGameLibrary);
    } catch {
      throw new Error("Error fetching Xbox games");
    } finally {
      setLoading({ ...loading, xbox: false });
    }
  };

  const fetchAmazonGames = async (): Promise<void> => {
    setLoading({ ...loading, amazon: true });
    try {
      const tokenRes = await axios.post<AmazonAuthResponse>(`${ENDPOINT}amazon/token`);

      let res = await axios.get<AmazonTitleResponse>(`${ENDPOINT}amazon/games`, {
        headers: {
          Authorization: `${tokenRes.data.access_token}`,
          Accept: "application/json",
        },
      });
      const input = res.data.entitlements;

      while (res.data.nextToken) {
        res = await axios.get<AmazonTitleResponse>(`${ENDPOINT}amazon/games`, {
          headers: {
            Authorization: `${tokenRes.data.access_token}`,
            Accept: 'application/json',
            nextToken: res.data.nextToken
          },
        });
        input.push(...res.data.entitlements);
      }

      const parsedGame = (games: AmazonGame[]): Game[] => {
        return games.map(game => ({
          id: game.id,
          title: game.product.title,
          platform: "PC",
          image: game.product.productDetail.iconUrl
        }))
      }

      const amazonGameLibrary = parsedGame(input)
      setAmazonGames(amazonGameLibrary);
    } catch (err) {
      console.log(err)
      throw new Error("Error fetching Amazon games");
    } finally {
      setLoading({ ...loading, amazon: false });
    }
  };


  return (
    <GameContext.Provider value={{ loading, steamGames, gogGames, xboxGames, amazonGames, fetchSteamGames, fetchGogGames, fetchXboxGames, fetchAmazonGames }}>
      {children}
    </GameContext.Provider>
  );
}
export default GameProvider
