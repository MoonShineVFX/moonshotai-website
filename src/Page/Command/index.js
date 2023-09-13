import React, { useEffect } from 'react'
import liff from '@line/liff';
import { characterData,artData,architectureData,transportationData,designData,interiorData } from './prompt_item';
import {
  Tabs,
  TabsHeader,
  TabsBody,
  Tab,
  TabPanel,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Button,
} from "@material-tailwind/react";

function Index() {
  const [activeTab, setActiveTab] = React.useState("character");
  const data = [
    {
      label: "人物角色",
      value: "character",
      desc: `已設定好的角色Prompt。`,
    },
    {
      label: "平面設計",
      value: "design",
      desc: `偏平面設計的圖。`,
    },
    {
      label: "室內裝潢",
      value: "interior",
      desc: `偏室內裝潢的圖。`,
    },
    {
      label: "藝術風格",
      value: "art",
      desc: `偏藝術的圖。`,
    },
    {
      label: "建築風景",
      value: "architecture",
      desc: `偏建築的圖。`,
    },
    {
      label: "運輸交通",
      value: "transportation",
      desc: `偏運輸交通的圖。`,
    }

  ];
  const dataSources = {
    character: characterData,
    art: artData,
    architecture: architectureData,
    transportation: transportationData,
    design: designData,
    interior: interiorData,

  };
  const sendMsg = async(model,prompt,negative_prompt)=>{
    liff.sendMessages([
      {
        type: 'text',
        text: model+' '+prompt+',--'+negative_prompt
      }
    ]).then(function(res) {
      console.log(res)
      
      setTimeout(()=>{
        liff.closeWindow()
      },1000)
    })
    .catch(function(error) {
      console.log(error);
    });

  }
  const init=async()=>{
    try {
      await liff.init({liffId: '1660658719-V7Z6RdQl'}) 
    } catch (error) {
      console.log(error)
    }
  }
  useEffect( ()=>{
    init()
  },[])
  return (
    <div className='p-4 text-white'>
      <div className='text-xs text-center text-white/60 mx-20 my-5'>
        喜歡什麼風格指令請點選，並傳送到 Line 上面直接生成。
      </div>
      <Tabs value={activeTab} >
        <TabsHeader
          className="rounded-none border-b border-gray-500 bg-transparent p-0  overflow-x-auto scrollbar-none   "
          indicatorProps={{
            className:
              "bg-transparent border-b-2 border-gray-50 shadow-none rounded-none",
          }}
        >
          {data.map(({ label, value }) => (
            <Tab
              key={value}
              value={value}
              onClick={() => setActiveTab(value)}

              className={`text-sm break-keep px-4 ${activeTab === value ? "text-white" : "text-white"}`}
            >
              {label}
            </Tab>
          ))}
        </TabsHeader>
        <TabsBody>
          {data.map(({ value, desc }) =>{
            const dataSource = dataSources[value];
            return (
              <TabPanel key={value} value={value} className=' space-y-8'>
                {
                  dataSource.map((item,index)=>(
                    <Card className="w-full " color="gray" key={item.model+index}>
                      <CardHeader shadow={false} floated={false} className="h-44 p-0 m-0 ">
                        <img
                          src={item.image_url+"?width=400"}
                          alt="card-image"
                          className="h-full w-full object-cover  "
                        />
                      </CardHeader>
                      <CardBody>
                        <div className="mb-2 flex items-center justify-center">
                          <Typography color="" className="font-medium text-center text-sm">
                            {item.title}
                          </Typography>
      
                        </div>
                        <Typography
                          variant="small"
                          color="white"
                          className="font-normal opacity-75  hidden"
                        >
                          With plenty of talk and listen time, voice-activated Siri access, and
                          an available wireless charging case.
                        </Typography>
                      </CardBody>
                      <CardFooter className="pt-0 flex  justify-between divide-x border-t border-white/20 divide-white/20  m-0 p-0">
                        <Button
                          ripple={false}
                          fullWidth={true}
                          className="bg-black/0 text-white rounded-none "
                          onClick={()=>sendMsg(item.model,item.prompt,item.negative_prompt)}
                        >
                        使用這個 Prompt
                        </Button>

                      </CardFooter>
                    </Card>
                  ))
                }
              
              </TabPanel>
            )
          })}
        </TabsBody>
      </Tabs>
    </div>

  )
}

export default Index