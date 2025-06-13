import React from 'react'
import style from './Login.module.css'
import { TextInput, Button } from '@mantine/core';

const Login = () => {
  return (
    <div className={style.Backdrop}>
      <img className={style.BackdropArt} src="/images/PathBackDrop.svg"/>
      <div className={style.BackdropShade}/>
      <img className={style.Logo} src="/images/LogoWhite.svg"/>
      <img className={style.subLogo} src="/images/BlockfintWhite.svg"/>
      <div className={style.subWhiteText}>Powered by</div>
      <div className={style.ContainerCard}>
        <div className={style.InputLable}>Username</div>
        <TextInput className={style.TextInput}/>
        <div className={style.InputLable}>Password</div>
        <TextInput className={style.TextInput}/>
        <Button className={style.Button}>Login</Button>
      </div>
    </div>
  )
}

export default Login