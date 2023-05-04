import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { useForm } from "react-hook-form";
import {SignIn, SignUp} from '../api/api.js'
import TextField from '@mui/material/TextField';
import s from './modal.module.css'
import { useState } from 'react';

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
  const { register, formState: { errors }, handleSubmit } = useForm();
  const [err, setErr] = useState(false);

  async function onSubmit(data) {
    // console.log(data); 
   await SignUp(data).then(response => {
      console.log(response);
      if (response.status !== 201) {
        setErr (true);
      } else {
        setErr(false);
        handleClose();
        return response.json();
      }
    }).then(result => {
      console.log(result);
    });
  };

  return (
    <div>
      <Button onClick={handleOpen} color="inherit" variant="outlined">Зарегистрироваться</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Регистрация
          </Typography>
          <form className={s.modalInputs} onSubmit={handleSubmit(onSubmit)}>
          <TextField
                id="outlined-password-input"
                label="Введи свой Email"
                type="text"
                autoComplete="current-password"
                {...register('email', {required: true, pattern:/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/})}
              />
              {errors.email?.type === 'required' && <p className={s.err} role="alert">Поле не заполнено</p>}
              <TextField
                id="outlined-password-input"
                label="Пароль"
                type="password"
                autoComplete="current-password"
                {...register('password', {required: true})}
              />
              {errors.password?.type === 'required' && <p className={s.err} role="alert">Поле не заполнено</p>}
              <TextField
                id="outlined-password-input"
                label="Твоя группа"
                type="text"
                value='group-10'
                autoComplete="current-password"
                {...register('group')}
              />
              {err === true? <p className={s.err}>Имэйл занят или неподходящий пароль!</p> : null}
          <Button type="submit">Зарегистрироваться</Button>
          </form>
        </Box>
      </Modal>
    </div>
  );
}
