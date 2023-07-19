import * as api from "../service/api.js"

const endpoints = {
    //- Get for catalog
    allList: '/data/teams',

    //- Get for catalog (if pagination modify query params)
    allMembers: '/data/members?where=status%3D%22member%22',

    //-	List of all members in particular teams 
    allMembersInCurrentTeam: (teamsId) => {
        const querryString = teamsId.map(i => i = `"${i}"`).join(',');
        const encodedString = encodeURIComponent(`where=teamId%20IN%20(${encodeURIComponent(querryString)})%20AND%20status=member`);
        console.log(querryString);
        return `/data/members?${encodedString}`
    },

    //- Post for create new team (Note that when a new team is created, the owner is not automatically added)
    createTeam: '/data/teams',

    //- Put for edit 
    editTeam: (id) => `/data/teams/${id}`,

    //- Get for load the edited team
    getTeamDetails: (id) => `/data/teams/${id}`,

    //-	Get a list of all memberships (both members and pending requests)
    //return arr
    getAllMemberships: (teamId) => `/data/members?where=teamId%3D%22${teamId}%22&load=user%3D_ownerId%3Ausers`,

    //- Request to become a member (body contains only teamId as property)
    becomeMembReq: '/data/members',

    //- Approve membership (update request by changing status to "member")
    // PUT /data/members/:id
    approveMemReq: (id) => `/data/members/${id}`,

    //- Cancel request/leave team (user)
    // DELETE /data/members/:id
    leaveTeam: (userId) => `/data/members/${userId}`,

    //Decline request/remove member from team (owner)
    removeMember: (userId) => `/data/members/${userId}`,

    /*------------Querie for My Teams ----------- */

    //Get all teams where user is a member
    getAllWhereMember: (userId) => `/data/members?where=_ownerId%3D%22${userId}%22%20AND%20status%3D%22member%22&load=team%3DteamId%3Ateams`,
}


export async function getAllTeams() {
    return await api.get(endpoints.allList);
}

export async function getAllMembers() {
    return await api.get(endpoints.allMembers);
}

export async function getTeamDetails(teamId) {
    return await api.get(endpoints.getTeamDetails(teamId));
}

export async function getAllTeamMembers(teamId) {
    return await api.get(endpoints.getAllMemberships(teamId))
}

export async function becomeMembReq(teamId) {
    return await api.post(endpoints.becomeMembReq, { teamId })
}

export async function cancelMembReq(id) {
    return await api.del(endpoints.leaveTeam(id));
}

export async function approveByOwner(id, member) {
    return await api.put(endpoints.approveMemReq(id), member);
}

export async function createTeamReq(data) {
    return await api.post(endpoints.createTeam, data)
}