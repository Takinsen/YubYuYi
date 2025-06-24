"use client";

import { useEffect, useState } from "react";
import getContents from "@/api/shipping/getContents";
import { useAuth } from "@/providers/AuthContext";
import style from "./ShippingInfo.module.css";
import CheckpontBar from "@/components/checkpointBar/CheckpontBar";
import formatData from "@/utils/formatCheckpointData";
import LogoRole from "@/components/logoRole/LogoRole";
import LogoutButton from "@/components/logoutButton/LogoutButton";
import DataField from "@/components/dataField/DataField";
import { Button } from "@mantine/core";
import { useRouter } from 'next/navigation';
import formatThaiDate from "@/utils/formatDateThai";

type InfoProps = {
  id: string;
};

export default function ShippingInfo({ id }: InfoProps) {
  const router = useRouter();
  const { user } = useAuth();
  const [data, setData] = useState<any>(null);
  const [shippingData, setShippingData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  const handleBack = () => {
    router.push('/distributer/transport');
  }

  const handleReScan = () => {
    router.push('/distributer/scan/infoscan');
  }

  const handleAssignDurian = () => {
    router.push(`/distributer/scan/assigndurianscan/${id}`);
  }

  const handleAddShipping = () => {
    router.push(`/distributer/transport/scan/assignboxscan/${id}`);
  }
  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log(user);
        if (user?.token) {
          const res = await getContents(id, user.token);
          const rawData = res.data.map((item:{ displayId: string, createdAt:string }) => ({ID: item.displayId, Date: formatThaiDate(item.createdAt)}))
          setData(rawData);
          const rawShippingData = {
            licensePlate: res.shippingData.licensePlate,
            exporter: res.shippingData.exportBy,
            importer: res.shippingData.importBy,
            trackingId: res.shippingData.displayId,
          }
          const shippingDataArray = [rawShippingData]
          setShippingData(shippingDataArray);
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
       
       <div className={style.Title}>ข้อมูลรอบขนส่ง</div>
        <div className={style.devider} />

      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className={style.dataContainer}>
          <div className={style.Header}>รายละเอียดรอบขนส่ง</div>
          <DataField data={shippingData}/>
          <div className={style.Header}>รายการล็อต</div>
          <DataField data={data}/>
        </div>
      )}
      </div>

      <div className={style.ButtonContainer}>
      <Button variant="green-md" onClick={handleAddShipping}>เพิ่มกล่อง</Button>
        <Button onClick={handleBack}>{'<-'} ย้อนกลับ</Button>
      </div>
    </div>
  );
}
