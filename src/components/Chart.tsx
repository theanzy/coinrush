import React, { useLayoutEffect, useRef, useState } from 'react';
import { createChart, ColorType, ISeriesApi } from 'lightweight-charts';
import { CrosshairMoveData } from './types';
import { formatCurrency } from '@/utils/format';
import { Tooltip } from './ChartTooltip';

type CrosshairDataUpdate = {
  volumes: any[];
  container: HTMLElement;
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
  ({ volumes, container, series, onCrosshairData }: CrosshairDataUpdate) =>
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
    } else {
      const timestamp = param.time * 1000;
      const dateStr = new Date(timestamp).toUTCString();
      const price = param.seriesPrices.get(series);
      const volume = volumes.find((x) => x.time === param.time);
      const toolTipHeight = 80;
      const toolTipWidth = 80;
      const toolTipMargin = 15;
      const coordinate = series.priceToCoordinate(price);
      let shiftedCoordinate = param.point.x - 50;
      if (coordinate === null) {
        return;
      }
      shiftedCoordinate = Math.max(
        0,
        Math.min(container.clientWidth - toolTipWidth, shiftedCoordinate)
      );

      const coordinateY =
        coordinate - toolTipHeight - toolTipMargin > 0
          ? coordinate - toolTipHeight - toolTipMargin
          : Math.max(
              0,
              Math.min(
                container.clientHeight - toolTipHeight - toolTipMargin,
                coordinate + toolTipMargin
              )
            );

      onCrosshairData({
        shown: true,
        price,
        volume: volume.value,
        top: coordinateY,
        left: shiftedCoordinate,
        date: dateStr,
      });
    }
  };

interface TooltipData extends Required<CrosshairMoveData> {
  title: string;
}

type CoinChartProps = {
  prices: { time: number; value: number }[];
  volumes: { time: number; value: number }[];
  title: string;
};

const PriceChart = (props: CoinChartProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [prices, setPrices] = useState<any[]>(props.prices);
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
    if (!containerRef.current) {
      return;
    }
    const handleResize = () => {
      console.log('container width', containerRef?.current?.clientWidth);
      chart.applyOptions({
        width: containerRef?.current?.clientWidth ?? 0,
      });
      chart.timeScale().fitContent();
    };
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
      width: containerRef.current.clientWidth,
      height: 500,
      localization: {
        priceFormatter: formatCurrency('USD'),
      },
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

    chart.timeScale().fitContent();
    const baselineSeries = chart.addBaselineSeries({
      lineWidth: 1,
      topLineColor: 'rgba( 38, 166, 154, 1)',
      topFillColor1: 'rgba( 38, 166, 154, 0.28)',
      topFillColor2: 'rgba( 38, 166, 154, 0.05)',
      bottomLineColor: 'rgba( 239, 83, 80, 1)',
      bottomFillColor1: 'rgba( 239, 83, 80, 0.05)',
      bottomFillColor2: 'rgba( 239, 83, 80, 0.28)',
    });

    chart.subscribeCrosshairMove(
      handleCrosshairMove({
        volumes: props.volumes,
        container: containerRef.current,
        series: baselineSeries,
        onCrosshairData: handleCrosshairData,
      })
    );
    baselineSeries.setData(prices);
    baselineSeries.applyOptions({
      baseValue: {
        type: 'price',
        price: prices[prices.length - 1]?.value ?? 0,
      },
    });
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
      chart.remove();
    };
  }, []);
  return (
    <div
      ref={containerRef}
      style={{
        position: 'relative',
      }}
    >
      <Tooltip
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
