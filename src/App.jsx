import '@/styles/AppMain.less';
import { Route, Routes } from 'react-router-dom';
import AuthorDetailPage from './features/Author/pages/AuthorDetail';
import PersonalPage from './features/User/pages/Personal';
import MainAppLayout from './layouts/MainAppLayout';
import Home from './pages/Home';
import DiscoverPage from './pages/Home';

export default function App() {
  return (
    <div className="App">
      <MainAppLayout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/author/:authorId" element={<AuthorDetailPage />} />
          <Route path="/mymusic/*" element={<PersonalPage />} />
        </Routes>
      </MainAppLayout>
    </div>
  );
}
