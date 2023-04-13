import { Helmet } from 'react-helmet-async';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';

import { WEBSITE_TITLE } from '@/constants/common';
import AppLayout from '@/layouts/MainAppLayout';
import ZmQueryErrorBoundary from './components/ZmQueryErrorBoundary';
import AppRoutes from './routes';

import '@/styles/AppMain.less';

export default function App() {
  return (
    <div className="App">
      <Helmet>
        <title>{WEBSITE_TITLE}</title>
      </Helmet>

      <ZmQueryErrorBoundary>
        <AppLayout>
          <AppRoutes />
        </AppLayout>
      </ZmQueryErrorBoundary>

      <ToastContainer limit={2} />
    </div>
  );
}
