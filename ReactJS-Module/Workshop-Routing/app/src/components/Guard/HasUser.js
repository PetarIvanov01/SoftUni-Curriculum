import { Outlet } from "react-router-dom";
import NotAuthorized from "../Errors/NotAuthorize";

export default function HasUser({user}) {

    return user ? <NotAuthorized /> : <Outlet />
}