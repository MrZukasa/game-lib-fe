import { useContext } from "react"
import { GameContext } from "../context/GameContext"
import type { GameContextProps } from "../config/interfaces"

const useGame = (): GameContextProps => {
  const context = useContext(GameContext)
  if (!context)
    throw new Error('useGame must be used within GameProvider')
  return context
}
export default useGame
