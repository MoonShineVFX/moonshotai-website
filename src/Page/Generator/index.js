import React,{useState,useEffect} from 'react'
import liff from '@line/liff';
import { useForm,Controller } from "react-hook-form";
import { motion } from 'framer-motion';
import {ModelSelector,StyleSelector} from './SelectorComponent'
import { Button,Checkbox,Radio,Spinner} from "@material-tailwind/react";
import { promptPresets,models} from './promptPresets'
import { FaWandSparkles,FaCheck } from "react-icons/fa6";
import { getAnalytics, logEvent } from "firebase/analytics";
function Index() {
  // console.log(promptPresets)
  const liffID = process.env.REACT_APP_LIFF_GERNERATOR_ID
  const RATIOS = [
    { name: '16:9', value:'16/9', type:"h", aspect:"aspect-[16/9]", percent:"pt-56.25%"  },
    { name: '3:2',  value: '3/2', type:"h", aspect:"aspect-[3/2]", percent:"pt-66.67%"  },
    { name: '4:3',  value: '4/3', type:"h", aspect:"aspect-[4/3]", percent:"pt-75%"     },
    { name: '5:4',  value: '5/4', type:"h", aspect:"aspect-[5/4",   percent:"pt-80%"     },
    { name: '1:1',  value: '1/1', type:"h", aspect:"aspect-[1/1]", percent:"pt-100%"    },
    { name: '4:5',  value: '4/5', type:"v", aspect:"aspect-[4/5]", percent:"pt-125%"    },
    { name: '3:4',  value: '3/4', type:"v", aspect:"aspect-[3/4]", percent:"pt-133.33%" },
    { name: '2:3',  value: '2/3', type:"v", aspect:"aspect-[2/3]", percent:"pt-150%"    },
    { name: '9:16', value: '9/16',type:"v", aspect:"aspect-[9/16]", percent:"pt-177.78%" },
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
  const [ currentStyle , setCurrentStyle] = useState([])
  const [selectedStyles, setSelectedStyles] = useState([]);
  const [errMsg , setErrMsg] = useState('')
  const [sendSuccess , setSendSuccess] = useState(false)
  const analytics = getAnalytics();
  useEffect(()=>{
    logEvent(analytics, '咒語生成器_進入')
  },[])
  const init=async()=>{
    try {
      await liff.init({liffId: liffID}) 
    } catch (error) {
      console.log(error)
      setErrMsg('init err:'+error)
    }
  }
  useEffect( ()=>{
   
    document.body.style.backgroundColor = `#000`;
  
  
    init()
  },[])

  const RatioRecElement = ({rv})=>{
    const ra = RATIOS[rv - 1];
    return  <div className={` ${ra.type === 'h' ?  `w-[36%]`  :  `w-[25%]` } ${ra.aspect}  h-auto flex justify-center items-center bg-white/50  border-2 border-blue-300/70 text-white/70 text-xl font-bold`}> {ra.name} </div>
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
  React.useEffect(() => {
    const cookies = document.cookie.split(';');
    let storedText = '';
    cookies.forEach((cookie) => {
      const [name, value] = cookie.trim().split('=');
      if (name === 'userRatio') {
        storedText = decodeURIComponent(value);
      }
    });
    setValue('ratio', storedText);
  }, [setValue]);
  React.useEffect(() => {
    const cookies = document.cookie.split(';');
    let storedText = '';
    cookies.forEach((cookie) => {
      const [name, value] = cookie.trim().split('=');
      if (name === 'userSteps') {
        storedText = decodeURIComponent(value);
      }
    });
    setValue('steps', storedText);
  }, [setValue]);
  React.useEffect(() => {
    const cookies = document.cookie.split(';');
    let storedText = '';
    cookies.forEach((cookie) => {
      const [name, value] = cookie.trim().split('=');
      if (name === 'userScale') {
        storedText = decodeURIComponent(value);
       
      }
    });
    console.log(storedText)
    setValue('scaleOption', storedText);
  }, [setValue]);
  React.useEffect(() => {
    const cookies = document.cookie.split(';');
    let storedText = '';
    cookies.forEach((cookie) => {
      const [name, value] = cookie.trim().split('=');
      if (name === 'userStyles') {
        storedText = decodeURIComponent(value);
        setSelectedStyles(JSON.parse(storedText))
      }
    });
  }, [setSelectedStyles]);
  React.useEffect(() => {
    const cookies = document.cookie.split(';');
    let storedText = '';
    cookies.forEach((cookie) => {
      const [name, value] = cookie.trim().split('=');
      if (name === 'userModel') {
        storedText = decodeURIComponent(value);
        setCurrentModel(storedText)
        console.log(storedText)
      }
    });
  }, [setCurrentModel]);
  const onSubmit = data => {
    console.log(data)
    console.log(selectedStyles)
    const selectedStylesString = JSON.stringify(selectedStyles);
    const ratioNum = data.ratio ? data.ratio : 5
    const stepNum = data.steps ? data.steps : 25
    const scaleNum = data.scaleOption ? data.scaleOption : "0"

    // 指令存cookie
    document.cookie = `userText=${encodeURIComponent(data.prompt)}; expires=${new Date('2030-01-01').toUTCString()}; path=/`;
    document.cookie = `userNativeText=${encodeURIComponent(data.nativeprompt)}; expires=${new Date('2030-01-01').toUTCString()}; path=/`;
    document.cookie = `userStyles=${selectedStylesString}; expires=${new Date('2030-01-01').toUTCString()}; path=/`;
    document.cookie = `userModel=${data.selectedModel}; expires=${new Date('2030-01-01').toUTCString()}; path=/`;
    document.cookie = `userRatio=${ratioNum}; expires=${new Date('2030-01-01').toUTCString()}; path=/`;
    document.cookie = `userSteps=${stepNum}; expires=${new Date('2030-01-01').toUTCString()}; path=/`;
    document.cookie = `userScale=${data.scaleOption}; expires=${new Date('2030-01-01').toUTCString()}; path=/`;


    const model = data.selectedModel
    const ratio = data.ratio && data.ratio === 5 ? '' : RATIOS[data?.ratio-1].name+','
    let styles = '';
    let ga_styles = '';
    if (!selectedStyles.includes("無")) {
      styles = selectedStyles.map((style) => `/style:${style}`).join(", ")+ ",";
      ga_styles = selectedStyles.map((style) => `${style}`).join(", ")+ ",";
    }
    // const style = data.selecteStyle && data.selecteStyle === '無' ? '' : '/style:'+data.selecteStyle+','
    const steps = data.steps && parseInt(data.steps) === 25 ? '' : '/steps:'+data.steps+','
    const prompt = data.prompt
    const nprompt = data.nativeprompt.length > 0 ? ',-- '+data.nativeprompt : ''
    const scale = data.scaleOption && data.scaleOption === '0'? '': data.scaleOption+','

    const defaultText = ``
    const alltext = `${model} ${scale}${ratio}${styles}${steps}${prompt}${nprompt}`
    console.log(alltext)
    logEvent(analytics, '咒語生成器_送出咒語',{
      u_model:model,
      u_steps:steps,
      u_ratio:ratio,
      u_styles:ga_styles,
      u_scale:scale
    })
    setSendSuccess(false)
    // liff.sendMessages([
    //   {
    //     type: 'text',
    //     text: alltext
    //   }
    // ]).then(function(res) {
    //   setSendSuccess(true)
    //   setTimeout(()=>{
    //     liff.closeWindow()
    //   },900)
    // })
    // .catch(function(error) {
    //   console.log(error);
    //   setErrMsg('sendmsg err:'+error)
    // });
  };


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
                  selectedCookie={currentModel}
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
                  selectedCookie={selectedStyles}
                  onStyleChange={(selectedItem) => {
                    console.log(selectedItem)
                    setSelectedStyles(selectedItem.length > 0 ? selectedItem : ['無'])
                    // field.onChange(selectedItem.label)
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
                  <div>
                    <Radio {...field} icon={ <FaCheck/>}  label="預設" value="0" color="light-blue" labelProps={{className: "text-white"}} checked={field.value === "0"}  />
                    <Radio {...field} icon={ <FaCheck/>}  label="製作大圖" value="/hr" color="light-blue" labelProps={{className: "text-white"}}checked={field.value === "/hr"}/>
                    <Radio {...field} icon={ <FaCheck/>} label="製作中圖" value="/mr" color="light-blue" labelProps={{className: "text-white"}} checked={field.value === "/mr"}/>
                  </div>  
                 
                )}
              />
              {/* <Controller
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
              /> */}
            </div>

          </div>

          <div className='flex gap-2 my-2'>
            <Button color="gray" variant="gradient"  className='w-1/3' 
              onClick={() => 
              {
                reset()
                setCurrentModel(models[0])
                setSelectedStyles([])
              }}>重設</Button>
            <Button color="blue"  type='submit' className='w-2/3 flex  justify-center items-center  relative'>送出指令 {sendSuccess && <Spinner className=' absolute right-1/4' />}</Button>
          </div>

        

        </div>
      </form>
      <div className='text-red-400 hidden'>會刪:錯誤訊息偵測區：{errMsg}</div>
        
    </div>
  )
}

export default Index
