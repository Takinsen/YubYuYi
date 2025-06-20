import React from 'react'

import style from './DataBox.module.css';

interface DataBoxInterface {
  title : string,
  text : string,
  iconPath : string,
}

const DataBox = ({title, text, iconPath} : DataBoxInterface) => {
  return (
    <div className={style.dataBox}>
      <img className={style.Icon} src={iconPath}/>
      <div className={style.Title}>{title}</div>
      <div className={style.Text}>{text}</div>
    </div>
  )
}

export default DataBox