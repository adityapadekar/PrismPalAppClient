import { Route } from "react-router-dom";

// import components
import { HomePage } from "./Pages/HomePage";
import { ChatPage } from "./Pages/ChatPage";
import { EmailVerification } from "./Pages/EmailVerification";

function App() {
    return (
        <>
            <div className="w-full min-h-screen flex justify-center  blue_gradient">
                <Route path="/" component={HomePage} exact rel="noreferrer" />
                <Route path="/chats" component={ChatPage} rel="noreferrer" />
                <Route
                    path="/emailVerification/:id/:token"
                    component={EmailVerification}
                    rel="noreferrer"
                />
            </div>
        </>
    );
}

export default App;
