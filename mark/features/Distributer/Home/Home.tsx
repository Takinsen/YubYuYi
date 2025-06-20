"use client";
import style from "./Home.module.css";
import { Button, TextInput } from "@mantine/core";
import LogoRole from "@/components/logoRole/LogoRole";
import LogoutButton from "@/components/logoutButton/LogoutButton";
import { useAuth } from "@/providers/AuthContext";
import Link from "next/link";

const Home = () => {
  const { user } = useAuth();

  if (!user) {
    return;
  }

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
        <div className={style.farmName}>
          {user.houseId.name.th ? user.houseId.name.th : ""}
        </div>
        <TextInput
          leftSection={
            <img className={style.SearchIcon} src="/icons/search.svg" />
          }
          variant="search"
          placeholder="ค้นหาด้วยรหัสติดตามสินค้า"
        />
        <div className={style.devider} />

        <div className={style.headerContainer}>
          <div className={style.Header}>รายการล็อตสินค้า</div>
          <div className={style.addButtonContainer}>
            <Link href="/distributer/createlot">
              <Button variant="green-small">
                <img className={style.plusIcon} src="/icons/plusWhite.svg" />
                &nbsp;&nbsp;เพิ่มรายการ
              </Button>
            </Link>
          </div>
        </div>
        <div className={style.dataContainer}>
          Lorem ipsum dolor sit amet consectetur adipiscing elit. Quisque
          faucibus ex sapien vitae pellentesque sem placerat. In id cursus mi
          pretium tellus duis convallis. Tempus leo eu aenean sed diam urna
          tempor. Pulvinar vivamus fringilla lacus nec metus bibendum egestas.
          Iaculis massa nisl malesuada lacinia integer nunc posuere. Ut
          hendrerit semper vel class aptent taciti sociosqu. Ad litora torquent
          per conubia nostra inceptos himenaeos. Lorem ipsum dolor sit amet
          consectetur adipiscing elit. Quisque faucibus ex sapien vitae
          pellentesque sem placerat. In id cursus mi pretium tellus duis
          convallis. Tempus leo eu aenean sed diam urna tempor. Pulvinar vivamus
          fringilla lacus nec metus bibendum egestas. Iaculis massa nisl
          malesuada lacinia integer nunc posuere. Ut hendrerit semper vel class
          aptent taciti sociosqu. Ad litora torquent per conubia nostra inceptos
          himenaeos. Lorem ipsum dolor sit amet consectetur adipiscing elit.
          Quisque faucibus ex sapien vitae pellentesque sem placerat. In id
          cursus mi pretium tellus duis convallis. Tempus leo eu aenean sed diam
          urna tempor. Pulvinar vivamus fringilla lacus nec metus bibendum
          egestas. Iaculis massa nisl malesuada lacinia integer nunc posuere. Ut
          hendrerit semper vel class aptent taciti sociosqu. Ad litora torquent
          per conubia nostra inceptos himenaeos. Lorem ipsum dolor sit amet
          consectetur adipiscing elit. Quisque faucibus ex sapien vitae
          pellentesque sem placerat. In id cursus mi pretium tellus duis
          convallis. Tempus leo eu aenean sed diam urna tempor. Pulvinar vivamus
          fringilla lacus nec metus bibendum egestas. Iaculis massa nisl
          malesuada lacinia integer nunc posuere. Ut hendrerit semper vel class
          aptent taciti sociosqu. Ad litora torquent per conubia nostra inceptos
          himenaeos.
        </div>

        <div className={style.scanContainer}>
          <Link href="/distributer/transport">
            <Button variant="green-biground">
              <img className={style.scanIcon} src="/icons/truckWhite.svg" />
            </Button>
          </Link>
          <Link href="/distributer/scan/infoscan">
            <Button variant="biground">
              <img className={style.scanIcon} src="/icons/scanWhite.svg" />
            </Button>
          </Link>
          <Button variant="gray-biground">
            <img className={style.scanIcon} src="/icons/fileClockWhite.svg" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Home;
