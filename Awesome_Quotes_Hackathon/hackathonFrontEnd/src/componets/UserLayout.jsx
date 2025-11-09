import { Outlet } from "react-router"
import Navbar from "./Navbar"

function UserLayout() {
    return <div>
        <Navbar />
        <Outlet />
    </div>
}
export default UserLayout