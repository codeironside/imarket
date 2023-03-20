import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { ThunkDispatch } from '@reduxjs/toolkit';
import { forgotUserPassword } from '../../redux/user-slice/userSlice';
import Background from '../../assets/log-cover.jpg';
import EmailIcon from '@mui/icons-material/Email';
import './PasswordPage.scss';

const PasswordPage: React.FC<{}> = () => {
  const [email, setEmail] = useState<string>('');
  const dispatch = useDispatch<ThunkDispatch<any, any, any>>();

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (email.length > 0) {
      dispatch(forgotUserPassword(email));
      setEmail('');
      // Navigate to login page
    }
  };

  return (
    <main id="password">
      <section
        style={{ background: `url(${Background})`, backgroundSize: 'cover' }}
      >
        <div className="overlay">
          <div className="header">
            <img src="logo.png" alt="Logo" />
            <p>FooDrop</p>
          </div>
          <form onSubmit={handleSubmit}>
            <h1>Forgot password.</h1>
            <div className="field">
              <label htmlFor="email">
                <input
                  type="email"
                  name="email"
                  id="email"
                  className={email.length > 0 ? 'activated' : ''}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                <span>Email</span>
                <EmailIcon />
              </label>
            </div>

            <div className="click">
              <button type="submit">Submit</button>
            </div>
          </form>
          <div className="footer">
            Remember password?
            <a href="/" className="link">
              Login up
            </a>
          </div>
        </div>
      </section>
    </main>
  );
};

export default PasswordPage;
