import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField'

import { useState, useEffect } from 'react'
import useDebounce from '@/hooks/useDebounce'

import { getAllUsers } from '@/services/userApi'

function Searcher({ handleChangelist, makeRequest, propertiesToSearch, ...rest }) {

    const [text, setText] = useState('')
    const { debounceSetValue } = useDebounce()

    useEffect(() => {
        debounceSetValue(() => {
            findElement()
        }, 500)
    }, [text])

    function handleText(newText) {
        setText(newText)
    }

    async function findElement() {
        const properties = {}
        propertiesToSearch.forEach(property => {
            properties[property] = text
        })
        let response
        if (!text) {
            response = []
        } else {
            response = await makeRequest(properties)
        }
        handleChangelist(response)
    }

    return (
        <Box
         {...rest}
        >
            <TextField
                variant='outlined'
                label='Buscar...'
                value={text}
                onChange={(event) => {handleText(event.target.value)}}
            />
        </Box>
    )
}

export default Searcher