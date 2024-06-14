import { useState, useEffect } from 'react'

import { showScrollPosition } from '@/utils/modal'

function useMoveDown ({ containerId }) {

    const [visibilityArrow, setVisibilityArrow] = useState(true)

    useEffect(() => {
        const container = document.querySelector(containerId)
        container.addEventListener('scroll', handleVisibilityArrow)

        return () => {
            container.removeEventListener('scroll', handleVisibilityArrow)
        }
    }, [containerId])

    function handleVisibilityArrow() {
        const { vertical } = showScrollPosition(containerId)
        toggleVisitiblityArrow(vertical === 0 ? true : false)
    }

    function toggleVisitiblityArrow(newValue) {
        setVisibilityArrow(newValue)
    }

    return { visibilityArrow }
}

export default useMoveDown