'use client'

import { useState } from 'react'
import { MuiTelInput } from 'mui-tel-input'

function InputPhoneNumber({ numberPhone, errorsNumberPhone, userLoged, type, handleChangeNumberPhone, ...rest }) {

    const [open, setOpen] = useState(false)

    return ( 
        <MuiTelInput
            // open={open}
            // onClose={handleClose}
            placeholder='+52 + Teléfono'
            type={ userLoged && !type ? 'button' : 'text'}
            value={ numberPhone }
            onChange={handleChangeNumberPhone}
            size='small'
            error={ errorsNumberPhone ? true : false }
            helperText={ errorsNumberPhone ? errorsNumberPhone : ''}
            sx={{
                width: '100%',
                m: '0px',
                textAlign: 'left'
            }}
            disabled={ userLoged && !type ? true : false}
            inputProps={{
                sx: {
                    textAlign: 'left'
                }
            }}
            // InputProps={{
            //     startAdornment: (
            //         <InputAdorment onClik={handleClick} />
            //     )
            // }}
            MenuProps={{
                slotProps: {
                    root: {
                        sx: {
                            maxHeight: '350px',
                        }
                    }
                }
            }}
            // disableDropdown
            continents={['NA', 'SA', 'EU']}
            langOfCountryName="es"
            {...rest}
        />
    )
}

export default InputPhoneNumber