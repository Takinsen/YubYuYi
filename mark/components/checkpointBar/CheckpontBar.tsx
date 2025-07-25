import style from "./CheckpointBar.module.css";
import formatDate from "@/utils/formatDate";

interface PointData {
  stat: string;
  date: string;
}

interface CheckpointBarProps {
  point1: PointData;
  point2: PointData;
  point3: PointData;
  point4: PointData;
}

const CheckpointBar = ({ point1, point2, point3, point4 }: CheckpointBarProps) => {
  return (
    <>
      <div className={style.Container}>
        <div className={point1?.stat === "completed" ? style.CircleGreen : style.CircleBlack}>
          <img className={style.Icon} src="/icons/checkpoint/warehouse.svg" />
        </div>
        <div className={point2?.stat === "completed" ? style.LineGreen : style.LineBlack} />
        <div className={point2?.stat === "completed" ? style.CircleGreen : style.CircleBlack}>
          <img className={style.Icon} src="/icons/checkpoint/truck.svg" />
        </div>
        <div className={point3?.stat === "completed" ? style.LineGreen : style.LineBlack} />
        <div className={point3?.stat === "completed" ? style.CircleGreen : style.CircleBlack}>
          <img className={style.Icon} src="/icons/checkpoint/search.svg" />
        </div>
        <div className={point4?.stat === "completed" ? style.LineGreen : style.LineBlack} />
        <div className={point4?.stat === "completed" ? style.CircleGreen : style.CircleBlack}>
          <img className={style.Icon} src="/icons/checkpoint/package.svg" />
        </div>
      </div>
      <div className={style.DateBar}>
        <div className={style.Date}>{point1?.date ? formatDate(point1.date) : "pending"}</div>
        <div className={style.DateSpacer}/>
        <div className={style.Date}>{point2?.date ? formatDate(point2.date) : "pending"}</div>
        <div className={style.DateSpacer}/>
        <div className={style.Date}>{point3?.date ? formatDate(point3.date) : "pending"}</div>
        <div className={style.DateSpacer}/>
        <div className={style.Date}>{point4?.date ? formatDate(point4.date) : "pending"}</div>
      </div>
    </>
  );
};

export default CheckpointBar;
