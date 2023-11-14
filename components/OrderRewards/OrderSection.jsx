'use client'

import useGetOrder from '@/hooks/useGetOrders'
import CrossTet from '@/components/CrossText/CrossText'

import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import IconButton from '@mui/material/IconButton'
import Avatar from '@mui/material/Avatar';
import DeleteIcon from '@mui/icons-material/Delete'
import CloseIcon from '@mui/icons-material/Close';

export default function OrderSection () {

  const {orders} = useGetOrder()

  function showOrder() {
    console.log(orders)
  }

  return (
      <Box sx={{borderBottom: 1, borderColor: 'divider'}}>
          <Typography
            variant='title'
            gutterBottom>
            Pedido
          </Typography>
          <List
            sx={{
              width: '100%',
              // maxWidth: 360,
              // bgcolor: 'background.paper'
            }}
          >
            {
              orders.length > 0
                ? orders.map((order, index) => (
                  <Box key={order.name + order.totalPrice + ' ' + index}>
                    <Divider />
                    <ListItem
                    >
                      <ListItemText
                        primary={
                          <Box
                            component={'div'}
                            sx={{
                              display: 'flex',
                              justifyContent: 'space-between'
                            }}
                          >
                            { order.quantity + ' x ' + order.name + ` (${order.size})`}
                            <Typography>
                              ${order.totalPrice}
                              <IconButton
                                size='small'
                                variant='text'
                                color='error'
                                // endIcon={<DeleteIcon />}
                                sx={{
                                  position: 'absolute',
                                  top: '0px'
                                }}
                              >
                                <CloseIcon />
                              </IconButton>
                            </Typography>
                          </Box>
                        }
                        secondary={
                          <>
                            {`${order.mass}${Object.keys(order.extra).map(ingredient => {
                              return `, ${order.extra[ingredient]}x ${ingredient}`
                            }).join('')
                            }`}
                            {
                              order.ingredientsModal.map((ingredient, index) => (
                                <Box key={ingredient + index} component={'label'}>, <CrossTet component={'span'}>{ingredient}</CrossTet></Box>
                              ))
                            }
                          </>
                        }
                      >

                      </ListItemText>
                    </ListItem>
                    <Divider />
                  </Box>
                )): (
                    <Typography variant='p'>
                      Su pedído está vacio
                    </Typography>
                  )
            }
          </List>
          <Button variant='contained' onClick={showOrder}>Mostrar pedido</Button>
        </Box>
  )
}