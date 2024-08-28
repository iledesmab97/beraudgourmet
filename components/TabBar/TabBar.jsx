'use client'

import { useState } from 'react'

import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Tabs from '@mui/material/Tabs'
import Tab from '@mui/material/Tab'

import styles from './TabBar.module.css'

function TabBar({ tabSelected, handleChange, listTabs }) {

    return (
        <Box
            className={styles.TabsBar}
        >
            <Tabs
                value={tabSelected}
                onChange={handleChange}
                variant="scrollable"
                scrollButtons
                allowScrollButtonsMobile
            >
                {
                    listTabs.map(tab => (
                        <Tab label={tab} key={tab} />
                    ))
                }
            </Tabs>
        </Box>
    )
}

export default TabBar