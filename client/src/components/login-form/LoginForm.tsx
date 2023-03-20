import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { ThunkDispatch } from '@reduxjs/toolkit';
import { LoginFormStateType } from '../../utilities/Types';
import { initialLoginFormState } from '../../utilities/AppData';
import { loginUser } from '../../redux/user-slice/userSlice';
import EmailIcon from '@mui/icons-material/Email';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import './LoginForm.scss';

const LoginForm: React.FC<{}> = () => {
  // Login Form State
  const [loginFormState, setLoginFormState] = useState<LoginFormStateType>(
    initialLoginFormState
  );

  // Other state
  const [vissiblePwd, setVissiblePwd] = useState(false);

  // Other Reg. Hooks
  const dispatch = useDispatch<ThunkDispatch<any, any, any>>();

  // Set Reg. Form State
  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.target;
    setLoginFormState({ ...loginFormState, [name]: value });
  };

  // Submit Reg. User
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (loginFormState.email.length > 0 && loginFormState.password.length > 0) {
      dispatch(loginUser({ ...loginFormState }));
      setLoginFormState(initialLoginFormState);
      // Navigate to home page
    }
  };

  //   useEffect(() => {}, []);

  return (
    <form onSubmit={handleSubmit}>
      <h1>Login your account.</h1>
      <div className="field">
        <label htmlFor="email">
          <input
            type="email"
            name="email"
            id="email"
            className={loginFormState.email.length > 0 ? 'activated' : ''}
            value={loginFormState.email}
            onChange={handleChange}
            required
          />
          <span>Email</span>
          <EmailIcon />
        </label>
      </div>

      <div className="field">
        <label htmlFor="password">
          <input
            type={vissiblePwd ? 'text' : 'password'}
            name="password"
            id="password"
            autoComplete="off"
            className={loginFormState.password.length > 0 ? 'activated' : ''}
            value={loginFormState.password}
            onChange={handleChange}
            required
          />
          <span>Password</span>
          <button type="button" onClick={() => setVissiblePwd((prev) => !prev)}>
            {vissiblePwd ? <VisibilityOffIcon /> : <VisibilityIcon />}
          </button>
        </label>
      </div>

      <div className='check'>
        <label htmlFor="remember">
          <input type="checkbox" id="remember" name="remember" />
          <div />
          Remember me
        </label>
        <a href="/" className="sec-link">
          Forgot password?
        </a>
      </div>

      <div className="click">
        <button type="submit">Login</button>
      </div>
    </form>
  );
};

export default LoginForm;
