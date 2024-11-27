import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./Home";
import Detail from "./Detail";

function Routers(){
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home />}/>
                <Route path="/:coinID/*" element={<Detail />}/>
            </Routes>
        </BrowserRouter>
    );
};

export default Routers;