"use client";

import { useEffect, useState } from "react";
import getDurianGuest from "@/api/durian/getDurianGuest";
import { useAuth } from "@/providers/AuthContext";
import style from "./Info.module.css";
import CheckpontBar from "@/components/checkpointBar/CheckpontBar";
import formatData from "@/utils/formatCheckpointData";
import LogoRole from "@/components/logoRole/LogoRole";
import LogoutButton from "@/components/logoutButton/LogoutButton";
import DataField from "@/components/dataField/DataField";
import { Button } from "@mantine/core";
import { useRouter } from 'next/navigation';

type InfoProps = {
  id: string;
};

export default function Info({ id }: InfoProps) {
  const router = useRouter();
  const { user } = useAuth();
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  const handleBack = () => {
    router.push('/farmer/home');
  }

  const handleReScan = () => {
    router.push('/farmer/scan');
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log(user);
        if (user?.token) {
          console.log("2222");
          const res = await getDurianGuest(id, "en", user.token);
          setData(res);
        }
      } catch (error) {
        console.error("Failed to fetch durian info", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id, user]);

  if (!data?.timeline) return

  return (
    <div className={style.Backdrop}>
        <img className={style.BackdropArt} src="/images/PathBackDrop.svg" />
      <div className={style.BackdropShade} />
      <div className={style.LogoContainer}>
        <LogoRole text={"farmer"} />
      </div>
      <div className={style.LogoutButtonContainer}>
        <LogoutButton />
      </div>
      <div className={style.ContainerCard}>
        <CheckpontBar {...formatData(data.timeline)}/>

      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className={style.dataContainer}>
          <DataField data={data.data}/>
        </div>
      )}
      </div>

      <div className={style.ButtonContainer}>
        <Button onClick={handleBack}>{'<-'} ย้อนกลับ</Button>
        <Button  variant="green-md" onClick={handleReScan}>สแกนอีกครั้ง</Button>
      </div>
    </div>
  );
}
