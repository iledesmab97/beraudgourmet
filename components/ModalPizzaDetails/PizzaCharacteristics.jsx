import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemText from '@mui/material/ListItemText'
import Input from '@mui/material/Input'
import ExpandLess from '@mui/icons-material/ExpandLess'
import ExpandMore from '@mui/icons-material/ExpandMore'
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
        <Box>
            <Typography variant='title'>
                Tamaños y Masas Disponibles
            </Typography>
            <List>
                {
                    Object.entries(sizes).map(([size, masses]) => (
                        <>
                            <ListItem
                                onClick={handleOpenColapse}
                            >
                                <ListItemText>
                                    <Input
                                        readOnly={true}
                                        value={size}
                                    />
                                </ListItemText>
                                {openColapse ? <ExpandLess /> : <ExpandMore />}
                            </ListItem>
                            <Collapse in={openColapse} timeout={'auto'}>
                                <TableContainer>
                                    <Table>
                                        <TableHead>
                                            <TableRow>
                                                <TableCell>Masa</TableCell>
                                                <TableCell>Costo</TableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            {
                                                Object.entries(masses).map(([mass, cost]) => (
                                                    <TableRow>
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
                        </>
                    ))
                }
            </List>
        </Box>
    )
}

export default PizzaCharacteristics