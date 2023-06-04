import * as api from '../data/api.js'

const endPoints = {

    'ideas': 'data/ideas?select=_id%2Ctitle%2Cimg&sortBy=_createdOn%20desc',
    'create': 'data/ideas',
    'details': 'data/ideas/',
    'delete': 'data/ideas/'
}

export async function getAllIdeas() {

    return api.get(endPoints.ideas)

}
export async function createIdea(ideaData) {
    return api.post(endPoints.create, ideaData)
}

export async function getDetails(id) {
    return api.get(endPoints.details + id)
}

export async function deleteIdea(id) {
    return api.deleted(endPoints.delete + id)
}