import { Route, Routes, useLocation } from 'react-router-dom';
import './App.css';
import Header from './components/Header';
import Footer from './components/Footer';
import Blog from './components/Blog';
import BlogPost from './components/BlogPost';
import Seo from './components/Seo';
import CinematicHome from './cinematic/CinematicHome';

function App() {
  const location = useLocation();
  const isHome = location.pathname === '/';

  return (
    <div className="App">
      {!isHome && <Header />}
      <Routes>
        <Route
          path="/"
          element={
            <>
              <Seo
                title="Jianyin Roachell — JYR-AI"
                description="Human-centered AI consultant for creatives. The cinematic portfolio of Jianyin Roachell — projects, writing, and bookings."
                type="website"
                name="Jianyin Roachell"
              />
              <CinematicHome />
            </>
          }
        />
        <Route path="/blog" element={<Blog />} />
        <Route path="/blog/:id" element={<BlogPost />} />
      </Routes>
      {!isHome && <Footer />}
    </div>
  );
}

export default App;
