'use client';
import style from "./CreateShipping.module.css";
import { Button, TextInput, Select } from "@mantine/core";
import LogoRole from "@/components/logoRole/LogoRole";
import LogoutButton from "@/components/logoutButton/LogoutButton";
import { useRouter } from 'next/navigation';
import { useState, useEffect, useRef, useCallback } from "react";
import { createShipping } from "@/api/shipping/apis";
import { useAuth } from "@/providers/AuthContext";
import { DateInput } from '@mantine/dates';

const CreateShipping = () => {
  const router = useRouter();
  const { user } = useAuth();

  const [form, setForm] = useState({
    licensePlate: '',
    pickedAt: '',
    displayId: '',
    importBy: '',
    exportBy: '',
  });

  // debounce refs
  const debounceTimers = useRef<Record<string, NodeJS.Timeout>>({});

  const handleChange = useCallback((field: string, value: string) => {
    if (debounceTimers.current[field]) clearTimeout(debounceTimers.current[field]);
    debounceTimers.current[field] = setTimeout(() => {
      setForm((prev) => ({ ...prev, [field]: value }));
    }, 30);
  }, []);

  const handleSelectChange = (field: string, value: string | null) => {
    setForm((prev) => ({ ...prev, [field]: value || '' }));
  };

  const handleSubmit = async () => {
    const { licensePlate, pickedAt, displayId, importBy, exportBy } = form;

    if (!licensePlate || !pickedAt || !displayId || !importBy || !exportBy) {
      alert("กรุณากรอกข้อมูลให้ครบถ้วน");
      return;
    }

    const shippingData = { licensePlate, pickedAt, displayId, importBy, exportBy };

    try {
      if (user?.token) {
        await createShipping(shippingData, user.token);
        router.push('/distributer/transport');
      }
    } catch (error) {
      console.error("Error creating shipping:", error);
    }
  };

  return (
    <div className={style.Backdrop}>
      <img className={style.BackdropArt} src="/images/PathBackDrop.svg" alt="" />
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
          <TextInput
            defaultValue={form.licensePlate}
            onChange={(e) => handleChange('licensePlate', e.currentTarget.value)}
            className={style.TextInput}
          />

          <div className={style.InputLable}>ผู้ส่งออก (exporter)</div>
          <Select
            value={form.exportBy}
            onChange={(value) => handleSelectChange('exportBy', value)}
            className={style.TextInput}
            placeholder="เลือกฟาร์ม"
            data={[{ value: "Siam Fruit Export Co., Ltd", label: "Siam Fruit Export Co., Ltd" }]}
            searchable
          />

          <div className={style.InputLable}>ผู้นำเข้า (importer)</div>
          <Select
            value={form.importBy}
            onChange={(value) => handleSelectChange('importBy', value)}
            className={style.TextInput}
            placeholder="เลือกฟาร์ม"
            data={[{ value: "Shanghai Fresh Fruits Trading", label: "Shanghai Fresh Fruits Trading" }]}
            searchable
          />

          <div className={style.InputLable}>รหัสขนส่ง (shipping id)</div>
          <TextInput
            defaultValue={form.displayId}
            onChange={(e) => handleChange('displayId', e.currentTarget.value)}
            className={style.TextInput}
          />

          <div className={style.InputLable}>วันที่มารับ (pickup date)</div>
          <DateInput
            value={form.pickedAt ? new Date(form.pickedAt) : null}
            onChange={(date) =>
              setForm((prev) => ({
                ...prev,
                pickedAt: date ? date.toString() : '',
              }))
            }
            className={style.TextInput}
            valueFormat="DD/MM/YYYY"
            placeholder="เลือกวันที่"
          />
        </div>

        <div className={style.ActionContainer}>
          <Button variant='green-md' onClick={handleSubmit}>บันทึก</Button>
        </div>
        <div className={style.ButtonContainer}>
          <Button onClick={() => router.push('/distributer/transport')}>
            {'<-'} ย้อนกลับ
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CreateShipping;