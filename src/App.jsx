import '@/styles/AppMain.less';
import PlayerBar from './components/PlayerBar';
import MusicAppLayout from './layouts/MusicAppLayout';

export default function App() {
  return (
    <div className="App">
      <MusicAppLayout>Main Content</MusicAppLayout>
    </div>
  );
}
