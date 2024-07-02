import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'

function Ups({text}) {
    return (
        <Box
            sx={{
                width: '100%',
                position: 'absolute',
                top: '30%',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center'
            }}
        >
            <Typography component={'h1'} variant='encabezado' >Ups</Typography>
            <Typography component={'p'} variant='p' >{text ? text : 'Algo salió mal pero no se que fué'}</Typography>        
        </Box>
    )
}

export default Ups