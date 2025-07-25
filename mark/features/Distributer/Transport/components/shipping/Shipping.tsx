import React from 'react';
import style from './Shipping.module.css';
import formatThaiDate from '@/utils/formatDateThai';

interface Shipping {
  status: string;
  licensePlate: string
  createdAt: string;
  displayId: string;
  importBy: string;
  exportBy: string;
}
interface ShippingProps {
  shipping: Shipping;
}

const Shipping = ({shipping}: ShippingProps) => {
  return (
    <div className={style.container}>
      <div className={style.status}>
        {shipping.status}
      </div>
      <div className={style.date}>{formatThaiDate(shipping.createdAt)}</div>
      <div className={style.devider} />

      <div className={style.Name}>
        <img className={style.Icon} src="/icons/truckGray.svg"/>{shipping.licensePlate}
      </div>
      <div className={style.Name}>
        <img className={style.Icon} src="/icons/globeGray.svg"/>{shipping.exportBy}
      </div>
      <div className={style.Name}>
        <img className={style.Icon} src="/icons/importGray.svg"/>{shipping.importBy}
      </div>
      <div className={style.displayId}>
        ID:{shipping.displayId !== null ? shipping.displayId : 'ไม่ระบุ'}  <img className={style.Icon} src="/icons/chevronGray.svg"/>
      </div>
    </div>
  )
}

export default Shipping