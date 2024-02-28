'use client'

import { useState } from 'react'

import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Tabs from '@mui/material/Tabs'
import Tab from '@mui/material/Tab'

import styles from './TabBar.module.css'

const listTabs = [
    'Todas las ordenes',
    'Entregadas',
    'Pendientes'
]

function TabBar() {

    const [value, setValue] = useState(0)

    function handleChange(event, newValue) {
        setValue(newValue)
    }

    return (
        <Box className={styles.TabsBar}>
            <Tabs
                value={value}
                onChange={handleChange}
            >
                {
                    listTabs.map(tab => (
                        <Tab label={tab} />
                    ))
                }
            </Tabs>
        </Box>
    )
}

export default TabBar