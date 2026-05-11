import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Main from './pages/Main/Main';
import AboutPage from './pages/About/AboutPage';

const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Main />} />
                <Route path="/about" element={<AboutPage />} /> {/* About 페이지 경로와 컴포넌트 연결 */}
                //경로와 페이지 입력
            </Routes>
        </Router>
    );
};

export default App