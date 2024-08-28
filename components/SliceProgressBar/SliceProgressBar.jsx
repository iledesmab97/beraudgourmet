import Box from '@mui/material/Box'
import Divider from '@mui/material/Divider'

import CircleNumber from '@/components/CircleNumber/CircleNumber'

import useGetSteps from '@/hooks/useGetSteps'

const numberSteps = {
    user: 1,
    order: 2,
    store: 3,
    pay: 4
}

function getColorBorder(section, steps) {
    if (steps[section]) return '#295386'
    return ''
}

function SliceProgressBar({ section }) {

    const { steps } = useGetSteps()

    return (
        <Box
            sx={{
                position: 'absolute',
                top: '0px',
                right: '230px',
                height: '100%',
                width: 'fit-content',
                display: 'flex',
                flexDirection: 'column'
            }}
        >
            <CircleNumber
              number={numberSteps[section]}
              color={ section === 'pay' ? Object.values(steps).some(section => !section) ? '' : '#295386' : steps[section] ? '#295386' : '' }
              sx={{
                width: '24px',
                height: '24px',
                position: 'relative',
                mt: section === 'user' || section === 'order' ? '4px' : '13px'
              }}
            />
            {
                section !== 'pay' && (
                    <Divider
                        orientation='vertical'
                        sx={{
                            height: 'calc(100% - 35px)',
                            mt: '8px',
                            borderColor: getColorBorder(section, steps) ,
                            transform: 'translateX(-50%)'
                        }}
                    />
                ) 
            }
        </Box>
    )
}

export default SliceProgressBar