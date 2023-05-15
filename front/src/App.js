import { BrowserRouter, Routes, Route } from "react-router-dom";

import GalleryPage from "./pages/GalleryPage/galleryPage";
import AuthPage from "./pages/AuthPage/authPage";
import ProfilePage from "./pages/ProfilePage/profilePage";
import ExportPage from "./pages/ExportPage/exportPage";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<GalleryPage />} />
        <Route path="auth" element={<AuthPage />} />
        <Route path="profile" element={<ProfilePage />} />
        <Route path="export" element={<ExportPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;