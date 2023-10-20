import React from 'react'
import {useAdminPPList,useAdminCreatePointProduct,useAdminPatchPointProduct} from '../../SpaceHelper'
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
import AddPointProductModal from '../../Components/AddPointProductModal';
import EditPointProductModal from '../../Components/EditPointProductModal';
const TABLE_HEAD = ["品名", "兌換點", "狀態", "產生日期", ""];
function Index() {
  const [open, setOpen] = React.useState(false);
  const [openEdit, setOpenEdit] = React.useState(false);
  const [currentItem, setCurrentItem] = React.useState({});
  const handleOpen = () => setOpen(!open);
  const handleOpenEdit = (item) => {
    setCurrentItem(item)
    setOpenEdit(!openEdit)
  };
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isError,
    refetch,
  } = useAdminPPList();

  function formatDateTime(dateTimeString) {
		const date = new Date(dateTimeString);
	
		const year = date.getFullYear();
		const month = (date.getMonth() + 1).toString().padStart(2, "0");
		const day = date.getDate().toString().padStart(2, "0");
		const hours = date.getHours().toString().padStart(2, "0");
		const minutes = date.getMinutes().toString().padStart(2, "0");
	
		return `${year}/${month}/${day} ${hours}:${minutes}`;
	}

  const createPPMutation = useAdminCreatePointProduct('adminPPList')
  const patchPPMutation = useAdminPatchPointProduct('adminPPList')
  const handleCreate = (items) =>{
    createPPMutation.mutateAsync({items}).then(()=>{
      setOpen(false)
    })
  }
  const handleEdit = (items) =>{
    patchPPMutation.mutateAsync({currentItem,items}).then(()=>{
      setOpenEdit(false)
    })
  }
  return (
    <div>
      <AddPointProductModal open={open} handleOpen={handleOpen} handleCreate={handleCreate}/>
      <EditPointProductModal open={openEdit} handleOpen={handleOpenEdit} currentItem={currentItem} handleEdit={handleEdit} />
      <Card className="h-full w-full">
        <CardHeader floated={false} shadow={false} className="rounded-none">
          <div className="mb-8 flex items-center justify-between gap-8">
            <div>
              <Typography variant="h5" color="blue-gray">
                點數商品列表
              </Typography>
              <Typography color="gray" className="mt-1 font-normal">
                管理現有的點數兌換商品
              </Typography>
            </div>
            <div className="flex shrink-0 flex-col gap-2 sm:flex-row">

              <Button className="flex items-center gap-3" size="sm" onClick={handleOpen}>
                <FaPlus strokeWidth={2} className="h-4 w-4" /> 新增商品
              </Button>
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
                  const { id, name,point,subscription_days, is_active, created_at } =item
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
                              {is_active}
                            </Typography>
                          </div>
                        </div>
                      </td>
                      <td className={classes}>
                        <div className="flex flex-col">
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-normal"
                          >
                            支付 {point} Point
                          </Typography>
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-normal opacity-70"
                          >
                            可換 {subscription_days} 天
                          </Typography>
                        </div>
                      </td>
                      <td className={classes}>
                        <div className="w-max">
                          <Chip
                            variant="ghost"
                            size="sm"
                            value={is_active ? "啟用" : "未啟用"}
                            color={is_active ? "green" : "blue-gray"}
                          />
                        </div>
                      </td>
                      <td className={classes}>
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal"
                        >
                          {formatDateTime(created_at)}
                        </Typography>
                      </td>
                      <td className={classes}>
                        <Tooltip content="編輯">
                          <IconButton variant="text" 
                            onClick={()=>handleOpenEdit(item)                            }>
                            <FaPen className="h-4 w-4" />
                          </IconButton>
                        </Tooltip>
                        <Tooltip content="刪除">
                          <IconButton variant="text">
                            <FaTrashCan className="h-4 w-4" />
                          </IconButton>
                        </Tooltip>
                      </td>
                    </tr>
                  );
                },
              ) :  <div className='text-black/50 p-2'>目前沒有任何兌換商品。</div>
              }
            </tbody>
          </table>
        </CardBody>
       
      </Card>



    </div>
  )
}

export default Index