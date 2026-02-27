import type { ReactNode, CSSProperties} from "react"; 
import styles from "./card.module.css";

interface CardProps {
  children: ReactNode; 
  classBackground?: string;        
  benefitCard?: string;   
  style?: CSSProperties;
}

export default function Card({ children, classBackground = "", benefitCard = "", style}: CardProps) {
  return (
    <div className={`${styles.card} ${classBackground} ${benefitCard}`} style={style}>
      {children}
    </div>
  );
}