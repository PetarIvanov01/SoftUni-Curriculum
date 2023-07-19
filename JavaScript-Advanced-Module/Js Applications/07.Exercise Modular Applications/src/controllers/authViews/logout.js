import { logout } from "../../user/auth.js";

export async function logoutController(ctx) {
    await logout();
    alert('Logged out!');
    ctx.page.redirect('/');
}