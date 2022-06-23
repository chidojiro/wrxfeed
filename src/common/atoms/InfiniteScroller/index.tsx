import React, { ReactNode, useCallback, useEffect, useRef, useState } from 'react';
import { useDebounce, useEventListener, useIntersection } from '@/common/hooks';
import { ScrollToTopButton } from '@/main/molecules';
import { Children } from '@/common/types';

const DEFAULT_THRESHOLD = 150;
const DEBOUNCE_WAIT = 300; // 0.3s

interface InfiniteScrollerProps extends Children {
  style?: React.CSSProperties;
  className?: string;
  threshold?: number;
  onLoadMore?: () => void;
  isLoading?: boolean;
  LoadingComponent?: ReactNode;
}

const InfiniteScroller: React.FC<InfiniteScrollerProps> = ({
  children,
  style,
  className,
  threshold,
  onLoadMore,
  isLoading,
  LoadingComponent,
}) => {
  const scrollerRef = useRef<HTMLDivElement>(null);
  const endAnchorRef = useRef<HTMLDivElement>(null);
  const [showScrollTop, setShowScrollTop] = useState<boolean>(false);
  const isEndReached = useIntersection(endAnchorRef.current || undefined, `${threshold}px`); // Trigger if 200px is visible from the element
  const loadMoreFunc = onLoadMore || (() => undefined);
  const handleLoadMoreTrigger = useDebounce(loadMoreFunc, DEBOUNCE_WAIT, []);
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
    if (isEndReached) {
      handleLoadMoreTrigger();
    }
  }, [handleLoadMoreTrigger, isEndReached]);

  return (
    <>
      <div ref={scrollerRef} className={className} style={style}>
        {children}
        {isLoading && LoadingComponent}
      </div>
      <ScrollToTopButton onClick={scrollToTop} visible={showScrollTop} />
      <div ref={endAnchorRef} id="end-anchor" className="sr-only" />
    </>
  );
};

InfiniteScroller.defaultProps = {
  threshold: DEFAULT_THRESHOLD,
  style: undefined,
  className: '',
  isLoading: false,
  LoadingComponent: null,
  onLoadMore: () => undefined,
};

export default InfiniteScroller;
