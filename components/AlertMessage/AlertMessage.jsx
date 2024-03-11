'use client'

import Box from '@mui/material/Box'
import Alert from '@mui/material/Alert'
import CheckIcon from '@mui/icons-material/Check'
import Collapse from '@mui/material/Collapse';

import useGetAlertMessage from '@/hooks/useGetAlertMessage'

import styles from './AlertMessage.module.css'

function AlertMessage() {

    const { alertMessage, handleCloseAlertMessage } = useGetAlertMessage()

    return (
        <Box
            className={styles.containerAlertMessage}
        >
            <Collapse
                in={alertMessage.checked}
                orientation="horizontal"
                className={styles.containerCollapse}
            >
                <Alert
                    icon={<CheckIcon fontSize='inherit' />}
                    severity={alertMessage.status}
                    onClose={handleCloseAlertMessage}
                    variant='filled'
                    sx={{
                        width: '400px'
                    }}
                    className={styles.containerAlert}
                >
                    {alertMessage.text}
                </Alert>
            </Collapse>
        </Box>
    )
}

export default AlertMessage