import React,{useEffect} from 'react'
import moment from 'moment';
import {LoadingCircle} from '../helpers/componentsHelper'
import { getAnalytics, logEvent } from "firebase/analytics";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Button,
} from "@material-tailwind/react";
const ProductList = ({data,handleBuyPointProduct,setSelectedProduct}) => {
  const analytics = getAnalytics();
  useEffect(()=>{
    logEvent(analytics, 'Order_已購咒語頁面_進入訪問')
  },[])

  if(!data) return
 /*** {
    "id": 1,
    "name": "new point_product",
    "point": 10,
    "subscription_days": 10,
    "is_active": true,
    "created_at": "2023-10-04T10:40:10.197740Z"
  } ***/
  return (
    <div className='text-white pb-10'>
      <div className='text-sm text-white/80'>{data.length} items</div>

      <div className='grid grid-cols-1 md:grid-cols-3 gap-10 mt-6 place-content-center'>
      {
        data.map((item,index)=>{
          const {id,name,point,subscription_days,is_active}= item
          return(
            <Card color="gray" variant="gradient" className="w-full " key={'gifrcard'+index}>
              <CardHeader
                floated={false}
                shadow={false}
                color="transparent"
                className="m-0 text-center"
              >
                <img
                  src="https://moonshine.b-cdn.net/msweb/moonshotai/rewards_images/p02.jpeg"
                  alt="card-image"
                  className=' rounded-md  object-cover  aspect-[4/2.6] '
                />
              </CardHeader>
              <CardBody>
                <Typography
                  variant="h5"
                  color="white"
                  className="uppercase text-center font-bold"
                >
                  {name}
                </Typography>
                <Typography
                  variant="small"
                  color="white"
                  className="font-normal uppercase text-center mt-6"
                >
                   {subscription_days} 天進階會員
                </Typography>
                <Typography
                  variant="small"
                  color="amber"
                  className="font-normal uppercase text-center"
                >
                   支付 {point} 點數
                </Typography>
              </CardBody>
              <CardFooter className="mx-4 mb-4 p-0">
                <Button
                  size="lg"
                  color="white"
                  className="hover:scale-[1.02] focus:scale-[1.02] active:scale-100"
                  ripple={false}
                  fullWidth={true}
                  onClick={()=>{
                    handleBuyPointProduct()
                    setSelectedProduct(item)
                  }
                  }
                >
                  兌換獎勵
                </Button>
              </CardFooter>
            </Card>
          )
        })
      }
      </div>

    </div>
  )
}

export default ProductList