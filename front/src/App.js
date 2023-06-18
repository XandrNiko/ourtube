import { BrowserRouter, Routes, Route } from "react-router-dom";

import GalleryPage from "./pages/GalleryPage/galleryPage";
import AuthPage from "./pages/AuthPage/authPage";
import RegisterPage from "./pages/RegisterPage/registerPage";
import ProfilePage from "./pages/ProfilePage/profilePage";
import ImportPage from "./pages/ImportPage/importPage";

import "./styles/customUIStyles.css"

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<GalleryPage />} />
        <Route path="/auth" element={<AuthPage />} />
        <Route path="/register" element={<RegisterPage/>} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/import" element={<ImportPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;