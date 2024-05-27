import { NextResponse } from 'next/server'
import { jwtVerify } from 'jose'
import { fetchwhoAmI, whatHappen } from '@/services/userApi'
import { notFound } from 'next/navigation'

// export async function middleware(request) {
//     // const tokenUser = request.cookies.get('tokenUser')
//     const { pathname } = request.nextUrl
//     if ( pathname.includes('/admin') ) {
//         let user
//         try {
//             user = await fetchwhoAmI(tokenUser)
//             // if (user.message) return NextResponse.error()
//             // if ( user.RoleId > 2 ) return NextResponse.error()
//         } catch(error) {
//             return NextResponse.redirect(new URL('/pizzas', request.url))
//         }
//         if ( !user || user.message || user.RoleId > 2 ) {
//             // return notFound()
//             // return NextResponse.redirect(new URL('/not-found', request.url))
//             await whatHappen({user, message: user.message, role: user.RoleId})
//         }
//     }

//     return NextResponse.next()
// }

// export async function middleware(request) {
//     // const tokenUser = request.cookies.get('tokenUser')
//     const { pathname } = request.nextUrl
//     if ( pathname.includes('/admin') ) {
//         const user = await fetchwhoAmI()
//         // console.log('respuesta del fetchwhoAmI desde el middleware:', user)
//         // if (!tokenUser) return NextResponse.error()
//         if (!user) return NextResponse.error()
//         try {
//             // const { payload } = await jwtVerify(tokenUser.value, new TextEncoder().encode('secret'))
//             // if ( payload.RoleId > 2 ) return NextResponse.error()
//             if ( user.RoleId > 2 ) return NextResponse.error()
//                 return NextResponse.next()
//         } catch(error) {
//             console.log(error.message)
//             return NextResponse.redirect(new URL('/pizzas', request.url))
//         }
//     }

//     return NextResponse.next()
// }

export async function middleware(request) {
    const tokenUser = request.cookies.get('tokenUser')
    const { pathname } = request.nextUrl
    if ( pathname.includes('/admin') ) {
        const user = await fetchwhoAmI(tokenUser)
        const user2 = await fetchwhoAmI()
        const reponse = await whatHappen({tokenUser, user, user2})
        // if (!tokenUser) return NextResponse.error()
        if (user.message) return NextResponse.error()
        try {
            // const { payload } = await jwtVerify(tokenUser.value, new TextEncoder().encode('secret'))
            // if ( payload.RoleId > 2 ) return NextResponse.error()
            if ( user.RoleId > 2 ) return NextResponse.error()
                return NextResponse.next()
        } catch(error) {
            console.log(error.message)
            return NextResponse.redirect(new URL('/pizzas', request.url))
        }
    }

    return NextResponse.next()
}