import React from 'react';
import { FixedSizeList as List, FixedSizeListProps } from 'react-window';
import InfiniteLoader from 'react-window-infinite-loader';
import AutoSizer from 'react-virtualized-auto-sizer';
import styles from './InfinityScroller.module.css';

type InfinityScrollerProps = {
  itemCount: number;
  itemSize: number;
  isItemLoaded: (index: number) => boolean;
  rowTemplate: (props: any) => JSX.Element;
  loadMoreItems: (startIndex: number, stopIndex: number) => Promise<void>;
};

export default function InfinityScroller(props: InfinityScrollerProps) {
  const { itemCount, itemSize, isItemLoaded, rowTemplate, loadMoreItems } =
    props;
  return (
    <AutoSizer>
      {({ height, width }) => (
        <>
          <InfiniteLoader
            isItemLoaded={isItemLoaded}
            itemCount={itemCount}
            loadMoreItems={loadMoreItems}
          >
            {({ onItemsRendered, ref }) => (
              <List
                height={height}
                itemCount={itemCount}
                itemSize={itemSize}
                onItemsRendered={onItemsRendered}
                ref={ref}
                width={width}
                className={styles.infinityScroller}
              >
                {rowTemplate}
              </List>
            )}
          </InfiniteLoader>
        </>
      )}
    </AutoSizer>
  );
}
