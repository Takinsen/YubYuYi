
'use client';
import style from './InfoScan.module.css'
import { useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import LogoRole from "@/components/logoRole/LogoRole";
import LogoutButton from "@/components/logoutButton/LogoutButton";
import QrScanner, { QrScannerHandle } from '@/components/Scanner/Scanner';
import { Button } from '@mantine/core';

export default function InfoScan() {
  const router = useRouter();
  const scannerRef = useRef<QrScannerHandle>(null);
  const [id, setId] = useState('');

  const handleScan = async (id: string) => {
    console.log('Scanned ID:', id);
    setId(id);
  };

  const handleContinue = async() =>{
    await scannerRef.current?.stopScanner();
    router.push(`/distributer/info/${encodeURIComponent(id)}`);
  }

  const handleBack = () => {
    router.push('/distributer/home')
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
        <QrScanner key={id === '' ? 'scanner-initial' : 'scanner-reset'} ref={scannerRef} onScan={handleScan} />
        { id !== '' &&
      <div className={style.ActionContainer}>
        <Button variant='green-md' onClick={handleContinue}>ดุข้อมูล</Button>
      </div>
      }
      <div className={style.BackButtonContainer}>
        <Button onClick={handleBack}>{'<-'} ย้อนกลับ</Button>
      </div>
      </div>

    </div>
  );
}
