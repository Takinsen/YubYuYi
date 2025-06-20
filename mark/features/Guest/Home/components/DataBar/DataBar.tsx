import React from 'react'
import style from './DataBar.module.css';

interface DataBarInterfece {
  text : string
  passed? : boolean
}

const DataBar = ({text, passed = true} : DataBarInterfece) => {
  return (
    <div className={style.dataBar}>
              <div className={passed ? style.checkCircleGreen : style.checkCircleGray}>
                <img src="/icons/checkWhite.svg" className={style.check}/>
              </div>
              {text}
          </div>
  )
}

export default DataBar