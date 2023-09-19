import logo from './logo.svg';
import './App.css';
import Header from './components/header/header'
import Modal from './components/modal/modalLogin'
import { useContext, useEffect, useState, forwardRef } from 'react';
import Button from '@mui/material/Button';
import NotFound from './components/notFound/notFound'
import CardList from './components/posts/cardList';
import Test from './components/text'
import { GetUserData, OpenPost } from './components/api/api';
import {Context, PageContext, RequestContext, PostContext} from '../src/components/context';
import { Route, Routes, useLocation, useNavigate,BrowserRouter } from 'react-router-dom';
import PostPage from './components/postPage/postPage';
import CreatePost from './components/modal/modalCreatePost'
import s from './app.module.css'
import Pagination from './components/posts/pagination'
import Footer from './components/footer/footer'
import dayjs from 'dayjs';
import Stack from '@mui/material/Stack';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

const Alert = forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});


function App() {
  const [context, setContext] = useState('null');
  const [pageContext, setPageContext] = useState(1);
  const [requestContext, setRequestContext] = useState("");
  const [postContext, setPostContext] = useState(null);
  const [messageAlert, setMessageAlert] = useState('');
  const [open, setOpen] = useState(false);
  const [colorAlert, setColorAlert] = useState();

    useEffect(() => {
      if (context !== 'null'){
        console.log(context);
        setColorAlert('success')
        setMessageAlert("Вход выполнен. Добро пожаловать!")
        handleClick()
      }
      if (context === "Вышли из аккаунта!"){
        setColorAlert('info')
        setMessageAlert("Вы вышли из аккаунта, до скорых встречь!")
        handleClick();
        setContext('null')
      }
    }, [context])
    useEffect(() => {
      if (localStorage.getItem('token') !== null){
        GetUserData().then(result => setContext(result))
      }
    },[]);

    const handleClick = () => {
      setOpen(true);
    };
  
    const handleClose = (event, reason) => {
      if (reason === 'clickaway') {
        return;
      }
  
      setOpen(false);
    };

  return (
<>  
<Stack spacing={3} sx={{ width: '100%' }}>
      <Snackbar anchorOrigin={{ vertical: 'top', horizontal: 'center' }} open={open} autoHideDuration={3000} onClose={handleClose}>
        <Alert onClose={handleClose} severity={colorAlert} sx={{ width: '100%' }}>
          {messageAlert}
        </Alert>
      </Snackbar>
    </Stack>
    <RequestContext.Provider value={[requestContext, setRequestContext]}>
    <Context.Provider value={[context, setContext]}>
    <PageContext.Provider value={[pageContext, setPageContext]}>
    <PostContext.Provider value={[postContext, setPostContext]}>
    <Header/>
    <div className={s.mainBlock}>
    {/* <CardList/> */}
    {/* <PostPage/> */}
    <Routes>
    <Route path='*' element={<NotFound/>}/>
      <Route path='/' element={localStorage.getItem('token') === null ? <NotFound/> : <><CardList/></>}/>
      <Route path='news/:_id' element={<PostPage/>}/>
      <Route path='login' element={<NotFound/>}/>
    </Routes>
    </div>
    <Footer className={s.footer}/>
    </PostContext.Provider>
    </PageContext.Provider>
    </Context.Provider>
    </RequestContext.Provider>
    
</>
  );
}

export default App;
