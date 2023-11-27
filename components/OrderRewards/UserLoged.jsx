'use client'

import useGetModal from '@/hooks/useGetModal'

import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import AccountCircle from '@mui/icons-material/AccountCircle'
import LocalPhoneIcon from '@mui/icons-material/LocalPhone'

function UserLoged({ userLoged }) {

    const {handleOpenModalUser} = useGetModal({modalType: 'user'})

    return (
        <Box
            component={'div'}
            sx={{
              display:'flex',
              flexDirection: 'column',
              gap: 1
            }}
        >
        <Typography
            variant='title'
            gutterBottom
        >
            Cuenta
        </Typography>

            <Button
                variant='outlined'
                color='secondary'
                startIcon={<AccountCircle />}
                sx={{
                    display: 'flex',
                    justifyContent: 'flex-start',
                    alignItems: 'center',
                    textTransform: 'none',
                }}
                onClick={handleOpenModalUser}
            >
                <Typography
                    variant='p'
                    gutterBottom
                    sx={{
                        mb: '0px',
                    }}
                >  
                    {userLoged.name}
                </Typography>
            </Button>

            <Button
                variant='outlined'
                color='secondary'
                startIcon={<LocalPhoneIcon />}
                sx={{
                    display: 'flex',
                    justifyContent: 'flex-start',
                    alignItems: 'center',
                    textTransform: 'none',
                }}
                onClick={handleOpenModalUser}
            >
                <Typography
                    variant='p'
                    gutterBottom
                    sx={{
                        mb: '0px',
                    }}
                    >  
                        {userLoged.numberPhone}
                </Typography>
            </Button>
        </Box>
    )
}

export default UserLoged