import Typography from '@mui/material/Typography'

export default function CrossText ({children, ...rest}) {
    return (
        <Typography
            {...rest}
            sx={{
                textDecoration: 'line-through'
            }}
        >
            {children}
        </Typography>
    )
}