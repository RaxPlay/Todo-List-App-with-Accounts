import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom"
import axios from "axios"
import { Home } from "./Pages/Home"
import { Login } from "./Pages/Login"
import { Register } from "./Pages/Register"
import { NavBar } from "./Components/NavBar"
import { useEffect, useState } from "react"
import "./Styles/app.css"

axios.defaults.withCredentials = true;

export const App = () => {
  const [user, setUser] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true)

  useEffect(() => {
		const fetchUser = async () => {
			try {
				const res = await axios.get("/api/auth/me");
				setUser(res.data);
			} catch (err) {
				setUser(null);
			} finally {
				setLoading(false);
			}
		};
		fetchUser();
	}, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <Router>
      <NavBar user={user} setUser={setUser}/>

      <Routes>
        <Route path="/home" element={<Home/>}></Route>
        <Route path="/login" element={<Login setUser={setUser}/>}></Route>
        <Route path="/register" element={<Register setUser={setUser}/>}></Route>
        <Route path="/*" element={ <Navigate to='/home'/>}></Route>
      </Routes>
    </Router>
  )
}
