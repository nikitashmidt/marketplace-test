import { CartsService } from "@/service/carts.service"
import { useQuery } from "@tanstack/react-query"

function useCartsQuery() {
  return useQuery({
    queryKey: ["carts"],
    queryFn: () => {
      return CartsService.getAllCarts()
    }
  })
}

export default useCartsQuery
