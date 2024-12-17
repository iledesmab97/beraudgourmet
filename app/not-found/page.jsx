import Link from 'next/link'

function NotFound() {
    return (
        <main>
            <h2>Hay un problema</h2>
            <p>No encontramos la páginas que estas buscando</p>
            <p>Ir al <Link href='/'>inicio</Link></p>
        </main>
    )
}

export default NotFound