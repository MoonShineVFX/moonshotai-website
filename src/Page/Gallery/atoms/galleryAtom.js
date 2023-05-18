import { atom,selector,useSetRecoilState } from 'recoil';
import {fetchGalleries} from '../helpers/fetchHelper'

// linelogined -> lineUserProfile -> api login -> api use profile
export const isLoginState = atom({
  key: 'isLoginState',
  default: false ,
});

export const lineProfileState = atom({
  key: 'lineProfileState',
  default: null,
});
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

export const imageByIdSelector = selector({
  key: 'imageByIdSelector',
  get: async ({ get }, imageId) => {
    const imageData = get(imageDataState);

    if (imageData && imageData.id === imageId) {
      return imageData;
    }
    const headers = {'Content-Type': 'application/json'}
    fetchGalleries(headers)
      .then(data => {
        const newImageData = data.results.find((item)=>{
          return item.id === imageId
        })
        const setImageData = useSetRecoilState(imageDataState);
        setImageData(newImageData);

        return newImageData;
      })


  },
});