import React, { useState } from 'react';
import { MdKeyboardArrowLeft,MdKeyboardArrowRight,MdCheck } from "react-icons/md";


function Steps({children}) {
  const [currentStep, setCurrentStep] = useState(0);
  const stepsCount = React.Children.count(children);
  return (
    <div className='flex  flex-col relative items-center'>

      {React.Children.map(children, (child, index) => {
        return React.cloneElement(child, {
          isActive: currentStep === index,
        });
      })}

      <div className=' absolute md:flex  justify-between w-3/4 top-1/2 px-32 items-center hidden '>
        {currentStep > 0 ? 
          <button 
            className='text-white bg-[#BDDE48] p-4 rounded-full '
            onClick={() => setCurrentStep(currentStep - 1)} disabled={currentStep === 0}>
            <MdKeyboardArrowLeft size={32} color={'black'}/>
          </button>
          :     
          <div className='text-4xl font-bold text-white  gap-2 w-[120px] ' data-aos="fade" data-aos-duration="1000">
          How To  
          <span className='font-extrabold text-transparent  bg-clip-text bg-gradient-to-r from-lime-300 to-lime-500'> Join </span> 
          Moonshot
          </div>
        }
        {
          currentStep === stepsCount - 1 ? 
          <div className='text-4xl font-bold text-white  gap-2 w-[200px] ' data-aos="fade" data-aos-duration="1000">
          Enjoy your
          <span className='font-extrabold text-transparent  bg-clip-text bg-gradient-to-r from-lime-300 to-lime-500'> AI </span> 
          journey !
          </div>
          :
          <button
            className='text-white bg-[#BDDE48] p-4 rounded-full'
            onClick={() => setCurrentStep(currentStep + 1)} disabled={currentStep === stepsCount - 1}>
            <MdKeyboardArrowRight size={32} color={'black'}/>
          </button>
        }


      </div>
      <div className='text-white my-10 flex items-center'>
        <div 
          onClick={()=>setCurrentStep(0)}
          className={'w-10 h-10 cursor-pointer mx-auto border-2 border-[#BDDE48] rounded-full text-lg text-white/60 flex items-center justify-center' + (currentStep >= 0 ?  ' bg-[#BDDE48]' : ' bg-black border-[#BDDE48]/50')}>
          {currentStep >= 0 ? <div><MdCheck color={'black'}/></div> : <div className=''>1</div>}
        </div>
        <div className={'w-32 h-1 '+ (currentStep >= 1 ?  ' bg-[#BDDE48]' : ' bg-[#BDDE48]/50')}></div>
        <div
          onClick={()=>setCurrentStep(1)}
          className={'w-10 h-10 cursor-pointer bg-black mx-auto border-2 border-[#BDDE48] rounded-full text-lg text-white/60 flex items-center justify-center' + (currentStep >= 1 ?  ' bg-[#BDDE48]' : ' bg-black border-[#BDDE48]/50')}>
        {currentStep >= 1 ? <div><MdCheck color={'black'}/></div> : <div className=''>2</div>}
        </div>
        <div className={'w-32 h-1 '+ (currentStep >= 2 ?  ' bg-[#BDDE48]' : ' bg-[#BDDE48]/50')}></div>
        <div 
          onClick={()=>setCurrentStep(2)}
          className={'w-10 h-10 cursor-pointer bg-black mx-auto border-2 border-[#BDDE48] rounded-full text-lg text-white/60 flex items-center justify-center'+ (currentStep >= 2 ?  ' bg-[#BDDE48]' : ' bg-black border-[#BDDE48]/50')}>
        {currentStep >= 2 ? <div><MdCheck color={'black'} /></div> : <div className=''>3</div>}
        </div>
      </div>
      <div className=' absolute justify-between w-3/4 -top-4 px-2 items-center flex md:hidden'>
        {currentStep > 0 ? 
          <button 
            className='text-white  p-4 rounded-full '
            onClick={() => setCurrentStep(currentStep - 1)} disabled={currentStep === 0}>
            <MdKeyboardArrowLeft size={32} color={'white'}/>
          </button>
          :     
          <div></div>
        }
        {
          currentStep === stepsCount - 1 ? 
          <div></div>
          :
          <button
            className='text-white p-4 rounded-full'
            onClick={() => setCurrentStep(currentStep + 1)} disabled={currentStep === stepsCount - 1}>
            <MdKeyboardArrowRight size={32} color={'white'}/>
          </button>
        }
      </div>

    </div>
  )
}

export default Steps