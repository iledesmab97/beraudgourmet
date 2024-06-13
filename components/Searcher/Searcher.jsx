import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField'

import { useState, useEffect } from 'react'
import useDebounce from '@/hooks/useDebounce'

import { getAllUsers } from '@/services/userApi'

function Searcher({ handleChangeUsers, ...rest }) {

    const [text, setText] = useState('')
    const { debounceSetValue } = useDebounce()

    useEffect(() => {
        debounceSetValue(() => {
            findUsers()
        }, 500)
    }, [text])

    function handleText(newText) {
        setText(newText)
    }

    async function findUsers() {
        const response = await getAllUsers({ name: text, email: text, phoneNumber: text })
        console.log('response:', response)
        handleChangeUsers(response)
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