'use client'

import InputPhoneNumber from '@/components/InputPhoneNumber/InputPhoneNumber'
import Box from "@mui/material/Box";

import useGetModal from '@/hooks/useGetModal'

function ButtonPhoneUserLoged({ inputs }) {
    
    const { handleOpenModal } = useGetModal({modalType: 'user'})
    
    function handleClick(event) {
        handleOpenModal('user')
    }

    return (
        <Box
            onClick={handleClick}
            sx={{
                position: "relative"
            }}
        >
            <InputPhoneNumber
                numberPhone={inputs.numberPhone}
                userLoged={true}
            />
            <Box
                sx={{
                    position: "absolute",
                    top: "0px",
                    left: "0px",
                    width: "100%",
                    height: "100%",
                    backgroundColor: "transparent",
                    border: "1px solid rgba(0,0,0,0.24)",
                    borderRadius: "4px",
                    cursor: "pointer",
                    "&:hover": {
                        border: "1px solid black",
                    }
                }}
            />
        </Box>
    )
}

export default ButtonPhoneUserLoged