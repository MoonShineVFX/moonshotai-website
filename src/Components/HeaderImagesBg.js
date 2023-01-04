import React from 'react'
import Masonry from 'react-masonry-css'
import {headerImagesItem} from './ItemData'
function HeaderImagesBg() {

  return (
    <div>
      <Masonry
        breakpointCols={8}
        className="my-masonry-grid"
        columnClassName="my-masonry-grid_column">
          {headerImagesItem.map((item,index)=>{
            return(
              <div key={index}>
                <img src={process.env.PUBLIC_URL+ '/images/headerimgs/'+item.image} alt="" />
              </div>
            )
          })}
      </Masonry>
    </div>
  )
}

export default HeaderImagesBg