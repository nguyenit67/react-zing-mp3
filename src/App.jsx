import '@/styles/AppMain.less';
import { Route, Routes } from 'react-router-dom';
import MainAppLayout from './layouts/MainAppLayout';
import DiscoverPage from './pages/Home';

export default function App() {
  return (
    <div className="App">
      <MainAppLayout>
        <Routes>
          <Route path="/" element={<DiscoverPage />} />
        </Routes>
      </MainAppLayout>
    </div>
  );
}
