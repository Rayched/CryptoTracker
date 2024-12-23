import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./Routes/Home";
import Details from "./Routes/Details/Details";

function Routers(){
    return (
        <BrowserRouter basename={process.env.PUBLIC_URL}>
            <Routes>
                <Route path="/" element={<Home />}/>
                <Route path="/:coinID/*" element={<Details />}/>
            </Routes>
        </BrowserRouter>
    );
};

export default Routers;