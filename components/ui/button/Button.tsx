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
           href="https://wa.me/+34661963517?text=Hola%20Giocode%2C%20he%20visto%20que%20la%20web%20est%C3%A1%20en%20mantenimiento.%20Me%20gustar%C3%ADa%20contactar%20contigo."
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
