"use client"

import { v4 as uuid } from "uuid"
import Image from "next/image"
import { TbCoinTaka } from "react-icons/tb"

import useCartsQuery from "@/hooks/useQueryCarts"
import Loader from "@/components/Loader"
import BasketBtn from "./BasketBtn"

import s from "./Products.module.scss"

function Products() {
  const { data, isLoading } = useCartsQuery()

  const products = data?.carts.map(({ products }) => products).flat()

  return (
    <section>
      <div className="container">
        <h1 className={s.titlePage}>Products List our marketplace:</h1>
        <ul className={s.list}>
          {products &&
            products.map(({ id, title, thumbnail, price }) => {
              return (
                <li key={uuid()}>
                  <div className={s.imageBlock}>
                    <Image
                      className={s.image}
                      src={thumbnail}
                      alt={title}
                      width={150}
                      height={150}
                    />
                  </div>
                  <div className={s.bottom}>
                    <div className={s.title}>{title}</div>
                    <div className={s.price}>
                      Price: {price} <TbCoinTaka />
                    </div>
                    <BasketBtn id={id} />
                  </div>
                </li>
              )
            })}
        </ul>
      </div>
      {isLoading && <Loader /> }
    </section>
  )
}

export default Products
