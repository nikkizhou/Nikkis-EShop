import Reat, { useState } from 'react'
import { FaUpload } from "react-icons/fa";
import styles from '../../styles/ProfilePage.module.css'

const ImgUpload = ({ onChange, src }) => {
  const [isHovering, setIsHovering] = useState<boolean>(false);
  const handleMouseOver = () => setIsHovering(true);
  const handleMouseOut = () => setIsHovering(false);
  

  return (
    <label htmlFor= "photo-upload" className = { styles.fileUpload } onMouseOver = { handleMouseOver } onMouseOut = { handleMouseOut } >
      <div className={ `${styles.imgWrap} ${styles.imgUpload}` }>
        { isHovering && <FaUpload className={ styles.uploadIcon } />}
          < img src = { src } />
      </div>
      < input id = "photo-upload" type = "file" onChange = { onChange } className = { styles.hide } />
    </label>
  )
}

export default ImgUpload
