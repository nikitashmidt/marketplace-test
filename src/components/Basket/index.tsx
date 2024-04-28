import BasketList from "./BasketList"
import UserBalance from "./UserBalance"

function Basket() {
  return (
    <section>
      <div className="container">
        <UserBalance />
        <BasketList />
      </div>
    </section>
  )
}

export default Basket
