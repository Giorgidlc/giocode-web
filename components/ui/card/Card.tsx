import type { ReactNode } from "react"; 
import styles from "./card.module.css";

interface CardProps {
  children: ReactNode; 
  classBackground?: string;        
  benefitCard?: string;          
}

export default function Card({ children, classBackground = "", benefitCard = "" }: CardProps) {
  return (
    <div className={`${styles.card} ${classBackground} ${benefitCard}`}>
      {children}
    </div>
  );
}