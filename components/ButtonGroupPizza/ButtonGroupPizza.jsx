'use client'

import ButtonGroup from '@mui/material/ButtonGroup'
import Button from '@mui/material/Button'

function ButtonGroupPizza({ handleClick, size }) {

    return (
        <ButtonGroup
            size='large'
            variant='contained'
            aria-label="contained large button group"
            sx={{
                // width: 216
                width: 'fit-content'
            }}
        >
            <Button
                onClick={handleClick}
                value={'12"'}
                sx={size === '12"'
                    ? {
                        backgroundColor: 'rgb(28, 58, 93)'
                    } : {}}
            >
                {'12"'}
            </Button>
            <Button
                onClick={handleClick}
                value={'14"'}
                sx={size === '14"'
                    ? {
                        backgroundColor: 'rgb(28, 58, 93)'
                    } : {}}
            >
                {'14"'}
            </Button>
            <Button
                onClick={handleClick}
                value={'16"'}
                sx={size === '16"'
                    ? {
                        backgroundColor: 'rgb(28, 58, 93)'
                    } : {}}
            >
                {'16"'}
            </Button>
            {/* <Button onClick={handleSize} value={'18"'}>{'18"'}</Button> */}
        </ButtonGroup>
    )
}

export default ButtonGroupPizza