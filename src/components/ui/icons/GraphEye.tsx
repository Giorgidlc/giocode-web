interface GraphIconProps {
  className?: string;
  style?: React.CSSProperties;
}

export default function GraphEyeIcon({ className, style }: GraphIconProps) {
  return (
    <svg 
      width="106" height="39" viewBox="0 0 106 39" 
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      style={style}
    >
      <g> 
        <path d="M106 39C96.8521 39 87.9496 39 79.0568 39C79.0568 13.8138 61.3067 3.2916 49.9469 0C59.0141 0.0975 68.12 -0.2223 77.1388 0.6513C92.3637 2.1255 106 14.1414 106 39Z" fill="currentColor"/>
        <path d="M0 0C9.1479 0 18.0504 0 26.9432 0C26.9432 25.1862 44.6933 35.7084 56.0531 39C46.9859 38.9025 37.88 39.2223 28.8612 38.3487C13.6395 36.8784 0 24.8586 0 0Z" fill="currentColor"/>
        <ellipse cx="53.2112" cy="19.288" rx="9.50199" ry="9.53804" fill="currentColor"/>
      </g>
    </svg>
  );
}