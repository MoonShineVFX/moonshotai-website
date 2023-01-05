import React,{useState} from 'react'
import Masonry from 'react-masonry-css'
function HeaderImagesBg({data}) {
  return (
    <div>
      <Masonry
        breakpointCols={8}
        className="my-masonry-grid"
        columnClassName="my-masonry-grid_column">
          {data.map((item,index)=>{
            return(
              <div key={'img'+index}>
                <img src={process.env.PUBLIC_URL+ '/images/headerimgs/'+item.image} alt="" />
              </div>
            )
          })}
      </Masonry>
    </div>
  )
}

export default HeaderImagesBg