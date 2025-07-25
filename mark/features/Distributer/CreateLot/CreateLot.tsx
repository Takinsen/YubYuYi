'use client';
import style from "./CreateLot.module.css";
import { Button, TextInput, Select } from "@mantine/core";
import LogoRole from "@/components/logoRole/LogoRole";
import LogoutButton from "@/components/logoutButton/LogoutButton";
import { useRouter } from 'next/navigation';
import { useState, useEffect, useCallback, useRef } from "react";
import { createLot } from "@/api/lot/apis";
import { useAuth } from "@/providers/AuthContext";
import searchFarm from "@/api/farm/searchFarm";

const CreateLot = () => {
  const router = useRouter();
  const { user } = useAuth();

  const [loading, setLoading] = useState(false);
  const [farms, setFarms] = useState([]);

  const [form, setForm] = useState({
    farmId: '',
    netWeight: '',
    grossWeight: '',
    grade: '',
    variety: '',
    width: '',
    length: '',
    height: '',
    palletId: ''
  });

  const gradeOptions = [
    { value: 'A', label: 'A' },
    { value: 'B', label: 'B' },
    { value: 'C', label: 'C' },
  ];

  const varietyOptions = [
    { value: 'MONTHONG', label: 'หมอนทอง (Monthong)' },
    { value: 'KANYAO', label: 'ก้านยาว (Kanyao)' },
    { value: 'CHANEE', label: 'ชะนี (Chanee)' },
    { value: 'PUANGMANEE', label: 'พวงมะนี (Puangmanee)' },
  ];

  const typingTimeout = 30; // in ms

const debounceTimer = useRef<Record<string, NodeJS.Timeout>>({});

const handleChange = useCallback((field: string, value: string) => {
  if (debounceTimer.current[field]) {
    clearTimeout(debounceTimer.current[field]);
  }

  debounceTimer.current[field] = setTimeout(() => {
    setForm((prev) => ({ ...prev, [field]: value }));
  }, typingTimeout);
}, []);

  const handleBack = () => {
    router.push('/distributer/home');
  };

  const handleSubmit = async () => {
    const {
      farmId, netWeight, grossWeight, grade, variety,
      width, length, height, palletId
    } = form;

    if (!farmId || !netWeight || !grossWeight || !grade || !variety || !width || !length || !height || !palletId) {
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
      type: "FRESH",
      verify: false,
      size: {
        width: Number(width),
        length: Number(length),
        height: Number(height)
      },
      variety,
      palletId,
    };

    setLoading(true);
    try {
      if (user?.token) {
        await createLot(lotData, user.token);
        handleBack();
      }
    } catch (error) {
      console.error("Error creating lot:", error);
    } finally {
      setLoading(false);
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
          setFarms(mapped || []);
        }
      } catch (error) {
        console.error("Error fetching farms:", error);
      }
    };
    fetchFarms();
  }, [user]);

  return (
    <div className={style.Backdrop} style={{ overflowY: 'auto', WebkitOverflowScrolling: 'touch' }}>
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
          <Select
            onChange={(value) => handleChange('farmId', value || '')}
            value={form.farmId}
            placeholder="เลือกฟาร์ม"
            data={farms}
            searchable
            className={style.TextInput}
          />

          <div className={style.InputLable}>น้ำหนักสุทธิ (net)</div>
          <TextInput
          type="number"
            value={form.netWeight}
            onChange={(e) => handleChange('netWeight', e.currentTarget.value)}
            className={style.TextInput}
          />

          <div className={style.InputLable}>น้ำหนักรวม (gross)</div>
          <TextInput
          type="number"
            value={form.grossWeight}
            onChange={(e) => handleChange('grossWeight', e.currentTarget.value)}
            className={style.TextInput}
          />

          <div className={style.InputLable}>เกรดทุเรียน</div>
          <Select
            onChange={(value) => handleChange('grade', value || '')}
            value={form.grade}
            placeholder="เลือกเกรด"
            data={gradeOptions}
            searchable
            className={style.TextInput}
          />

          <div className={style.InputLable}>พันธุ์ทุเรียน</div>
          <Select
            onChange={(value) => handleChange('variety', value || '')}
            value={form.variety}
            placeholder="เลือกสายพันธุ์"
            data={varietyOptions}
            searchable
            className={style.TextInput}
          />

          <div className={style.InputLable}>ขนาดลัง (ซม.)</div>
          <div className={style.InputGroup}>
            <TextInput
            type="number"
              value={form.width}
              placeholder="กว้าง"
              onChange={(e) => handleChange('width', e.currentTarget.value)}
              className={style.TextInput}
            />
            <TextInput
            type="number"
              value={form.length}
              placeholder="ยาว"
              onChange={(e) => handleChange('length', e.currentTarget.value)}
              className={style.TextInput}
            />
            <TextInput
            type="number"
              value={form.height}
              placeholder="สูง"
              onChange={(e) => handleChange('height', e.currentTarget.value)}
              className={style.TextInput}
            />
          </div>

          <div className={style.InputLable}>รหัสพาเลท (palletId)</div>
          <TextInput
            value={form.palletId}
            onChange={(e) => handleChange('palletId', e.currentTarget.value)}
            className={style.TextInput}
          />
        </div>

        <div className={style.ActionContainer}>
          <Button
            variant='green-md'
            onClick={handleSubmit}
            disabled={loading}
          >
            {loading ? 'กำลังบันทึก...' : 'บันทึก'}
          </Button>
        </div>

        <div className={style.ButtonContainer}>
          <Button onClick={handleBack}>{'<-'} ย้อนกลับ</Button>
        </div>
      </div>
    </div>
  );
};

export default CreateLot;