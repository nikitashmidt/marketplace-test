import { type IProduct } from "@/types/global.types"

export interface IBasketProps {
  products: IProduct[]
}

export interface IBasketListProps extends IBasketProps {}
