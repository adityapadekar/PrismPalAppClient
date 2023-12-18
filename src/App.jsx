import { Route } from "react-router-dom";

// import components
import { HomePage } from "./Pages/HomePage";
import { ChatPage } from "./Pages/ChatPage";
import { EmailVerification } from "./Pages/EmailVerification";

function App() {
    return (
        <>
            <div className="w-full min-h-screen flex justify-center  blue_gradient">
                <Route path="/" component={HomePage} exact />
                <Route path="/chats" component={ChatPage} />
                <Route
                    path="/emailVerification/:id/:token"
                    component={EmailVerification}
                />
            </div>
        </>
    );
}

export default App;
