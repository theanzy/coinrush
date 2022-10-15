import React from 'react';
import { usePagination, DOTS } from './usePagination';
import styles from './Pagination.module.css';

type PaginationProps = {
  onPageChange: (pageNumber: number) => void;
  totalCount: number;
  siblingCount?: number;
  currentPage: number;
  pageSize: number;
  className?: string;
};

const Pagination = (props: PaginationProps) => {
  const {
    onPageChange,
    totalCount,
    siblingCount = 1,
    currentPage,
    pageSize,
    className,
  } = props;

  const paginationRange = usePagination({
    currentPage,
    totalCount,
    siblingCount,
    pageSize,
  });

  if (currentPage === 0 || paginationRange.length < 2) {
    return null;
  }

  const onNext = () => {
    onPageChange(currentPage + 1);
  };

  const onPrevious = () => {
    onPageChange(currentPage - 1);
  };

  const lastPage = paginationRange[paginationRange.length - 1];
  return (
    <ul className={`${styles.paginationContainer} ${className}`}>
      <li
        className={`${styles.paginationItem} ${
          currentPage === 1 ? styles.disabled : ''
        }`}
        onClick={onPrevious}
      >
        <div className={`${styles.arrow} ${styles.left}`} />
      </li>
      {paginationRange.map((pageNumber, i) => {
        if (pageNumber === DOTS) {
          return (
            <li
              key={i}
              className={`${styles.paginationItem} ${styles.dots}`}
            >
              &#8230;
            </li>
          );
        }

        return (
          <li
            key={i}
            className={`${styles.paginationItem} ${
              pageNumber === currentPage ? styles.selected : ''
            }`}
            onClick={() => onPageChange(pageNumber as number)}
          >
            {pageNumber}
          </li>
        );
      })}
      <li
        className={`${styles.paginationItem} ${
          currentPage === lastPage ? styles.disabled : ''
        }`}
        onClick={onNext}
      >
        <div className={`${styles.arrow} ${styles.right}`} />
      </li>
    </ul>
  );
};

export default Pagination;
