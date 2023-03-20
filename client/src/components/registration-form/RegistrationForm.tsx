import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { ThunkDispatch } from '@reduxjs/toolkit';
import { RegFormStateType } from '../../utilities/Types';
import {
  EMAIL_REGEX,
  initialRegFormState,
  PN_REGEX,
  PWD_REGEX,
} from '../../utilities/AppData';
import { registerUser } from '../../redux/user-slice/userSlice';
import BadgeIcon from '@mui/icons-material/Badge';
import PhoneIphoneIcon from '@mui/icons-material/PhoneIphone';
import EmailIcon from '@mui/icons-material/Email';
import HomeWorkIcon from '@mui/icons-material/HomeWork';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import ErrorIcon from '@mui/icons-material/Error';
import './RegistrationForm.scss';

const RegistrationForm: React.FC<{ setSuccess: (value: boolean) => void }> = ({
  setSuccess,
}) => {
  // Registration Form State
  const [regFormState, setRegFormState] =
    useState<RegFormStateType>(initialRegFormState);

  // Errors
  const [firstNameErr, setFirstNameErr] = useState(false);
  const [surnameErr, setSurnameErr] = useState(false);
  const [emailErr, setEmailErr] = useState(false);
  const [phoneNumberErr, setPhoneNumberErr] = useState(false);
  const [addressErr, setAddressErr] = useState(false);
  const [passwordErr, setPasswordErr] = useState(false);
  const [confirmPwdErr, setConfirmPwdErr] = useState(false);

  // Other state
  const [matchPwd, setMatchPwd] = useState(false);
  const [vissiblePwd, setVissiblePwd] = useState(false);

  // Other Reg. Hooks
  const dispatch = useDispatch<ThunkDispatch<any, any, any>>();

  // Func: Test Password & Confirm Password Match
  const testPasswordMatch = () => {
    if (
      PWD_REGEX.test(regFormState.password) &&
      regFormState.password === regFormState.confirmPwd
    )
      return true;
    return false;
  };

  // Reset Reg. Form Errors
  const resetErrors = () => {
    setFirstNameErr(false);
    setSurnameErr(false);
    setEmailErr(false);
    setPhoneNumberErr(false);
    setAddressErr(false);
    setPasswordErr(false);
    setConfirmPwdErr(false);
  };

  // Check Reg. Form State Validation
  const setErrors = () => {
    if (regFormState.firstName.length < 3) {
      setFirstNameErr(true);
    }
    if (regFormState.surname.length < 3) {
      setSurnameErr(true);
    }
    if (regFormState.address.length < 10) {
      setAddressErr(true);
    }
    if (!PN_REGEX.test(regFormState.phoneNumber)) {
      setPhoneNumberErr(true);
    }
    if (!EMAIL_REGEX.test(regFormState.email)) {
      setEmailErr(true);
    }
    if (!PWD_REGEX.test(regFormState.password)) {
      setPasswordErr(true);
    }
    if (
      !PWD_REGEX.test(regFormState.password) ||
      regFormState.password !== regFormState.confirmPwd
    ) {
      setConfirmPwdErr(true);
    }

    if (
      !firstNameErr &&
      !surnameErr &&
      !phoneNumberErr &&
      !emailErr &&
      !addressErr &&
      !passwordErr &&
      !confirmPwdErr
    )
      return true;
    return false;
  };

  // Set Reg. Form State
  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.target;
    setRegFormState({ ...regFormState, [name]: value });
    resetErrors();
  };

  // Submit Reg. User
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (setErrors()) {
      console.log('Submitted');
      // console.log(regFormState);
      dispatch(registerUser({ ...regFormState }));
      setRegFormState(initialRegFormState);
      setSuccess(true);
      setTimeout(() => {
        setSuccess(false);
      }, 5000);
      // Navigate to login page
    }
  };

  useEffect(() => {
    setMatchPwd(testPasswordMatch());
  }, [regFormState.password, regFormState.confirmPwd]);

  return (
    <form onSubmit={handleSubmit}>
      <h1>Create new account.</h1>
      <p>
        Already have an account?{' '}
        <a href="/" className="link">
          Log In
        </a>
      </p>
      <div className="grid">
        <div className="field">
          <label htmlFor="firstName">
            <input
              type="text"
              name="firstName"
              id="firstName"
              className={regFormState.firstName.length > 0 ? 'activated' : ''}
              value={regFormState.firstName}
              onChange={handleChange}
              required
            />
            <span>
              First name
              {regFormState.firstName.length < 3 ? (
                <strong className="red">&#215;</strong>
              ) : (
                <strong className="green">&#10004;</strong>
              )}
            </span>
            <BadgeIcon />
          </label>
          {firstNameErr ? (
            <p className="error-message">
              <ErrorIcon />
              First name should be 3 or more characters!
            </p>
          ) : null}
        </div>
        <div className="field">
          <label htmlFor="surname">
            <input
              type="text"
              name="surname"
              id="surname"
              className={regFormState.surname.length > 0 ? 'activated' : ''}
              value={regFormState.surname}
              onChange={handleChange}
              required
            />
            <span>
              Last name
              {regFormState.surname.length < 3 ? (
                <strong className="red">&#215;</strong>
              ) : (
                <strong className="green">&#10004;</strong>
              )}
            </span>
            <BadgeIcon />
          </label>
          {surnameErr ? (
            <p className="error-message">
              <ErrorIcon />
              Surname should be 3 or more characters!
            </p>
          ) : null}
        </div>
        <div className="field">
          <label htmlFor="middlename">
            <input
              type="text"
              name="middlename"
              id="middlename"
              className={regFormState.middlename.length > 0 ? 'activated' : ''}
              value={regFormState.middlename}
              onChange={handleChange}
            />
            <span>Other name</span>
            <BadgeIcon />
          </label>
        </div>
        <div className="field">
          <label htmlFor="phoneNumber">
            <input
              type="text"
              name="phoneNumber"
              id="phoneNumber"
              className={regFormState.phoneNumber.length > 0 ? 'activated' : ''}
              value={regFormState.phoneNumber}
              onChange={handleChange}
              required
            />
            <span>
              Phone number
              {!PN_REGEX.test(regFormState.phoneNumber) ? (
                <strong className="red">&#215;</strong>
              ) : (
                <strong className="green">&#10004;</strong>
              )}
            </span>
            <PhoneIphoneIcon />
          </label>
          {phoneNumberErr ? (
            <p className="error-message">
              <ErrorIcon />
              Input is not a valid Nigerian phone number!
            </p>
          ) : null}
        </div>
      </div>
      <div className="field">
        <label htmlFor="email">
          <input
            type="email"
            name="email"
            id="email"
            className={regFormState.email.length > 0 ? 'activated' : ''}
            value={regFormState.email}
            onChange={handleChange}
            required
          />
          <span>
            Email
            {!EMAIL_REGEX.test(regFormState.email) ? (
              <strong className="red">&#215;</strong>
            ) : (
              <strong className="green">&#10004;</strong>
            )}
          </span>
          <EmailIcon />
        </label>
        {emailErr ? (
          <p className="error-message">
            <ErrorIcon />
            Input is not a valid email!
          </p>
        ) : null}
      </div>
      <div className="field">
        <label htmlFor="address">
          <textarea
            name="address"
            id="address"
            className={regFormState.address.length > 0 ? 'activated' : ''}
            value={regFormState.address}
            onChange={handleChange}
            required
          />
          <span>
            Address
            {regFormState.address.length < 10 ? (
              <strong className="red">&#215;</strong>
            ) : (
              <strong className="green">&#10004;</strong>
            )}
          </span>
          <HomeWorkIcon />
        </label>
        {addressErr ? (
          <p className="error-message">
            <ErrorIcon />
            Valid address should be more than 9 characters long!
          </p>
        ) : null}
      </div>
      <div className="field">
        <label htmlFor="password">
          <input
            type={vissiblePwd ? 'text' : 'password'}
            name="password"
            id="password"
            className={regFormState.password.length > 0 ? 'activated' : ''}
            value={regFormState.password}
            onChange={handleChange}
            required
          />
          <span>
            Password
            {!PWD_REGEX.test(regFormState.password) ? (
              <strong className="red">&#215;</strong>
            ) : (
              <strong className="green">&#10004;</strong>
            )}
          </span>
          <button type="button" onClick={() => setVissiblePwd((prev) => !prev)}>
            {vissiblePwd ? <VisibilityOffIcon /> : <VisibilityIcon />}
          </button>
        </label>
        {passwordErr ? (
          <div className="error-message email">
            <ErrorIcon />
            <strong>Password should have</strong>
            <ul>
              <li>Min. 1 uppercase letter</li>
              <li>Min. 1 lowercase letter</li>
              <li>Min. 1 special character</li>
              <li>Min. 1 number</li>
              <li>Min. 8 characters</li>
              <li>Max. 30 characters</li>
            </ul>
          </div>
        ) : null}
      </div>
      <div className="field">
        <label htmlFor="confirmPwd">
          <input
            type={vissiblePwd ? 'text' : 'password'}
            name="confirmPwd"
            id="confirmPwd"
            className={regFormState.confirmPwd.length > 0 ? 'activated' : ''}
            value={regFormState.confirmPwd}
            onChange={handleChange}
            required
          />
          <span>
            Confirm password
            {!matchPwd ? (
              <strong className="red">&#215;</strong>
            ) : (
              <strong className="green">&#10004;</strong>
            )}
          </span>
          <button type="button" onClick={() => setVissiblePwd((prev) => !prev)}>
            {vissiblePwd ? <VisibilityOffIcon /> : <VisibilityIcon />}
          </button>
        </label>
        {confirmPwdErr ? (
          <p className="error-message">
            <ErrorIcon />
            Confirmed password should match the valid password!
          </p>
        ) : null}
      </div>
      <div className="click">
        <button type="submit">Create account</button>
      </div>
    </form>
  );
};

export default RegistrationForm;
