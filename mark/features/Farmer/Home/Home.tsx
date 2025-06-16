'use client';
import style from "./Home.module.css";
import { Button, TextInput } from "@mantine/core";
import LogoRole from "@/components/logoRole/LogoRole";
import LogoutButton from "@/components/logoutButton/LogoutButton";
import { useAuth } from "@/providers/AuthContext";
import Link from "next/link";

const Home = () => {
  const { user } = useAuth();
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
        <div className={style.farmName}>
         {user.farmId.name.th ? user.farmId.name.th : ""}
        </div>
        <TextInput 
        leftSection={
          <img className={style.SearchIcon} src="/icons/search.svg"/>
        } 
        variant="search"
        placeholder="ค้นหาด้วยรหัสติดตามสินค้า"
        />
        <div className={style.devider}/>

        <div className={style.scanContainer}>
          <Link href="/farmer/scan">
            <Button variant="biground">
              <img className={style.scanIcon} src="/icons/scanWhite.svg"/>
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;
