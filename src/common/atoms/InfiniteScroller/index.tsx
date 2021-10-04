import React, { ReactNode, useCallback, useRef } from 'react';
import { Box } from '@mui/material';
import { useDebounce, useEventListener } from '@common/hooks';
import { SxProps } from '@mui/system';

const DEFAULT_THRESHOLD = 100;
const DEBOUNCE_WAIT = 300; // 0.3s

interface InfiniteScrollerProps {
  threshold?: number;
  onLoadMore: () => void;
  sx?: SxProps;
  isLoading?: boolean;
  LoadingComponent?: ReactNode;
}

const InfiniteScroller: React.FC<InfiniteScrollerProps> = ({
  children,
  sx,
  threshold,
  onLoadMore,
  isLoading,
  LoadingComponent,
}) => {
  const scrollerRef = useRef<HTMLDivElement>();

  const handleLoadMoreTrigger = useDebounce(onLoadMore, DEBOUNCE_WAIT, []);

  const handleScroll = useCallback(() => {
    const winScroll = scrollerRef.current?.scrollTop ?? 0;

    if (winScroll > (threshold ?? DEFAULT_THRESHOLD)) {
      handleLoadMoreTrigger();
    }
  }, [threshold, handleLoadMoreTrigger]);

  useEventListener('scroll', handleScroll, scrollerRef.current || window);

  return (
    <Box ref={scrollerRef} sx={sx}>
      {children}
      {isLoading && LoadingComponent}
    </Box>
  );
};

InfiniteScroller.defaultProps = {
  threshold: DEFAULT_THRESHOLD,
  sx: undefined,
  isLoading: false,
  LoadingComponent: null,
};

export default InfiniteScroller;
