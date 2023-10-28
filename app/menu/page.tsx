import ContainerItems from '../../components/ContainerItems/ContainerItems'
import OrderRewards from '../../components/OrderRewards/OrderRewards'
import style from './page.module.css'

function Menu () {
  return (
    <main className={style.ContainerMenu}>
      <section className={style.ItemsList_Rewards}>
        <ContainerItems />
        <OrderRewards />
      </section>
    </main>
  )
}

export default Menu
