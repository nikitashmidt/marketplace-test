"use client"

import useUserSlice from "@/store/userSlice"
import cn from "classnames"
import { useState } from "react"

import { LuBadgeDollarSign } from "react-icons/lu"
import { TbCoinTaka } from "react-icons/tb"

import AddDollars from "@/components/Modals/AddDollarsModal"
import Exchange from "@/components/Modals/ExchangeModal"

import s from "./Basket.module.scss"

type TModal = "AddDollars" | "Exchange" | ""

function UserBalance() {
  const { coins, dollars } = useUserSlice()
  const [open, setOpen] = useState<TModal>("")

  return (
    <div className={s.userBalance}>
      <div className={s.dollars}>
        Balance: <LuBadgeDollarSign />
        {dollars} | <TbCoinTaka /> {coins}
      </div>

      <div className={s.btnsAddCurrency}>
        <button className="btn" onClick={() => setOpen("AddDollars")}>
          add Dollars <LuBadgeDollarSign />
        </button>
        <button
          className={cn("btn", s.btnExchange)}
          onClick={() => setOpen("Exchange")}
        >
          exchange Dollars <TbCoinTaka />
        </button>
      </div>
      <AddDollars
        isOpen={open === "AddDollars"}
        onRequestClose={() => setOpen("")}
      />
      <Exchange
        isOpen={open === "Exchange"}
        onRequestClose={() => setOpen("")}
      />
    </div>
  )
}

export default UserBalance
