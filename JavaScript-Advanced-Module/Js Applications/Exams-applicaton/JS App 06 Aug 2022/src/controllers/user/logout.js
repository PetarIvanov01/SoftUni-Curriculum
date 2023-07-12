import { logout } from "../../auth/userService.js";

export async function logoutController(ctx) {
    try {
        await logout();
        ctx.page.redirect('/');

    } catch (error) {
        alert(error.message)
        throw error;
    }
}