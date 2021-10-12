import React, { ReactNode, useCallback, useRef, useState } from 'react';
import { Box } from '@mui/material';
import { useDebounce, useEventListener } from '@common/hooks';
import { SxProps } from '@mui/system';
import { ScrollToTopButton } from '@main/molecules';

const DEFAULT_THRESHOLD = 150;
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
  const [showScrollTop, setShowScrollTop] = useState<boolean>(false);
  const handleLoadMoreTrigger = useDebounce(onLoadMore, DEBOUNCE_WAIT, []);
  const handleScroll = useCallback(() => {
    const winScroll = scrollerRef.current?.scrollTop ?? 0;
    const scrollDistance =
      (scrollerRef.current?.scrollHeight ?? 0) - (scrollerRef.current?.clientHeight ?? 0);
    if (scrollDistance - winScroll < (threshold ?? DEFAULT_THRESHOLD)) {
      handleLoadMoreTrigger();
    }
    if (winScroll > window.innerHeight) {
      setShowScrollTop(true);
    } else {
      setShowScrollTop(false);
    }
  }, [threshold, handleLoadMoreTrigger]);

  useEventListener('scroll', handleScroll, scrollerRef.current || window);
  const scrollToTop = () => {
    scrollerRef.current?.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      <Box ref={scrollerRef} sx={sx}>
        {children}
        {isLoading && LoadingComponent}
      </Box>
      <ScrollToTopButton onClick={scrollToTop} visible={showScrollTop} />
    </>
  );
};

InfiniteScroller.defaultProps = {
  threshold: DEFAULT_THRESHOLD,
  sx: undefined,
  isLoading: false,
  LoadingComponent: null,
};

export default InfiniteScroller;
