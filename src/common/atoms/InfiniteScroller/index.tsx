import React, { ReactNode, useCallback, useEffect, useRef, useState } from 'react';
import { useDebounce, useEventListener } from '@common/hooks';
import { ScrollToTopButton } from '@main/molecules';

const DEFAULT_THRESHOLD = 150;
const DEBOUNCE_WAIT = 300; // 0.3s

interface InfiniteScrollerProps {
  threshold?: number;
  onLoadMore: () => void;
  style?: React.CSSProperties;
  isLoading?: boolean;
  LoadingComponent?: ReactNode;
}

const InfiniteScroller: React.FC<InfiniteScrollerProps> = ({
  children,
  style,
  threshold,
  onLoadMore,
  isLoading,
  LoadingComponent,
}) => {
  const scrollerRef = useRef<HTMLDivElement>(null);
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

  useEffect(() => {
    // In case list doesn't trigger scroller at the first load
    if (scrollerRef.current?.scrollHeight === scrollerRef.current?.clientHeight) {
      handleLoadMoreTrigger();
    }
  }, [handleLoadMoreTrigger]);

  return (
    <>
      <div ref={scrollerRef} style={style}>
        {children}
        {isLoading && LoadingComponent}
      </div>
      <ScrollToTopButton onClick={scrollToTop} visible={showScrollTop} />
    </>
  );
};

InfiniteScroller.defaultProps = {
  threshold: DEFAULT_THRESHOLD,
  style: undefined,
  isLoading: false,
  LoadingComponent: null,
};

export default InfiniteScroller;
