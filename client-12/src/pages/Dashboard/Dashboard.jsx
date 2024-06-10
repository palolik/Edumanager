import { NavLink } from "react-router-dom";
import MyProfile from "../MyProfile/MyProfile";


const Dashboard = () => {
    return (
        <div>
            <div className="flex flex-row">
                <div className="h-screen w-40 bg-base-200">
                    <NavLink to="/teacherprofile" className="btn btn-block bg-blue-200">Teachar profile</NavLink>
                    <NavLink  to="/dashboard" className="btn btn-block bg-blue-400">Student profile</NavLink>
                    <NavLink className="btn btn-block bg-blue-200" to="/Myenrollments">My Enrollments</NavLink>
                </div>
                <div className="flex w-full justify-center items-center"><MyProfile></MyProfile></div>
            </div>
        </div>
    );
};

export default Dashboard;