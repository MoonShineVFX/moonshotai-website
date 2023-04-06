import React from 'react'
import Steps from '../../Components/Steps'
import Step from '../../Components/Step'

function Section1_ver2() {
  return (
    <div>
      <Steps>
        <Step>
          <div className='flex flex-col  justify-center items-center'>
            <div className='text-2xl text-center font-bold mb-10 text-white'>STEP 1</div>
            <div>
              <img src={process.env.PUBLIC_URL+'/images/ver2_images/howtojoin/linestep01.png'} alt="" />
            </div>
          </div>
        </Step>
        <Step>
          <div className='flex flex-col  justify-center items-center'>
            <div className='text-2xl text-center font-bold mb-10 text-white'>STEP 2</div>
            <div>
              <img src={process.env.PUBLIC_URL+'/images/ver2_images/howtojoin/linestep02.png'} alt="" />
            </div>
          </div>
        </Step>
        <Step>
          <div className='flex flex-col  justify-center items-center'>
            <div className='text-2xl text-center font-bold mb-10 text-white'>STEP 3</div>
            <div>
              <img src={process.env.PUBLIC_URL+'/images/ver2_images/howtojoin/linestep03.png'} alt="" />
            </div>
          </div>
        </Step>
      </Steps>
    </div>
  )
}

export default Section1_ver2