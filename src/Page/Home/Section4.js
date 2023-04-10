import React,{ useState } from 'react'
import Masonry from 'react-masonry-css'
import {headerImagesItem} from '../../Components/ItemData'
function Section4() {
  const [randomData, setRandomData] = useState(headerImagesItem);
  function shuffle(array) {
    let currentIndex = array.length, randomIndex;

    while (currentIndex != 0) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;

      [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
    }

    return array;
  }
  // 在組件加載時呼叫shuffle函式
  React.useEffect(() => {
    setRandomData(shuffle(headerImagesItem.slice(0,12)));
  }, [headerImagesItem]);
  return (
    <div className='text-white my-36 w-11/12 mx-auto relative'>
      <div className='text-4xl text-center font-bold mb-8'>Expand The Boundaries Of  <span className='font-extrabold text-transparent  bg-clip-text bg-gradient-to-r from-lime-300 to-lime-500'>Imagination</span></div>
      <div className='w-10/12 relative my-20 mx-auto'>
        <Masonry
          breakpointCols={{default: 4}}
          className="my-masonry-grid"
          columnClassName="my-masonry-grid_column">
            {randomData.map((item,index)=>{
              return(
                <div key={'img'+index} className=''>
                  <img src={process.env.PUBLIC_URL+ '/images/ver2_images/header/'+item.image} alt=""  className='w-full rounded-lg'/>
                </div>
              )
            })}
        </Masonry>
        
        

      </div>
      <div className='bg-gradient-to-t from-[#161718] absolute bottom-0  h-[90vh] w-full'></div>

    </div>
  )
}

export default Section4