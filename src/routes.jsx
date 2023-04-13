import React, { Suspense } from 'react';

import { pathKeys } from '@/constants';
import UnderConstruction from '@/pages/UnderConstruction';
import { Navigate, Route, Routes } from 'react-router-dom';

const Home = React.lazy(() => import('@/pages/Home'));
const Personal = React.lazy(() => import('@/features/User/pages/Personal'));
const ArtistDetails = React.lazy(() => import('@/features/Artist/pages/ArtistDetailPage'));
const Search = React.lazy(() => import('@/pages/Search'));

const wrapLazyInSuspense = (element) => {
  return <Suspense>{element}</Suspense>;
};

/**
 * @param {import('react-router-dom').RouteProps} props
 * */
const suspenseRoute = ({ element, ...props }) => {
  return <Route {...props} element={element} />;
};

export default function AppRoutes() {
  return (
    <Suspense>
      <Routes>
        {suspenseRoute({ path: '/', element: <Home /> })}
        {suspenseRoute({ path: '/artist/:artistId', element: <ArtistDetails /> })}
        {suspenseRoute({ path: pathKeys.SEARCH, element: <Search /> })}
        {suspenseRoute({ path: '/mymusic/*', element: <Personal /> })}

        <Route path={pathKeys.ZING_CHART} element={<UnderConstruction />} />
        <Route path={pathKeys.RADIO} element={<UnderConstruction />} />
        <Route path={pathKeys.FOLLOW} element={<UnderConstruction />} />
        <Route path={pathKeys.LATEST_SONGS} element={<UnderConstruction />} />
        <Route path={pathKeys.GENRE} element={<UnderConstruction />} />
        <Route path={pathKeys.TOP100} element={<UnderConstruction />} />
        <Route path={pathKeys.MV} element={<UnderConstruction />} />

        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Suspense>
  );
}
