import { BrowserRouter as Router, Routes, Route} from "react-router-dom";
import Login from "./pages/Login";
import Protected from "./routes/ProtectedRoute";
import Dashboard from "./pages/Dashboard";

function App() {
    const token = localStorage.getItem('token');

    return (
      <Router>
          <Routes>
              <Route path="/"   element={<Login />} />
              <Route path="/Login"   element={<Login />} />
              <Route path="/Dashboard"   element={
                  <Protected isLoggedIn={(token && token !== '')}>
                      <Dashboard />
                  </Protected>
              } />
          </Routes>
      </Router>
    );
}

export default App;
