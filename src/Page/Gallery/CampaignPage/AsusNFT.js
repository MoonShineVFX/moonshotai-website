import React,{useEffect,useState} from 'react'

const AsusNFT = () => {
  const [isMobileWidth, setIsMobileWidth] = useState(false);
  const handleResize = () => {
    setIsMobileWidth(window.innerWidth <= 420);
  };
  useEffect(()=>{
    window.addEventListener('resize', handleResize);

    // 移除監聽器
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  })
  return (
    <div className='pb-20'>
      <a href="https://asusmeta.co/nft_plaza/event" target="_blank" className='w-10/12 md:w-2/3 mx-auto flex justify-center my-8 '>
        <img src="https://moonshine.b-cdn.net/msweb/moonshotai/campaign/asus_nft/asusnft_banner.png" alt="banner" className='max-w-full'/>
      </a>

      <div className="text-white flex flex-col justify-center md:items-center px-10 md:px-4 py-2">
        <h1 className='text-2xl md:text-4xl  font-bold my-2'>ASUS NFT Battle</h1>
        
        <div className='text-xs md:text-base hidden'>
          <div className='flex flex-col justify-center md:items-center  my-4 gap-1 '>
            <p>＼各位客官，Moonshot 限定的台灣美食 LoRa，上菜／</p>
            <p className=''>豆花、滷肉飯、蚵仔煎....多達 20 種的台灣美食 LoRa 讓你算到撐🤤</p>
          </div>

          <div className='flex flex-col justify-center md:items-center my-4 gap-1 '>
            <p>喔對，除了生圖，你還有這些用法......</p>
            <p >女友肚子餓怎麼辦？ Moonshot 開起來直接點餐。</p>
            <p>外國友人來台吃啥？ Moonshot 必比登美食推薦。</p>
            <p>減肥的朋友快放棄？ 打開 Moonshot 肚子飽三圈。</p>

          </div>
          <div className='flex flex-col justify-center md:items-center gap-1'>
            <h2 className='text-xl font-bold my-3 '>如何使用指令？</h2>
            <p>​​➊ 對話框中輸入「/台灣美食」</p>
            <p>➋ 點擊圖片按鈕即可獲得指令！</p>
          </div>
        </div>



      </div>
      
    </div>
  )
}

export default AsusNFT