import './tooltip.scss';

type TooltipProps = {
  children: React.ReactNode;
  visible: boolean;
}

export default function Tooltip({ children, visible }: TooltipProps) {
  return (
    <div className={`tooltip-container ${visible ? 'is-visible' : ''}`}>
        {children}
    </div>
  );
}