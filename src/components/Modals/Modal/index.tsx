import MyModal from "react-modal"
import { type IModalProps } from "./Modal.interface"

function Modal({ children, ...props }: IModalProps) {
  const customStyles = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
      backgroundColor: "var(--color-gray)",
      borderColor: "transparent",
      borderRadius: "18px"
    },
    overlay: {
      backgroundColor: "rgb(255 255 255 / 17%)",
      zIndex: "999"
    }
  }

  return (
    <MyModal style={customStyles} {...props} ariaHideApp={false}>
      {children}
    </MyModal>
  )
}

export default Modal
