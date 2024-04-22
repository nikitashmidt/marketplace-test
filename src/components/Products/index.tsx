import { v4 as uuid } from "uuid"
import Image from "next/image"
import { TbCoinTaka } from "react-icons/tb"

import { type IProductsProps } from "./Products.interface"

import BasketBtn from "./BasketBtn"

import s from "./Products.module.scss"

function Products({ products }: IProductsProps) {
  return (
    <section>
      <div className="container">
        <h1 className={s.titlePage}>Products List our marketplace:</h1>
        <ul className={s.list}>
          {products.map(({ id, title, thumbnail, price }) => {
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
    </section>
  )
}

export default Products
