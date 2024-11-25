import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginPost } from '../services/loginPost';
import '../styles/Login.css';

const Login = () => {
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [generalError, setGeneralError] = useState('');

  const navigate = useNavigate();
  const parseJwt = (token) => {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(atob(base64).split('').map((c) => {
      return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));
    return JSON.parse(jsonPayload);
  };
  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    
    setLoginError('');
    setPasswordError('');
    setGeneralError('');

    let valid = true;
    
    if (!login) {
      setLoginError('Логин обязателен');
      valid = false;
    }

    if (!password) {
      setPasswordError('Пароль обязателен');
      valid = false;
    }

    if (valid) {
      const params = {
        username: login,
        password: password,
      };

      const { accessToken, refreshToken } = await loginPost(params);

      if (accessToken && refreshToken) {
        localStorage.setItem('accessToken', accessToken);
        localStorage.setItem('refreshToken', refreshToken);
        localStorage.setItem('userName', params.username);
        localStorage.setItem('oldUserName', params.username);

        const payload = parseJwt(accessToken);
        const userRole = payload["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"] || 'User';
        localStorage.setItem('userRole', userRole);

        window.location.href = '/';
      } else {
        setGeneralError('Неверный логин или пароль');
      }
    }
  };

  return (
    <div className="row">
      <div className="col-md-4">
        <section>
          <h2>Вход</h2>
          <form id="login-form" onSubmit={handleLoginSubmit}>
            <h4>Используйте учетную запись для входа.</h4>
            
            <div className="form-group">
              <label htmlFor="login">Логин</label>
              <input
                id="login"
                name="login"
                type="text"
                className="form-control"
                value={login}
                onChange={(e) => setLogin(e.target.value)}
                required
              />
              {loginError && <span className="text-danger">{loginError}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="password">Пароль</label>
              <input
                id="password"
                name="password"
                type="password"
                className="form-control"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              {passwordError && <span className="text-danger">{passwordError}</span>}
            </div>

            <div className="form-group">
              <button type="submit" id="login-button" className="btn btn-default">
                Войти
              </button>
            </div>
          </form>

          {generalError && <div className="text-danger">{generalError}</div>}
        </section>
      </div>
    </div>
  );
};

export default Login;