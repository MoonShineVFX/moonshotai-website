import React,{useState} from 'react'
import Masonry from 'react-masonry-css'
function HeaderImagesBg({data}) {
  const [randomData, setRandomData] = useState([]);
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
    setRandomData(shuffle(data));
  }, [data]);
  return (
    <div>
      <Masonry
        breakpointCols={8}
        className="my-masonry-grid"
        columnClassName="my-masonry-grid_column">
          {randomData.map((item,index)=>{
            return(
              <div key={'img'+index}>
                <img src={process.env.PUBLIC_URL+ '/images/ver2_images/header/'+item.image} alt="" />
              </div>
            )
          })}
      </Masonry>
    </div>
  )
}

export default HeaderImagesBg