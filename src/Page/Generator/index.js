import React,{useState,useEffect} from 'react'
import liff from '@line/liff';
import { useForm,Controller } from "react-hook-form";
import { motion } from 'framer-motion';
import {ModelSelector,StyleSelector} from './SelectorComponent'
import { Button} from "@material-tailwind/react";
import { promptPresets,models} from './promptPresets'
function Index() {
  const RATIOS = [
    { name: '16:9', value:'16/9' },
    { name: '3:2', value: '3/2' },
    { name: '4:3', value: '4/3' },
    { name: '5:4', value: '5/4' },
    { name: '1:1', value: '1/1' },
    { name: '4:5', value: '4/5' },
    { name: '3:4', value: '3/4' },
    { name: '2:3', value: '2/3' },
    { name: '9:16', value: '9/16' },
  ]
  const { register, handleSubmit, control,watch,setValue, formState: { errors } } = useForm({
    defaultValues:{
      selectedModel:'ct',
      selecteStyle:'無',
      prompt:'',
      nativeprompt:'',
      ratio:5,
      steps:25,
    }
  });
  const [displayType, setDisplayType] = useState('prompt');
  //https://bunny-cdn.moonland.ai/moonland/etc/danbooru.json

  const promptValue = watch('prompt');
  const promptCount = promptValue ? promptValue.length : 0;
  const nativePromptValue = watch('nativeprompt');
  const nativePromptCount = nativePromptValue ? nativePromptValue.length : 0;
  const [selectedRatio, setSelectedRatio] = useState(RATIOS[0]);

  const stepsValue = watch('steps');
  const cfgScaleValue = watch('cfgScale');

  const [ currentModel , setCurrentModel] = useState(models[0])
  const [ currentStyle , setCurrentStyle] = useState(promptPresets[0])
  const [errMsg , setErrMsg] = useState('')
  useEffect(() => {
    const ratioValue = watch('ratio');
    const newSelectedRatio = RATIOS[ratioValue - 1];

    setSelectedRatio(newSelectedRatio);
  }, [watch('ratio')]);

  const RatioRecElement = ({r})=>{
    return <div className={` aspect-[${r.value}] w-1/3   bg-white/50  border-4 border-white/40 text-white/70 text-xl font-bold`}> {r.name} </div>
  }
  
  React.useEffect(() => {
    const cookies = document.cookie.split(';');
    let storedText = '';
    cookies.forEach((cookie) => {
      const [name, value] = cookie.trim().split('=');
      if (name === 'userText') {
        storedText = decodeURIComponent(value);
      }
    });
    setValue('prompt', storedText);
  }, [setValue]);
  React.useEffect(() => {
    const cookies = document.cookie.split(';');
    let storedText = '';
    cookies.forEach((cookie) => {
      const [name, value] = cookie.trim().split('=');
      if (name === 'userNativeText') {
        storedText = decodeURIComponent(value);
      }
    });
    setValue('nativeprompt', storedText);
  }, [setValue]);
  const onSubmit = data => {
    document.cookie = `userText=${encodeURIComponent(data.prompt)}; expires=${new Date(new Date().getTime() + 31536000000).toUTCString()}; path=/`;
    document.cookie = `userNativeText=${encodeURIComponent(data.nativeprompt)}; expires=${new Date(new Date().getTime() + 31536000000).toUTCString()}; path=/`;
    const alltext = `${data.selectedModel} ${data.ratio ? RATIOS[data?.ratio-1].value : '1/1'},${data.prompt},/steps:${data.steps} styles:${data.selecteStyle} ,--${data.nativeprompt}
    `
    console.log(alltext)
    liff.sendMessages([
      {
        type: 'text',
        text: alltext
      }
    ]).then(function(res) {
      console.log(res)
      
      setTimeout(()=>{
        liff.closeWindow()
      },1000)
    })
    .catch(function(error) {
      console.log(error);
      setErrMsg('sendmsg err:'+error)
    });
  };

  const init=async()=>{
    try {
      await liff.init({liffId: '1660658719-rJwe93nW'}) 
    } catch (error) {
      console.log(error)
      setErrMsg('init err:'+error)
    }
  }
  useEffect( ()=>{
    init()
  },[])
  return (
    <div className=' text-white'>
      <div className='py-4 text-center border-b border-white/30'>你的創作，從這開始</div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className='px-4 py-6 relative'>
          <div className='flex  items-center  '>
            <div 
              className={`relative rounded-t-lg border border-b-0 px-3 py-1 text-sm border-gray-600  bg-gray-900  ${displayType ==='prompt' ? 'text-white  opacity-100 z-10 -mb-[1px]' : 'text-white/50 opacity-70  -z-0 -mb-[3px]'}  `}
              onClick={() => setDisplayType('prompt')}>提示詞 ({promptCount})</div>
            <div 
              className={`relative rounded-t-lg border border-b-0 px-3 py-1 text-sm border-gray-600 -mb-[1px] bg-gray-900 2 ${displayType ==='nativePrompt' ? 'text-white opacity-100  z-10 -mb-[1px]' : 'text-white/50 opacity-70  -z-0  -mb-[3px]'} `}
              onClick={() => setDisplayType('nativePrompt')}>反向提示詞 ({nativePromptCount})</div>
          </div>
          <div className=' relative'>
            {displayType === 'prompt' ? (
              <motion.div
                key={'1'}
                initial={{ opacity: 0 }} 
                animate={{ opacity: 1 }} 
                exit={{ opacity: 0 }}   
                transition={{ duration: 0.3 }} 
              >
                <Controller
                  name="prompt" 
                  control={control} 
                  render={({ field }) => (
                    <textarea
                      {...field} 
                      className='w-full rounded-b-lg bg-gray-900 border-gray-600 border outline-none text-white/80 p-2 text-sm'
                      rows={10}
                    />
                  )}
                />
              </motion.div>
            ) : (
              <motion.div
                key={'2'}
                initial={{ opacity: 0 }} 
                animate={{ opacity: 1 }} 
                exit={{ opacity: 0 }}   
                transition={{ duration: 0.3 }} 
              >
                <Controller
                  name="nativeprompt" 
                  control={control} 
                  render={({ field }) => (
                    <textarea
                      {...field} 
                      className='w-full rounded-b-lg bg-gray-900 border-gray-600 border outline-none text-white/80 p-2 text-sm'
                      rows={10}
                    />
                  )}
                />
              </motion.div>
            )
             
            }
          </div>
          <div className='flex items-center gap-2 my-2'> 
            <Controller
              name="selectedModel" // 指定表单字段的名称，将值存储在 "selectedModel" 字段中
              control={control} // 传递表单控制对象
              defaultValue={models[0].command}
              render={({ field }) => (
                <ModelSelector
                  data={models}
                  onModelChange={(selectedModel) => {
                    setCurrentModel(selectedModel)
                    field.onChange(selectedModel.command)
                    } 
                  }
                />
              )}
            />
            <Controller
              name="selecteStyle" // 指定表单字段的名称，将值存储在 "selectedModel" 字段中
              control={control} // 传递表单控制对象
              defaultValue={promptPresets[0].label}
              render={({ field }) => (
                <StyleSelector
                  data={promptPresets}
                  onStyleChange={(selectedItem) => {
                    setCurrentStyle(selectedItem)
                    field.onChange(selectedItem.label)
                    } 
                  }
                />
              )}
            />
          </div>
          <div className='flex items-center gap-4 h-24 my-6'>             
            <div className={`relative  text-sm border-gray-600 break-keep  `}>比例 </div>
            <div className='w-full'>
              <input 
                type="range" name="" id="" max="9" min="1" step={1}  defaultValue={5}
                className="accent-blue-50 w-full "   
                {...register('ratio')}
              />
            </div>
             <div className='w-1'></div>
              {/* 比例 */}
            <RatioRecElement r={selectedRatio ? selectedRatio : RATIOS[4]} />
          </div>
          <div className='text-base text-gray-400 text-center border-t border-white/50 pt-6'>  進階會員指令  </div>
          <div className='flex items-center gap-2 my-6'>             
            <div className={`relative  text-sm border-gray-600 break-keep  `}>步數 </div>
            <div className='w-full'>
              <input 
                type="range" name="" id="" max="50" min="1" step={1} defaultValue={25}
                className="accent-blue-50 w-full [&::-webkit-slider-thumb]:w-12 "   
                {...register('steps')}
              />
            </div>
            <div>
              {stepsValue}
            </div>
          </div>



          <div className='flex gap-1 my-2'>
            <Button color="gray" variant="gradient"  className='w-1/3'>重設</Button>
            <Button color="blue"  type='submit' className='w-2/3'>送出</Button>
          </div>

        

        </div>
      </form>
      <div className='text-red-400'>會刪:錯誤訊息偵測區：{errMsg}</div>
        
    </div>
  )
}

export default Index
