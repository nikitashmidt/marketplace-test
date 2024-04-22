import { create } from "zustand"
import { persist } from "zustand/middleware"

interface IFavoritesState {
  favoritesId: number[]
  updateFavoritesId: (id: number) => void
  clearFavoritesId: () => void
}

const useFavoritesSlice = create<IFavoritesState>()(
  persist(
    (set) => ({
      favoritesId: [],
      updateFavoritesId: (id: number) => {
        set((state) => {
          if (state.favoritesId.includes(id)) {
            const newFavoritesId = state.favoritesId.filter(
              (item) => item !== id
            )
            return {
              favoritesId: newFavoritesId
            }
          }

          return {
            favoritesId: [...state.favoritesId, id]
          }
        })
      },
      clearFavoritesId() {
        localStorage.removeItem("id")
      }
    }),
    {
      name: "favorites",
      version: 1
    }
  )
)

export default useFavoritesSlice
