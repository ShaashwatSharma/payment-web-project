import {
  BrowserRouter,
  Route,
  Routes,
} from "react-router-dom";
// import { Privateroute } from "./authorisation/Privateroute";
import { Signin } from "./pages/Signin";
import { Dashboard } from "./pages/Dashboard";
import { Sendmoney } from "./pages/Sendmoney";
import { Signup } from "./pages/Signup";

function App() {

  return (
    <>
      <BrowserRouter>
      <Routes>
        <Route path="/signup" element ={<Signup/>} />
        <Route path="/signin" element ={<Signin/>} />
        <Route path="/dashboard" element ={<Dashboard/>} />
        <Route path="/send" element ={<Sendmoney/>} />
      </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
