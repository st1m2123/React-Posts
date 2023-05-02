import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { useForm } from "react-hook-form";
import {SignIn} from '../api/api.js'
import { useNavigate } from 'react-router-dom';
import TextField from '@mui/material/TextField';
import {Context} from '../context.js'

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export default function BasicModal(modalOpen) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [userData, setUserData] = React.useState()
  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();
  const [context, setContext] = React.useContext(Context);

  async function onSubmit(data) {
    // console.log(data); 
   await SignIn(data).then(result => {
      console.log(result);
      localStorage.setItem('token', result.token);
      localStorage.setItem('_id', result.data._id);
      setContext(result.data);
    }
    );
    navigate('/');
  };

  return (
    <div>
      <Button onClick={handleOpen} color="inherit" variant="outlined">Войти</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Войти в учетную запись
          </Typography>
          <form onSubmit={handleSubmit(onSubmit)}>
          <TextField
                id="outlined-password-input"
                label="Ваш Email"
                type="text"
                autoComplete="current-password"
                {...register('email')}
              />
              <TextField
                id="outlined-password-input"
                label="Ваш пароль"
                type="password"
                autoComplete="current-password"
                {...register('password')}
              />
          <Button type="submit">Войти</Button>
          </form>
        </Box>
      </Modal>
    </div>
  );
}
