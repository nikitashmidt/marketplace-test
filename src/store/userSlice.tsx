import { create } from "zustand"
import { persist } from "zustand/middleware"

interface IUsersState {
  coins: number
  dollars: number
  exchangeCoins: (coins: number) => void
  addDollars: (dollars: number) => void
  paymentСoins: (totalPrice: number) => void
  paymentDollars: (totalPrice: number) => void
}

const useUserSlice = create<IUsersState>()(
  persist(
    (set) => ({
      coins: 0,
      dollars: 0,
      exchangeCoins: (coins: number) => {
        set((state) => {
          return {
            coins: state.coins + coins,
            dollars: state.dollars - coins
          }
        })
      },
      addDollars: (dollars: number) => {
        set((state) => {
          return {
            dollars: state.dollars + dollars
          }
        })
      },
      paymentСoins: (totalPrice: number) => {
        set((state) => {
          return {
            coins: state.coins - totalPrice
          }
        })
      },
      paymentDollars: (totalPrice: number) => {
        set((state) => {
          return {
            dollars: state.dollars - totalPrice
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
