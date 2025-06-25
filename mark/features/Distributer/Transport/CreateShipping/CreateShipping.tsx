'use client';
import style from "./CreateShipping.module.css";
import { Button, TextInput, Select } from "@mantine/core";
import LogoRole from "@/components/logoRole/LogoRole";
import LogoutButton from "@/components/logoutButton/LogoutButton";
import { useRouter } from 'next/navigation';
import { useState, useEffect, use } from "react";
import { createShipping } from "@/api/shipping/apis";
import { useAuth } from "@/providers/AuthContext";
import searchFarm from "@/api/farm/searchFarm";
import { Labrada } from "next/font/google";

const CreateShipping = () => {
  const router = useRouter();
  const { user } = useAuth();

  const [licensePlate, setLicensePlate] = useState('');
  const [pickedAt, setPickedAt] = useState('');
  const [displayId, setDisplayId] = useState('');
  const [importBy, setImportBy] = useState<string | null>('');
  const [exportBy, setExportBy] = useState<string | null>('');

  const gradeOptions = [
    { value: 'A', label: 'A' },
    { value: 'B', label: 'B' },
    { value: 'C', label: 'C' },
  ];

  const varietyOptions = [
    { value: 'MONTHONG', label: 'หมอนทอง (Monthong)' },
    { value: 'KANYAO', label: 'ก้่านยาว (Kanyao)' },
    { value: 'CHANEE', label: 'ชะนี (Chanee)' },
    { value: 'PUANGMANEE', label: 'พวงมะนี (Puangmanee)' },
  ];

  const exporters = [
    { value: "Siam Fruit Export Co., Ltd", label: "Siam Fruit Export Co., Ltd"},
  ]

  const importers = [
    { value: "Shanghai Fresh Fruits Trading", label: "Shanghai Fresh Fruits Trading"},
  ]

  const handleBack = () => {
    router.push('/distributer/transport');
  };

  const handleSubmit = async () => {
    if (!licensePlate || !pickedAt || !displayId || !importBy || !exportBy) {
      alert("กรุณากรอกข้อมูลให้ครบถ้วน");
      return;
    }
    const shippingData = {
      licensePlate,
      pickedAt,
      displayId,
      importBy,
      exportBy
    };

    console.log("Lot Object:", shippingData);
    
    try {
      if (user?.token) {
        const res = await createShipping(shippingData, user.token);
        handleBack();
      }
    } catch (error) {
      console.error("Error creating lot:", error);
    }
    
  };

  useEffect(() => {
    /*
    const fetchFarms = async () => {
      try {
        if (user?.token) {
          const res = await searchFarm(user.token);
          
          const mapped = res.farms.map((farm: any) => ({
            value: farm._id,
            label: `${farm.name} : ${farm.GAP}`,
      }));
          setFarms(mapped|| []);
        }
      } catch (error) {
        console.error("Error fetching farms:", error);
      }
    };

    fetchFarms();
    */
  }, [user]);

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
        <div className={style.Title}>ข้อมูลการขนส่ง</div>
        <div className={style.devider} />
        <div className={style.dataContainer}>
          <div className={style.InputLable}>ทะเบียนรถ (license plate)</div>
         <TextInput value={licensePlate} onChange={(e) => setLicensePlate(e.currentTarget.value)} className={style.TextInput} />

          <div className={style.InputLable}>ผู้ส่งออก (exporter)</div>
           <Select variant="select" onChange={(value) => {setExportBy(value)}} className={style.TextInput}  placeholder="เลือกฟาร์ม" data={exporters} searchable={true}/>
          
          <div className={style.InputLable}>ผู้นำเข้า (importer)</div>
          <Select variant="select" onChange={(value) => {setImportBy(value)}} className={style.TextInput}  placeholder="เลือกฟาร์ม" data={importers} searchable={true}/>

          <div className={style.InputLable}>รหัสขนส่ง (shipping id)</div>
          <TextInput value={displayId} onChange={(e) => setDisplayId(e.currentTarget.value)} className={style.TextInput} />

          <div className={style.InputLable}>วันที่มารับ (pickup date)</div>
          <TextInput value={pickedAt} onChange={(e) => setPickedAt(e.currentTarget.value)} className={style.TextInput} />

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

export default CreateShipping;
