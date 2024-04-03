import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemText from '@mui/material/ListItemText'
import Input from '@mui/material/Input'

import InputUpdate from '@/components/InputUpdate/InputUpdate'

function PizzaIngredients({ ingredients }) {
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
            <List>
                {
                    ingredients.map(ingredient => (
                        <ListItem key={ingredient}>
                            <ListItemText
                                primary={
                                    <InputUpdate value={ingredient} />
                                }
                            />
                        </ListItem>
                    ))
                }       
            </List>
        </Box>
    )
}

export default PizzaIngredients