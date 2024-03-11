'use client'

import Box from '@mui/material/Box'
import Alert from '@mui/material/Alert'
import CheckIcon from '@mui/icons-material/Check'
import Collapse from '@mui/material/Collapse';

import { useState } from 'react';

import styles from './AlertMessage.module.css'

function AlertMessage({ checked, handleChecked, text, status}) {

    return (
        <Box
            className={styles.containerAlertMessage}
        >
            <Collapse
                in={checked}
                orientation="horizontal"
            >
                <Alert
                    icon={<CheckIcon fontSize='inherit' />}
                    severity={status}
                    onClose={() => {handleChecked(false)}}
                    variant='filled'
                    sx={{
                        width: '400px'
                    }}
                >
                    {text}
                </Alert>
            </Collapse>
        </Box>
    )
}

export default AlertMessage