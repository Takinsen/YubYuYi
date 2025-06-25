import React from 'react';
import style from './Lot.module.css';
import formatThaiDate from '@/utils/formatDateThai';

interface Lots {
  status: string;
  lotId: string;
  farmId: string;
  farmName: string;
  variety: string;
  createdAt: string;
  displayId: string;
}
interface LotProps {
  lot: Lots;
}

const Lot = ({lot}: LotProps) => {
  return (
    <div className={style.container}>
      <div className={style.status}>
        {lot.status}
      </div>
      <div className={style.date}>{formatThaiDate(lot.createdAt)}</div>
      <div className={style.devider} />

      <div className={style.Name}>
        <img className={style.Icon} src="/icons/tractorGray.svg"/>{lot.farmName}
      </div>
      <div className={style.Name}>
        <img className={style.Icon} src="/icons/branchGray.svg"/>{lot.variety}
      </div>
      <div className={style.displayId}>
        ID:{lot.displayId !== null ? lot.displayId : 'ไม่ระบุ'}  
      </div>
    </div>
  )
}

export default Lot