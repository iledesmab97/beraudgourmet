'use client'

import ButtonGroup from '@mui/material/ButtonGroup'
import Button from '@mui/material/Button'

function ButtonGroupPizza({ handleClick, size, listSizes }) {
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
                disabled={!listSizes.includes('30cm')}
                value={'30cm'}
                sx={size === '30cm'
                    ? {
                        backgroundColor: 'rgb(28, 58, 93)'
                    } : {}}
            >
                {'30 cm'}
            </Button>
            <Button
                onClick={handleClick}
                disabled={!listSizes.includes('45cm')}
                value={'45cm'}
                sx={size === '45cm'
                    ? {
                        backgroundColor: 'rgb(28, 58, 93)'
                    } : {}}
            >
                {'45 cm'}
            </Button>
            <Button
                onClick={handleClick}
                disabled={!listSizes.includes('60cm')}
                value={'60cm'}
                sx={size === '60cm'
                    ? {
                        backgroundColor: 'rgb(28, 58, 93)'
                    } : {}}
            >
                {'60 cm'}
            </Button>
            {/* <Button onClick={handleSize} value={'18"'}>{'18"'}</Button> */}
        </ButtonGroup>
    )
}

export default ButtonGroupPizza