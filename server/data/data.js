
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

export const changeAvatar = {
  avatarUrl: 'https/andela-source/me.png'
};

export const corruptOnChangeAvatar = {
  faker: 'loadserver.js'
};

const apiV1User = '/api/v1/user/';

export const routes = {
  root: '/',
  signup: `${apiV1User}signup`,
  signin: `${apiV1User}signin`,
  agents: `${apiV1User}agents`,
  updateInfo: `${apiV1User}updateinformation/1`,
  updateInfoWithFakeUserId: `${apiV1User}updateinformation/100`,
  changepassword: `${apiV1User}changepassword/1`,
  changepasswordWithFakeUserId: `${apiV1User}changepassword/1002`,
  changeAvatar: `${apiV1User}changeavatar/1`,
  changeAvatarWithFakeUserId: `${apiV1User}changeavatar/777`
};
