"use client"

import Link from "next/link"
import useFavoritesSlice from "@/store/favoritesSlice"
import cn from "classnames"

import { type IBasketBtnProps } from "./Products.interface"
import s from "./Products.module.scss"

function BasketBtn({ id }: IBasketBtnProps) {
  const { favoritesId, updateFavoritesId } = useFavoritesSlice()
  return (
    <>
      {favoritesId.includes(id) ? (
        <Link href="/basket" className={cn(s.btn, "btn", s.btnLink)}>
          To orders
        </Link>
      ) : (
        <button
          className={cn("btn", s.btn)}
          onClick={() => updateFavoritesId(id)}
        >
          Add to Basket
        </button>
      )}
    </>
  )
}

export default BasketBtn
