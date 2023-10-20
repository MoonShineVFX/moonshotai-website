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
          <Link to="./">基本快速功能</Link>
          
        </ListItem>
        <ListItem>
          <Link to="./pp">管理點數商品</Link>
          
        </ListItem>
        <ListItem>
        
        預備按鈕
        </ListItem>
        <ListItem>
       
          預備按鈕
        </ListItem>

      </List>
    </Card>
  )
}

export default AdminSidebar