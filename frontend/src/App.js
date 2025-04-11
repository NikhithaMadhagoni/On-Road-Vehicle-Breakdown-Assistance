import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Components/Home";
import Register from "./Components/Register";
import Login from "./Components/Login";
import UserRegistration from "./Components/User-registration";
import SPRegistartion from "./Components/Service-provider-registration";
import UserDashboard from "./Components/userDashboard";
import ProviderDetails from './Components/ProviderDetails';

function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/user-registration" element={<UserRegistration />} />
          <Route path="/ServiceProvider-Registration" element={<SPRegistartion />} />
          <Route path="/userDashboard" element={<UserDashboard />} />
          <Route path="/provider/:id" element={<ProviderDetails />} />
        </Routes>
      </Router>
    </div>
  )
}

export default App;
