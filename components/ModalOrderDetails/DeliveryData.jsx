import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'

import { useState, useEffect } from 'react'

import { getDeliveryInformationOfOrder } from '@/services/orderApi'

const address = [
    { title: 'Direccion de entrega', name: 'address' },
    { title: 'Ciudad', name: 'townOrCity' },
    { title: 'Calle', name: 'street' },
    { title:'Edificio', name: 'businessOrBuilding'},
    { title: 'Nota', name:'note' }
]

function DeliveryData({ delivery, loading, error }) {

    return (
        <>
            <Typography variant='title'>INFORMACIÓN DE ENTREGA</Typography>
            {
                loading && <h1>Loading...</h1>
            }
            {
                error && <h1>Error: {error}</h1>
            }
            {
                delivery ? (
                    address.map((item) => (
                            
                        delivery[item.name] ? (
                            <Box
                                key={item.name}
                                sx={{
                                    width: '100%',
                                    display: 'flex',
                                    justifyContent: 'space-between'
                                }}
                            >    
                                <Typography
                                    variant='p'
                                    gutterBottom
                                >
                                    {`${item.title}:`}
                                </Typography>
                                <Typography
                                    variant='p'
                                    gutterBottom
                                    align='right'
                                >
                                    {delivery[item.name]}
                                </Typography>
                            </Box>
                        ) : null
                        
                    ))
                ) : null
            }
        </>
    )
}

export default DeliveryData