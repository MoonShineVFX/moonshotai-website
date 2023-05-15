import { atom } from 'recoil';

export const loginState = atom({
  key: 'loginState',
  default: null,
});

export const userState = atom({
  key: 'userState',
  default: null,
});

export const imageFormModalState = atom({
  key: 'imageFormModalState',
  default: false,
});
export const beforeDisplayModalState = atom({
  key: 'beforeDisplayModalState',
  default: false,
});

export const imageModalState = atom({
  key: 'imageModalState',
  default: false,
});
export const imageDataState = atom({
  key: 'imageDataState',
  default: null,
});