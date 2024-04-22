import axios from "axios"

import Basket from "@/components/Basket"
import { type IDataCarts } from "@/types/global.types"

async function getData() {
  try {
    const res = await axios.get("https://dummyjson.com/carts")

    if (res.status !== 200) {
      throw new Error("Failed to fetch data")
    }

    return res.data
  } catch (error) {
    console.error(error)
  }
}

async function Page() {
  const { carts } = (await getData()) as IDataCarts

  return <Basket products={carts.map(({ products }) => products).flat()} />
}

export default Page
