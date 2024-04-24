"use client"

import Image from "next/image"
import { useState } from "react"
import { TbCoinTaka } from "react-icons/tb"
import { PiContactlessPaymentDuotone } from "react-icons/pi"
import { MdDeleteForever } from "react-icons/md"
import cn from "classnames"

import useFavoritesSlice from "@/store/favoritesSlice"
import { type IBasketListProps } from "./Basket.interface"
import { type IProduct } from "@/types/global.types"
import PayModal from "@/components/Modals/PayModal"

import s from "./Basket.module.scss"

function BasketList({ products }: IBasketListProps) {
  const { favoritesId, updateFavoritesId } = useFavoritesSlice()
  const [isOpenModal, setIsOpenModal] = useState(false)

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
                width={120}
                height={120}
              />
              <div className={s.title}> {title} </div>
              <div className={s.price}>
                {price} <TbCoinTaka />
              </div>
              <button
                className={cn("btn", s.btnDelete)}
                onClick={() => updateFavoritesId(id)}
              >
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
        <button
          className={cn("btn", s.btnPay)}
          onClick={() => setIsOpenModal(true)}
        >
          Pay <PiContactlessPaymentDuotone />
        </button>
      )}
      <PayModal
        finalPrice={finalPrice()}
        isOpen={isOpenModal}
        onRequestClose={() => setIsOpenModal(false)}
      />
    </div>
  )
}

export default BasketList
