"use client"

import useFavoritesSlice from "@/store/favoritesSlice"

import s from "./Header.module.scss"

function FavoritesCount() {
  const { favoritesId } = useFavoritesSlice()

  return (
    <>
      {favoritesId.length !== 0 && (
        <span className={s.count}>{favoritesId.length}</span>
      )}
    </>
  )
}

export default FavoritesCount
