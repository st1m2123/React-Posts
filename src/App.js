import logo from './logo.svg';
import './App.css';
import Header from './components/header/header'
import Modal from './components/modal/modalLogin'
import { useContext, useEffect, useState } from 'react';
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

function App() {
  const [context, setContext] = useState("default context value");
  const [pageContext, setPageContext] = useState(1);
  const [requestContext, setRequestContext] = useState("");
  const [postContext, setPostContext] = useState(null);
    useEffect(() => {
      GetUserData().then(result => setContext(result));
    },[]);
    // const [postInfo, setPostInfo] = useState([])
    // useEffect(() => {
    //     OpenPost("643ecd8e3291d790b3f34ad8").then(result => setPostInfo(result));
    //     console.log(postInfo);
    //   }, []);
  return (
<>  
    <RequestContext.Provider value={[requestContext, setRequestContext]}>
    <Context.Provider value={[context, setContext]}>
    <PageContext.Provider value={[pageContext, setPageContext]}>
    <PostContext.Provider value={[postContext, setPostContext]}>
    <Header/>
    <div className={s.mainBlock}>
    {/* <CardList/> */}
    {/* <PostPage/> */}
    <Routes>
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
