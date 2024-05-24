import { NextResponse } from 'next/server'
import { jwtVerify } from 'jose'
import { fetchwhoAmI, whatHappen } from '@/services/userApi'
import { notFound } from 'next/navigation'

export async function middleware(request) {
    const tokenUser = request.cookies.get('tokenUser')
    const { pathname } = request.nextUrl
    if ( pathname.includes('/admin') ) {
        console.log('entrando en admin')
        let user
        let user2
        try {
            console.log('tokenUser:', tokenUser)
            user = await fetchwhoAmI(tokenUser)
            user2 = await fetchwhoAmI()
            console.log('user:', user)
            console.log('user2:', user2)
            await whatHappen(user)
            await whatHappen(user2)
            // if (user.message) return NextResponse.error()
            // if ( user.RoleId > 2 ) return NextResponse.error()
        } catch(error) {
            console.log('error:', error)
            await whatHappen(error.message)
            return NextResponse.redirect(new URL('/pizzas', request.url))
        }
        if ( !user || user.message || user.RoleId > 2 ) {
            // return notFound()
            return NextResponse.redirect(new URL('/not-found', request.url))
        }
    }

    return NextResponse.next()
}