import React from 'react';

import style from './DataField.module.css'

interface DataItem {
  [key: string]: string | null | undefined;
}

interface DataField {
  data: DataItem[];
}

const DataField:React.FC<DataField> = ({ data }) => {
  return (
   <div>
  {data.map((section, sectionIndex) => (
    <div className={style.Group} key={sectionIndex}>
      {Object.entries(section).map(([key, value], itemIndex, arr) => {
        const isLast = itemIndex === arr.length - 1;
        return (
          <div
            key={key}
            className={isLast ? style.ItemLast : style.Item}
          >
            <div className={style.ItemLable}>{key}</div> 
            <div className={style.ItemData}>{value}</div>
          </div>
        );
      })}
    </div>
  ))}
</div>
  );
}

export default DataField