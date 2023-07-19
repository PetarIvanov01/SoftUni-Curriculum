import { getAllMembers, getAllTeams } from "../service/api-cals.js";

export async function teamMembers(ctx, next) {

    const [items, members] = await Promise.all([getAllTeams(), getAllMembers()]);
    items.map(t => t.members = members.filter(m => m.teamId == t._id));
    ctx.teamMembers = items;
    
    next();
}