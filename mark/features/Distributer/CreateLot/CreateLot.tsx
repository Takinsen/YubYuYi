'use client';
import style from "./CreateLot.module.css";
import { Button, TextInput, Select } from "@mantine/core";
import LogoRole from "@/components/logoRole/LogoRole";
import LogoutButton from "@/components/logoutButton/LogoutButton";
import { useRouter } from 'next/navigation';
import { useState, useEffect, use } from "react";
import createLot from "@/api/lot/createLot";
import { useAuth } from "@/providers/AuthContext";
import searchFarm from "@/api/farm/searchFarm";

const CreateLot = () => {
  const router = useRouter();
  const { user } = useAuth();

  const [farmId, setFarmId] = useState<string | null>('');
  const [netWeight, setNetWeight] = useState('');
  const [grossWeight, setGrossWeight] = useState('');
  const [grade, setGrade] = useState<string | null>('');
  const [variety, setVariety] = useState<string | null>('');
  const [width, setWidth] = useState('');
  const [length, setLength] = useState('');
  const [height, setHeight] = useState('');
  const [palletId, setPalletId] = useState('');
  const [importBy, setImportBy] = useState('');
  const [exportBy, setExportBy] = useState('');
  const [farms, setFarms] = useState([]);

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

  const handleBack = () => {
    router.push('/distributer/home');
  };

  const handleSubmit = async () => {
    if (!farmId || !netWeight || !grossWeight || !grade || !variety || !width || !length || !height || !palletId || !importBy || !exportBy) {
      alert("กรุณากรอกข้อมูลให้ครบถ้วน");
      return;
    }
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
        handleBack();
      }
    } catch (error) {
      console.error("Error creating lot:", error);
    }
    
  };

  useEffect(() => {
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
        <div className={style.Title}>ข้อมูลล็อต</div>
        <div className={style.devider} />
        <div className={style.dataContainer}>
          <div className={style.InputLable}>รหัสฟาร์ม (farmId)</div>
          <Select variant="select" onChange={(value) => {setFarmId(value)}} className={style.TextInput}  placeholder="เลือกฟาร์ม" data={farms} searchable={true}/>

          <div className={style.InputLable}>น้ำหนักสุทธิ (net)</div>
          <TextInput value={netWeight} onChange={(e) => setNetWeight(e.currentTarget.value)} className={style.TextInput} />

          <div className={style.InputLable}>น้ำหนักรวม (gross)</div>
          <TextInput value={grossWeight} onChange={(e) => setGrossWeight(e.currentTarget.value)} className={style.TextInput} />

          <div className={style.InputLable}>เกรดทุเรียน</div>
          <Select variant="select" onChange={(value) => {setGrade(value)}} className={style.TextInput}  placeholder="เลือกเกรด" data={gradeOptions} searchable={true}/>

          <div className={style.InputLable}>พันธุ์ทุเรียน</div>
          <Select variant="select" onChange={(value) => {setVariety(value)}} className={style.TextInput}  placeholder="เลือกสายพันธุ์" data={varietyOptions} searchable={true}/>
          
          <div className={style.InputLable}>ขนาดลัง (ซม.)</div>
          <div className={style.InputGroup}>
          <TextInput value={width} placeholder="กว้าง" onChange={(e) => setWidth(e.currentTarget.value)} className={style.TextInput} />
          <TextInput value={length} placeholder="ยาว" onChange={(e) => setLength(e.currentTarget.value)} className={style.TextInput} />
          <TextInput value={height} placeholder="สูง" onChange={(e) => setHeight(e.currentTarget.value)} className={style.TextInput} />
          </div>
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
