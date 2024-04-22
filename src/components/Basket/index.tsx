import { type IBasketProps } from "./Basket.interface"

import BasketList from "./BasketList"
import UserBalance from "./UserBalance"

import s from "./Basket.module.scss"

function Basket({ products }: IBasketProps) {
  return (
    <section>
      <div className="container">
        <UserBalance />
        <BasketList products={products} />
      </div>
    </section>
  )
}

export default Basket
