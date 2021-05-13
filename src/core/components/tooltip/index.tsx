import './styles.scss';

type Props = {
  children: React.ReactNode;
  visible: boolean;
  location: {
    top: number;
    left: number;
    height?: number;
    width?: number;
  }
  position: 'bottom' | 'right';
}

export default function Tooltip({ children, visible, location, position }: Props) {
  let top = 0;
  let right = 0;
  let bottom = 0;
  let left = 0;

  if (position === 'bottom') {
    top = location.top + (location.height ?? 0);
    left = location.left;
  }

  return (
    <div
      style={{
        top: top,
        left: left,
        width: location.width
      }}
      className={`tooltip-container ${visible ? 'is-visible' : ''}`}
    >
      {children}
    </div>
  );
}