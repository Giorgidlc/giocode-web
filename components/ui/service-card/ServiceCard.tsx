import Badge from "../badge/Badge";
import Button from "../button/Button";
import Card from "../card/Card";
import styles from "@/components/ui/card/card.module.css";

interface ServiceCardProps {
  title: string;
  description: string;
  tag: string;
}

export default function ServiceCard({ title, description, tag }: ServiceCardProps) {
  return (
    <Card className={styles.themeLight}>
      <Badge badgeText={tag} />
      <div className={styles.cardContent}>
        <h2>{title}</h2>
        <p>{description}</p>
      </div>
      
      <Button btnText="Contáctame" />
    </Card>
  );
}