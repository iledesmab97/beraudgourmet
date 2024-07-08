import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import Divider from '@mui/material/Divider'
import TextField from '@mui/material/TextField'
import InputAdornment from '@mui/material/InputAdornment'

import InputUpdate from '@/components/InputUpdate/InputUpdate'

function CostSection({ salad, saladNew, errors, handleChangeInput, handleInputsChecked }) {
    return (
        <Grid
            container
            // justifyContent={'center'}
            spacing={3}
            sx={{
                width: '100%',
            }}
        >
            <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center' }}>
                <Typography component={'h2'} variant={'title'} >Precio</Typography>
            </Grid>
            <Grid item xs={4} sx={{ display: 'flex', alignItems: 'center' }} >
                <Typography>Precio:</Typography>
            </Grid>
            <Grid item xs sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end' }}>
                <InputUpdate
                    value={salad.cost}
                    // updateProperty={updateExtraIngredientDB}
                    // updateState={updateExtraIngredientFront}
                    properties={{ id: salad.id, property: 'cost' }}
                    // validateError={validationPrice}
                    pizzaNew={saladNew}
                    errors={errors.cost}
                    handleChangeInput={handleChangeInput}
                    handleInputsChecked={handleInputsChecked}
                    startAdornment={<InputAdornment position="start">$</InputAdornment>}
                    sx={{
                        width: '160px'
                    }}
                />
            </Grid>
            <Grid item xs={12}>
                <Divider />
            </Grid>
            {
                !saladNew ? (
                    <>
                        <Grid item xs={4} sx={{ display: 'flex', alignItems: 'center' }} >
                            <Typography>Precio al público:</Typography>
                        </Grid>
                        <Grid item xs sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end' }} >
                            <TextField
                                value={salad.costIVAStripe}
                                disabled
                                InputProps={{
                                    startAdornment: <InputAdornment position="start">$</InputAdornment>
                                }}
                                sx={{
                                    width: '160px'
                                }}
                            />
                        </Grid>
                    </>
                ) : null
            }
        </Grid>
    )
}

export default CostSection