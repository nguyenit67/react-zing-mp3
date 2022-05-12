import { SkeletonTheme } from 'react-loading-skeleton';
import { globalSkeletonTheme } from './MainAppLayout';

/**
 * @param {import('react-loading-skeleton').SkeletonThemeProps} props
 */
export default function ZmSkeletonTheme(props) {
  const nowProps = { ...globalSkeletonTheme, ...props };

  return <SkeletonTheme {...nowProps} />;
}
