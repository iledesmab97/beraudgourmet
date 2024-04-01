import { NextResponse } from 'next/server'
import { jwtVerify } from 'jose'
import { fetchwhoAmI } from '@/services/userApi'


export async function middleware(request) {
    // const tokenUser = request.cookies.get('tokenUser')
    const { pathname } = request.nextUrl

    if ( pathname.includes('/admin') ) {
        const user = await fetchwhoAmI()
        // console.log('respuesta del fetchwhoAmI desde el middleware:', user)
        // if (!tokenUser) return NextResponse.error()
        if (!user) return NextResponse.error()
        try {
            // const { payload } = await jwtVerify(tokenUser.value, new TextEncoder().encode('secret'))
            // if ( payload.RoleId > 2 ) return NextResponse.error()
            if ( user.RoleId > 2 ) return NextResponse.error()
            return NextResponse.next()
        } catch(error) {
            console.log(error.message)
            return NextResponse.redirect(new URL('/menu', request.url))
        }
    }

    return NextResponse.next()
}