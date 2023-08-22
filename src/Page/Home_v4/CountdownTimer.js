import React, { useEffect, useState } from 'react';
import moment from 'moment';

function CountdownTimer() {
  const targetDate = '2023-07-20T20:00:00+08:00'; 
  const [remainingTime, setRemainingTime] = useState(null);

  useEffect(() => {
    const interval = setInterval(() => {
      const now = moment();
      const target = moment(targetDate);

      if (now.isBefore(target)) {
        const diff = target.diff(now);
        const duration = moment.duration(diff);
        setRemainingTime(duration);
      } else {
        setRemainingTime(null);
        clearInterval(interval);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [targetDate]);

  if (!remainingTime) {
    return <div>倒數結束！</div>;
  }

  const days = remainingTime.days();
  const hours = remainingTime.hours();
  const minutes = remainingTime.minutes();
  const seconds = remainingTime.seconds();

  return (
    <div className=' flex flex-col justify-center items-center'>
      <div className='text-white/70 my-3'>距離 MoonShot 登月倒數</div>
      <div className='flex text-white justify-center text-2xl font-bold gap-3'>
        <div>{days} 天 </div>
        <div>{hours} 小時 </div>
        <div>{minutes} 分鐘 </div>
        <div>{seconds} 秒</div>
      </div>

    </div>

  )
}

export default CountdownTimer