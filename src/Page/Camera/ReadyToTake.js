import React, { useState, useRef, useEffect } from "react";
import {Camera} from "react-camera-pro";
import styled from 'styled-components';
import { FaSyncAlt,FaCamera,FaTimes,FaArrowLeft,FaShareAlt,FaReply,FaRedo } from "react-icons/fa";
import { MdCameraswitch, MdPhotoCamera,MdMobileScreenShare, MdClose,MdDownload,MdRefresh,MdReply } from "react-icons/md";
import { motion, AnimatePresence } from "framer-motion";
import Resizer from "react-image-file-resizer";
import useProgressiveImg from "../../Helper/useProgressiveImg";
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

const ResultImagePreview = styled.div`
  width: 300px;
  height: 800px;
  ${({ ResultImage }) => (ResultImage ? `background-image:  url(${ResultImage});` : '')}
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
  position:absolute;
  @media (max-width: 400px) {
    width: 50px;
    height: 120px;
  }
`;
function ReadyToTake({handleBackClick}) {
  const [numberOfCameras, setNumberOfCameras] = useState(1);
  const [image, setImage] = useState(null);
  const [waitImage, setwaitImage] = useState(false);
  const [ResultImage, setResultImage] = useState(null);
  const [shareMsg, setShareMsg] = useState("");
  const [showFlashImage, setShowFlashImage] = useState(false);
  const camera = useRef(null);
  const [token, setToken] = useState(null);
  

  const handleClick = async (photo)=>{
    // setShowFlashImage(true);
    setTimeout(() => setShowFlashImage(true), 200);
    setTimeout(() => setShowFlashImage(false), 220); // 秒後隱藏圖片
    setTimeout(() => setwaitImage(true), 300);
    fetchAiRenderApi(photo)
  }
  //再算一次
  const handleReRender = async ()=>{
    setTimeout(() => setResultImage(null), 200);
    fetchAiRenderApi(image)
  }
  const fetchAiRenderApi= async(photo)=>{
    // const binaryImage = await atob(photo.split(",")[1]);
    // console.log(photo)
    const files = await base64toFileList(photo)
    const compressFiles = await resizeFile(files[0]);
    // console.log(image)
    const formData = new FormData();
    formData.append('image', compressFiles); 
    formData.append('token', token); 
    // console.log(files[0])
    console.log(compressFiles)


    // 使用Fetch API上傳圖片
    fetch('https://camera.moonshot.today/gen', {
      method: 'POST',
      body: formData
    })
    .then(response => response.json())
    .then(responseData => {
      console.log( responseData.substring(0, responseData.length - 2).slice(6));
      setResultImage(responseData.substring(0, responseData.length - 2).slice(6))
      getNewGToken()
    })
    .catch(error => {
      console.error(error);
    });
  }
  function base64toFileList(base64String) {
    const byteCharacters = atob(base64String.split(",")[1]);
    const byteArrays = [];
  
    for (let offset = 0; offset < byteCharacters.length; offset += 512) {
      const slice = byteCharacters.slice(offset, offset + 512);
  
      const byteNumbers = new Array(slice.length);
      for (let i = 0; i < slice.length; i++) {
        byteNumbers[i] = slice.charCodeAt(i);
      }
  
      const byteArray = new Uint8Array(byteNumbers);
      byteArrays.push(byteArray);
    }
  
    const file = new File(byteArrays,  "image.jpeg", { type: 'image/jpeg' });
  
    return [file];
  }
  const resizeFile = (file) => 
    new Promise((resolve) => {
      Resizer.imageFileResizer(
        file,
        300, // 設置圖像的最大寬度
        400, // 設置圖像的最大高度
        'JPEG', // 設置圖像的格式
        70, // 設置圖像的質量
        0, // 設置圖像的旋轉角度
        (uri) => {
          resolve(uri);
        },
        'file' // 設置返回的圖像格式
      );
    });

  const handleCloseClick = async() =>{
    setwaitImage(false)
    setResultImage(null)
  }
  //給分享圖片
  const handleShare = async () => {
    const imgUrl = document.querySelector('.resultImage').src
    console.log(imgUrl)
    try {
      if (navigator.share) {
        const response = await fetch(imgUrl);
        const blob = await response.blob();
        const filesArray = [new File([blob], 'image.jpg', { type: 'image/jpeg' })];
        const shareData = {
          files: filesArray,
        };
        await navigator.share(shareData);
      } else {
        console.log('Web Share API not supported');
        setShareMsg('如果是桌面瀏覽器不支援分享功能')
      }
    } catch (error) {
      if (error.toString().includes('AbortError')) {
        console.log('取消分享')
      }
      console.error('Error sharing:', error);
      // setShareMsg('Error sharing:'+ error)
    }
  };
  //下載圖片
  const handleDownloadImage = async ()=>{
    const imgUrl = document.querySelector('.resultImage').src
    fetch(imgUrl)
    .then(response => {
      if (response.ok) {
        return response.blob();
      }
      throw new Error('Network response was not ok.');
    })
    .then(blob => {
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'image.jpg');
      document.body.appendChild(link);
      link.click();
      link.remove();
    })
    .catch(error => {
      console.error('Error downloading image: ', error);
    });
  }
  const getNewGToken = async ()=>{
    window.grecaptcha.ready(() => {
      window.grecaptcha.execute('6Lf2JiElAAAAALbuDb9WVQYIiUIcyUi4W9bbToHU', { action: 'submit' })
        .then(token => setToken(token));
    });
  }

  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://www.google.com/recaptcha/api.js?render=6Lf2JiElAAAAALbuDb9WVQYIiUIcyUi4W9bbToHU';
    script.async = true;
    script.defer = true;
    script.addEventListener('load', () => {
      getNewGToken()
    });
    document.head.appendChild(script);
  }, []);



  const [src, { blur }] = useProgressiveImg(process.env.PUBLIC_URL+'/images/camera_page/tiny.jpeg', ResultImage);
  return (
    <div className="min-h-[100svh]">
      {waitImage && 
        <div className="absolute top-0 left-0  w-full">
          <div className="absolute top-0 left-0 w-full h-[100vh] bg-black/60 z-10"></div>
          <motion.div 
            className="  absolute top-5 left-1/2 -translate-x-1/2   z-50 w-11/12 p-2 bg-black  rounded-lg"
            initial={{ opacity: 0, scale: 0 ,x:'-50%' }}
            animate={{ opacity: 1, scale: 1 ,x:'-50%' , transition:{ duration:.4}}}
            exit={{ opacity: 0 }}
          >
            
            {/* 拍照顯示區 */}
            {ResultImage ?  
            <div className="flex flex-col items-center relative ">
                <div className=" relative">
                  <div className=" absolute top-2 right-2  bg-black/30 rounded-full p-2" onClick={()=>handleCloseClick()}><MdClose /></div>
                  <img src={src} alt="" className="resultImage" style={{
                    filter: blur ? "blur(10px)" : "none",
                    transition: blur ? "none" : "filter 0.3s ease-out"
                  }}/> 
                  <div className="text-black flex items-center gap-2 mt-8 mb-1 justify-center flex-wrap text-sm absolute bottom-2  w-1/2 left-1/2 -translate-x-1/2 rounded-full bg-black/60  border-black ">
                    <div className="flex gap-2 items-center justify-center py-2">
                      <div className=" flex items-center justify-center text-white  gap-1 hidden" onClick={()=>handleDownloadImage()}>  <MdDownload size={18} /></div>
                      <div className=" flex items-center justify-center text-white  gap-1" onClick={()=>handleReRender()}>  <MdRefresh size={18} /></div>
                      <div className=" flex items-center justify-center text-white  gap-1 hidden" onClick={handleShare}> <MdReply size={18} style = {{transform: 'scaleX(-1)' }} /></div>

                    </div>
                    <div className="  flex-[0_0_100%] text-center hidden">{shareMsg}</div>
                  </div>
                </div>
                
                <div className=" text-white font-bold flex flex-col items-center my-6 text-xs">
                  <div>長按圖片以儲存或分享</div>
                  <div>Press & hold to download image.</div>
                </div>
            </div>
            : 
            <div className="flex flex-col items-center relative ">
              <div className="   absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2  w-10/12 z-20 flex flex-col"> 
                <div className="animate-bounce w-[90px] mx-auto translate-z-0  ">
                  <img src={process.env.PUBLIC_URL+'/images/logo-2.png'} alt="" className="  " />
                </div>
                {/* <div className="bg-white text-center text-black  mt-10  px-2 py-1 rounded-full perspective translate-z-0">已拍照片 等待 AI 結果..</div>  */}
              </div>
              <img src={image} alt="" className=" blur-sm brightness-80 " />
              <div className="bg-black text-center text-white  mt-10  px-2 py-1 rounded-full absolute top-0 z-50">AI 圖像生成中...</div> 
            </div>
            }
            
          </motion.div>  
        </div>
        
      }
      <div> 
      
      </div>
      <div className=" relative">
        {showFlashImage && (
          <div className=" absolute top-0  w-full h-full  z-50 bg-white   overflow-hidden">
            <img
              src={process.env.PUBLIC_URL+'/images/camera_page/whiteflash4.png'}
              alt="Flash Image"
              className="   scale-150 overflow-hidden"
              
            />
          </div>
        )}
        <Camera ref={camera} aspectRatio={9/13}  numberOfCamerasCallback={setNumberOfCameras} 
        />

      </div>
     <div className=" absolute top-5 left-5  " onClick={handleBackClick}><FaArrowLeft size={20} /></div>
      <div className="flex justify-center gap-7 my-4  p-2 rounded-xl items-center ">
        {/* <ImagePreview image={image} /> */}
        <div 
          className="flex items-center gap-3  rounded-full bg-zinc-600 p-5 "
          onClick={() => {
            if (camera.current) {
              const result = camera.current.switchCamera();
              console.log(result);
            }
          }}
           
        > <MdCameraswitch size={24}/> </div>
        <div 
          className="flex items-center gap-3  rounded-full bg-white p-5 shadow-lg shadow-zinc-300/50"
          onClick={() => {
            if (camera.current) {
              const photo = camera.current.takePhoto();
              // console.log(photo);
              setImage(photo);
              handleClick(photo)
            }
          }} 
        > <MdPhotoCamera color="black" size={24}/>  </div>
         
      </div>
      {/* <div className=" absolute top-0 left-0"> {windowSize.height}</div> */}
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