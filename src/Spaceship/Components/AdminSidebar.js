import React from 'react'
import { Link } from "react-router-dom";
import {
  Card,
  Typography,
  List,
  ListItem,
  ListItemPrefix,
  ListItemSuffix,
  Chip,
  Accordion,
  AccordionHeader,
  AccordionBody,
} from "@material-tailwind/react";
import { FaExternalLinkAlt,FaLayerGroup,FaMedal } from "react-icons/fa";

function AdminSidebar() {
  return (
    <Card className="h-full w-full max-w-[15rem]  p-4 rounded-none ">
      <div className="mb-2 p-4">
        <Typography variant="h5" color="blue-gray">
          主要功能如下
        </Typography>
      </div>
      <List className='min-w-12'>
        <ListItem>
          <ListItemPrefix><FaLayerGroup size={12} /></ListItemPrefix>
          <Link to="./">基本快速功能</Link>
          
        </ListItem>
        <ListItem>
          <ListItemPrefix><FaMedal size={12} /></ListItemPrefix>
          <Link to="./pp">管理點數商品</Link>
          
        </ListItem>
        <ListItem>
          <ListItemPrefix><FaMedal size={12} /></ListItemPrefix>
          <Link to="./pu">管理付費會員</Link>
          
        </ListItem>
        <ListItem>
          <ListItemPrefix><FaExternalLinkAlt size={12} /></ListItemPrefix>
          <a 
            href="https://analytics.google.com/analytics/web/#/p348129419/realtime/overview?params=_u..nav%3Dmaui&collectionId=life-cycle"
            target='_blank'
          >
            <Typography variant="h6" color="blue-gray" className="flex items-center gap-2">
              MS GA頁面
            </Typography>
            <Typography variant="small" color="gray" className="font-normal">
              需登入info帳號
            </Typography>
         
              
          </a>

        </ListItem>
        <ListItem>
       
          預備按鈕
        </ListItem>

      </List>
    </Card>
  )
}

export default AdminSidebar