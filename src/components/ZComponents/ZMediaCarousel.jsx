import clsx from 'clsx';
import React, { useEffect, useState } from 'react';

/**
 * @template ItemType
 * @typedef {{id: string | number, data: ItemType}} SliderItem
 */

/**
 * @template ItemType
 * @param {{
 *  dataSource: SliderItem<ItemType>[];
 *  renderItem: (item: ItemType, index?: number) => React.ReactNode;
 *  numberOfShowSlides?: number;
 * }} _props
 */
export default function ZMediaCarousel({ dataSource, renderItem, numberOfShowSlides = 3 }) {
  const [activeIndex, setActiveIndex] = useState(0);

  const indexList = dataSource.map((_, index) => index);
  const displayIndexes = indexList.concat(indexList).slice(activeIndex, activeIndex + numberOfShowSlides);

  // console.log(displayIndexes);
  // debugger;

  useEffect(() => {}, []);

  const navigateTo = (step) => {
    const targetIndex = (activeIndex + step + dataSource.length) % dataSource.length;
    setActiveIndex(targetIndex);
  };

  const goPrev = () => {
    navigateTo(-1);
  };

  const goNext = () => {
    navigateTo(1);
  };

  return (
    <div className="zm-gallery">
      <div className="zm-gallery-prev">
        <button className="zm-button zm-gallery-control-btn" onClick={goPrev}>
          <i className="fa-solid fa-chevron-left"></i>
        </button>
      </div>

      <div className="zm-gallery__content">
        {dataSource.map((item, index) => {
          const position = displayIndexes.indexOf(index);
          const isShow = position !== -1;
          const isFront = position > 0 && position < numberOfShowSlides - 1;
          return (
            <div
              className={clsx('zm-gallery__slide', isShow ? 'show' : 'hide')}
              key={item.id}
              style={
                isShow
                  ? {
                      transform: `scale(1) translateX(${position * 100}%)`,
                      width: `${100 / numberOfShowSlides}%`,
                      zIndex: isFront ? 9 : 1,
                    }
                  : {}
              }
            >
              <div className="zm-gallery__slide-inner">{renderItem(item.data)}</div>
            </div>
          );
        })}
      </div>

      <div className="zm-gallery-next">
        <button className="zm-button zm-gallery-control-btn" onClick={goNext}>
          <i className="fa-solid fa-chevron-right"></i>
        </button>
      </div>
    </div>
  );
}
