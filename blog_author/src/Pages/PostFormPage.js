import '../Styles/formPages.css';
import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Editor } from '@tinymce/tinymce-react';

import logOut from '../Javascript/logOut';
import ConfirmPopUp from '../Components/ConfirmPopUp';

const PostFormPage = ({ action, currUser }) => {
    const [postData, setPostData] = useState('');
    const [postPrivate, setPostPrivate] = useState(false);
    const [errorData, setErrorData] = useState(null);
    const [submitPopUpFlag, setSubmitPopUpFlag] = useState(false);
    const editorRef = useRef(null);
    const navigate = useNavigate();

    useEffect(() => {
        //if action is update, then get post data
        if (action === 'update') {
            //get post data from db ---------------------------------
            setPostData('<p>Previous Text</p>');
        }
    }, []);

    //prompt confirmation on click
    const submitClick = () => {
        //check title and post input is not empty
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
    };

    const submitPost = async () => {
        try {
            if (editorRef.current) {
                //get title and post content from editor
                const post_title = document.getElementById('input-post-title').value;
                const post_text = editorRef.current.getContent();
                //request new post from api
                const response = await fetch(`${process.env.REACT_APP_BLOGAPI_URL}/post/create`, {
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
                //if successful response, redirect to dashboard
                if (response.status === 200) {
                    alert('Post successfully submitted!')
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
            {currUser &&
                <nav>
                    <Link className='button-link' to='/blog_author'>Dashboard</Link>
                    <Link className='button-link' to={`/blog_author/user/${currUser.user_id}`}>My Account ({currUser.display_name})</Link>
                    <button className='button-link' type='button' onClick={logOut}>Log Out</button>
                </nav>            
            }
            <h3>New Post</h3>
            <div>
                <div className='input-row post'>
                    <label htmlFor='postTitle'>Blog Post Title: </label>
                    <input type='text' id='input-post-title' name='postTitle' required />
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
                    apiKey={process.env.REACT_APP_TINYMCE_API_KEY}
                    onInit={(evt, editor) => editorRef.current = editor}
                    initialValue={postData}
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
                        <span><strong>Public Post</strong> / <button type='button' className='button-link' onClick={() => setPostPrivate(true)}>Make Private</button></span>
                    }
                    {postPrivate &&
                        <span><button type='button' className='button-link' onClick={() => setPostPrivate(false)}>Make Public</button> / <strong>Private Post</strong></span>
                    }
                </div>
                <div className='button-container'>
                    <button type='button' className='button-link' onClick={submitClick}>Submit Post</button>
                    <button type='button' className='button-link' onClick={() => navigate(-1)}>Cancel</button>
                </div>
            </div>
            {submitPopUpFlag &&
                <ConfirmPopUp name={postPrivate ? 'Private Post?' : 'Public Post?'} cancelClick={cancelSubmit} confirmClick={submitPost} message1={'Are you sure you want to submit this'} message2={postPrivate ? 'Private posts cannot be seen by anyone except you and the site admin.' : 'Public posts can be seen by anyone.'} />
            }
        </div>
    );
};
export default PostFormPage;