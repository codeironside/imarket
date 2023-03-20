// Initial Reg. Form State
export const initialRegFormState = {
  firstName: '',
  middlename: '',
  surname: '',
  email: '',
  password: '',
  confirmPwd: '',
  phoneNumber: '',
  address: '',
  role: 'default',
};

// Initial Login Form State
export const initialLoginFormState = {
  email: '',
  password: '',
};

// Regex pattern to test Email Address
export const EMAIL_REGEX = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;

// Regex pattern to test Password
export const PWD_REGEX =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[#$@!%&*?])[A-Za-z\d#$@!%&*?]{8,30}$/;

// Regex pattern to test Nigerian Phone Number
export const PN_REGEX =
  /^(\+234|234|0)(701|702|703|704|705|706|707|708|709|802|803|804|805|806|807|808|809|810|811|812|813|814|815|816|817|818|819|909|908|901|902|903|904|905|906|907)([0-9]{7})$/;
