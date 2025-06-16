import style from './LogoRole.module.css'

interface RoleInfo {
  text?: string;
}

const LogoRole = ({text} : RoleInfo) => {
  return (
    <div>
      <img className={style.Logo} src="/images/LogoWhite.svg"/>
      <h2 className={style.TextLable}>{text}</h2>
    </div>
  )
}

export default LogoRole