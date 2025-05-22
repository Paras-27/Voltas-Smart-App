// import React, { useContext } from "react";

import { Routes, Route} from "react-router-dom";
import Energy from "./component/Energy";
import Login from "./component/Login";
import SignUp from "./component/Signup";
import Header from "./component/header";
import Footer from "./component/footer";
import Home from "./component/Home";
import Aimode from "./component/ai/Ai";
import Achealthsuccess from "./component/health/success";
import AChealthwarning from "./component/health/warning";
import AChealthcritical from "./component/health/critical";
import AChealth from "./component/health/header";


function App() {
  return (
    <div className="app-container">
      <div className="content-wrapper bg-blue-100">
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/energy" element={<Energy />} />
          <Route path="/ai" element={<Aimode />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<Login />} />
          <Route path="/pred1" element={<Achealthsuccess />} />
          <Route path="/pred2" element={<AChealthwarning />} />
          <Route path="/pred3" element={<AChealthcritical/>} />
          <Route path="/pred" element={<AChealth/>} />
          {/* <Route path="/about" element={<About />} /> */}
        </Routes>
      </div>
      <Footer />
    </div>
  );
}

export default App;
