import React from 'react';
import style from './Log.module.css';
import { formatEngDate } from '@/utils/formatDateThai';

interface Log {
  status: string;
  inspectedAt: string;
  displayId: string;
}
interface LogProps {
  log: Log;
}

const Log = ({log}: LogProps) => {
  return (
    <div className={style.container}>
      <div className={style.status}>
        {log.status}
      </div>
      <div className={style.date}>{formatEngDate(log.inspectedAt)}</div>
      <div className={style.devider} />
      <div className={style.displayId}>
        ID:{log.displayId !== null ? log.displayId : 'ไม่ระบุ'}  
      </div>
    </div>
  )
}

export default Log