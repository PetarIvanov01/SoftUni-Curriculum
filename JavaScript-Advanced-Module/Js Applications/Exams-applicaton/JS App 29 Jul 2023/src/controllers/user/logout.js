import { logout } from "../../api/auth.js";

export function logoutController(ctx) {
    try {
        logout();
        alert('You are logged out!');
        ctx.page.redirect('/')

    } catch (error) {
        alert(error);
        throw error;
    }
}