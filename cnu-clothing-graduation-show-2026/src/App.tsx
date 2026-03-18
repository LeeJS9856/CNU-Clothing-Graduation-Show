import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Main from './pages/Main/Main';

const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Main />} />
                //경로와 페이지 입력
            </Routes>
        </Router>
    );
};

export default App