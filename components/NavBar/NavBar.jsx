import Link from 'next/link'
import style from './NavBar.module.css'
import links from './navbarpaths.json'

function NavBar () {
  return (
    <div className={style.NavBarContainer}>
      <ul className={style.NavBar}>
        {
          links.map((link) => (
            <li key={link.title}>
              <Link href={link.path}>{link.title}</Link>
            </li>
          ))
        }
      </ul>
      <ul className={style.NavBar}>
        {
          links[0].subNav.map((link) => (
            <li key={link.title}>
              <Link href={link.path}>{link.title}</Link>
            </li>
          ))
        }
      </ul>
    </div>
  )
}

export default NavBar
