import { Routes, Route } from "react-router-dom";
import { HomePage } from "./Pages/HomePage";
import { ChatPage } from "./Pages/ChatPage";
import { PageNotFound } from "./Pages/PageNotFound";
import { EmailVerification } from "./Pages/EmailVerification";
import { ForgotPassword } from "./Pages/ForgotPassword";
import { ResetPassword } from "./Pages/ResetPassword";

function App() {
    return (
        <>
            <div className="w-full min-h-screen flex justify-center  blue_gradient">
                <Routes>
                    <Route path="/" element={<HomePage />} exact />
                    <Route path="/chats" element={<ChatPage />} />
                    <Route
                        path="/email-verification"
                        element={<EmailVerification />}
                    />
                    <Route
                        path="/forgot-password"
                        element={<ForgotPassword />}
                    />
                    <Route path="/reset-password" element={<ResetPassword />} />
                    <Route path="*" element={<PageNotFound />} />
                </Routes>
            </div>
        </>
    );
}

export default App;
