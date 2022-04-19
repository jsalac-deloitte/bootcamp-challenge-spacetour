import "./App.css";
import { Route, Routes } from "react-router-dom";
import "animate.css";

import Header from "./Components/shared/Header";
import Home from "./Pages/home/Home";
import Destination from "./Pages/destination/Destination";
import Crew from "./Pages/crew/Crew";
import Technology from "./Pages/technology/Technology";
import Notfound from "./Pages/Notfound";
import Mission from "./Pages/mission/Mission";

function App() {
  return (
    <div className="w-screen relative">
      <div className="w-full  bg-transparent   absolute top-0 lg:mt-5">
        <Header />
      </div>
      <div className="w-full h-screen  ">
        <Routes>
          <Route path="/">
            <Route index element={<Home />} />
            <Route path="destination" element={<Destination />} />
            <Route path="crew" element={<Crew />} />
            <Route path="technology" element={<Technology />} />
            <Route path="mission" element={<Mission />} />
            <Route path="*" element={<Notfound />} />
          </Route>
        </Routes>
      </div>
    </div>
  );
}

export default App;
