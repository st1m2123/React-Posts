import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import MenuItem from '@mui/material/MenuItem';
import { Context } from "../context"
import { EditAvatar, EditProfile } from '../api/api'
import { useForm } from "react-hook-form";
import TextField from '@mui/material/TextField';
import s from './modal.module.css'
import Avatar from '@mui/material/Avatar';

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

export default function BasicModal() {
  const { register, handleSubmit } = useForm();
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [context, setContext] = React.useContext(Context);
  const [avatar, setAvatar] = React.useState(context.avatar);
  const [editState, setEditState] = React.useState(false);
  console.log(context);

  function onSubmit(data) {
    EditProfile({ "name": data.name, "about": data.about });
    EditAvatar({ "avatar": data.avatar }).then(result => setContext(result));
    handleClose()
  };

  function handleChangeAvatar(e) {
    console.log(e.target.value);
    if (e.target.value !== ''){
      setAvatar(e.target.value);
    } else {
      setAvatar(context.avatar)
    }
    
  }
  return (
    <div>
      <MenuItem onClick={handleOpen}>Профиль</MenuItem>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box className={s.contentBox} sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Информация вашего профиля
          </Typography>
          <Avatar sx={{ width: 200, height: 200, margin: 2 }} alt="Remy Sharp" src={avatar}/>
            {editState === false ? <form className={s.modalInputs}>
              <label>Ваше имя: {context.name}</label>
              <label>О вас: {context.about}</label>
              <label>Ваш электронный адрес: {context.email}</label>
              <label>Ваш электронный адрес: {context.group}</label>
              <Button onClick={() => {setEditState(true)}}>Изменить информацию профиля</Button>
            </form> :
              <form className={s.modalInputs} onSubmit={handleSubmit(onSubmit)}>
              <TextField
                id="outlined-password-input"
                label="Твоё имя"
                type="text"
                autoComplete="current-password"
                {...register('name')}
              />
              <TextField
                id="outlined-password-input"
                label="О себе"
                type="text"
                autoComplete="current-password"
                {...register('about')}
              />
              <TextField
                id="outlined-password-input"
                label="Аватар URL"
                type="text"
                autoComplete="current-password"
                {...register('avatar')}
                onChange={handleChangeAvatar}
              />
              <Button type='submit'>Изменить</Button>
              <Button onClick={() => {setEditState(false)}}>Отмена</Button>
            </form>}
        </Box>
      </Modal>
    </div>
  );
}
