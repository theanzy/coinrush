import { formatCurrency } from '@/utils/format';
import { forwardRef } from 'react';
import useIsMobile from 'src/hooks/useIsMobile';
import { CrosshairMoveData } from './types';
interface TooltipProps extends Required<CrosshairMoveData> {
  title: string;
}

export const Tooltip = forwardRef(
  (props: TooltipProps, ref: React.LegacyRef<HTMLDivElement>) => {
    const { top, left, title, volume, price, shown, date } = props;
    const isMobile = useIsMobile();
    return (
      <div
        style={{
          width: 'fit-content',
          height: 'fit-content',
          position: 'absolute',
          display: shown ? 'block' : 'none',
          boxSizing: 'border-box',
          padding: '0.5rem',
          fontSize: '0.75rem',
          textAlign: 'left',
          zIndex: '1000',
          top: top ?? '12px',
          left: left ?? '12px',
          pointerEvents: 'none',
          color: 'black',
          border: '1px solid #2962FF',
          borderRadius: '3px',
          background: 'white',
          fontFamily: 'cursive',
        }}
        ref={ref}
      >
        <div
          style={{
            color: '#2962FF',
            fontWeight: 'bolder',
            paddingBottom: '5px',
          }}
        >
          {title}
        </div>
        <div style={{ margin: '4px 0px', color: '#000' }}>
          <span style={{ color: '#777' }}> Price: </span>
          {formatCurrency('USD', isMobile ? 'compact' : 'standard')(price)}
        </div>
        <div style={{ margin: '4px 0px', color: '#000' }}>
          <span style={{ color: '#777' }}> Volume: </span>
          {formatCurrency('USD', isMobile ? 'compact' : 'standard')(volume)}
        </div>
        <div style={{ color: '#777' }}>{date}</div>
      </div>
    );
  }
);
Tooltip.displayName = 'Tooltip';
