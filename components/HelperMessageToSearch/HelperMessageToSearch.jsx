import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'

export default function HelperMessageToSearch({ ...rest }) {
    return (
        <Box
            {...rest}
        >
            <Typography
                variant='title'
            >
                Busca algún elemento desde la barra del buscador
            </Typography>
        </Box>
    )
}