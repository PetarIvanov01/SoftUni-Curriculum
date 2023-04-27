import { logout } from "../data/users.js";

export async function doLogout(context) {

    await logout();
    context.goto('/');

    alert('You are logged out!')

}