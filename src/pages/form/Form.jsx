import React, { useEffect, useState } from 'react';
import "./form.scss";
import NavBar from '../../components/navbar/NavBar';
import { Button } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { addBlog, deleteBlog, getBlogs, updateBlog } from '../../actions/blogAction';
import ClearIcon from '@mui/icons-material/Clear';
import { Bars } from "react-loader-spinner";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Form = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { isAuthenticated, user } = useSelector(state => state.user);

    useEffect(() => {
        const token = localStorage.getItem("userToken");
        if (!token) {
            navigate("/login");
        }
    }, [isAuthenticated, navigate]);

    const [blog, setBlog] = useState({
        title: "",
        img: "",
        description: "",
        user_id: ""
    });

    useEffect(() => {
        if (user) {
            setBlog({ ...blog, "user_id": user._id });
        }
    }, [user, blog]);

    const handleChange = (e) => {
        setBlog({ ...blog, [e.target.name]: e.target.value });
    };

    const handleImageChange = (e) => {
        setBlog({ ...blog, "img": e.target.files[0] });
    };

    const submit = () => {
        if (blog.img && blog.description && blog.title) {
            dispatch(addBlog(blog));
        } else {
            toast.warning("WARNING: All fields required!", { theme: "colored", autoClose: 2000 });
        }
    };

    const { isloading, blogs } = useSelector(state => state.blogReducer);

    useEffect(() => {
        dispatch(getBlogs());
    }, [dispatch]);

    const delBlog = (blog_data) => {
        dispatch(deleteBlog({ public_id: blog_data.public_id, _id: blog_data._id }));
    };

    const [open, setOpen] = useState(false);
    const [updateValue, setUpdateValue] = useState({
        title: "",
        description: "",
        img: ""
    });

    const handleUpdate = (e) => {
        setUpdateValue({ ...updateValue, [e.target.name]: e.target.value });
    };

    const handleUpdateImage = (e) => {
        setUpdateValue({ ...updateValue, "img": e.target.files[0], imgChange: true });
    };

    const submitUpdate = () => {
        dispatch(updateBlog(updateValue));
        setOpen(false);
    };

    return (
        <>
            <div className='form'>
                <NavBar />
                <ToastContainer />

                {/* Rest of your component JSX */}
            </div>
        </>
    );
};

export default Form;
