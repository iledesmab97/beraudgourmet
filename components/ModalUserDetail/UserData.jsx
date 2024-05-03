import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import Divider from '@mui/material/Divider'

import InputUpdate from '@/components/InputUpdate/InputUpdate'

const RolsES = {
    client: 'Cliente',
    root: 'Dueño',
    admin: 'Administrador'
}

function UserData({ user }) {

    console.log('user:', user)

    return (
        <Grid
            container
            spacing={2}
        >
            <Grid item xs={12} container justifyContent={'space-around'}>
                <Grid item xs={3}>
                    <Typography>Nombre:</Typography>
                </Grid>
                <Grid item xs={5}>
                    <Typography align='right'>{user.name}</Typography>
                </Grid>
            </Grid>
            <Grid item xs={12}>
                <Divider sx={{width: '100%'}}/>
            </Grid>
            <Grid item xs={12} container justifyContent={'space-around'}>
                <Grid item xs={3}>
                    <Typography>Email:</Typography>
                </Grid>
                <Grid item xs={5}>
                    <Typography align='right'>{user.email}</Typography>
                </Grid>
            </Grid>
            <Grid item xs={12}>
                <Divider sx={{width: '100%'}}/>
            </Grid>
            <Grid item xs={12} container justifyContent={'space-around'}>
                <Grid item xs={3}>
                    <Typography >Teléfono:</Typography>
                </Grid>
                <Grid item xs={5}>
                    <Typography align='right'>{user.phoneNumber}</Typography>
                </Grid>
            </Grid>
            <Grid item xs={12}>
                <Divider sx={{width: '100%'}}/>
            </Grid>
            <Grid item container xs={12} justifyContent={'space-around'}>
                <Grid item xs={3}>
                    <Typography>Verificado:</Typography>
                </Grid>
                <Grid item xs={5}>
                    <Typography align='right'>{user.verified ? 'Sí' : 'No'}</Typography>
                </Grid>
            </Grid>
            <Grid item xs={12}>
                <Divider sx={{width: '100%'}}/>
            </Grid>
            <Grid item container xs={12} justifyContent={'space-around'}>
                <Grid item xs={3}>
                    <Typography>Rol:</Typography>
                </Grid>
                <Grid item xs={5} >
                    <Typography align='right'>{RolsES[user.Role]}</Typography>
                </Grid>
            </Grid>
        </Grid>
    )
}

export default UserData