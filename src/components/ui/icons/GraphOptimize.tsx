interface GraphIconProps {
  className?: string;
  style?: React.CSSProperties;
}

export default function GraphOptimize({ className, style }: GraphIconProps) {
  return (
    <svg width="64" height="60" viewBox="0 0 64 60" fill="none" xmlns="http://www.w3.org/2000/svg"
      className={className}
      style={style}>
<path  d="M25.4755 36.9614C25.3535 97.8804 -35.8681 17.7128 31.937 26.5161C-20.6905 -4.09768 79.2593 -17.1688 37.7303 37.3282C90.4798 6.95892 51.8154 100.203 25.4755 36.9614Z" fill="currentColor"/>
</svg>

  );
}