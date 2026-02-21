import styles from "./badge.module.css";
interface BadgeProps {
  badgeText: string;
}

export default function Badge({ badgeText }: BadgeProps) {
  return (
    <div className={styles.badge}>
      <span>{badgeText}</span>
    </div>
  );
}