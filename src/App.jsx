import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import Body from "./Body";
import Profile from "./pages/Profile";
import { Provider } from "react-redux";
import appStore from "./utils/appStore";
import Feed from "./pages/Feed";
import Connection from "./pages/Connection";
import ReviewRequest from "./pages/ReviewRequest";

function App() {
  return (
    <>
      <Provider store={appStore}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Body />}>
              <Route path="/" element={<Feed />} />
              <Route path="/login" element={<Login />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/connection" element={<Connection />} />
              <Route path="/request" element={<ReviewRequest />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </Provider>
    </>
  );
}

export default App;
