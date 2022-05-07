import '@/styles/AppMain.less';
import { Navigate, Route, Routes } from 'react-router-dom';
import { pathKeys } from './constants';
import DetailAuthor from './features/Author/pages/AuthorDetail';
import Personal from './features/User/pages/Personal';
import MainAppLayout from './layouts/MainAppLayout';
import Home from './pages/Home';
import Search from './pages/Search';
import { Helmet } from 'react-helmet';

export default function App() {
  return (
    <div className="App">
      <Helmet>
        <title>Nova MP3</title>
      </Helmet>

      <MainAppLayout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/mymusic/*" element={<Personal />} />
          <Route path="/author/:authorId" element={<DetailAuthor />} />
          <Route path={pathKeys.SEARCH} element={<Search />} />

          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </MainAppLayout>
    </div>
  );
}
