import React from 'react';
import Box from '@mui/material/Box';
import {Button, TextField, Modal } from '@mui/material/';
import { useAppDispatch, useAppSelector } from '../hooks/redux';
import { setModal } from '../redux/slices/modal'

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export default function UpdateModal() {

  const { openModal: { open } } = useAppSelector(state => state);

  const dispatch = useAppDispatch();

  const handleClose = () => {
    dispatch(setModal(false));
  }

  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <TextField
            required
            id="outlined-required"
            label="Nombre"
            placeholder="Nombre"
          />
          <Button>Actualizar</Button>
        </Box>
      </Modal>
    </div>
  );
}