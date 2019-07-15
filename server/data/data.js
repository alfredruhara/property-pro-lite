export const fakeToken = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MywiZmlyc3ROYW1lIjoidW5leHBpcmUiLCJsYXN0TmFtZSI6ImNoYWRhIiwiZW1haWwiOiJoYWNrZXJAZ21haWwuY29tIiwicGhvbmVOdW1iZXIiOiIxMzUzNDY1IiwiaWF0IjoxNTYyNTIzNzQ4fQ.YfrzBXgHw8D2Uj6m8_pr55oNLhZH8lzBtnehWNAicKs';

export const signupCredentials = {
  firstName: 'alfred',
  email: 'alfred@gmail.com',
  lastName: 'chada',
  password: '123456',
  phoneNumber: '1353465',
  address: 'Kigali',
  isAdmin: true
};

export const signupCredentials2 = {
  email: 'bootcamp@gmail.com',
  firstName: 'andela',
  lastName: 'chada',
  password: '123456',
  phoneNumber: '1353465',
  address: 'Kigali',
  isAdmin: true
};

export const corruptCredentials = {
  unwanted: false
};
export const signinCredentials = {
  email: 'alfred@gmail.com',
  password: '123456'
};
export const signinCredentials2 = {
  email: 'cbootcamp@gmail.com',
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

export const createProperty = {
  title: 'Andela headquarter',
  status: 'unsold',
  price: '123',
  state: 'abuja',
  address: 'kalilo',
  type: 'flat',
  bathRooms: 8,
  bedRooms: 6,
  imageUrl: 'https/avatar.jpg',
  description: 'lorem inspum loli ismanita kalitum otta em badji',
  kindOfTrade: 'rent'
};

export const updateProperty = {
  title: 'New Andela',
  status: 'sold',
  price: '123',
  state: 'kigali',
  address: 'kalilo',
  type: 'flat',
  bathRooms: 2,
  bedRooms: 2,
  imageUrl: 'https/avatar.jpg',
  description: 'lorem inspum loli ismanita kalitum otta em badji',
  kindOfTrade: 'rent'
};

export const corruptOnUpdateAproperty = {
  title: 'New Andela'
};

const apiV1User = '/api/v1/user/';
const apiV1Property = '/api/v1/property';

export const routes = {
  root: '/',
  signup: '/api/v1/auth/signup',
  signin: '/api/v1/auth/signin',
  agents: `${apiV1User}`,
  updateInfo: `${apiV1User}`,
  updateInfoWithFakeUserId: `${apiV1User}`,
  changepassword: `${apiV1User}changepassword`,
  changepasswordWithFakeUserId: `${apiV1User}changepassword`,
  changeAvatar: `${apiV1User}changeavatar`,
  changeAvatarWithFakeUserId: `${apiV1User}changeavatar`,
  createadvert: '/api/v1/property',
  allProperties: '/api/v1/property',
  viewspecific: `${apiV1Property}/1`,
  deletespecificproperty: `${apiV1Property}/1`,
  updateSpecidicProperty: `${apiV1Property}/1`,
  updateSpecidicPropertyFakeID: `${apiV1Property}/100`,
  tradeSpecificProperty: `${apiV1Property}/1/sold`,
  tradeSpecificPropertyFakeID: `${apiV1Property}/636/sold`,
  untradeSpecificProperty: `${apiV1Property}/1/unsold`,
  untradeSpecificPropertyFakeID: `${apiV1Property}/unsold/188`,
  agentAvailableProperty: `${apiV1Property}/agent`,
  agentTradeProperty: `${apiV1Property}/agent/sold`,
  filterProperty: `${apiV1Property}/filter/search/`,
  filterPropertyLocation: `${apiV1Property}/filter/search/?location=kigali`,
  filterPropertyLocationType: `${apiV1Property}/filter/search/?location=kigali&type=flat`,
  filterPropertyFull: `${apiV1Property}/filter/search/?location=kigali&type=flat&bathrooms=2&bedrooms=2`
};
