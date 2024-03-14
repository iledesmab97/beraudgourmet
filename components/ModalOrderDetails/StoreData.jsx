import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'

const userInformation = [
    {title: 'ID', name: 'id'},
    {title: 'Tienda', name: 'name'},
    {title: 'Teléfono', name: 'phoneNumber'},
    {title: 'Dirección', name: 'address'}
]

function StoreData({store}) {
    return (
        <>
            <Typography variant='title'>TIENDA</Typography>
            {
                userInformation.map((item) => (
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
                            {store[item.name]}
                        </Typography>
                    </Box>
                ))
            }
        </>
    )
}

export default StoreData