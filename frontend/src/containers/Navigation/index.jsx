import { Routes, Route } from "react-router-dom";
import DDBPage from "../../pages/Ddb";
import ChatGPTPage from "../../pages/Chatgpt";
import HomePage from "../../pages/Home";

const Navigation = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/ddb" element={<DDBPage />} />
      <Route path="/chat" element={<ChatGPTPage />} />
    </Routes>
  );
};
export default Navigation;
