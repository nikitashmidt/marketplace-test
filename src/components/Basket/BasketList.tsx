"use client"

import Image from "next/image"
import { TbCoinTaka } from "react-icons/tb"
import { PiContactlessPaymentDuotone } from "react-icons/pi"
import { MdDeleteForever } from "react-icons/md"
import cn from "classnames"

import useFavoritesSlice from "@/store/favoritesSlice"
import { type IBasketListProps } from "./Basket.interface"

import s from "./Basket.module.scss"
import { IProduct } from "@/types/global.types"

function BasketList({ products }: IBasketListProps) {
  const { favoritesId, updateFavoritesId } = useFavoritesSlice()

  function removeDuplicateObjects(arr: IProduct[]) {
    const uniqueObjects = [] as IProduct[]
    const uniqueIds = new Set()

    arr.forEach((obj) => {
      if (!uniqueIds.has(obj.id)) {
        uniqueIds.add(obj.id)
        uniqueObjects.push(obj)
      }
    })

    return uniqueObjects
  }

  const favoritesList = removeDuplicateObjects(
    products.filter(({ id }) => favoritesId.includes(id))
  )

  const finalPrice = () => {
    let sum = 0

    for (let i = 0; i < favoritesId.length; i++) {
      sum = sum + favoritesList[i].price
    }

    return sum
  }

  return (
    <div>
      <ul className={s.list}>
        {favoritesList.map(({ title, id, price, thumbnail }) => {
          return (
            <li key={id} className={s.item}>
              <Image
                className={s.img}
                src={thumbnail}
                alt={title}
                width={50}
                height={50}
              />
              <div className={s.title}> {title} </div>
              <div className={s.price}>
                {price} <TbCoinTaka />
              </div>
              <button className={s.btn} onClick={() => updateFavoritesId(id)}>
                Delete <MdDeleteForever />
              </button>
            </li>
          )
        })}
      </ul>

      {favoritesList.length >= 1 && (
        <div className={s.finalPrice}>
          Total price - {finalPrice()} <TbCoinTaka />
        </div>
      )}
      {favoritesList.length >= 1 && (
        <button className={cn(s.btn, s.btnPay)}>
          Pay <PiContactlessPaymentDuotone />
        </button>
      )}
    </div>
  )
}

export default BasketList
