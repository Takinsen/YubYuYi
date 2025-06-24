"use client";

import { useEffect, useState } from "react";
import getContents from "@/api/lot/getContents";
import { useAuth } from "@/providers/AuthContext";
import style from "./LotInfo.module.css";
import CheckpontBar from "@/components/checkpointBar/CheckpontBar";
import formatData from "@/utils/formatCheckpointData";
import LogoRole from "@/components/logoRole/LogoRole";
import LogoutButton from "@/components/logoutButton/LogoutButton";
import DataField from "@/components/dataField/DataField";
import { Button } from "@mantine/core";
import { useRouter } from 'next/navigation';
import formatThaiDate from "@/utils/formatDateThai";
import { Raleway_Dots } from "next/font/google";

type InfoProps = {
  id: string;
};

export default function LotInfo({ id }: InfoProps) {
  const router = useRouter();
  const { user } = useAuth();
  const [data, setData] = useState<any>(null);
  const [lotData, setLotData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  const handleBack = () => {
    router.push('/distributer/home');
  }

  const handleReScan = () => {
    router.push('/distributer/scan/infoscan');
  }

  const handleAssignDurian = () => {
    router.push(`/distributer/scan/assigndurianscan/${id}`);
  }

  const handleAddDisplayIdLot = () => {
    router.push(`/distributer/scan/displayidlotscan/${id}`);
  }
  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log(user);
        if (user?.token) {
          const res = await getContents(id, user.token);
          const rawData = res.data.map((item:{ displayId: string, createdAt:string }) => ({ID: item.displayId, Date: formatThaiDate(item.createdAt)}))
          setData(rawData);
          const rawLotData = {
            status: res.lotData.status,
            grade: res.lotData.grade,
            variety: res.lotData.variety,
            palletId: res.lotData.palletId,
          }
          const lotDataArray = [rawLotData]
          setLotData(lotDataArray);
          setLoading(false);
        }
      } catch (error) {
        console.error("Failed to fetch durian info", error);
      } 
    };

    fetchData();
  }, [id, user]);

  //if (!data?.timeline) return

  return (
    <div className={style.Backdrop}>
        <img className={style.BackdropArt} src="/images/PathBackDrop.svg" />
      <div className={style.BackdropShade} />
      <div className={style.LogoContainer}>
        <LogoRole text={"distributer"} />
      </div>
      <div className={style.LogoutButtonContainer}>
        <LogoutButton />
      </div>
      <div className={style.ContainerCard}>
       
        <div className={style.Title}>ข้อมูลล็อต</div>
        <div className={style.devider} />

      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className={style.dataContainer}>
          <div className={style.Header}>รายละเอียดล็อต</div>
          <DataField data={lotData}/>
          <div className={style.Header}>รายการทุเรียน</div>
          <DataField data={data}/>
        </div>
      )}
      </div>

      <div className={style.ButtonContainer}>
        <div className={style.ButtonContainerRow}>
        <Button variant="green-md" onClick={handleAssignDurian}>เพิ่มรายการทุเรียน</Button>
      <Button variant="gray-md" onClick={handleAddDisplayIdLot}>กำหนดกล่อง</Button>
      </div>
        <Button onClick={handleBack}>{'<-'} ย้อนกลับ</Button>
      </div>
    </div>
  );
}
