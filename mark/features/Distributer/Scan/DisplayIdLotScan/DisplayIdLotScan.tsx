
'use client';
import style from './DisplayIdLotScan.module.css'
import { useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import LogoRole from "@/components/logoRole/LogoRole";
import LogoutButton from "@/components/logoutButton/LogoutButton";
import QrScanner, { QrScannerHandle } from '@/components/Scanner/Scanner';
import { Button } from '@mantine/core';
import assignDisplayIdToLot from '@/api/lot/assignDisplayId';
import { useAuth } from "@/providers/AuthContext";

type AssignProps = {
  lotId: string;
}

const DisplayIdLotScan = ({ lotId }: AssignProps) => {
  const router = useRouter();
  const { user } = useAuth();
  const scannerRef = useRef<QrScannerHandle>(null);
  const [id, setId] = useState('');

  const handleScan = async (id: string) => {
    console.log('Scanned ID:', id);
    setId(id);
  };

  const handleContinue = async() =>{
    await scannerRef.current?.stopScanner();
    const res = await assignDisplayIdToLot(lotId, id, user.token);
    console.log(res)
    router.push(`/distributer/lotinfo/${encodeURIComponent(lotId)}`);
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
        <QrScanner ref={scannerRef} onScan={handleScan} />
        { id !== '' &&
      <div className={style.ActionContainer}>
        <Button variant='green-md' onClick={handleContinue}>กำหนดกล่อง</Button>
      </div>
      }
      <div className={style.BackButtonContainer}>
        <Button onClick={handleBack}>{'<-'} ย้อนกลับ</Button>
      </div>
      </div>

    </div>
  );
}

export default DisplayIdLotScan