import React, { ReactNode, useCallback, useRef } from 'react';
import { Box } from '@mui/material';
import { useEventListener } from '@common/hooks/useEventListener';
import { SxProps } from '@mui/system';

const DEFAULT_THRESHOLD = 250;

interface InfiniteScrollerProps {
  threshold?: number;
  onLoadMore?: () => void;
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

  const handleScroll = useCallback(() => {
    const winScroll = scrollerRef.current?.scrollTop ?? 0;

    if (winScroll > (threshold ?? DEFAULT_THRESHOLD) && onLoadMore) {
      onLoadMore();
    }
  }, [threshold, onLoadMore]);

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
  onLoadMore: () => undefined,
  sx: undefined,
  isLoading: false,
  LoadingComponent: null,
};

export default InfiniteScroller;
