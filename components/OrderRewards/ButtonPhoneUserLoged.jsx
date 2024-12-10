'use client'

import InputPhoneNumber from '@/components/InputPhoneNumber/InputPhoneNumber'

function ButtonPhoneUserLoged({ inputs }) {

    return (
        <InputPhoneNumber
            numberPhone={inputs.numberPhone}
            userLoged={true}
            type={ "button" }
            disabled={true}
        />
    )
}

export default ButtonPhoneUserLoged