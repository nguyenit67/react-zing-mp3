import clsx from 'clsx';
/**
 * @param {{
 *  className: string;
 *  style?: React.CSSProperties
 * }} ZmIconProps
 */

export default function ZmIcon({ className, style }) {
  return <i className={clsx('ic-zing-icon', className)} style={style} />;
}
