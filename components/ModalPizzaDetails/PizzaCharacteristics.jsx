import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemText from '@mui/material/ListItemText'
import Input from '@mui/material/Input'
import ExpandLess from '@mui/icons-material/ExpandLess'
import ExpandMore from '@mui/icons-material/ExpandMore'
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight'
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft'
import Collapse from '@mui/material/Collapse'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'

import { useState } from 'react'

function PizzaCharacteristics({ sizes }) {

    const [openColapse, setOpenColapse] = useState(false)

    function handleOpenColapse() {
        setOpenColapse(prevState => !prevState)
    }

    return (
        <Box
            sx={{
                width: '100%',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'flex-start'
            }}
        >
            <Typography variant='title' sx={{ alignSelf: 'center' }}>
                Tamaños y Masas Disponibles
            </Typography>
            <List>
                {
                    Object.entries(sizes).map(([size, masses]) => (
                        <Box
                            key={size}
                            sx={{
                                display: 'flex',
                                alignSelf: 'flex-start',
                                justifyContent: 'flex-start',
                                alignItems: 'center'
                            }}
                        >
                            <ListItem
                                onClick={handleOpenColapse}
                                sx={{
                                    // display: 'inline',
                                    width: 'fit-content'
                                }}
                            >
                                <ListItemText>
                                    <Input
                                        readOnly={true}
                                        value={size}
                                    />
                                </ListItemText>
                                {openColapse ? <KeyboardArrowLeftIcon /> : <KeyboardArrowRightIcon />}
                            </ListItem>
                            <Collapse
                                in={openColapse}
                                timeout={'auto'}
                                orientation='horizontal'
                            >
                                <TableContainer>
                                    <Table>
                                        <TableBody>
                                            {
                                                Object.entries(masses).map(([mass, cost]) => (
                                                    <TableRow key={mass}>
                                                        <TableCell>
                                                            <Input
                                                                readOnly={true}
                                                                value={mass}
                                                            />
                                                        </TableCell>
                                                        <TableCell>
                                                            <Input
                                                                readOnly={true}
                                                                value={cost}
                                                            />
                                                        </TableCell>
                                                    </TableRow>
                                                ))
                                            }
                                        </TableBody>
                                    </Table>
                                </TableContainer>
                            </Collapse>
                        </Box>
                    ))
                }
            </List>
        </Box>
    )
}

export default PizzaCharacteristics