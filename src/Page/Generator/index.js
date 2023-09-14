import React,{useState,useEffect} from 'react'
import liff from '@line/liff';
import { useForm,Controller } from "react-hook-form";
import { motion } from 'framer-motion';
import {ModelSelector,StyleSelector} from './SelectorComponent'
import { Button,Checkbox,Radio,Spinner} from "@material-tailwind/react";
import { promptPresets,models} from './promptPresets'
import { FaWandSparkles,FaCheck } from "react-icons/fa6";

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
  const { register, handleSubmit, control,watch,setValue,reset, formState: { errors } } = useForm({
    defaultValues:{
      selectedModel:'xl',
      selecteStyle:'無',
      prompt:'',
      nativeprompt:'',
      ratio:5,
      steps:25,
      scaleOption:'0'
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

  const [ currentModel , setCurrentModel] = useState(models[0])
  const [ currentStyle , setCurrentStyle] = useState(promptPresets[0])
  const [errMsg , setErrMsg] = useState('')
  const [sendSuccess , setSendSuccess] = useState(false)


  const RatioRecElement = ({rv})=>{
    const ra = RATIOS[rv - 1];
    return <div className={` aspect-[${ra.value}] w-1/3 h-auto flex justify-center items-center bg-white/50  border-2 border-white/40 text-white/70 text-xl font-bold`}> {ra.name} </div>
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
    console.log(data)
    // 指令存cookie
    document.cookie = `userText=${encodeURIComponent(data.prompt)}; expires=${new Date(new Date().getTime() + 31536000000).toUTCString()}; path=/`;
    document.cookie = `userNativeText=${encodeURIComponent(data.nativeprompt)}; expires=${new Date(new Date().getTime() + 31536000000).toUTCString()}; path=/`;

    const model = data.selectedModel
    const ratio = data.ratio && data.ratio === 5 ? '' : RATIOS[data?.ratio-1].name+','
    const style = data.selecteStyle && data.selecteStyle === '無' ? '' : '/style:'+data.selecteStyle+','
    const steps = data.steps && parseInt(data.steps) === 25 ? '' : '/steps:'+data.steps+','
    const prompt = data.prompt
    const nprompt = data.nativeprompt.length > 0 ? ',-- '+data.nativeprompt : ''
    const scale = data.scaleOption && data.scaleOption === '0'? '': data.scaleOption+','

    const defaultText = ``
    const alltext = `${model} ${scale}${ratio}${style}${steps}${prompt}${nprompt}`
    setSendSuccess(false)
    liff.sendMessages([
      {
        type: 'text',
        text: alltext
      }
    ]).then(function(res) {
      setSendSuccess(true)
      setTimeout(()=>{
        liff.closeWindow()
      },900)
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
      <div className='py-4 border-b border-white/30'>
        <div className='text-center '>你的創作，從這開始</div>
        <div className='py-1 text-xs text-white/70 text-center '>送出後的提示詞會儲存一段時間，方便繼續編輯。</div>
      </div>
     
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
                      rows={8}
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
                      rows={8}
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
            <div className={`relative  text-sm  break-keep  `}>比例 </div>
            <div className='w-full'>
              <input 
                type="range" name="" id="" max="9" min="1" step={1}  defaultValue={5}
                className="accent-blue-50 w-full "   
                {...register('ratio')}
              />
            </div>
              {/* 比例 */}
            <RatioRecElement rv={watch('ratio')}  />
          </div>

          <div className='py-4  border-white/30 border-t flex flex-col  items-center '>
            <div className='mb-1'><FaWandSparkles /></div>
            <div className='text-base text-white text-center  '>  進階會員指令  </div>
            <div className='py-1 text-xs text-white/70 text-center '>一般會員無法觸發，可於社群尋找推薦序號提升指令權限。</div>

          </div>

          <div className='flex items-center gap-2 my-6'>             
            <div className={`relative  text-sm break-keep  `}>步數 </div>
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

          <div className='flex items-center my-6 gap-4'>
            <div className={`relative text-sm break-keep `}>尺寸</div>       
            <div className='w-full bg-white/20  rounded-lg'>
              <Controller
                name="scaleOption"
                control={control}
                render={({ field }) => (
                  <Radio {...field} icon={ <FaCheck/>}  label="預設" value="0" color="light-blue" labelProps={{className: "text-white"}} defaultChecked />
                )}
              />
              <Controller
                name="scaleOption"
                control={control}
                render={({ field }) => (
                  <Radio {...field} icon={ <FaCheck/>}  label="製作大圖" value="/hr" color="light-blue" labelProps={{className: "text-white"}}/>
                )}
              />
              <Controller
                name="scaleOption"
                control={control}
                render={({ field }) => (
                  <Radio {...field} icon={ <FaCheck/>} label="製作中圖" value="/mr" color="light-blue" labelProps={{className: "text-white"}}/>
                )}
              />
            </div>

          </div>

          <div className='flex gap-2 my-2'>
            <Button color="gray" variant="gradient"  className='w-1/3' onClick={() => reset()}>重設</Button>
            <Button color="blue"  type='submit' className='w-2/3 flex  justify-center items-center  relative'>送出指令 {sendSuccess && <Spinner className=' absolute right-1/4' />}</Button>
          </div>

        

        </div>
      </form>
      <div className='text-red-400 hidden'>會刪:錯誤訊息偵測區：{errMsg}</div>
        
    </div>
  )
}

export default Index
