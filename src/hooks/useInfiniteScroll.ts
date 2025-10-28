import { useEffect, useRef, useCallback, type RefObject } from "react";

/**
 * Custom hook for infinite scroll functionality
 * @param loadMore - Function to call when scrolling to bottom
 * @param hasMore - Whether there are more items to load
 * @param isLoading - Whether currently loading
 * @param threshold - Distance from bottom to trigger load (default: 200px)
 * @returns Ref to attach to scrollable container
 */
export const useInfiniteScroll = (
  loadMore: () => void,
  hasMore: boolean,
  isLoading: boolean,
  threshold: number = 200
): RefObject<HTMLDivElement | null> => {
  const containerRef = useRef<HTMLDivElement>(null);
  const observerRef = useRef<IntersectionObserver | null>(null);
  const sentinelRef = useRef<HTMLDivElement | null>(null);

  const handleObserver = useCallback(
    (entries: IntersectionObserverEntry[]) => {
      const target = entries[0];
      if (target.isIntersecting && hasMore && !isLoading) {
        loadMore();
      }
    },
    [loadMore, hasMore, isLoading]
  );

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Remove old sentinel if it exists
    if (sentinelRef.current && sentinelRef.current.parentNode === container) {
      container.removeChild(sentinelRef.current);
    }

    // Create new sentinel element at the bottom
    const sentinel = document.createElement("div");
    sentinel.style.height = "1px";
    sentinel.style.width = "100%";
    sentinel.setAttribute("data-sentinel", "true");

    // Append sentinel to the end (after all current content)
    container.appendChild(sentinel);
    sentinelRef.current = sentinel;

    // Disconnect previous observer if exists
    if (observerRef.current) {
      observerRef.current.disconnect();
    }

    // Set up new Intersection Observer
    const options: IntersectionObserverInit = {
      root: null, // viewport
      rootMargin: `${threshold}px`,
      threshold: 0,
    };

    observerRef.current = new IntersectionObserver(handleObserver, options);
    observerRef.current.observe(sentinel);

    // Cleanup
    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
      if (sentinelRef.current && sentinelRef.current.parentNode === container) {
        container.removeChild(sentinelRef.current);
      }
    };
  }, [handleObserver, threshold, hasMore, isLoading]); // Re-run when deps change to reposition sentinel

  return containerRef;
};

export default useInfiniteScroll;
