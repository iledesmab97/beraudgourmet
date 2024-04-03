import Image from 'next/image'
import Box from '@mui/material/Box'

function PizzaImage({pizza}) {
    return (
        <Box
            sx={{
                width: '100%',
                height: '200px',
                minHeight: '200px',
                position: 'relative'
            }}
        >
            <Image
                src={pizza.image}
                alt={pizza.name}
                fill={true}
                sizes='auto'
                style={{
                    objectFit: 'contain'
                }}
            />    
        </Box>
    )
}

export default PizzaImage