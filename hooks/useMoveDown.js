import { useState, useEffect } from 'react'

import { showScrollPosition } from '@/utils/modal'

function useMoveDown ({ containerId }) {

    const [visibilityArrow, setVisibilityArrow] = useState(false)
    const [container, setContainer] = useState(null)

    useEffect(() => {
        const newContainer = document.querySelector(containerId)
        if (newContainer) {
            setContainer(newContainer)
        }
    }, [containerId])

    useEffect(() => {
        if (!container) return
        if (container.offsetHeight < container.scrollHeight) setVisibilityArrow(true)
        container.addEventListener('scroll', handleVisibilityArrow)

        const resizeObserver = new ResizeObserver(entries => {
            for (let entry of entries) {
                if ( entry.target.offsetHeight < entry.target.scrollHeight ) {
                    setVisibilityArrow(true)
                } else {
                    setVisibilityArrow(false)
                }
            }
        })

        resizeObserver.observe(container)

        return () => {
            container.removeEventListener('scroll', handleVisibilityArrow)

            resizeObserver.unobserve(container)
        }
    }, [container])

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