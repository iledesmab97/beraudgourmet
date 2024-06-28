import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'

export default function HelperMessageToSearch({ text, ...rest }) {
    return (
        <Box
            {...rest}
        >
            <Typography
                variant='title'
            >
                {text}
            </Typography>
        </Box>
    )
}