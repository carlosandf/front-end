import Box from '@mui/material/Box';
import { Typography, Modal } from '@mui/material/';
import { useAppDispatch } from '../hooks/redux';
import { setModal } from '../redux/slices/modal'

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
  width: "90%",
  maxWidth: '500px',
  borderRadius: "7px"
};

const InfoModal = (props: any) => {
  const {open, info} = props;
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
          <Typography id="modal-modal-title" variant="h5" component="h3" sx={{ mb: 3 }}>
            Información del cliente
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            <b>Cliente:</b> {info.fullName}
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            <b>Identificación:</b> {info.identification}
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            <b>Telefono:</b> {info.phone}
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            <b>Dirección:</b> {info.address}
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            <b>Fecha de registro:</b> {new Date(info.date).toDateString()}
          </Typography>
        </Box>
      </Modal>
    </div>
  );
}
export default InfoModal;