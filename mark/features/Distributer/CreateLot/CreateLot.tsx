'use client';
import style from "./CreateLot.module.css";
import { Button, TextInput } from "@mantine/core";
import LogoRole from "@/components/logoRole/LogoRole";
import LogoutButton from "@/components/logoutButton/LogoutButton";
import { useRouter } from 'next/navigation';
import { useState } from "react";
import createLot from "@/api/lot/createLot";
import { useAuth } from "@/providers/AuthContext";

const CreateLot = () => {
  const router = useRouter();
  const { user } = useAuth();

  const [farmId, setFarmId] = useState('');
  const [netWeight, setNetWeight] = useState('');
  const [grossWeight, setGrossWeight] = useState('');
  const [grade, setGrade] = useState('');
  const [variety, setVariety] = useState('');
  const [width, setWidth] = useState('');
  const [length, setLength] = useState('');
  const [height, setHeight] = useState('');
  const [palletId, setPalletId] = useState('');
  const [importBy, setImportBy] = useState('');
  const [exportBy, setExportBy] = useState('');

  const handleBack = () => {
    router.push('/distributer/home');
  };

  const handleSubmit = async () => {
    const lotData = {
      farmId,
      weight: {
        net: Number(netWeight),
        gross: Number(grossWeight)
      },
      grade,
      type: "FRESH", // fixed
      verify: false, // fixed
      size: {
        width: Number(width),
        length: Number(length),
        height: Number(height)
      },
      variety,
      palletId,
      importBy,
      exportBy
    };

    console.log("Lot Object:", lotData);
    
    try {
      if (user?.token) {
        const res = await createLot(lotData, user.token);
      }
    } catch (error) {
      console.error("Error creating lot:", error);
    }
    
  };

  return (
    <div className={style.Backdrop}>
      <img className={style.BackdropArt} src="/images/PathBackDrop.svg" />
      <div className={style.BackdropShade} />
      <div className={style.LogoContainer}>
        <LogoRole text="distributer" />
      </div>
      <div className={style.LogoutButtonContainer}>
        <LogoutButton />
      </div>
      <div className={style.ContainerCard}>
        <div className={style.Title}>ข้อมูลล็อต</div>
        <div className={style.devider} />
        <div className={style.dataContainer}>

          <div className={style.InputLable}>รหัสฟาร์ม (farmId)</div>
          <TextInput value={farmId} onChange={(e) => setFarmId(e.currentTarget.value)} className={style.TextInput} />

          <div className={style.InputLable}>น้ำหนักสุทธิ (net)</div>
          <TextInput value={netWeight} onChange={(e) => setNetWeight(e.currentTarget.value)} className={style.TextInput} />

          <div className={style.InputLable}>น้ำหนักรวม (gross)</div>
          <TextInput value={grossWeight} onChange={(e) => setGrossWeight(e.currentTarget.value)} className={style.TextInput} />

          <div className={style.InputLable}>เกรดทุเรียน</div>
          <TextInput value={grade} onChange={(e) => setGrade(e.currentTarget.value)} className={style.TextInput} />

          <div className={style.InputLable}>พันธุ์ทุเรียน</div>
          <TextInput value={variety} onChange={(e) => setVariety(e.currentTarget.value)} className={style.TextInput} />

          <div className={style.InputLable}>ขนาดลัง (กว้าง)</div>
          <TextInput value={width} onChange={(e) => setWidth(e.currentTarget.value)} className={style.TextInput} />

          <div className={style.InputLable}>ขนาดลัง (ยาว)</div>
          <TextInput value={length} onChange={(e) => setLength(e.currentTarget.value)} className={style.TextInput} />

          <div className={style.InputLable}>ขนาดลัง (สูง)</div>
          <TextInput value={height} onChange={(e) => setHeight(e.currentTarget.value)} className={style.TextInput} />

          <div className={style.InputLable}>รหัสพาเลท (palletId)</div>
          <TextInput value={palletId} onChange={(e) => setPalletId(e.currentTarget.value)} className={style.TextInput} />

          <div className={style.InputLable}>นำเข้าโดย</div>
          <TextInput value={importBy} onChange={(e) => setImportBy(e.currentTarget.value)} className={style.TextInput} />

          <div className={style.InputLable}>ส่งออกโดย</div>
          <TextInput value={exportBy} onChange={(e) => setExportBy(e.currentTarget.value)} className={style.TextInput} />

        </div>

        <div className={style.ActionContainer}>
          <Button variant='green-md' onClick={handleSubmit}>บันทึก</Button>
        </div>
        <div className={style.ButtonContainer}>
          <Button onClick={handleBack}>{'<-'} ย้อนกลับ</Button>
        </div>
      </div>
    </div>
  );
};

export default CreateLot;
