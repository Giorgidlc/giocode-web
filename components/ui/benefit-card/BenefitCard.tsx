import Card from "@/components/ui/card/Card";
import styles from "@/components/ui/card/card.module.css";

interface BenefitCardProps {
  title: string;
  description: string;
  classBackground?: string;
  className?: string;
}

export default function BenefitCard({
  title,
  description,
  classBackground = "",

}: BenefitCardProps) {
  return (
    <Card classBackground={classBackground} >
      <div className={styles.cardContent}>
        <h3>{title}</h3>
        <p>{description}</p>
      </div>
    </Card>
  );
}
