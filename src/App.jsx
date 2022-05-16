import { pathKeys } from '@/constants';
import ArtistDetailPage from '@/features/Artist/pages/ArtistDetailPage';
import Personal from '@/features/User/pages/Personal';
import AppLayout from '@/layouts/MainAppLayout';
import Home from '@/pages/Home';
import Search from '@/pages/Search';
import '@/styles/AppMain.less';
import { Helmet } from 'react-helmet-async';
import { Navigate, Route, Routes } from 'react-router-dom';
import { WEBSITE_TITLE } from '@/constants/common';
import ZmQueryErrorBoundary from './components/ZmQueryErrorBoundary';

export default function App() {
  return (
    <div className="App">
      <Helmet>
        <title>{WEBSITE_TITLE}</title>
      </Helmet>

      <ZmQueryErrorBoundary>
        <AppLayout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/mymusic/*" element={<Personal />} />
            <Route path="/artist/:artistId" element={<ArtistDetailPage />} />
            <Route path={pathKeys.SEARCH} element={<Search />} />

            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </AppLayout>
      </ZmQueryErrorBoundary>
    </div>
  );
}
