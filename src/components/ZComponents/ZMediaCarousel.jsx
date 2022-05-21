import clsx from 'clsx';
import { nanoid } from 'nanoid';
import React, { useLayoutEffect, useState } from 'react';
import ZmIcon from './ZmIcon';

/**
 * @template DataItem
 * @typedef {{id: string | number, data: DataItem}} SliderItem
 */

/**
 * @template DataItem
 * @param {DataItem[]} dataList
 * @returns {SliderItem<DataItem>[]}
 */
export const createSlideList = (dataList) => {
  return dataList.map((data) => ({
    id: nanoid(),
    data,
  }));
};

/**
 * @template DataItem
 * @param {{
 *  type?: 'default' | 'overlap';
 *  dataSource: SliderItem<DataItem>[];
 *  renderItem: (item: DataItem, index?: number) => React.ReactNode;
 *  numberOfShowSlides?: number;
 *  autoPlay?: boolean;
 *  skeleton?: boolean;
 * }} _props
 */
export default function ZMediaCarousel({
  type: carouselType = 'default',
  dataSource,
  renderItem,
  numberOfShowSlides = 3,
  autoPlay = true,
  skeleton = false,
}) {
  const numberOfItems = dataSource.length;
  const [activeIndex, setActiveIndex] = useState(0);

  const indexList = dataSource.map((_, index) => index);
  const displayIndexes = indexList.concat(indexList).slice(activeIndex, activeIndex + numberOfShowSlides);

  // for debug only
  // autoPlay = false;
  // console.log(displayIndexes);
  // debugger;

  /**
   * @param {number} step
   */
  const navigateTo = (step) => {
    setActiveIndex((previousIndex) => {
      const targetIndex = (previousIndex + step + numberOfItems) % numberOfItems;
      return targetIndex;
    });
  };

  const goToPrevSlide = () => {
    navigateTo(-1);
  };

  const goToNextSlide = () => {
    navigateTo(1);
  };

  useLayoutEffect(() => {
    if (!autoPlay) return;

    const autoPlayInterval = setInterval(() => {
      // console.log('tick');
      goToNextSlide();
    }, 3000);

    return () => clearInterval(autoPlayInterval);
  }, [autoPlay]);

  return (
    <div className={clsx('zm-gallery', { [`style-${carouselType}`]: carouselType === 'overlap' })}>
      <div className="zm-gallery-prev">
        <button className="zm-button zm-gallery-control-btn" onClick={goToPrevSlide}>
          {/* <i className="fa-solid fa-chevron-left"></i> */}
          <ZmIcon className="ic-go-left" />
        </button>
      </div>

      <div className="zm-gallery__content">
        {dataSource.map((item, index) => {
          const position = displayIndexes.indexOf(index);
          const isShow = position !== -1;
          const isFront = position > 0 && position < numberOfShowSlides - 1;

          let itemStyle;

          switch (carouselType) {
            case 'overlap':
              const subtract = numberOfShowSlides - position - 1;
              const scaleRatio = 1 - subtract * 0.1; // 0.8; 0.9; 1;

              itemStyle = {
                ...(isShow && {
                  transform: `scale(${scaleRatio}) translateX(${-subtract * 10}%)`,
                  // right: `${subtract * 10}%`,
                  zIndex: `${position + 2}`,
                }),
              };
              break;

            default:
              itemStyle = {
                width: `${100 / numberOfShowSlides}%`,
                ...(isShow && {
                  left: `${(position / numberOfShowSlides) * 100}%`,
                  zIndex: isFront ? 9 : 1,
                }),
              };
              break;
          }
          return (
            <div className={clsx('zm-gallery__slide', isShow ? 'show' : 'hide')} key={item.id} style={itemStyle}>
              <div className="zm-gallery__slide-inner">{renderItem(item.data)}</div>
            </div>
          );
        })}
      </div>

      <div className="zm-gallery-next">
        <button className="zm-button zm-gallery-control-btn" onClick={goToNextSlide}>
          {/* <i className="fa-solid fa-chevron-right"></i> */}
          <ZmIcon className="ic-go-right" />
        </button>
      </div>
    </div>
  );
}
