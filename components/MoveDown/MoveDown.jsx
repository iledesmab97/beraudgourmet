import IconButton from '@mui/material/IconButton'

import ArrowDropDownCircleIcon from '@mui/icons-material/ArrowDropDownCircle'

import { useState, useEffect } from 'react'

import { scrollToSection } from '@/utils/modal'

import style from './MoveDown.module.css'

export default function MoveDown({ open, onClose, section}) {

    useEffect(() => {
        if (!open) {
            onClose()
        }
    }, [open])

    return (
        <>
            {
                open ? (
                    <IconButton
                        onClick={() => {scrollToSection(section)}}
                        sx={{
                            position: 'fixed',
                            bottom: '76px',
                            right: {
                                xs: '16px',
                                sm: '32px',
                                md: '48px'
                            },
                            width: 'fit-content'
                        }}
                        className={style.buttonMoveDown}
                    >
                        <ArrowDropDownCircleIcon color='primary' />
                    </IconButton>
                ) : null
            }
        </>
    )
}