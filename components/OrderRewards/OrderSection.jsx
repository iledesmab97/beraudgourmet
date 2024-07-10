'use client'


import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import Divider from '@mui/material/Divider'
import ListItemText from '@mui/material/ListItemText'
import IconButton from '@mui/material/IconButton'

import CloseIcon from '@mui/icons-material/Close'

import CrossText from '@/components/CrossText/CrossText'
import SliceProgressBar from '@/components/SliceProgressBar/SliceProgressBar'

import useGetOrder from '@/hooks/useGetOrders'
import useGetModal from '@/hooks/useGetModal'

export default function OrderSection () {

  const {orders, handleRemoveOrder} = useGetOrder()
  const {handleOpenModalOrder} = useGetModal({modalType: 'order'})

  return (
      <Box
        id='OrderSection-container'
        sx={{
          position: 'relative',
          borderBottom: 1,
          borderColor: 'divider'
        }}
      >
        <Typography
          variant='title'
          gutterBottom
        >
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
                          onClick={() => {
                            handleOpenModalOrder({item: order, index: String(index)})
                          }}
                          component={'div'}
                          sx={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            "&:hover": {
                              cursor: 'pointer'
                            }
                          }}
                        >
                          { order.quantity + ' x ' + order.name + (order.productType === 'pizza' ? ` (${order.size})` : '')}
                          <Typography>
                            ${order.totalPrice}
                          </Typography>
                        </Box>
                      }
                      secondary={
                        <>
                          {`${order.productType === 'pizza' ? order.mass + '' : ''}${ ( order.productType === 'pizza' && Object.keys(order.extra).length ? ', ' : '') + Object.keys(order.extra).map(ingredient => {
                            return `${order.extra[ingredient]}x ${ingredient}`
                          }).join(', ')
                          }`}
                          {
                            order.ingredientsModal.map((ingredient, index) => (
                              <Box key={ingredient + index} component={'label'}>{ order.productType === 'pizza' ? ', ' : Object.keys(order.extra).length || index > 0 ? ', ' : '' }<CrossText component={'span'}>{ingredient}</CrossText></Box>
                            ))
                          }
                        </>
                      }
                    >
                    </ListItemText>
                    <IconButton
                      size='small'
                      variant='text'
                      color='error'
                      // endIcon={<DeleteIcon />}
                      onClick={() => {
                        handleRemoveOrder(index)}}
                      sx={{
                        position: 'absolute',
                        top: '0px',
                        left: '95%',
                        p: '0px',
                        m: '5px'
                      }}
                    >
                      <CloseIcon />
                    </IconButton>
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
        <SliceProgressBar section={'order'} />
      </Box>
  )
}