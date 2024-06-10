import { NavLink } from "react-router-dom";
import Addclasses from "../Addclasses/Addclasses";


const Teacherprofile = () => {
    return (
        <div>
            <div className="flex flex-row">
                <div className="h-screen w-40 bg-base-200">
                    <NavLink to="/teacherprofile" className="btn btn-block bg-black">Teachar profile</NavLink>
                    <NavLink to="/studentprofile" className="btn btn-block bg-black">Student profile</NavLink>                  
                    <NavLink to="/myaddedclasses" className="btn btn-block bg-blue-200">My added classes</NavLink>
                    <NavLink to="/myenrolledstudents" className="btn btn-block bg-blue-200">My Enrolled students</NavLink>
                </div>
                <div className="flex w-full justify-center items-center"><Addclasses></Addclasses></div>
            </div>
        </div>
    );
};

export default Teacherprofile;