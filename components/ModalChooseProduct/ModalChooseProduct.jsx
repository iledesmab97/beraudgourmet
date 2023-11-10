'use client'

import { useState, useRef } from 'react'
import useGetModal from '@/hooks/useGetModal'
import useHandleOder from '@/hooks/useHandleOrder'
import ChooseProduct from './ChooseProduct'

import Modal from '@mui/material/Modal';

export default function ModalChooseProduct() {

  const {open, handleCloseModalOrder} = useGetModal({modalType:'order'})

  return (
    <Modal
      open={open}
      onClose={handleCloseModalOrder}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <ChooseProduct />
    </Modal>
  );
}