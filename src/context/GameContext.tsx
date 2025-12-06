import { createContext } from "react";
import type { GameContextProps } from "../config/interfaces";

export const GameContext = createContext<GameContextProps | undefined>(undefined);


