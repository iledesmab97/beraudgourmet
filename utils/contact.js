// export const phoneNumber = '+5552954221'
export const phoneNumber = '+584169015765'
export const text1 = 'Quieres comunicarte con nosotros para dejarnos alguna sugerencia'
export const text2 = 'Saludos, me gustaría hacer un pedido de: '

const typeText = {
    transfer: text2
}

export function contactUs({context, order}) {
    if (context === 'transfer') {
        return window.open(`https://wa.me/${phoneNumber}/?text=${typeText[context] + order}`, '_blank')
    }
    // window.location.href = `https://wa.me/${phoneNumber}/?text=${text2}`
}