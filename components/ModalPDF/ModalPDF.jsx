'use client'

import { useState, useEffect } from 'react';
import useGetModal from '@/hooks/useGetModal'

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import Typography from '@mui/material/Typography';
import ButtonGroup from '@mui/material/ButtonGroup';

import ShowPDF from '@/components/ModalPDF/ShowPDF'

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 700,
  height: 700,
  bgcolor: 'background.paper',
  boxShadow: 24,
  borderRadius: 5,
  p: 5,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'flex-start',
  gap: 2,
}

export default function ModalPDF() {

  const {open, handleCloseModal} = useGetModal({modalType: 'legal'})

  return (
    <Modal
        open={open}
        onClose={() => {handleCloseModal('legal')}}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
    >
        <Box sx={style}>
            <Typography
                variant='title'
                component="h2"
                align='center'
                sx={{
                    mb: 5
                }}
            >
                {'Términos y condiciones'}
            </Typography>
            <ShowPDF />
        </Box>
    </Modal>
  );
}