import Background from '../../assets/log-cover.jpg';
import LoginForm from '../../components/login-form/LoginForm';
import './LoginPage.scss';

const LoginPage = () => {
  return (
    <main id="login">
      <section
        style={{ background: `url(${Background})`, backgroundSize: 'cover' }}
      >
        <div className="overlay">
          <div className="header">
            <img src="logo.png" alt="Logo" />
            <p>FooDrop</p>
          </div>
          <LoginForm />
          <div className='footer'>
            Already have an account?
            <a href='/' className='link'>Sign up</a>
          </div>
        </div>
      </section>
    </main>
  );
};

export default LoginPage;
