import { useEffect } from 'react';
import { useNavigate } from "react-router-dom";

const RedirectToHome = () => {
    const navigate = useNavigate();

    useEffect(() => {
        navigate('/blog_reader');
    // eslint-disable-next-line
    }, []);

    return null;
};
export default RedirectToHome;