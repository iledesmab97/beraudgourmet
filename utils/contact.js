const PHONE_NUMBER = process.env.NEXT_PUBLIC_PHONE_NUMBER

// export const phoneNumber = '+525552954221'
export const phoneNumber = PHONE_NUMBER
export const text1 = 'Quieres comunicarte con nosotros para dejarnos alguna sugerencia'
export function greet(name) {
    return `Saludos, mi nombre es ${name} y me gustaría hacer un pedido de: `
}

const typeText = {
    transfer: greet
}

export function contactUs({context, name, order}) {
    if (context === 'transfer') {
        return window.open(`https://wa.me/${phoneNumber}/?text=${typeText[context](name) + order}`, '_blank')
    }
}