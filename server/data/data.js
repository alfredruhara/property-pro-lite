
export const signupCredentials = {
  email: 'alfredruhara@gmail.com',
  firstName: 'chadrack',
  lastName: 'ruhara',
  password: '123456',
  phoneNumber: '0750364404',
  address: 'Kigali',
  isAdmin: true
};

export const corruptCredentials = {
  unwanted: false
};
export const signinCredentials = {
  email: 'alfredruhara@gmail.com',
  password: '123456'
};

export const userUpdateInfos = {
  firstName: 'andela',
  lastName: 'user',
  phoneNumber: '89109334',
  address: 'Uganda'
};
export const corruptOnUpdateUserInfos = {
  firstName: 'hacker',
  lastName: 'user',
  email: 'fake@chada.hack'
};
export const changePassword = {
  oldPassword: '123456',
  newPassword: 'andela',
  confirmPassword: 'andela'
};

export const fakeOldPasswork = {
  oldPassword: 'fellowship',
  newPassword: 'andela',
  confirmPassword: 'andela'
};

export const doesNotMatchPassword = {
  oldPassword: 'andela',
  newPassword: 'computer',
  confirmPassword: 'chadrack'
};

export const corruptOnChangePassword = {
  newPassword: 'andela'
};

export const routes = {
  root: '/',
  signup: '/api/v1/user/signup',
  signin: '/api/v1/user/signin',
  auth_signup: '/api/v1/auth/signup',
  agents: '/api/v1/user/agents',
  updateInfo: '/api/v1/user/1',
  updateInfoWithFakeUserId: '/api/v1/user/100',
  changepassword: '/api/v1/user/changepassword/1',
  changepasswordWithFakeUserId: '/api/v1/user/changepassword/1002'
};
