import Image from 'next/image'
import items from './menuStore.json'
import style from './ContainerItems.module.css'

function ContainerItems () {
  return (
    <div className={style.ContainerItems}>
      <h1 className={style.ContainerItemsTitle}>
        <strong>Pizzas</strong>
      </h1>
      <ul className={style.listItems}>
        {
            items.map(item => (
              <li key={item.name}>
                <figure>
                  <Image
                    src={item.image}
                    alt={item.name}
                    fill
                  />
                </figure>
                <label>{item.name}</label>
                <span>${item.price}</span>
                <p>{item.text}</p>
              </li>
            ))
        }
      </ul>
    </div>
  )
}

export default ContainerItems
