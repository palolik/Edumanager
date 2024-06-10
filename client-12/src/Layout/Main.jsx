import { Outlet,useLocation } from "react-router-dom";
import Footer from "../pages/Login/Footer/Footer";
import NavBar from "../pages/Shared/NavBar/NavBar";


const Main = () => {
    const location = useLocation();
    
    // const noHeaderFooter = location.pathname.includes('dashboard') ;
    return (
        <div>
             {/* { noHeaderFooter || <NavBar></NavBar>} */}
             <NavBar></NavBar>
            <Outlet></Outlet>
            <Footer></Footer>
        </div>
    );
};

export default Main;