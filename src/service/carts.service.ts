import axios from "axios"
import { type IDataCarts } from "@/types/global.types"

export const CartsService = {
  BASE_URL: "https://dummyjson.com/carts",

  getAllCarts: async () => {
    const res = await axios.get<IDataCarts>(CartsService.BASE_URL)
    return res.data
  }
}
