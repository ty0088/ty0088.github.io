import '../Styles/formPages.css';
import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Editor } from '@tinymce/tinymce-react';

import ConfirmPopUp from '../Components/ConfirmPopUp';
import NavBar from '../Components/NavBar';

const PostFormPage = ({ action, currUser, tinyKey }) => {
    const [postData, setPostData] = useState(null);
    const [postPrivate, setPostPrivate] = useState(false);
    const [errorData, setErrorData] = useState(null);
    const [submitPopUpFlag, setSubmitPopUpFlag] = useState(false);
    const editorRef = useRef(null);
    const navigate = useNavigate();
    const { postId } = useParams();

    //get post data if action is 'update'
    useEffect(() => {
        const fetchPost = async () => {
            try {
                //fetch post data from api
                const response = await fetch(process.env.NODE_ENV === 'production' ? `https://blog-api.ty0088.co.uk/post/${postId}` : `${process.env.REACT_APP_BLOGAPI_URL}/post/${postId}`, { credentials: "include" });
                if (response.status === 200) {
                    //if successful response, set data to state
                    const responseData = await response.json();
                    setPostData(responseData.post);
                    setPostPrivate(responseData.post.private);
                } else {
                    //otherwise log response status and text
                    console.log(response.status + ' : ' + response.statusText);
                }
            } catch (error) {
                console.log(error);
            }
        };
        //if action is update, then get post data
        if (action === 'update') {
            //get post data from db
            fetchPost();
        }
    }, [action, postId]);

    //prompt confirmation on click
    const submitClick = () => {
        //check title and post input is not empty
        if (editorRef.current) {
            const titleInputElem = document.getElementById('input-post-title');
            const errorMsgElem = document.getElementById('error-span');
            const postContent = editorRef.current.getContent();
            if (titleInputElem.value.trim() === '') {
                errorMsgElem.innerText = '*A title is required*';
                titleInputElem.focus();
            } 
            if (postContent === '') {
                errorMsgElem.innerText = '*Post is required*';
                editorRef.current.focus();
            }
            if (titleInputElem.value.trim() === '' && postContent === '') {
                errorMsgElem.innerText = '*A title and post is required*';
                titleInputElem.focus();
            }
            if (titleInputElem.value.trim() !== '' && postContent !== '') {
                //if both title and post inputs not empty, clear any error message and prompt confirmation pop up
                errorMsgElem.innerText = '';
                setSubmitPopUpFlag(true);
            }
        }
    };

    const submitPost = async () => {
        try {
            if (editorRef.current) {
                //get title and post content from editor
                const post_title = document.getElementById('input-post-title').value;
                const post_text = editorRef.current.getContent();
                let response = {};
                if (action === 'create') {
                    //request new post from api if action === 'create'
                    response = await fetch(process.env.NODE_ENV === 'production' ? `https://blog-api.ty0088.co.uk/post/create` : `${process.env.REACT_APP_BLOGAPI_URL}/post/create`, {
                        method: 'POST',
                        credentials: 'include',
                        headers: {
                            'Accept': 'application/json',
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({
                            post_title,
                            post_text,
                            post_private: postPrivate,
                        }),
                    });
                } else if (action === 'update') {
                    //else request post update is action === 'update'
                    response = await fetch(process.env.NODE_ENV === 'production' ? `https://blog-api.ty0088.co.uk/post/${postId}/update` :`${process.env.REACT_APP_BLOGAPI_URL}/post/${postId}/update`, {
                        method: 'PUT',
                        credentials: 'include',
                        headers: {
                            'Accept': 'application/json',
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({
                            post_title,
                            post_text,
                            post_private: postPrivate,
                        }),
                    });
                }
                //if successful response, redirect to dashboard
                if (response.status === 200) {
                    alert('Post successfully submitted!');
                    navigate('/blog_author');
                } else {
                    //if not successful response, set error data for rendering
                    const responseData = await response.json();
                    setErrorData(responseData.errors);
                }
            }
            setSubmitPopUpFlag(false);
        } catch (error) {
            console.log(error);
        }
    };

    const cancelSubmit = () => {
        setSubmitPopUpFlag(false);
    };

    return (
        <div id='main-container'>
            <h1>The Blog Spot - Author</h1>
            <NavBar user={currUser} pageType={''} />
            <button type='button' className='btn-link selected'>Create New Post</button>
            <div className='form-border'>
                <div className='input-row post'>
                    <label htmlFor='postTitle'>Blog Post Title: </label>
                    <input type='text' id='input-post-title' name='postTitle' defaultValue={postData ? postData.title : ''} required />
                    <span className='error-message' id='error-span'></span>
                </div>
                {errorData &&
                    <ul>
                        {errorData &&
                            errorData.map((error, i) => {
                                return (
                                    <li key={i} className='error-message'>{error.msg}</li>
                                );
                            })
                        }
                    </ul>
                }
                <Editor
                    apiKey={process.env.NODE_ENV === 'production' ? tinyKey : process.env.REACT_APP_TINYMCE_API_KEY}
                    onInit={(evt, editor) => editorRef.current = editor}
                    initialValue={postData ? postData.text : ''}
                    init={{
                    height: 500,
                    menubar: false,
                    plugins: [
                        'advlist', 'autolink', 'lists', 'link', 'image', 'charmap', 'preview',
                        'anchor', 'searchreplace', 'visualblocks', 'code', 'fullscreen',
                        'insertdatetime', 'media', 'table', 'code', 'help', 'wordcount'
                    ],
                    toolbar: 'undo redo | blocks | ' +
                        'bold italic forecolor | alignleft aligncenter ' +
                        'alignright alignjustify | bullist numlist outdent indent | ' +
                        'removeformat | help',
                    content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }'
                    }}
                />
                <div className='button-container'>
                    {!postPrivate &&
                        <div>
                            <span>Post is <strong>Public</strong></span>&nbsp;-&nbsp;
                            <button type='button' className='btn-link' onClick={() => setPostPrivate(true)}>Make Private</button>
                        </div>
                    }
                    {postPrivate &&
                        <div>
                            <button type='button' className='btn-link' onClick={() => setPostPrivate(false)}>Make Public</button>-&nbsp;
                            <span>Post is <strong>Private</strong></span>
                        </div>
                    }
                </div>
                <div className='button-container'>
                    <button type='button' className='btn-link' onClick={submitClick}>Submit Post</button>
                    <button type='button' className='btn-link' onClick={() => navigate(-1)}>Cancel</button>
                </div>
                {(currUser && currUser.user_type === 'Demo') &&
                    <span className='post-info'>*This is a read only Demo Account - No submitted data will be saved.*</span>
                }
            </div>
            {submitPopUpFlag &&
                <ConfirmPopUp name={postPrivate ? 'Private Post?' : 'Public Post?'} cancelClick={cancelSubmit} confirmClick={submitPost} message1={'Are you sure you want to submit this'} message2={postPrivate ? 'Private posts cannot be seen by anyone except you and the site admin.' : 'Public posts can be seen by anyone.'} />
            }
        </div>
    );
};
export default PostFormPage;