"use client";
import style from "./Home.module.css";
import { Button, TextInput } from "@mantine/core";
import LogoRole from "@/components/logoRole/LogoRole";
import LogoutButton from "@/components/logoutButton/LogoutButton";
import { useAuth } from "@/providers/AuthContext";
import Link from "next/link";
import { getInspectLog } from "@/api/shipping/apis";
import Log from "./components/log/Log";
import { use, useEffect, useState } from "react";


const Home = () => {
  const { user } = useAuth();
  const [log, setLog] = useState<any>([]);

  useEffect(() => {
    const fetchLog = async () => {
    try{
      if (user?.token) {
        const res = await getInspectLog(user.token)
  
        setLog(res.data);
      } 
    } catch (error) {
      console.error("Failed to fetch lot data", error);
    }
  }

    fetchLog();
  }, [user]);

   if (!user) {
    return;
  }

  return (
    <div className={style.Backdrop}>
      <img className={style.BackdropArt} src="/images/PathBackDrop.svg" />
      <div className={style.BackdropShade} />
      <div className={style.LogoContainer}>
        <LogoRole text={"immigration officer"} />
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
          placeholder="Search by Tracking ID"
        />
        <div className={style.devider} />

        <div className={style.headerContainer}>
          <div className={style.Header}>Inspection history</div>
        </div>
        <div className={style.dataContainer}>
          {log && log?.length > 0 ? (
            log.map((l:any) => (
                <Log
                  key={l._id}
                  log={{
                    status: l.status,
                    inspectedAt: l.inspectedAt,
                    displayId: l.shippingId.displayId,
                  }}
                />
    
            ))
          ) : (
            <div className={style.noData}>No inspection history</div>
          )}
        </div>

        <div className={style.scanContainer}>
          
          <Link href="/border/scan">
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
