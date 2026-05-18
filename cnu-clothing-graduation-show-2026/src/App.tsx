import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Main from './pages/Main/Main';
import AboutPage from './pages/About/AboutPage';
import ArchivePage from './pages/Archive/ArchivePage';
import MagazinePage from './pages/Magazine/MagazinePage';
import WorksPage from './pages/Works/WorksPage';

// Works 하위 카테고리 페이지들
import BrandingPage from './pages/Works/Branding/BrandingPage';
import MagazinePage from './pages/Works/Magazine/MagazinePage';
import RealCraftPage from './pages/Works/Clothing/RealCraftPage';
import DigitalClothingPage from './pages/Works/Clothing/DigitalClothingPage';
import TraditionalPage from './pages/Works/Traditional/TraditionalPage';
import FashionDesignPage from './pages/Works/FashionDesign/FashionDesignPage';
import SmartTextilePage from './pages/Works/SmartTextile/SmartTextilePage';

const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Main />} />
                <Route path="/about" element={<AboutPage />} /> {/* About 페이지 경로와 컴포넌트 연결 */}
                <Route path="/archive" element={<ArchivePage />} /> {/* Archive 페이지 경로와 컴포넌트 연결 */}
                <Route path="/magazine" element={<MagazinePage />} /> {/* Magazine 페이지 경로와 컴포넌트 연결 */}
                <Route path="/works" element={<WorksPage />} /> {/* Works 페이지 경로와 컴포넌트 연결 */}
                {/* Works 하위 카테고리 라우트 */}
                <Route path="/works/branding" element={<BrandingPage />} />
                <Route path="/works/magazine" element={<MagazinePage />} />
                <Route path="/works/clothing/real" element={<RealCraftPage />} />
                <Route path="/works/clothing/digital" element={<DigitalClothingPage />} />
                <Route path="/works/traditional" element={<TraditionalPage />} />
                <Route path="/works/fashion-design" element={<FashionDesignPage />} />
                <Route path="/works/smart-textile" element={<SmartTextilePage />} />
            </Routes>
        </Router>
    );
};

export default App