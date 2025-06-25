"use client";
import style from "./Home.module.css";
import { Button, TextInput } from "@mantine/core";
import LogoRole from "@/components/logoRole/LogoRole";
import LogoutButton from "@/components/logoutButton/LogoutButton";
import { useAuth } from "@/providers/AuthContext";
import Link from "next/link";
import { getLot } from "@/api/lot/apis";
import Lot from "./components/lot/Lot";
import { use, useEffect, useState } from "react";


const Home = () => {
  const { user } = useAuth();
  const [lots, setLots] = useState<any>([]);

  useEffect(() => {
    const fetchLots = async () => {
    try{
      if (user?.token) {
        const res = await getLot(user.token)
  
        setLots(res.lots.reverse());
      } 
    } catch (error) {
      console.error("Failed to fetch lot data", error);
    }
  }

    //fetchLots();
  }, [user]);

   if (!user) {
    return;
  }

  return (
    <div className={style.Backdrop}>
      <img className={style.BackdropArt} src="/images/PathBackDrop.svg" />
      <div className={style.BackdropShade} />
      <div className={style.LogoContainer}>
        <LogoRole text={"ministry"} />
      </div>
      <div className={style.LogoutButtonContainer}>
        <LogoutButton />
      </div>
      <div className={style.ContainerCard}>
    
        <TextInput
          leftSection={
            <img className={style.SearchIcon} src="/icons/search.svg" />
          }
          variant="search"
          placeholder="ค้นหาด้วยรหัสติดตามสินค้า"
        />
        <div className={style.devider} />

        <div className={style.headerContainer}>
          <div className={style.Header}>ประวัติการตรวจสอบ</div>
        </div>
        <div className={style.dataContainer}>
          {lots.length > 0 ? (
            lots.map((lot:any) => (
              <Link key={lot._id} href={`/distributer/lotinfo/${lot._id}`}>
                <Lot
                  lot={{
                    status: lot.status,
                    lotId: lot._id,
                    farmId: lot.farmId,
                    farmName: lot.farmName,
                    variety: lot.variety,
                    createdAt: lot.createdAt,
                    displayId: lot.displayId,
                  }}
                />
              </Link>
            ))
          ) : (
            <div className={style.noData}>ไม่มีประวัติการตรวจสอบ</div>
          )}
        </div>

        <div className={style.scanContainer}>
          
          <Link href="/ministry/scan">
            <Button variant="biground">
              <img className={style.scanIcon} src="/icons/scanWhite.svg" />
            </Button>
          </Link>
          
        </div>
      </div>
    </div>
  );
};

export default Home;
