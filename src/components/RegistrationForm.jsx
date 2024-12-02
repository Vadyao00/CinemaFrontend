import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useNavigate } from 'react-router-dom';
import { registerPost } from '../services/loginPost';
import '../styles/Registration.css';

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
        <div className="row">
            <div className="col-md-4">
                <section>
                    <h2>Регистрация</h2>
                    {serverError && (
                        <div className="alert alert-danger" role="alert">
                            {serverError}
                        </div>
                    )}
                    <form id="registration-form" onSubmit={handleSubmit(onSubmit)}>
                        <div className="form-group">
                            <label htmlFor="firstName">Имя</label>
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
                            <label htmlFor="lastName">Фамилия</label>
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
                            <label htmlFor="userName">Логин</label>
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
                            <label htmlFor="email">Почта</label>
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
                            <label htmlFor="password">Пароль</label>
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
                            <label htmlFor="phoneNumber">Номер телефона</label>
                            <input
                                id="phoneNumber"
                                type="text"
                                className="form-control"
                                {...register('phoneNumber')}
                            />
                        </div>

                        <button type="submit" id="register-button" className="btn btn-primary">
                            Зарегистрироваться
                        </button>
                    </form>
                </section>
            </div>
        </div>
    );
};

export default RegistrationForm;