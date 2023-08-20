import { Outlet } from "react-router-dom";
import NotAuthorized from "../Errors/NotAuthorize";

export default function IsGuest({ user }) {

    return user ? <Outlet /> : <NotAuthorized />
}