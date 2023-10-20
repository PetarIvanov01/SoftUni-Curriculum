import { Schema, Types, model } from "mongoose";


interface Creature {
    name: string,
    species: string,
    skinColor: string,
    eyeColor: string,
    image: string,
    description: string,
    votes: Array<{ _id: string }>,
    owner: Types.ObjectId
}

const schema = new Schema<Creature>({
    name: {
        type: String,
        required: true
    },
    species: {
        type: String,
        required: true
    },
    skinColor: {
        type: String,
        required: true
    },
    eyeColor: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    votes: {
        type: [Types.ObjectId],
        ref: 'User',
        default: [],
    },
    owner: {
        ref: 'User'
    }

})

schema.index({ email: 1 }, {
    collation: {
        locale: 'en',
        strength: 2
    }
})

const CreatureSchema = model<Creature>('Creature', schema);
export default CreatureSchema