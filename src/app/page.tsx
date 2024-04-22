import Goods from "@/components/Products"
import { type IDataCarts } from "@/types/global.types"
import axios from "axios"

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

async function Home() {
  const { carts } = (await getData()) as IDataCarts

  return (
    <main>
      <Goods products={carts.map(({ products }) => products).flat()} />
    </main>
  )
}

export default Home
