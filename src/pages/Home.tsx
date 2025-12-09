import { type FC, type ReactElement } from "react";
import GameList from "../components/GameList";
import { GOG_CLIENT_ID, GOG_LOGIN_URL, GOG_REDIRECT_URI } from "../config/const";
import useGame from "../hook/useGame";

const Home: FC = (): ReactElement => {
  const { loading, steamGames, gogGames, xboxGames, fetchSteamGames, fetchGogGames, fetchXboxGames } = useGame();

  return (
    <div className="p-8 space-y-6">
      <p className="text-3xl font-bold">La mia libreria di giochi</p>
      <div className="space-y-3">
        <a
          href={`${GOG_LOGIN_URL}?client_id=${GOG_CLIENT_ID}&redirect_uri=${GOG_REDIRECT_URI}`}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 underline block w-fit"
        >
          Login GOG
        </a>

        <button onClick={fetchSteamGames}
          className="px-4 py-2 bg-blue-700 text-white rounded cursor-pointer transform transition ease-in-out duration-100 :bg-blue-300 active:text-black flex items-center gap-2">
          Carica giochi Steam
          {loading.steam &&
            <svg className="w-6" fill="#FFFFFFFF" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path d="M10.14,1.16a11,11,0,0,0-9,8.92A1.59,1.59,0,0,0,2.46,12,1.52,1.52,0,0,0,4.11,10.7a8,8,0,0,1,6.66-6.61A1.42,1.42,0,0,0,12,2.69h0A1.57,1.57,0,0,0,10.14,1.16Z">
                <animateTransform attributeName="transform" type="rotate" dur="0.75s" values="0 12 12;360 12 12" repeatCount="indefinite" />
              </path>
            </svg>}
        </button>
        {steamGames && <GameList games={steamGames} />}

        <button onClick={fetchGogGames} className="px-4 py-2 bg-violet-700 text-white rounded cursor-pointer transform transition ease-in-out duration-100 active:bg-violet-300 active:text-black flex items-center gap-2">
          Carica giochi GOG
          {loading.gog &&
            <svg className="w-6" fill="#FFFFFFFF" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path d="M10.14,1.16a11,11,0,0,0-9,8.92A1.59,1.59,0,0,0,2.46,12,1.52,1.52,0,0,0,4.11,10.7a8,8,0,0,1,6.66-6.61A1.42,1.42,0,0,0,12,2.69h0A1.57,1.57,0,0,0,10.14,1.16Z">
                <animateTransform attributeName="transform" type="rotate" dur="0.75s" values="0 12 12;360 12 12" repeatCount="indefinite" />
              </path>
            </svg>}

        </button>
        {gogGames && <GameList games={gogGames} />}

        <button onClick={fetchXboxGames} className="px-4 py-2 bg-green-700 text-white rounded cursor-pointer transform transition ease-in-out duration-100 active:bg-violet-300 active:text-black flex items-center gap-2">
          Carica giochi Xbox
          {loading.xbox &&
            <svg className="w-6" fill="#FFFFFFFF" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path d="M10.14,1.16a11,11,0,0,0-9,8.92A1.59,1.59,0,0,0,2.46,12,1.52,1.52,0,0,0,4.11,10.7a8,8,0,0,1,6.66-6.61A1.42,1.42,0,0,0,12,2.69h0A1.57,1.57,0,0,0,10.14,1.16Z">
                <animateTransform attributeName="transform" type="rotate" dur="0.75s" values="0 12 12;360 12 12" repeatCount="indefinite" />
              </path>
            </svg>}

        </button>
        {xboxGames && <GameList games={xboxGames} />}

      </div>
    </div >
  );
}
export default Home
