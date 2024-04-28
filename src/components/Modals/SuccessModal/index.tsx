import { MdCloudDone } from "react-icons/md"

import { type ISuccessModalProps } from "./SuccessModal.interface"
import Modal from "../Modal"

import s from "./SuccessModal.module.scss"

function SuccessModal({ isOpen, onRequestClose }: ISuccessModalProps) {
  return (
    <Modal isOpen={isOpen} onRequestClose={onRequestClose}>
      <div className={s.wrapper}>
        <h2>Payment was successful</h2>
        <MdCloudDone size={100} />
      </div>
    </Modal>
  )
}

export default SuccessModal
