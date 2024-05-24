import { NextResponse } from 'next/server'
import { jwtVerify } from 'jose'
import { fetchwhoAmI } from '@/services/userApi'
import { notFound } from 'next/navigation'

export async function middleware(request) {
    const tokenUser = request.cookies.get('tokenUser')
    const { pathname } = request.nextUrl
    if ( pathname.includes('/admin') ) {
        let user
        try {
            user = await fetchwhoAmI(tokenUser)
            // if (user.message) return NextResponse.error()
            // if ( user.RoleId > 2 ) return NextResponse.error()
        } catch(error) {
            return NextResponse.redirect(new URL('/pizzas', request.url))
        }
        if ( !user || user.message || user.RoleId > 2 ) {
            // return notFound()
            return NextResponse.redirect(new URL('/not-found', request.url))
        }
    }

    return NextResponse.next()
}