import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Main from './pages/Main/Main';
import AboutPage from './pages/About/AboutPage';
import ArchivePage from './pages/Archive/ArchivePage';
import MagazinePage from './pages/Magazine/MagazinePage';
import WorksPage from './pages/Works/WorksPage';

const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Main />} />
                <Route path="/about" element={<AboutPage />} /> {/* About 페이지 경로와 컴포넌트 연결 */}
                <Route path="/archive" element={<ArchivePage />} /> {/* Archive 페이지 경로와 컴포넌트 연결 */}
                <Route path="/magazine" element={<MagazinePage />} /> {/* Magazine 페이지 경로와 컴포넌트 연결 */}
                <Route path="/works" element={<WorksPage />} /> {/* Works 페이지 경로와 컴포넌트 연결 */}
            </Routes>
        </Router>
    );
};

export default App