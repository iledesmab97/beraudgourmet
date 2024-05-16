import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch'

import SelectDateTime from './SelectDateTime'

function SelectExtraData({ extraData, updateExtraData }) {

    function handleChangeDates(date, value) {
        const newExtraDates = {
            ...extraData,
            [date]: value
        }
        updateExtraData(newExtraDates)
    }

    function handleChangeChecked(event) {
        const newExtraData = {
            ...extraData,
            delivery: event.target.checked
        }
        updateExtraData(newExtraData)
    }

    return (
        <Grid item container spacing={2}>
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
            <Grid item sx={{ ml: 2}}>
                <FormGroup>
                    <FormControlLabel
                        control={
                            <Switch
                                checked={extraData.delivery ? true : false}
                                onChange={handleChangeChecked}
                            />
                        }
                        label={ extraData.delivery ? 'Delivery' : 'Recoger en tienda'}
                    />
                </FormGroup>
            </Grid>
        </Grid>
    )
}

export default SelectExtraData