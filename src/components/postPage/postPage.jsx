import React, { useContext, useEffect, useState } from "react";
import {DeleteComment, DeleteLike, GetComment, OpenPost, PostComment, PutLike, DeletePost} from '../api/api'
import s from './postPage.module.css'
import FavoriteIcon from '@mui/icons-material/Favorite';
import IconButton from '@mui/material/IconButton';
import Loading from '../elements/loading'
import Avatar from '@mui/material/Avatar';
import { useForm } from "react-hook-form";
import { Context, PostContext } from "../context";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@mui/material";
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import ModalEdit from '../modal/modalEditPost'
import TextField from '@mui/material/TextField';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import { createTheme, ThemeProvider, styled } from '@mui/material/styles';
import Boxx from '../postPage/box'
import { useTheme } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import SkipPreviousIcon from '@mui/icons-material/SkipPrevious';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import SkipNextIcon from '@mui/icons-material/SkipNext';
import dayjs from 'dayjs';
import Snackbar from '../snackbar/snackbar';


const Item = styled(Paper)(({ theme }) => ({
    ...theme.typography.body2,
    color: theme.palette.text.secondary,
    height: 'auto'
  }));
  
  const darkTheme = createTheme({ palette: { mode: 'dark' } });
  const lightTheme = createTheme({ palette: { mode: 'light' } });

  function Elevation(main) {
    return (
      <Grid container spacing={4}>
        {[lightTheme].map((theme, index) => (
          <Grid item xs={6} key={index}>
            <ThemeProvider theme={theme}>
              <Box
                sx={{
                  p: 1,
                  bgcolor: 'background.default',
                  display: 'grid',
                  gridTemplateColumns: { md: '1fr' },
                  gap: 2,
                }}
              >
                <Item key={24} elevation={24}>
                    {main}
                </Item>
              </Box>
            </ThemeProvider>
          </Grid>
        ))}
      </Grid>
    );
  }

function PostPage () {
    const [context, setContext] = React.useContext(Context);
    const [postInfo, setPostInfo] = useState(null);
    const [commentInfo, setCommentInfo] = useState([]);
    const [isLiked, setIsLiked] = useState(false);
    const { register, handleSubmit } = useForm();
    const [countLikes, setCountLikes] = useState(0);
    let {_id} = useParams();
    const [postContex, setPostContext] = React.useContext(PostContext);
    const navigate = useNavigate();

    useEffect(() => {
        OpenPost(_id).then(result => {setPostContext(result);
            setCountLikes(result.likes.length)
            for(let i of result.likes){
                console.log(i);
                if (i === localStorage.getItem('_id')){
                 setIsLiked(true); 
                  }
                  }}
        );
        GetComment(_id).then(result => {setCommentInfo(result);      });
      }, []);
      function handleDeleteComment(id){
        DeleteComment(_id,id).then(result => setCommentInfo(result.comments));
      }
      
      const comment = commentInfo.map ((e) => {
        console.log(e);
        return(
        <div className={s.commentBlock}>
        <div>
        <div className={s.userComment}>
        <Avatar alt="Travis Howard" src={e.author.avatar} />
        <div className={s.profile}>
        <h5>{e.author.name}</h5>
        <p>{e.author.about}</p>
        </div>
        </div>
        <p>Комментарий: {e.text}</p>
        </div>
        {e.author._id === localStorage.getItem('_id') ? <div className={s.delBtn} onClick={() => {handleDeleteComment(e._id)}}><p>Удалить</p><HighlightOffIcon/></div>: null}
        </div>)
    } );
    const tags = postContex === null? null : postContex.tags.map((e) => {
            console.log(e);
            return(
        <p className={s.tags}>{e}</p>
        )})

    function handleLike(){
        isLiked === true ? DeleteLike(_id).then(result => setCountLikes(result.likes.length)) && setIsLiked(false) :PutLike(_id).then(result => setCountLikes(result.likes.length)) && setIsLiked(true)
        };

    function onSubmit(data) {
        PostComment(_id, data).then(result => setCommentInfo(result.comments));
      };

    return(
        <>
        {postContex === null ? <Loading/> : 
        <div className={s.stateBox}>
            <Item elevation={4} className={s.postBox}>
            <div className={s.leftBlock}>
                <img className={s.postPhoto} src={postContex.image}/>
                <h3>{postContex.title}</h3>
                <p>{postContex.text}</p>
            </div>
            <div>
            <div className={s.rightInfo}>
                <div className={s.postBtn}>
                <div className={s.profilePost}>
                    <img className={s.userAvatar} src={postContex.author.avatar} alt="" />
                    <div className={s.profileUserText}>
                        <h5>{postContex.author.name}</h5>
                        <p>{postContex.author.about}</p>
                    </div>
                </div> 
                <div>
                {context._id === postContex.author._id ? <IconButton aria-label="add to favorites" onClick={() => {DeletePost(postContex._id); navigate('/')}}><DeleteForeverIcon/><p>Удалить пост</p></IconButton> : null}
                {context._id === postContex.author._id ? <IconButton aria-label="Изменить пост"><ModalEdit dataPost={{...postContex}}/></IconButton> : null}
                </div>
                </div>
                <p>Дата публикации: {dayjs(postContex.created_at).format('HH:MM DD.MM.YYYY')}</p>
                <div className={s.postBtns}>
                <IconButton className={s.IconLike} onClick={handleLike} aria-label="add to favorites">
                 {isLiked === false ? <FavoriteIcon/> : <FavoriteIcon className={s.userLiked}/>}
                 <p>{countLikes}</p>
                 </IconButton>
                 <div className={s.caseTags}>
                <p>Теги:</p>
                {postContex === null ? null : tags}
                </div>
                </div>
                <div className={s.commentBox}>
        <h2>Комментарии</h2>
        <div className={s.commentBoxUser}>
            {comment}
        </div>
            <form className={s.commentForm} onSubmit={handleSubmit(onSubmit)}>
            <TextField
            id="outlined-multiline-static"
            label="Введите ваш текст"
            multiline
            rows={3}
            defaultValue=""
            {...register("text")}
            />
            <button className={s.btn} >Опубликовать комментарий</button>
        </form>
        </div>
            </div>
            </div>
        </Item>
        
        </div>
        }
       
        </>
    )
} 

export default PostPage;