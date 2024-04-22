import { create } from "zustand"
import { persist } from "zustand/middleware"

interface IUsersState {
  coins: number
  dollars: number
  updateCoins: (coins: number) => void
  updateDollars: (dollars: number) => void
}

const useUserSlice = create<IUsersState>()(
  persist(
    (set) => ({
      coins: 33,
      dollars: 333,
      updateCoins: (coins: number) => {
        set((state) => {
          return {
            coins: state.coins + coins
          }
        })
      },
      updateDollars: (dollars: number) => {
        set((state) => {
          return {
            dollars: state.dollars + dollars
          }
        })
      }
    }),
    {
      name: "user",
      version: 1
    }
  )
)

export default useUserSlice
