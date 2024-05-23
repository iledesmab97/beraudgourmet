import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'

const userInformation = [
    {title: 'ID', name: 'id'},
    {title: 'Cliente', name: 'name'},
    {title: 'Teléfono', name: 'phoneNumber'}
]

function UserData({user}) {
    return (
        <>
            <Typography variant='title'>USUAIRO</Typography>
            {
                userInformation.map((item, index) => (
                    <Box
                        key={user[item.name] + String(index)}
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
                            {user[item.name]}
                        </Typography>
                    </Box>
                ))
            }
        </>
    )
}

export default UserData