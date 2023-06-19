import '../Styles/formPages.css';
import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Editor } from '@tinymce/tinymce-react';

import ConfirmPopUp from '../Components/ConfirmPopUp';
import NavBar from '../Components/NavBar';

import getS3ImageUrl from '../Javascript/getS3ImageUrl';

const PostFormPage = ({ action, currUser, tinyKey }) => {
    const [postData, setPostData] = useState(null);
    const [postPrivate, setPostPrivate] = useState(false);
    const [errorData, setErrorData] = useState(null);
    const [imageUrl, setImageUrl] = useState(null);
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
                    //get image url and set to state
                    setImageUrl(await getS3ImageUrl(postId));
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
            const errorMsgElem = document.getElementById('error-span');
            //get post title and content
            const titleInputElem = document.getElementById('input-post-title');
            const postContent = editorRef.current.getContent();
            //get uploaded image if any
            const imageFileElem = document.getElementById('input-post-picture');
            const imageFile = imageFileElem.files[0];
            //get file size in MB file present
            const imageFileSizeMb = imageFile ? imageFile.size / 1024 ** 2 : 0;
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
            if (imageFileSizeMb > 10) {
                //if filesize exceeds 10MB show error
                errorMsgElem.innerText = '*Image file is over 10MB limit, please use a smaller image*';
                imageFileElem.focus();
            }
            if (imageFile && imageFile.type !== 'image/jpeg'){
                //if image is not jpeg show error
                errorMsgElem.innerText = '*Image file is not type jpeg, please choose an appropriate image*';
                imageFileElem.focus();
            }
            if ((titleInputElem.value.trim() !== '' && postContent !== '')) {
                //if both title and post inputs not empty check if image is being uploaded
                if (imageFile) {
                    //if image is uploaded and image is jpeg and <= 10MB, clear any error message and prompt confirmation pop up
                    if (imageFileSizeMb <= 10 && imageFile.type === 'image/jpeg') {
                        errorMsgElem.innerText = '';
                        setSubmitPopUpFlag(true);
                    }
                } else {
                    //if no image uploaded, clear any error message and prompt confirmation pop up
                    errorMsgElem.innerText = '';
                    setSubmitPopUpFlag(true);
                }
            }
        }
    };

    const submitPost = async () => {
        try {
            if (editorRef.current) {
                let postResponse = {};
                //get title, post content from editor
                const post_title = document.getElementById('input-post-title').value;
                const post_text = editorRef.current.getContent();
                if (action === 'create') {
                    //request new post from api if action === 'create'
                    postResponse = await fetch(process.env.NODE_ENV === 'production' ? `https://blog-api.ty0088.co.uk/post/create` : `${process.env.REACT_APP_BLOGAPI_URL}/post/create`, {
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
                    postResponse = await fetch(process.env.NODE_ENV === 'production' ? `https://blog-api.ty0088.co.uk/post/${postId}/update` :`${process.env.REACT_APP_BLOGAPI_URL}/post/${postId}/update`, {
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
                if (postResponse.status === 200) {
                    //on successful post submission, upload picture if any
                    const imageFile = document.getElementById('input-post-picture').files[0];
                    if (imageFile) {
                        //get post id from response
                        const responseData = await postResponse.json();
                        const responsePostId = responseData.postId;
                        //request AWS S3 presigned put URL
                        const urlResponse = await fetch(`https://blog-api.ty0088.co.uk/aws/putS3Url/${responsePostId}`, { credentials: 'include' });
                        const { presignedPutUrl } = await urlResponse.json();
                        console.log(presignedPutUrl);
                        //upload image to s3 bucket
                        const uploadResponse = await fetch(presignedPutUrl, {
                            method: 'PUT',
                            headers: { "Content-Type": "image/jpeg" },
                            body: imageFile
                        });
                        console.log(uploadResponse);
                    }
                    alert('Post successfully submitted!');
                    navigate('/blog_author');
                } else {
                    //if not successful response, set error data for rendering
                    const responseData = await postResponse.json();
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
                {!imageUrl &&
                    <div className='input-row post'>
                        <label htmlFor='postPicture'>Upload Picture:</label>
                        <input type='file' id='input-post-picture' name='postPicture' accept='image/jpeg' />
                        <span className='input-hint'>*jpeg file &le; 10MB only</span>
                    </div>
                }
                {imageUrl &&
                    <div className='post-image-container form'>
                        <div className='input-row post'>
                            <label htmlFor='postPicture'>Upload New Picture:</label>
                            <input type='file' id='input-post-picture' name='postPicture' accept='image/jpeg' />
                            <span className='input-hint'>*jpeg file &le; 10MB only</span>
                        </div>
                        <span>Current Image: </span>
                        <img src={imageUrl} alt={`${postId} img`} className='post-image form' />
                    </div>
                }
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