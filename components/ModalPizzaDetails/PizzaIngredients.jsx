import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'

import ListPizzaIngredients from './ListPizzaIngredients'

function PizzaIngredients({ ingredients, id }) {

    return (
        <Box
            sx={{
                width: '100%',
                display: 'flex',
                flexDirection: 'column'
            }}
        >
            <Typography variant='title' sx={{ alignSelf: 'center' }}>
                Ingredientes
            </Typography>
            <Box>
                <ListPizzaIngredients ingredients={ingredients} id={id} />
            </Box>
        </Box>
    )
}

export default PizzaIngredients