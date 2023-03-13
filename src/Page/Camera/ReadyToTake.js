import React, { useState, useRef } from "react";
import {Camera} from "react-camera-pro";
import styled from 'styled-components';
import { FaSyncAlt,FaCamera } from "react-icons/fa";
const Wrapper = styled.div`
  position: fixed;
  width: 100%;
  height: 100%;
  z-index: 1;
`;

const Control = styled.div`
  position: fixed;
  display: flex;
  right: 0;
  width: 20%;
  min-width: 130px;
  min-height: 130px;
  height: 100%;
  background: rgba(51, 51, 51, 0.8);
  z-index: 10;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px;
  box-sizing: border-box;
  flex-direction: column-reverse;
  @media (max-aspect-ratio: 1/1) {
    flex-direction: row;
    bottom: 0;
    width: 100%;
    height: 20%;
  }
  @media (max-width: 400px) {
    padding: 5px;
  }
`;

const Button = styled.button`
  outline: none;
  color: white;
  opacity: 1;
  background: transparent;
  background-color: transparent;
  background-position-x: 0%;
  background-position-y: 0%;
  background-repeat: repeat;
  background-image: none;
  padding: 0;
  text-shadow: 0px 0px 4px black;
  background-position: center center;
  background-repeat: no-repeat;
  pointer-events: auto;
  cursor: pointer;
  z-index: 2;
  filter: invert(100%);
  border: none;
  &:hover {
    opacity: 0.7;
  }
`;

const TakePhotoButton = styled(Button)`
  background: url('https://img.icons8.com/ios/50/000000/compact-camera.png');
  background-position: center;
  background-size: 50px;
  background-repeat: no-repeat;
  width: 80px;
  height: 80px;
  border: solid 4px black;
  border-radius: 50%;
  &:hover {
    background-color: rgba(0, 0, 0, 0.3);
  }
`;

const ChangeFacingCameraButton = styled(Button)`
  background: url(https://img.icons8.com/ios/50/000000/switch-camera.png);
  background-position: center;
  background-size: 40px;
  background-repeat: no-repeat;
  width: 40px;
  height: 40px;
  padding: 40px;
  &:disabled {
    opacity: 1;
    cursor: default;
  }
  @media (max-width: 400px) {
    padding: 40px 5px;
  }
`;

const ImagePreview = styled.div`
  width: 120px;
  height: 120px;
  ${({ image }) => (image ? `background-image:  url(${image});` : '')}
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
  @media (max-width: 400px) {
    width: 50px;
    height: 120px;
  }
`;
function ReadyToTake() {
  const [numberOfCameras, setNumberOfCameras] = useState(1);
  const [image, setImage] = useState(null);
  const camera = useRef(null);
  const handleClick = ({photo})=>{
    if (image) {
      UploadImage(photo)
      return
    } else{
      return
    }
  }
  const UploadImage = (base64Data)=>{
    const formData = new FormData();
    formData.append('image', base64Data);

    // 使用Fetch API上傳圖片
    fetch('https://camera.moonshot.today/gen', {
      method: 'POST',
      body: formData
    })
    .then(response => response.json())
    .then(responseData => {
      console.log(responseData);
    })
    .catch(error => {
      console.error(error);
    });
  }
  return (
    <div className="mx-14">
      <Camera ref={camera} aspectRatio={9/16} numberOfCamerasCallback={setNumberOfCameras}/>
      <div className="flex justify-center gap-3 my-4  p-2 rounded-xl items-center">
        <ImagePreview image={image} />
        <div 
          className="flex items-center gap-3  rounded-full bg-zinc-600 p-3 "
          onClick={() => {
            if (camera.current) {
              const result = camera.current.switchCamera();
              console.log(result);
            }
          }}
           
        > <FaSyncAlt /></div>
        <div 
          className="flex items-center gap-3  rounded-full bg-white p-5 shadow-lg shadow-zinc-300/50"
          onClick={() => {
            if (camera.current) {
              const photo = camera.current.takePhoto();
              console.log(photo);
              setImage(photo);
              handleClick(photo)
            }
          }} 
        > <FaCamera color="black" size={24}/>  </div>
         
      </div>
     
      {/* <Control >
        <ImagePreview image={image} />
        <TakePhotoButton
          onClick={() => {
            if (camera.current) {
              const photo = camera.current.takePhoto();
              console.log(photo);
              setImage(photo);
            }
          }}
        />
        <ChangeFacingCameraButton
          disabled={numberOfCameras <= 1}
          onClick={() => {
            if (camera.current) {
              const result = camera.current.switchCamera();
              console.log(result);
            }
          }}
        />
      </Control> */}
    </div>
  )
}

export default ReadyToTake