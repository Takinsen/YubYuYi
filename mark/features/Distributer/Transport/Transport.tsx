"use client";
import style from "./Transport.module.css";
import { Button, TextInput } from "@mantine/core";
import LogoRole from "@/components/logoRole/LogoRole";
import LogoutButton from "@/components/logoutButton/LogoutButton";
import { useAuth } from "@/providers/AuthContext";
import Link from "next/link";
import getShipping from "@/api/shipping/getShipping";
import Shipping from "./components/shipping/Shipping";
import { use, useEffect, useState } from "react";
import { useRouter } from 'next/navigation';


const Transport = () => {
  const { user } = useAuth();
  const router = useRouter();
  const [shippings, setShippings] = useState<any>([]);

  const handleBack = () => {
    router.push('/distributer/home')
  }

  useEffect(() => {
    const fetchShipping = async () => {
    try{
      if (user?.token) {
        const res = await getShipping(user.token)
  
        setShippings(res.shippings.reverse());
      } 
    } catch (error) {
      console.error("Failed to fetch lot data", error);
    }
  }

    fetchShipping();
  }, [user]);

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
          <div className={style.Header}>รายการขนส่ง</div>
          <div className={style.addButtonContainer}>
            <Link href="/distributer/transport/createshipping">
              <Button variant="green-small">
                <img className={style.plusIcon} src="/icons/plusWhite.svg" />
                &nbsp;&nbsp;เพิ่มรายการ
              </Button>
            </Link>
          </div>
        </div>
        <div className={style.dataContainer}>
          {shippings.length > 0 ? (
            shippings.map((shipping:any) => (
              <Link key={shipping._id} href={`/distributer/transport/shippinginfo/${shipping._id}`}>
                <Shipping
                  shipping={{
                    status: shipping.status,
                    licensePlate: shipping.licensePlate,
                    createdAt: shipping.createdAt,
                    displayId: shipping.displayId,
                    importBy: shipping.importBy,
                    exportBy: shipping.exportBy
                  }}
                />
              </Link>
            ))
          ) : (
            <div className={style.noData}>ไม่มีข้อมูลล็อตสินค้า</div>
          )}
        </div>

        <div className={style.BackButtonContainer}>
        <Button onClick={handleBack}>{'<-'} ย้อนกลับ</Button>
      </div>
      </div>
    </div>
  );
};

export default Transport;
