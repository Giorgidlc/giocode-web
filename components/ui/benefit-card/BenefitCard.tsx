import Card from "@/components/ui/card/Card";
import styles from "@/card.module.css";

interface BenefitCardProps {
  title: string;
  description: string;
}

export default function BenefitCard({ title, description }: BenefitCardProps) {
  return (
    <Card className={styles.themeLight}>
      <div className={styles.cardContent}>
        <h2>{title}</h2>
        <p>{description}</p>
      </div>
    </Card>
  )

}