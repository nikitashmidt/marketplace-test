"use client"

import Image from "next/image"
import { useState } from "react"
import { TbCoinTaka } from "react-icons/tb"
import { PiContactlessPaymentDuotone } from "react-icons/pi"
import { MdDeleteForever } from "react-icons/md"
import cn from "classnames"

import useFavoritesSlice from "@/store/favoritesSlice"
import { type IProduct } from "@/types/global.types"
import PayModal from "@/components/Modals/PayModal"
import Loader from "@/components/Loader"
import useCartsQuery from "@/hooks/useQueryCarts"

import s from "./Basket.module.scss"

function BasketList() {
  const { favoritesId, updateFavoritesId } = useFavoritesSlice()
  const { data, isLoading } = useCartsQuery()
  const [isOpenModal, setIsOpenModal] = useState(false)

  const products = data?.carts.map(({ products }) => products).flat()

  function removeDuplicateObjects(arr: IProduct[]) {
    if (!arr) return

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
    products?.filter(({ id }) => favoritesId.includes(id)) as IProduct[]
  )

  const finalPrice = () => {
    let sum = 0

    if (favoritesList) {
      for (let i = 0; i < favoritesList.length; i++) {
        sum = sum + favoritesList[i].price
      }
    }

    return sum
  }

  return (
    <div>
      <ul className={s.list}>
        {favoritesList?.map(({ title, id, price, thumbnail }) => {
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

      {favoritesList && favoritesList.length >= 1 && (
        <div className={s.finalPrice}>
          Total price - {finalPrice()} <TbCoinTaka />
        </div>
      )}
      {favoritesList && favoritesList.length >= 1 && (
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
      {isLoading && <Loader />}
    </div>
  )
}

export default BasketList
