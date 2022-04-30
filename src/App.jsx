import '@/styles/AppMain.less';
import { Route, Routes } from 'react-router-dom';
import AuthorDetail from './features/Author/pages/AuthorDetail';
import MainAppLayout from './layouts/MainAppLayout';
import Home from './pages/Home';
import DiscoverPage from './pages/Home';

export default function App() {
  return (
    <div className="App">
      <MainAppLayout>
        <Routes>
          <Route path="/" element={<Home />} />

          <Route path="/author/:authorId" element={<AuthorDetail />} />
        </Routes>
      </MainAppLayout>
    </div>
  );
}
