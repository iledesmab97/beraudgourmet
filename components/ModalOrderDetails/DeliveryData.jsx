import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'

const address = [
    { title: 'Direccion de entrega', name: 'address' },
    { title: 'Ciudad', name: 'townOrCity' },
    { title: 'Calle', name: 'street' },
    { title:'Edificio', name: 'businessOrBuilding'},
    { title: 'Nota', name:'note' }
]

function DeliveryData({deliveryInformation}) {
    return (
        <>
            <Typography variant='title'>INFORMACIÓN DE ENTREGA</Typography>
            {
                address.map((item) => (
                    
                    deliveryInformation[item.name] ? (
                        <Box
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
                                {deliveryInformation[item.name]}
                            </Typography>
                        </Box>
                    ) : null
                    
                ))
            }
        </>
    )
}

export default DeliveryData