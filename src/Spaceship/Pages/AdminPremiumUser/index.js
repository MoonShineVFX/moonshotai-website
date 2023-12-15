import React from 'react'
import {useAdminPUserList,formatDateTime} from '../../SpaceHelper'
import {
  Card,
  CardHeader,
  Input,
  Typography,
  Button,
  CardBody,
  Chip,
  CardFooter,
  Tabs,
  TabsHeader,
  Tab,
  Avatar,
  IconButton,
  Tooltip,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter
} from "@material-tailwind/react";
import { FaPlus,FaPen,FaTrashCan } from "react-icons/fa6";

const TABLE_HEAD = ["暱稱", "訂閱情形", "VIP 情形", ""];
function Index() {
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isError,
    refetch,
  } = useAdminPUserList();
  console.log(data)
  return (
    <div>
      <Card className="h-full w-full">
        <CardHeader floated={false} shadow={false} className="rounded-none">
          <div className="mb-8 flex items-center justify-between gap-8">
            <div>
              <Typography variant="h5" color="blue-gray">
                付費會員列表
              </Typography>
              <Typography color="gray" className="mt-1 font-normal">
                管理現有的付費會員
              </Typography>
            </div>

          </div>
        </CardHeader>
        <CardBody className=" px-0">
          <table className="mt-4 w-full min-w-max table-auto text-left">
            <thead>
              <tr>
                {TABLE_HEAD.map((head) => (
                  <th
                    key={head}
                    className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4"
                  >
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-normal leading-none opacity-70"
                    >
                      {head}
                    </Typography>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody >
              {data?.length > 0 ? 
              data.map(
                (item, index) => {
                  const { id, name,email,is_subscribed,is_vip, subscription_end_at, uid,vip_end_at } =item
                  const isLast = index === data.length - 1;
                  const classes = isLast
                    ? "p-4"
                    : "p-4 border-b border-blue-gray-50";
                  return (
                    <tr key={name}>
                      <td className={classes}>
                        <div className="flex items-center gap-3">
                          {/* <Avatar src={img} alt={name} size="sm" /> */}
                          <div className="flex flex-col">
                            <Typography
                              variant="small"
                              color="blue-gray"
                              className="font-normal"
                            >
                              {name}
                            </Typography>
                            <Typography
                              variant="small"
                              color="blue-gray"
                              className="font-normal opacity-70"
                            >
                              {email}
                            </Typography>
                          </div>
                        </div>
                      </td>
                      <td className={classes}>
                        <div className="flex flex-col">
                          <div className="w-max">
                            <Chip
                              variant="ghost"
                              size="sm"
                              value={is_subscribed ? "啟用" : "未啟用"}
                              color={is_subscribed ? "green" : "blue-gray"}
                            />
                          </div>
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-normal opacity-70"
                          >
                            訂閱日期至 {formatDateTime(subscription_end_at)}
                          </Typography>
                        </div>
                      </td>
                      <td className={classes}>
                        <div className="w-max">
                          <Chip
                            variant="ghost"
                            size="sm"
                            value={is_vip ? "啟用" : "未啟用"}
                            color={is_vip ? "green" : "blue-gray"}
                          />
                        </div>
                        <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-normal opacity-70"
                          >
                            VIP 日期至 {vip_end_at ? formatDateTime(vip_end_at) : '無'}
                          </Typography>
                      </td>

                      <td className={classes}>
                        <Tooltip content="編輯">
                          <IconButton variant="text" >
                            <FaPen className="h-4 w-4" />
                          </IconButton>
                        </Tooltip>

                      </td>
                    </tr>
                  );
                },
              ) :  <div className='text-black/50 p-2'>目前沒有任何付費的會員資料。</div>
              }
            </tbody>
          </table>
        </CardBody>
       
      </Card>


    </div>
  )
}

export default Index