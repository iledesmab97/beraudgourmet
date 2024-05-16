import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'

import SelectDateTime from './SelectDateTime'

function SelectExtraData({ extraData, updateExtraData }) {

    function handleChangeDates(date, value) {
        const newExtraDates = {
            ...extraData,
            [date]: value
        }
        updateExtraData(newExtraDates)
    }

    return (
        <Grid item container>
            <Grid item>
                <Typography variant='title'>Datos Extra</Typography>
            </Grid>
            <Grid item container xs={12} spacing={2}>
                <Grid item xs>
                    <SelectDateTime
                        label={'Fecha de emición'}
                        value={extraData.applicationDate ? extraData.applicationDate : null}
                        onChange={(newDate) => {handleChangeDates('applicationDate', newDate)}}
                    />
                </Grid>
                <Grid item xs>
                    <SelectDateTime
                        label={'Fecha de entrega'}
                        value={extraData.deliveryDate ? extraData.deliveryDate : null}
                        onChange={(newDate) => {handleChangeDates( 'deliveryDate', newDate)}}
                    />
                </Grid>
            </Grid>
        </Grid>
    )
}

export default SelectExtraData