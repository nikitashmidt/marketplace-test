"use client"

import { type IPayModalProps } from "./PayModal.interface"
import { useState } from "react"

import { TbCoinTaka } from "react-icons/tb"
import { LuBadgeDollarSign } from "react-icons/lu"
import { MdErrorOutline } from "react-icons/md"

import Modal from "../Modal"
import useFavoritesSlice from "@/store/favoritesSlice"
import useUserSlice from "@/store/userSlice"
import SuccessModal from "../SuccessModal"

import s from "./PayModal.module.scss"

type Options = "coin" | "dollar" | ""

const PayModal = ({ isOpen, onRequestClose, finalPrice }: IPayModalProps) => {
  const { favoritesId, clearFavoritesId } = useFavoritesSlice()
  const { coins, dollars, paymentDollars, paymentСoins } = useUserSlice()
  const [selectedOption, setSelectedOption] = useState<Options>("")
  const [error, setError] = useState<string>("")
  const [isSuccess, setIsSuccess] = useState(false)

  const options = [
    { value: "coin", label: "Coin" },
    { value: "dollar", label: "Dollar" }
  ]

  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedOption(event.target.value as Options)
  }

  const onPay = () => {
    if (selectedOption === "") {
      return setError("Payment method not selected")
    }
    setError("")

    if (finalPrice > coins && selectedOption !== "dollar") {
      setError("You don't have enough coins")
    }

    if (finalPrice > dollars && selectedOption === "dollar") {
      setError("You don't have enough dollars")
    }

    if (selectedOption === "dollar") {
      paymentDollars(finalPrice)
      setIsSuccess(true)
      clearFavoritesId()
      onRequestClose()
    }

    if (selectedOption === "coin") {
      paymentСoins(finalPrice)
      setIsSuccess(true)
      clearFavoritesId()
      onRequestClose()
    }
  }

  return (
    <>
      <Modal isOpen={isOpen} onRequestClose={onRequestClose}>
        <div className={s.wrapper}>
          <h2>Payment for the order</h2>
          <div className={s.totalPrice}>
            Final Price - {finalPrice}{" "}
            {selectedOption === "dollar" ? (
              <LuBadgeDollarSign />
            ) : (
              <TbCoinTaka />
            )}
          </div>
          <div>Number of products: {favoritesId.length} </div>
          <select
            className={s.select}
            value={selectedOption || ""}
            onChange={handleSelectChange}
          >
            <option value="default">Select payment option</option>
            {options.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
          {error && (
            <div className={s.error}>
              <MdErrorOutline size={20} />
              {error}
            </div>
          )}
          <button className="btn" onClick={onPay}>
            Pay for cart
          </button>
        </div>
      </Modal>
      <SuccessModal
        isOpen={isSuccess}
        onRequestClose={() => setIsSuccess(false)}
      />
    </>
  )
}

export default PayModal
