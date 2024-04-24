"use client"

import { ChangeEvent, useState } from "react"

import { type IExchangeModalProps } from "./ExchangeModal.interface"
import { MdCurrencyExchange } from "react-icons/md"
import { TbCoinTaka } from "react-icons/tb"
import { MdErrorOutline } from "react-icons/md"
import useUserSlice from "@/store/userSlice"
import Modal from "../Modal"

import s from "./ExchangeModal.module.scss"
import toast, { Toaster } from "react-hot-toast"

const ExchangeModal = ({ isOpen, onRequestClose }: IExchangeModalProps) => {
  const [value, setValue] = useState("")
  const [totalCoins, setTotalCoins] = useState(0)
  const [error, setError] = useState("")
  const { exchangeCoins, dollars } = useUserSlice()

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value)
    setTotalCoins(+e.target.value * 1)
  }

  const onExchangeMoney = () => {
    setError("")
    if (value.length === 0) {
      return setError("You did not enter the number of dollars")
    }

    if (+value > dollars || dollars === 0) {
      return setError("You don't have enough dollars")
    }

    exchangeCoins(+value)
    setValue("")
    setTotalCoins(0)

    toast.success("The exchange was successful", {
      icon: "👌 |",
      style: {
        borderRadius: "10px",
        background: "var(--color-gray)",
        color: "var(--yellow)",
        textAlign: "center"
      }
    })
  }

  return (
    <>
      <Modal isOpen={isOpen} onRequestClose={onRequestClose}>
        <div className={s.wrapper}>
          <h2 className={s.title}>
            Exchange dollars for coins <TbCoinTaka />
          </h2>
          <p className={s.rate}>
            <MdCurrencyExchange size={20} /> Rate 1 to 1
          </p>
          <p>Enter the number of dollars</p>
          <input type="number" value={value} onChange={onChange} />
          {error && (
            <div className={s.error}>
              <MdErrorOutline size={20} />
              {error}
            </div>
          )}
          Coins: {totalCoins}
          <button className="btn" onClick={onExchangeMoney}>
            Exchange money
          </button>
        </div>
      </Modal>
      <Toaster position="top-center" />
    </>
  )
}

export default ExchangeModal
