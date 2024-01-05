import { Routes, Route } from "react-router-dom";

// import components
import { HomePage } from "./Pages/HomePage";
import { ChatPage } from "./Pages/ChatPage";
import { EmailVerification } from "./Pages/EmailVerification";

function App() {
    return (
        <>
            <div className="w-full min-h-screen flex justify-center  blue_gradient">
                <Routes>
                    <Route path="/" element={<HomePage />} exact />
                    <Route path="/chats" element={<ChatPage />} />
                    <Route
                        path="/emailVerification/:id/:token"
                        element={<EmailVerification />}
                    />
                </Routes>
            </div>
        </>
    );
}

export default App;
