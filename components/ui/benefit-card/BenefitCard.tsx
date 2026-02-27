import Card from "@/components/ui/card/Card";
import styles from "@/components/ui/card/card.module.css";
import { ElementType } from "react";

interface BenefitCardProps {
  title: string;
  description: string;
  classBackground?: string;
  className?: string;
  IconCard?: ElementType;
  iconColor?: string;
}

export default function BenefitCard({
  title,
  description,
  classBackground = "",
  IconCard,
  iconColor = "currentColor",


}: BenefitCardProps) {
  return (
    <Card classBackground={classBackground} >
      {IconCard && <IconCard style={{ color: iconColor }} />}
      <div className={styles.cardContent}>
        <h3>{title}</h3>
        <p>{description}</p>
      </div>
    </Card>
  );
}
