'use client';
import { useRouter } from 'next/navigation';
import { getRedirectPath } from '@/utils/roleRoutes';
import { useState } from 'react';
import style from './Login.module.css'
import { TextInput, Button } from '@mantine/core';
import { useAuth } from '@/providers/AuthContext';

import login from '@/api/auth/login';

const Login = () => {
  const { setUser } = useAuth();
  const router = useRouter();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  
  const handleLogin = async () => {
    const res = await login(username, password);
    if (res.success && res.user) {
    setUser(res.user); // ← Set the user context
    router.push(getRedirectPath(res.user.role));
    console.log('User logged in:', res.user);
    console.log('Local user', localStorage.getItem("user"));
    }
  }

  const handleBack = async () => {
    router.push("/")
  }

  return (
    <div className={style.Backdrop}>
      <img className={style.BackdropArt} src="/images/PathBackDrop.svg"/>
      <div className={style.BackdropShade}/>
      <img className={style.Logo} src="/images/LogoWhite.svg"/>
      <img className={style.subLogo} src="/images/BlockfintWhite.svg"/>
      <div className={style.subWhiteText}>Powered by</div>
      <div className={style.ContainerCard}>
        <h2 className={style.Title}>Hello Again!</h2>
        <div onClick={handleBack} className={style.BackButton}>{'<-'} Back</div>
        <div className={style.InputLable}>Username</div>
        <TextInput
        value={username}
        onChange={(event) => setUsername(event.currentTarget.value)}
        className={style.TextInput}/>
        <div className={style.InputLable}>Password</div>
        <TextInput 
        value={password}
        onChange={(event) => setPassword(event.currentTarget.value)}
        className={style.TextInput}/>
        <Button className={style.Button} onClick={handleLogin}>Login</Button>
      </div>
    </div>
  )
}

export default Login