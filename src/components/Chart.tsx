import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import {
  createChart,
  ColorType,
  ISeriesApi,
  IChartApi,
} from 'lightweight-charts';
import { CrosshairMoveData } from './types';
import { formatCurrency } from '@/utils/format';
import { Tooltip } from './ChartTooltip';
import useIsMobile from 'src/hooks/useIsMobile';

type CrosshairDataUpdate = {
  volumes: any[];
  container: HTMLElement;
  tooltip: HTMLDivElement | null;
  series: ISeriesApi<'Baseline'>;
  onCrosshairData: (arg: CrosshairMoveData) => void;
};

const COLORS = {
  backgroundColor: 'white',
  lineColor: '#2962FF',
  textColor: 'black',
  areaTopColor: '#2962FF',
  areaBottomColor: 'rgba(41, 98, 255, 0.28)',
};

const handleCrosshairMove =
  ({
    volumes,
    container,
    series,
    tooltip,
    onCrosshairData,
  }: CrosshairDataUpdate) =>
  (param: any) => {
    if (
      param.point === undefined ||
      !param.time ||
      param.point.x < 0 ||
      param.point.x > container.clientWidth ||
      param.point.y < 0 ||
      param.point.y > container.clientHeight
    ) {
      onCrosshairData({ shown: false });
    } else if (tooltip) {
      const timestamp = param.time * 1000;
      const dateStr = new Date(timestamp).toUTCString();
      const price = param.seriesPrices.get(series);
      const volume = volumes.find((x) => x.time === param.time);
      const toolTipHeight = tooltip.clientHeight;
      const toolTipWidth = tooltip.clientWidth;
      const toolTipMarginY = 10;
      const toolTipMarginX = 10;
      const coordinate = series.priceToCoordinate(price);
      let shiftedX = param.point.x - toolTipWidth;
      if (coordinate === null) {
        return;
      }
      if (shiftedX < 0) {
        shiftedX = param.point.x + toolTipMarginX;
      } else {
        shiftedX -= toolTipMarginX;
      }
      const coordinateY =
        coordinate - toolTipHeight - toolTipMarginY > 0
          ? coordinate - toolTipHeight - toolTipMarginY
          : Math.max(
              0,
              Math.min(
                container.clientHeight - toolTipHeight - toolTipMarginY,
                coordinate + toolTipMarginY
              )
            );

      onCrosshairData({
        shown: true,
        price,
        volume: volume.value,
        top: coordinateY,
        left: shiftedX,
        date: dateStr,
      });
    }
  };

interface TooltipData extends Required<CrosshairMoveData> {
  title: string;
}

type PriceChartProps = {
  prices: { time: number; value: number }[];
  volumes: { time: number; value: number }[];
  title: string;
  fullscreen: boolean;
};

const PriceChart = (props: PriceChartProps) => {
  const isMobile = useIsMobile();
  const containerRef = useRef<HTMLDivElement>(null);
  const tooltipRef = useRef<HTMLDivElement>(null);
  const seriesRef = useRef<ISeriesApi<'Baseline'> | null>(null);
  const chartRef = useRef<IChartApi | null>(null);
  const [tooltipData, setTooltipData] = useState<TooltipData>({
    shown: false,
    top: 1,
    left: 1,
    title: props.title,
    price: 0,
    volume: 0,
    date: '',
  });
  const handleCrosshairData = ({
    shown,
    price,
    volume,
    top,
    left,
    date,
  }: CrosshairMoveData) => {
    setTooltipData((prev) => ({
      ...prev,
      shown,
      price: price ?? 0,
      volume: volume ?? 0,
      top: top ?? 0,
      left: left ?? 0,
      date: date ?? '',
    }));
  };
  useLayoutEffect(() => {
    if (!chartRef.current) {
      return;
    }
    chartRef.current?.applyOptions({
      localization: {
        priceFormatter: formatCurrency(
          'USD',
          isMobile ? 'compact' : 'standard'
        ),
      },
    });
  }, [isMobile]);
  useEffect(() => {
    chartRef.current?.resize(
      containerRef.current?.clientWidth || 500,
      props.fullscreen ? window.innerHeight * 0.98 : 500
    );
  }, [props.fullscreen]);
  useLayoutEffect(() => {
    if (!containerRef.current) {
      return;
    }
    console.log(containerRef.current?.clientHeight, 'h');
    const chart = createChart(containerRef.current, {
      layout: {
        background: { type: ColorType.Solid, color: COLORS.backgroundColor },
        textColor: COLORS.textColor,
      },
      grid: {
        vertLines: {
          visible: false,
        },
      },
      width: containerRef.current?.clientWidth,
      height: 500,
      timeScale: {
        timeVisible: true,
        tickMarkFormatter: (time: number, markType: number) => {
          const date = new Date(time * 1000);
          switch (markType) {
            case 0:
              return date.toLocaleDateString('en-US', {
                year: 'numeric',
              });
            case 1:
              return date.toLocaleDateString('en-US', {
                month: 'short',
                year: '2-digit',
              });
            case 2:
              return date.toLocaleDateString('en-US', {
                month: 'short',
                day: '2-digit',
              });
            case 3:
              return date.toLocaleTimeString('en-US');
            default:
              break;
          }
        },
      },
    });
    chartRef.current = chart;
    const baselineSeries = chart.addBaselineSeries({
      lineWidth: 1,
      topLineColor: 'rgba( 38, 166, 154, 1)',
      topFillColor1: 'rgba( 38, 166, 154, 0.28)',
      topFillColor2: 'rgba( 38, 166, 154, 0.05)',
      bottomLineColor: 'rgba( 239, 83, 80, 1)',
      bottomFillColor1: 'rgba( 239, 83, 80, 0.05)',
      bottomFillColor2: 'rgba( 239, 83, 80, 0.28)',
    });
    seriesRef.current = baselineSeries;
    return () => {
      chart.remove();
    };
  }, [props.title]);

  useLayoutEffect(() => {
    if (!chartRef.current || !seriesRef.current || !containerRef.current) {
      return;
    }
    seriesRef.current.setData(props.prices as any[]);
    seriesRef.current.applyOptions({
      baseValue: {
        type: 'price',
        price: props.prices[props.prices.length - 1]?.value ?? 0,
      },
    });
    chartRef.current.timeScale().fitContent();
    const crosshairmoveHandler = handleCrosshairMove({
      volumes: props.volumes,
      container: containerRef.current,
      series: seriesRef.current,
      tooltip: tooltipRef.current,
      onCrosshairData: handleCrosshairData,
    });
    chartRef.current.unsubscribeCrosshairMove(crosshairmoveHandler);
    chartRef.current.subscribeCrosshairMove(crosshairmoveHandler);
    const handleResize = () => {
      if (!chartRef.current) {
        return;
      }
      chartRef.current.applyOptions({
        width: containerRef?.current?.clientWidth ?? 0,
      });
      chartRef.current.timeScale().fitContent();
    };
    window.addEventListener('resize', handleResize);
    return () => {
      chartRef?.current?.unsubscribeCrosshairMove(crosshairmoveHandler);
      window.removeEventListener('resize', handleResize);
    };
  }, [props.prices]);
  return (
    <div
      ref={containerRef}
      style={{
        position: 'relative',
        width: '100%',
        height: '100%',
      }}
    >
      <Tooltip
        ref={tooltipRef}
        shown={tooltipData.shown}
        date={tooltipData.date}
        title={tooltipData.title}
        price={tooltipData.price}
        volume={tooltipData.volume}
        top={tooltipData.top}
        left={tooltipData.left}
      />
    </div>
  );
};

export default PriceChart;
