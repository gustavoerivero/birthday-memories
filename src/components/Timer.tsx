import React from 'react'
import styles from '@/styles/Home.module.css'
import { timeFormat } from '@/utils/timeFormat'

interface TimerProps {
  time: number | string | Date
}

const Timer: React.FC<TimerProps> = ({ time }) => {
  return (
    <div className='styles.timer'>
      {timeFormat(time)}
    </div>
  )
}

export default Timer