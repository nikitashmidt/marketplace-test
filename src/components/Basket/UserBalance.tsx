"use client"

import useUserSlice from "@/store/userSlice"
import cn from "classnames"

import { LuBadgeDollarSign } from "react-icons/lu"
import { TbCoinTaka } from "react-icons/tb"

import s from "./Basket.module.scss"

function UserBalance() {
  const { coins, dollars } = useUserSlice()

  return (
    <div className={s.userBalance}>
      <div className={s.dollars}>
        Balance: <LuBadgeDollarSign />
        {dollars} | <TbCoinTaka /> {coins}
      </div>

      <div className={s.btnsAddCurrency}>
        <button className={s.btn}>
          add Dollars <LuBadgeDollarSign />
        </button>
        <button className={cn(s.btn, s.btnExchange)}>
          exchange Dollars <TbCoinTaka />
        </button>
      </div>
    </div>
  )
}

export default UserBalance
