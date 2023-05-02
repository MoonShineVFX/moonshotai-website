import { atom } from 'recoil';

export const loginState = atom({
  key: 'loginState',
  default: null,
});

export const userState = atom({
  key: 'userState',
  default: null,
});