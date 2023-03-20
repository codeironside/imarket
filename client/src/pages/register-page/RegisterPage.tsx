import { useState } from 'react';
import CheckIcon from '@mui/icons-material/Check';
import RegistrationForm from '../../components/registration-form/RegistrationForm';
import Background1 from '../../assets/reg-cover.jpg';
import './RegisterPage.scss';

const RegisterPage: React.FC<{}> = () => {
  const [success, setSuccess] = useState(false);

  return (
    <main id="register">
      <section
        style={{ background: `url(${Background1})`, backgroundSize: 'cover' }}
      >
        <div className="overlay">
          <div className="header">
            <img src="logo.png" alt="Logo" />
            <p>FooDrop</p>
          </div>
          {success ? (
            <div className="reg-success">
              <div>
                <CheckIcon />
              </div>
              <h2>Successful!</h2>
              <p>
                Your registration to <strong>FooDrop</strong> is Successful.
              </p>
              <a href="/" className="link">
                Log In
              </a>
            </div>
          ) : (
            <RegistrationForm setSuccess={setSuccess} />
          )}
        </div>
      </section>
    </main>
  );
};

export default RegisterPage;
