import { NextResponse } from 'next/server'
import { jwtVerify } from 'jose'

export async function middleware(request) {
    
    const tokenUser = request.cookies.get('tokenUser')
    const { pathname } = request.nextUrl

    if ( pathname.includes('/admin') ) {
        if (!tokenUser) return NextResponse.error()
        try {
            const { payload } = await jwtVerify(tokenUser.value, new TextEncoder().encode('secret'))
            if ( payload.RoleId > 2 ) return NextResponse.error()
            return NextResponse.next()
        } catch(error) {
            console.log(error.message)
            return NextResponse.redirect(new URL('/menu', request.url))
        }
    }

    return NextResponse.next()
}