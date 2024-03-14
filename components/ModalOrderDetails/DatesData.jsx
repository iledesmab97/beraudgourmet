import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'

const userInformation = [
    {title: 'Fecha de emisión', name: 'dateEmited'},
    {title: 'Fecha de entrega', name: 'dateToRecive'}
]

function DatesData({dates}) {
    return (
        <>
            <Typography variant='title'>FECHAS</Typography>
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
                        >
                            {dates[item.name]}
                        </Typography>
                    </Box>
                ))
            }
        </>
    )
}

export default DatesData