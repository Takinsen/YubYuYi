'use client';
import style from "./CreateLot.module.css";
import { Button, TextInput } from "@mantine/core";
import LogoRole from "@/components/logoRole/LogoRole";
import LogoutButton from "@/components/logoutButton/LogoutButton";
import { useAuth } from "@/providers/AuthContext";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from 'next/navigation';

const CreateLot = () => {
  const router = useRouter();
  const [farmer, setFarmer] = useState ('');
  const [weight, setWeight] = useState ('');

  const handleBack = () => {
    router.push('/distributer/home');
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
        <div className={style.Title}>ข้อมูลล็อต</div>
        <div className={style.devider}/>
        <div className={style.dataContainer}>
          <div className={style.InputLable}>ข้อมูลเกษตรกร</div>
        <TextInput
        value={farmer}
        onChange={(event) => setFarmer(event.currentTarget.value)}
        className={style.TextInput}/>
        
        <div className={style.InputLable}>น้ำหนักสุทธิ</div>
        <TextInput 
        value={weight}
        onChange={(event) => setWeight(event.currentTarget.value)}
        className={style.TextInput}/>

        <div className={style.InputLable}>น้ำหนักรวม</div>
        <TextInput 
        value={weight}
        onChange={(event) => setWeight(event.currentTarget.value)}
        className={style.TextInput}/>

        <div className={style.InputLable}>ขนาดของลัง</div>
        <TextInput 
        value={weight}
        onChange={(event) => setWeight(event.currentTarget.value)}
        className={style.TextInput}/>

        <div className={style.InputLable}>พันธุ์ทุเรียน</div>
        <TextInput 
        value={weight}
        onChange={(event) => setWeight(event.currentTarget.value)}
        className={style.TextInput}/>

        <div className={style.InputLable}>เกรดทุเรียน</div>
        <TextInput 
        value={weight}
        onChange={(event) => setWeight(event.currentTarget.value)}
        className={style.TextInput}/>
        
        </div>

        <div className={style.ActionContainer}>
        <Button variant='green-md' onClick={handleBack}>บันทึก</Button>
        </div>
         <div className={style.ButtonContainer}>
        <Button onClick={handleBack}>{'<-'} ย้อนกลับ</Button>
      </div>
      </div>
    </div>
  );
};

export default CreateLot;
