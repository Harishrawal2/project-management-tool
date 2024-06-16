import Project from '../models/Project.js'

export const createProject = async (req, res) => {
    const { name, description, start_date, end_date } = req.body;
    try {
        const nawProject = new Project({
            name,
            description,
            start_date,
            end_date,
        })
        const savedProject = await nawProject.save()
        res.status(201).json({ msg: 'Project created successfully', savedProject })

    } catch (err) {
        console.log(err.message);
        res.status(500).json({ msg: 'Internal Server Error' });
    }
}