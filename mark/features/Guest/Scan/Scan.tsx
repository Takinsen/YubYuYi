
'use client';
import style from './Scan.module.css'
import { useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import LogoRole from "@/components/logoRole/LogoRole";
import LogoutButton from "@/components/logoutButton/LogoutButton";
import QrScanner, { QrScannerHandle } from '@/components/Scanner/Scanner';
import { Button } from '@mantine/core';

export default function Scan() {
  const router = useRouter();
  const scannerRef = useRef<QrScannerHandle>(null);
  const [id, setId] = useState('');

  const handleScan = async (id: string) => {
    console.log('Scanned ID:', id);
    setId(id);
  };

  const handleContinue = async() =>{
    await scannerRef.current?.stopScanner();
    router.push(`/?id=${encodeURIComponent(id)}`);
  }

  const handleBack = () => {
    router.push('/')
  }
 
  return (
    <div className={style.Backdrop}>
         <img className={style.BackdropArt} src="/images/PathBackDrop.svg" />
      <div className={style.BackdropShade} />
      <div className={style.LogoContainer}>
        <LogoRole text={"Customer"} />
      </div>

      <div className={style.ContainerCard}>
        <QrScanner ref={scannerRef} onScan={handleScan} />
        { id !== '' &&
      <div className={style.ActionContainer}>
        <Button variant='green-md' onClick={handleContinue}>View Data</Button>
      </div>
      }
      <div className={style.BackButtonContainer}>
        <Button onClick={handleBack}>{'<-'} Back</Button>
      </div>
      </div>

    </div>
  );
}
