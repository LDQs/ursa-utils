import React, { Component } from 'react';
import InfiniteScroller from 'react-infinite-scroller';

// interface IProps {
//   children: Node;
//   loadMore: () => void;
//   element?: Component;
//   hasMore?: boolean;
//   initialLoad?: boolean;
//   isReverse?: boolean;
//   loader?: Component;
//   pageStart?: number;
//   getScrollParent?: () => void;
//   threshold?: number;
//   useCapture?: boolean;
//   useWindow?: boolean;
//   root: HTMLElement;
//   targetElementClassName: string;
//   getELementsInViewport: (elements: Element[]) => void;
// }

export default class ReactInfiniteScrollerObserver extends Component {
  observer = null;

  componentDidMount() {
    const { root, targetElementClassName } = this.props;
    this.initObserver(root, targetElementClassName);
  }

  componentWillUnmount() {
    this.destroyObsever();
  }

  initObserver = (root, targetElementClassName) => {
    if (root) {
      this.destroyObsever();
      this.observer = new IntersectionObserver(this.handleObserverCallback, {
        root,
      });
      const targetElements = root.querySelectorAll(`.${targetElementClassName}`);
      targetElements.forEach(element => this.observer.observe(element));
    } else {
      throw new Error('root is null');
    }
  }

  destroyObsever = () => {
    if (this.observer) {
      this.observer.disconnect();
    }
  }

  handleObserverCallback = (entries) => {
    const { getELementsInViewport } = this.props;
    const entriesInViewport = [];
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const element = entry.target;
        entriesInViewport.push(element);
      }
    })
    getELementsInViewport(entriesInViewport);
  }

  handleLoadMore = () => {
    const { root, targetElementClassName, loadMore } = this.props;
    loadMore();
    // 加载更多数据后，需要重新设置需要监听的元素
    this.initObserver(root, targetElementClassName);
  }

  render() {
    const {
      children,
      element,
      hasMore,
      initialLoad,
      isReverse,
      loader,
      pageStart,
      getScrollParent,
      threshold,
      useCapture,
      useWindow,
    } = this.props;

    return (
      <InfiniteScroller
        loadMore={this.handleLoadMore}
        element={element}
        hasMore={hasMore}
        initialLoad={initialLoad}
        isReverse={isReverse}
        loader={loader}
        pageStart={pageStart}
        getScrollParent={getScrollParent}
        threshold={threshold}
        useCapture={useCapture}
        useWindow={useWindow}
      >
        {children}
      </InfiniteScroller>
    )
  }
}
