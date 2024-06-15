import mongoose, { Schema } from "mongoose";

const ProjectSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
    },
    start_date: {
        type: Date,
        required: true,
    },
    end_date: {
        type: Date,
        required: true,
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
    },
    team: [{
        type: Schema.Types.ObjectId,
        ref: 'User',
    }],
});

const Project = mongoose.model('Project', ProjectSchema)

export default Project;
