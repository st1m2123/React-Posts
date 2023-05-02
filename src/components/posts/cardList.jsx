import React, { useState, useEffect, useContext } from "react";
import s from '../posts/post.module.css'
import { GetPost, PaginationPost, SearchPost } from '../api/api'
import Card from '../posts/card'
import { PageContext } from "../context.js";
import Pagination from "../posts/pagination";
import CreatePost from '../modal/modalCreatePost'
import { RequestContext } from "../context.js";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

const CardList = () => {
    const [posts, setPosts] = useState([]);
    const [pageContext, setPageContext] = useContext(PageContext);
    const countPage = 12;
    const [postLenght, setPostsLenght] = useState();
    const [requestContext, setRequestContext] = useContext(RequestContext);
    const navigate = useNavigate();

    useEffect(() => {
        requestContext === '' ? PaginationPost(pageContext, countPage).then(result => {
                setPosts(result.posts);
                setPostsLenght(result.total);
            }) : SearchPost(requestContext).then(result => {
                setPosts(result);
                console.log(result); })
    }, [pageContext, requestContext]);

    const renderPosts = posts.map((el) => {
        // console.log(posts);
        return (
            <Card Posts={{ name: el.author.name, about: el.author.about, avatar: el.author.avatar, image: el.image, text: el.text, like: el.likes.length, _id: el._id, likesInfo: el.likes, idAuthor: el.author._id, tags: el.tags }} />
        )
    });

    const handleViewFavPost = async () => {
        const userId = localStorage.getItem('_id');
        await GetPost().then(result => {
            let favPosts = [];
            result.map((e) => {
            for(let i of e.likes){
                if (i === userId) {
                    return favPosts.push(e)
                }
            }
        });
        setPosts(favPosts);
        setPageContext(null)
    })};

    const handleViewMyPosts = async () => {
        const userId = localStorage.getItem('_id');
        await GetPost().then(result => {
            let MyPosts = [];
            result.map((e) => {
                if (e.author._id === userId) {
                    MyPosts.push(e)
            }
        });
        setPosts(MyPosts);
        setPageContext(null);
    })
    }

    return (
        <>
            <div className={s.upperNav}>
                <CreatePost />
                <Button onClick={handleViewFavPost}>Показать любимые</Button>
                <Button onClick={handleViewMyPosts}>Мои посты</Button>
                <Button onClick={() => {setPageContext(1)}}>Все посты</Button>
                <Pagination countPost={postLenght} />
            </div>
            <div className={s.CardListBlock}>
                <div className={s.postList}>{posts === [] ? null : renderPosts}</div>
            </div>
            <div className={s.bottomNav}>
                <Pagination countPost={postLenght} />
            </div>
        </>
    );
}

export default CardList;