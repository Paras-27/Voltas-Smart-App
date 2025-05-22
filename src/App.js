// import React, { useContext } from "react";

import { Routes, Route} from "react-router-dom";
import Energy from "./component/Energy";
import Login from "./component/Login";
import SignUp from "./component/Signup";
// import Header from "./component/header";
import Footer from "./component/footer";
import Home from "./component/Home";


function App() {
  return (
    <div className="app-container">
      <div className="content-wrapper">
        {/* <Header /> */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/energy" element={<Energy />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<Login />} />
          {/* <Route path="/about" element={<About />} /> */}
        </Routes>
      </div>
      <Footer />
    </div>
  );
}

export default App;
