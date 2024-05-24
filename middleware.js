import { NextResponse } from 'next/server'
import { jwtVerify } from 'jose'
import { fetchwhoAmI } from '@/services/userApi'


export async function middleware(request) {
    const tokenUser = request.cookies.get('tokenUser')
    const { pathname } = request.nextUrl
    if ( pathname.includes('/admin') ) {
        try {
            const user = await fetchwhoAmI(tokenUser)
            if (user.message) return NextResponse.error()
            if ( user.RoleId > 2 ) return NextResponse.error()
            return NextResponse.next()
        } catch(error) {
            // return NextResponse.redirect(new URL('/pizzas', request.url))
            return console.log('Ha ocurrido un error:', error.message)
        }
    }

    return NextResponse.next()
}