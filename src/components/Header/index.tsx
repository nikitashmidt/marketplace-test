import { CiShoppingBasket } from "react-icons/ci"
import cn from "classnames"
import Link from "next/link"

import FavoritesCount from "./FavoritesCount"

import s from "./Header.module.scss"

const Header = () => {
  return (
    <header className={s.header}>
      <div className={cn("container", s.container)}>
        <div className={s.name}>
          <Link href={"/"}>Mini Marketplace</Link>
        </div>
        <nav>
          <ul className={s.menu}>
            <li>
              <Link href={"/basket"} className={s.link}>
                <CiShoppingBasket size={35} />
                Cart
                <FavoritesCount />
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  )
}

export default Header
