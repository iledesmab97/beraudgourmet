import Image from 'next/image'
import style from './OrderRewards.module.css'
import logoBeraud from '@/public/images/homeimg/homeimgberaud/logoBeraud.png'

function OrderRewards () {
  console.log(logoBeraud)
  return (
    <form className={style.ContainerOrderRewards}>
      <figure>
        <Image src={logoBeraud} alt='logoBeraud' />
      </figure>
      <section className={style.Registration}>
        <label>Iniciar Sesión / Registrarse</label>
        <input type='text' placeholder='Dirección de correo electrónico' />
        <input type='text' placeholder='Nombre completo' />
        <input type='text' placeholder='Teléfono' />
      </section>

      <section className={style.Order}>
        <label>Tienda</label>
        <button>Ver la lista de tienda</button>
        <label>Pedido</label>
        <span>Su pedido está vacio</span>
        <input type='text' placeholder='Ingrese el código del cupón' />
        <div>
          <label>Total</label>
          <label>$0.00</label>
        </div>
      </section>

      <button>Siguiente paso</button>
    </form>
  )
}

export default OrderRewards
