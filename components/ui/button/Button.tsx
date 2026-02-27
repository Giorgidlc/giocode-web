import Image from "next/image";
import styles from "./button.module.css";

interface ButtonProps { 
  btnText: string;
  absoluteClass?: string;
}

export default function Button({btnText, absoluteClass = ""}: ButtonProps) {
  return (
    <div className={`${styles.ctas} ${absoluteClass}`} role="button">
          <a
            className={styles.primary}
           href="https://wa.me/+34661963517?text=Hola%20Giocode%2C%20estoy%20interesado%20en%20tus%20servicios%20de%20dise%C3%B1o%20y%20desarrollo%20web%20y%20me%20gustar%C3%ADa%20contactar%20contigo.
"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image
              className={styles.arrow}
              src="/arrow_forward.svg"
              alt="Arrow Forward"
              width={16}
              height={16}
            />
            {btnText}
          </a>
        </div>
  )
};
