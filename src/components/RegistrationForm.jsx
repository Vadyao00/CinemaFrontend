import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useNavigate } from 'react-router-dom';
import { registerPost } from '../services/loginPost';
import '../styles/Registration.css'; // Импортируем CSS файл

const RegistrationForm = () => {
    const navigate = useNavigate();
    const [serverError, setServerError] = useState(null);

    const validationSchema = yup.object().shape({
        firstName: yup.string().required('First Name is required'),
        lastName: yup.string().required('Last Name is required'),
        userName: yup.string().required('Username is required'),
        email: yup.string().email('Invalid email').required('Email is required'),
        password: yup.string().required('Password is required'),
        phoneNumber: yup.string().optional(),
    });

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(validationSchema),
    });

    const onSubmit = async (data) => {
        const userData = {
            ...data,
            userRole: 'User',
        };
    
        try {
            setServerError(null);
            await registerPost(userData);
            alert('Регистрация прошла успешно!');
            navigate('/');
        } catch (error) {
            if (error.response) {
                const { data: responseData } = error.response;
    
                if (responseData) {
                    const formattedErrors = Object.entries(responseData)
                        .map(([key, messages]) => messages.join(', '))
                        .join('\n');
                    setServerError(formattedErrors);
                } else {
                    setServerError('Неизвестная ошибка. Попробуйте позже.');
                }
            } else {
                setServerError('Ошибка сети. Проверьте подключение и повторите попытку.');
            }
        }
    };

    return (
        <div className="registration-form-container">
            <h2>Регистрация</h2>
            {serverError && (
                <div className="alert alert-danger" role="alert">
                    {serverError}
                </div>
            )}
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="form-group">
                    <label htmlFor="firstName">First Name</label>
                    <input
                        id="firstName"
                        type="text"
                        className="form-control"
                        {...register('firstName')}
                    />
                    {errors.firstName && (
                        <span className="text-danger">{errors.firstName.message}</span>
                    )}
                </div>

                <div className="form-group">
                    <label htmlFor="lastName">Last Name</label>
                    <input
                        id="lastName"
                        type="text"
                        className="form-control"
                        {...register('lastName')}
                    />
                    {errors.lastName && (
                        <span className="text-danger">{errors.lastName.message}</span>
                    )}
                </div>

                <div className="form-group">
                    <label htmlFor="userName">Username</label>
                    <input
                        id="userName"
                        type="text"
                        className="form-control"
                        {...register('userName')}
                    />
                    {errors.userName && (
                        <span className="text-danger">{errors.userName.message}</span>
                    )}
                </div>

                <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input
                        id="email"
                        type="email"
                        className="form-control"
                        {...register('email')}
                    />
                    {errors.email && (
                        <span className="text-danger">{errors.email.message}</span>
                    )}
                </div>

                <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input
                        id="password"
                        type="password"
                        className="form-control"
                        {...register('password')}
                    />
                    {errors.password && (
                        <span className="text-danger">{errors.password.message}</span>
                    )}
                </div>

                <div className="form-group">
                    <label htmlFor="phoneNumber">Phone Number (Optional)</label>
                    <input
                        id="phoneNumber"
                        type="text"
                        className="form-control"
                        {...register('phoneNumber')}
                    />
                </div>

                <button type="submit" className="btn btn-primary">
                    Register
                </button>
            </form>
        </div>
    );
};

export default RegistrationForm;