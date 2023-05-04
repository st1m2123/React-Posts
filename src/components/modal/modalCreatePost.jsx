import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { useForm } from "react-hook-form";
import {CreatePost, SignIn} from '../api/api.js'
import TextField from '@mui/material/TextField';
import s from './modal.module.css'
import { useNavigate } from 'react-router-dom';
import Avatar from '@mui/material/Avatar'

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
  const [postImage, setPostImage] = React.useState('');

  function onSubmit(data) {
    // console.log(data.tags.split(','));
    // const tag = data.tags.split(',');
    // console.log(tag); 
    const dataPost = {
      title: data.title,
      text: data.text,
      image: data.image,
      tags: data.tags.split(',')
    };
    CreatePost(dataPost).then(result => {
      console.log(result);
      handleClose();
      navigate(`/news/${result._id}`);
    });
  };

  function handleChangePostImage(e) {
    console.log(e.target.value);
    if (e.target.value !== ''){
      console.log("работает билять");
      setPostImage(e.target.value);
    } else {
      setPostImage('https://static.vecteezy.com/system/resources/previews/005/337/799/original/icon-image-not-found-free-vector.jpg')
    }
  };

  return (
    <div>
      <Button onClick={handleOpen} color="inherit" variant="contained">Создать пост</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box className={s.contentBox} sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Создание нового поста
          </Typography>
          <Avatar sx={{ width: 200, height: 200, margin: 2 }} alt="Remy Sharp" src={postImage}/>
          <form className={s.modalInputs} onSubmit={handleSubmit(onSubmit)}>
          <TextField
                id="outlined-password-input"
                label="Заголовок"
                type="text"
                autoComplete="current-password"
                {...register('title')}
              />
              <TextField
                id="outlined-password-input"
                label="Ссылка на изображение"
                type="text"
                autoComplete="current-password"
                {...register('image')}
                onChange={handleChangePostImage}
              />
              <TextField
                id="outlined-password-input"
                label="Тест поста"
                type="text"
                autoComplete="current-password"
                {...register('text')}
              />
              <TextField
                id="outlined-password-input"
                label="Теги"
                type="text"
                autoComplete="current-password"
                {...register('tags')}
              />
          <Button type="submit">Создать</Button>
          </form>
        </Box>
      </Modal>
    </div>
  );
}
