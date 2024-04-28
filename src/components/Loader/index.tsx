import s from "./Loader.module.scss"

function Loader() {
  return (
    <div className={s.loadinState}>
      <div className={s.loading} />
    </div>
  )
}

export default Loader
