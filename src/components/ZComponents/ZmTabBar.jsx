import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';

/**
 *
 * @param {{
 *  tabs: {title: string, key: string, className?:string}[]
 *  onChange?: (key: string) => void
 *  className?: string
 *  defaultKey?: string
 *  activeKey?: string
 * }} _props
 */
export default function ZmTabBar({ tabs = [], onChange, className, defaultKey, activeKey }) {
  const [currentKey, setCurrentKey] = useState(activeKey || defaultKey || tabs[0].key);

  const handleClick = (key) => {
    setCurrentKey(key);

    if (onChange) {
      onChange(key);
    }
  };

  return (
    <div className={clsx('zm-tab-bar', className)}>
      {tabs.map(({ title, key, className }) => (
        <div
          key={key}
          className={clsx('zm-tab-bar__item', className, { active: key === currentKey })}
          onClick={() => handleClick(key)}
        >
          {title}
        </div>
      ))}
    </div>
  );
}
