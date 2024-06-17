import IconButton from '@mui/material/IconButton'

import ArrowDropDownCircleIcon from '@mui/icons-material/ArrowDropDownCircle'

import useMoveDown from '@/hooks/useMoveDown'

import { scrollToSection } from '@/utils/modal'

import style from './MoveDown.module.css'

export default function MoveDown({ sectionToGo, containerId, ...rest}) {

    const { visibilityArrow } = useMoveDown({ containerId })

    return (
        <>
            {
                visibilityArrow ? (
                    <IconButton
                        onClick={() => { scrollToSection(sectionToGo) }}
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
                        {...rest}
                    >
                        <ArrowDropDownCircleIcon color='primary' />
                    </IconButton>
                ) : null
            }
        </>
    )
}