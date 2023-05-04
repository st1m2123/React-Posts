import * as React from 'react';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import s from '../posts/post.module.css'
import { Button } from '@mui/material';
import { Link } from 'react-router-dom';
import sc from './card.module.css'
import { DeleteLike, PutLike, DeletePost } from '../api/api';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import st from '../postPage/postPage.module.css'

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
}));

export default function RecipeReviewCard({Posts}) {
    const {name,about, avatar, image, text, like, _id, likesInfo, idAuthor, tags} = Posts;
  const [expanded, setExpanded] = React.useState(false);
  const [isLiked, setIsLiked] = React.useState(false);
  const [countLikes, setCountLikes] = React.useState(0);

  React.useEffect(() => {
    setCountLikes(likesInfo.length)
    setIsLiked(false);
    for(let i of likesInfo){
    if (i === localStorage.getItem('_id')){
     setIsLiked(true);
    }}}, [Posts]);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  function handleLike(){
    isLiked === true ? DeleteLike(_id).then(result => setCountLikes(result.likes.length)) && setIsLiked(false) :PutLike(_id).then(result => setCountLikes(result.likes.length)) && setIsLiked(true)
    };

 
    const tagMap = tags.map((e) => {
      return(
        <p className={st.tags}>{e}</p>
    )})

  return (
    <Card className={sc.card} sx={{ maxWidth: 345 }}>
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
            <img src={avatar} className={s.avatarImg}/>
          </Avatar>
        }
        title={name}
        subheader={about}
      />
      <CardMedia
        component="img"
        height="194"
        image={image}
        alt="Paella dish"
      />
      <div style={{marginTop: "20px"}} className={st.caseTags}>
                <h5>Теги:</h5>
      {tagMap}
      </div>
      <CardContent>
        <Typography noWrap='false' variant="body2" color="text.secondary">
          {text}
        </Typography>
      </CardContent>
      <CardActions className={sc.btnFlex} disableSpacing>
      <IconButton className={sc.iconBtn} onClick={handleLike} aria-label="add to favorites">
                 {isLiked === false ? <FavoriteIcon className={sc.btnLike}/> : <FavoriteIcon className={sc.Liked}/>}
                 <p>{countLikes}</p>
                 </IconButton>
        {idAuthor === localStorage.getItem('_id') ? <IconButton onClick={() => {DeletePost(_id)}} aria-label="Удалить пост"><DeleteForeverIcon/></IconButton> : null}
        <Link className={sc.btnMore} to={'news/'+ _id}>Прочитать полностью</Link>
      </CardActions>
    </Card>
  );
}