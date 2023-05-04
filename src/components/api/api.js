const Headers = {
    headers: {
        'Content-Type': 'application/json',
    }
}
const url = "https://api.react-learning.ru/";

const hueta = {
    "email": "st1m2123@gmail.com",
    "password": "password123"
}

export function SignIn(userData) {
    console.log(userData);
    return fetch('https://api.react-learning.ru/signin', {
        method: 'POST',
        headers: {
            'content-type': 'application/json'
        },
        body: JSON.stringify(userData)
    })
}

export const GetPost = () => {
    return fetch('https://api.react-learning.ru/v2/group-10/posts/', {
        method: 'GET',
        headers: {
            'content-type': 'application/json',
            Authorization: localStorage.getItem('token')
        },
    }).then(response => response.json())
}

export const GetUserData = ()  => {
    return fetch ('https://api.react-learning.ru/users/me', {
        method: 'GET',
        headers: {
            'content-type': 'application/json',
            Authorization: localStorage.getItem('token')
        },
    }).then(response => response.json())
}

export const OpenPost =(id) =>{
return fetch( `https://api.react-learning.ru/v2/group-10/posts/${id}`, {
    method: 'GET', 
    headers: {
        'content-type': 'application/json',
        Authorization: localStorage.getItem('token')
    }
}).then(response => response.json())
}

export const GetComment =(id) =>{
    return fetch( `https://api.react-learning.ru/v2/group-10/posts/comments/${id}`, {
        method: 'GET', 
        headers: {
            'content-type': 'application/json',
            Authorization: localStorage.getItem('token')
        }
    }).then(response => response.json())
    }

export const PostComment = (id, text) => {
    console.log(text);
    return fetch (`https://api.react-learning.ru/v2/group-10/posts/comments/${id}`, {
        method: 'POST',
        headers : {
            'content-type': 'application/json',
            Authorization: localStorage.getItem('token')
        }, body: JSON.stringify(text)
}).then(response => response.json())
}

export const PutLike = (id) => { 
    return fetch (`https://api.react-learning.ru/v2/group-10/posts/likes/${id}`,{
        method: 'PUT',
        headers : {
            'content-type': 'application/json',
            Authorization: localStorage.getItem('token')
        }
}).then(response => response.json())
}

export const DeleteLike = (id) => { 
    return fetch (`https://api.react-learning.ru/v2/group-10/posts/likes/${id}`,{
        method: 'DELETE',
        headers : {
            'content-type': 'application/json',
            Authorization: localStorage.getItem('token')
        }
}).then(response => response.json())
}

export const DeleteComment = (idPost,idComment) => {
    return fetch (`https://api.react-learning.ru/v2/group-10/posts/comments/${idPost}/${idComment}`, {
        method: 'DELETE',
        headers : {
            'content-type': 'application/json',
            Authorization: localStorage.getItem('token')
        }
}).then(response => response.json())
}

export const EditProfile = (about) => {
    return fetch (`https://api.react-learning.ru/users/me/`, {
        method: 'PATCH',
        headers : {
            'content-type': 'application/json',
            Authorization: localStorage.getItem('token')
        }, body: JSON.stringify(about)
})
}

export const EditAvatar = (url) => {
    return fetch (`https://api.react-learning.ru/users/me/avatar/`, {
        method: 'PATCH',
        headers : {
            'content-type': 'application/json',
            Authorization: localStorage.getItem('token')
        }, body: JSON.stringify(url)
}).then(response => response.json())
}

export const SignUp = (UserData) => {
    return fetch (`https://api.react-learning.ru/signup`, {
        method: 'POST',
        headers : {
            'content-type': 'application/json',
        }, body: JSON.stringify(UserData)
})
}

export const CreatePost = (PostData) => {
    return fetch (`https://api.react-learning.ru/v2/group-10/posts`, {
        method: 'POST',
        headers : {
            'content-type': 'application/json',
            Authorization: localStorage.getItem('token')
        }, body: JSON.stringify(PostData)
}).then(response => response.json())
}

export const DeletePost = (_id) => { 
    return fetch (`https://api.react-learning.ru/v2/group-10/posts/${_id}`, {
        method: "DELETE",
        headers: {
            'content-type' : 'application/type',
            Authorization: localStorage.getItem('token')
        }
    }
    ).then(response => response.json())
}

export const EditPost = (id, data) => {
    return fetch (`https://api.react-learning.ru/v2/group-10/posts/${id}`, {
        method: 'PATCH',
        headers : {
            'content-type': 'application/json',
            Authorization: localStorage.getItem('token')
        }, body: JSON.stringify(data)
})
}

export const PaginationPost = (pageNum, limit ) => {
    return fetch (`https://api.react-learning.ru/v2/group-10/posts/paginate?page=${pageNum}&limit=${limit}`, {
        method: 'GET',
        headers : {
            'content-type': 'application/json',
            Authorization: localStorage.getItem('token')
        }
}).then(response => response.json())
}

export const SearchPost = (request) => {
    return fetch (`https://api.react-learning.ru/v2/group-10/posts/search/?query=${request}`, {
        method: 'GET',
        headers : {
            'content-type': 'application/json',
            Authorization: localStorage.getItem('token')
        }
}).then(response => response.json())
}


// POST https://api.react-learning.ru/products
// Authorization : 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2M2UzZWY4MzU5Yjk4YjAzOGY3N2IzYjQiLCJncm91cCI6Imdyb3VwLTEwIiwiaWF0IjoxNjc5NzUyNDgzLCJleHAiOjE3MTEyODg0ODN9.Rxup9xZ3xDZdqMczUirbGsY2ATwtLHAPo7mjIm8CFxE'