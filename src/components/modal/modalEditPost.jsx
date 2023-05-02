import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { useForm } from "react-hook-form";
import {CreatePost, SignIn} from '../api/api.js'
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import { EditPost } from '../api/api.js';
import axios from 'axios';
import { PostContext } from '../context.js';
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

export default function BasicModal(dataPost) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [userData, setUserData] = React.useState()
  const { register, handleSubmit } = useForm();
  const postData = dataPost.dataPost;
  const [title, setTitle] = React.useState(postData.title);
  const postId = postData._id;
  const [statuss, setStatus] = React.useState(null);
  const [postContext, setPostContext] = React.useContext(PostContext);

  function onSubmit(data) {
    axios.patch(`https://api.react-learning.ru/v2/group-10/posts/${postId}`, data,{
      headers: {'content-type': 'application/json',
      Authorization: localStorage.getItem('token')}
    })
      .then( (response) => {
        console.log(response.data);
        setStatus(true);
        handleClose();
        setPostContext(response.data);
      })
      .catch(function (error) {
        console.log(error);
        setStatus(false) 
      });
    // EditPost(postId, data).then(response => {
    //   response.json();
    //   console.log(typeof(response.status));
    //   response.status === 200 ? setStatus(true) : setStatus(false);
    //   statuss === true ? handleClose() : console.log('НЕ РАБОТАЕТ');
    // });
    
  };

  return (
    <div>
      <EditOutlinedIcon onClick={handleOpen} />
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Редактирование поста
          </Typography>
          <Avatar alt="Remy Sharp" src='https://icdn.lenta.ru/images/2022/11/30/12/20221130121740753/pwa_vertical_1280_b0487bf701142206b89f39d9622a2571.jpg '/>
          <form onSubmit={handleSubmit(onSubmit)}>
          <input type='text' placeholder={postData.title} {...register("title")} />
          <input type='text' placeholder={postData.image} {...register("image")}/>
          <textarea type='text' placeholder={postData.text} {...register("text")} />
          <button type="submit">Изменить</button>
          {statuss === false ? <p>Не получилось, попробуйте ввести другие данные</p> : null }
          </form>
        </Box>
      </Modal>
    </div>
  );
}
