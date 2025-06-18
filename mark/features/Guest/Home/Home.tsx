"use client";

import { useEffect, useState } from "react";
import getDurianGuest from "@/api/durian/getDurianGuest";
import { useAuth } from "@/providers/AuthContext";
import style from "./Home.module.css";
import CheckpontBar from "@/components/checkpointBar/CheckpontBar";
import formatData from "@/utils/formatCheckpointData";
import LogoRole from "@/components/logoRole/LogoRole";
import LoginButton from "@/components/loginButton/LoginButton";
import DataField from "@/components/dataField/DataField";
import { Button } from "@mantine/core";
import { useRouter } from "next/navigation";

type InfoProps = {
  id: string;
};

export default function Home({ id }: InfoProps) {
  const router = useRouter();
  const { user } = useAuth();
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  const handleBack = () => {
    router.push("/farmer/home");
  };

  const handleScan = () => {
    router.push("/farmer/scan");
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
          const res = await getDurianGuest(id, "en");
          setData(res);
      } catch (error) {
        console.error("Failed to fetch durian info", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id, user]);

  if (!data?.timeline)
    return (
      <div className={style.Backdrop}>
        <img className={style.BackdropArt} src="/images/PathBackDrop.svg" />
        <div className={style.BackdropShade} />
        <img className={style.Logo} src="/images/LogoWhite.svg" />
        <div className={style.subWhiteText}>Certified, Fresh<br/> Thai Durian</div>
        <div className={style.LoginButtonContainer}>
          <LoginButton />
        </div>
        <div className={style.ContainerCard}>
          <div className={style.scanContainer}>
            <Button onClick={handleScan} variant="biground">
              <img className={style.scanIcon} src="/icons/scanWhite.svg"/>
            </Button>
        </div>
        </div>
      </div>
    );

  return (
    <div className={style.Backdrop}>
      <img className={style.BackdropArt} src="/images/PathBackDrop.svg" />
      <div className={style.BackdropShade} />
      <img className={style.Logo} src="/images/LogoWhite.svg" />
      <div className={style.LoginButtonContainer}>
        <LoginButton />
      </div>
      <div className={style.ContainerCard}>
        <CheckpontBar {...formatData(data.timeline)} />

        {loading ? (
          <p>Loading...</p>
        ) : (
          <div className={style.dataContainer}>
            <DataField data={data.data} />
          </div>
        )}
      </div>

      <div className={style.ButtonContainer}>
        <Button onClick={handleBack}>{"<-"} ย้อนกลับ</Button>
        <div className={style.scanContainer}>
            <Button onClick={handleScan} variant="biground">
              <img className={style.scanIcon} src="/icons/scanWhite.svg"/>
            </Button>
        </div>
      </div>
    </div>
  );
}
