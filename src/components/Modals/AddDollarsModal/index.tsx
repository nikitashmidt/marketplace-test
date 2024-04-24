"use client"

import toast, { Toaster } from "react-hot-toast"
import { useState } from "react"

import Modal from "../Modal"
import { type IAddDollarsModalProps } from "./AddDollarsModal.interface"
import useUserSlice from "@/store/userSlice"
import { MdErrorOutline } from "react-icons/md"

import s from "./AddDollarsModal.module.scss"

const AddDollarsModal = ({ isOpen, onRequestClose }: IAddDollarsModalProps) => {
  const { addDollars } = useUserSlice()
  const [value, setValue] = useState("")
  const [error, setError] = useState("")

  const addMoney = () => {
    if (value.length === 0) {
      return setError("You did not enter the number of dollars")
    }

    toast.success("Balance successfully replenished!", {
      icon: "👌 |",
      style: {
        borderRadius: "10px",
        background: "var(--color-gray)",
        color: "var(--yellow)",
        textAlign: "center"
      }
    })
    addDollars(Number(value))
    setValue("")
  }

  return (
    <>
      <Modal isOpen={isOpen} onRequestClose={onRequestClose}>
        <div className={s.wrapper}>
          <h2>Replenishment of balance</h2>
          <p>Enter the number of dollars</p>
          <input
            type="number"
            value={value}
            onChange={(e) => setValue(e.target.value)}
          />
          {error && <div className={s.error}><MdErrorOutline />{error}</div>}
          <button
            type="button"
            name="button"
            className="btn"
            onClick={addMoney}
          >
            Add
          </button>
        </div>
      </Modal>
      <Toaster position="top-center" />
    </>
  )
}

export default AddDollarsModal
