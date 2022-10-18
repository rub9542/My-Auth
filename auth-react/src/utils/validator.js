export const validateEmail = (email) => {
  const pattern = /\S+@\S+\.\S+/;
  const isValid = pattern.test(email);
  if (isValid) return { isValid, message: '' };
  return { isValid, message: 'Enter valid email Id.' };
};

export const validatePassword = (password = '') => {
  const pattern =
    /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;
  const isValid = pattern.test(password);
  if (isValid) return { isValid, message: '' };
  return {
    isValid,
    message:
      'Minimum 8 characters, at least one letter, one number and one special character',
  };
};
