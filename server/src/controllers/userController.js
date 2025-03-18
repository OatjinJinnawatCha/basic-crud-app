const userService = require('../services/userService');

const getAllUsers = async (req, res) => {
    try {
        const users = await userService.getAllUsers();
        res.status(200).json({ data: users });
    } catch (error) {
        console.error('Error fetching users:', error);
        res.status(500).json({ error: 'Failed to fetch users' });
    }
};
const getUserById = async (req, res) => {
    const id = req.query.id;
    if (!id) {
        return res.status(400).json({ error: 'Missing required parameter: id' });
    }
    try {
        const user = await userService.getUserById(Number(id));
        if (user) {
            res.status(200).json({ data: user });
        } else {
            res.status(404).json({ error: 'User not found' });
        }
    }
    catch (error) {
        console.error('Error fetching user:', error);
        res.status(500).json({ error: 'Failed to fetch user' });
    }
};
const createUser = async (req, res) => {
    const { name, jobPosition, description } = req.body;
    if (!name || !jobPosition || !description) {
        return res.status(400).json({ error: 'Missing required parameters: name, jobPosition, description' });
    }
    try {
        const newUser = await userService.createUser({ name, jobPosition, description });
        if (newUser) {
            res.status(201).json({ data: newUser });
        } else {
            res.status(500).json({ error: 'Failed to create user' });
        }
    }
    catch (error) {
        console.error('Error creating user:', error);
        res.status(500).json({ error: 'Failed to create user' });
    }
};
const updateUser = async (req, res) => {
    const id = req.query.id;
    if (!id) {
        return res.status(400).json({ error: 'Missing required parameter: id' });
    }
    const { name, jobPosition, description } = req.body;
    if (!name && !jobPosition && !description) {
        return res.status(400).json({ error: 'No update data provided' });
    }
    try {
        // Adding updatedDate with current timestamp
        const updateData = {
            name,
            jobPosition,
            description,
            updatedDate: new Date() // Add current timestamp
        };

        const updatedUser = await userService.updateUser(Number(id), updateData);
        if (updatedUser) {
            res.status(200).json({ data: updatedUser });
        } else {
            res.status(404).json({ error: 'User not found' });
        }
    }
    catch (error) {
        console.error('Error updating user:', error);
        res.status(500).json({ error: 'Failed to update user' });
    }
};
const deleteUserById = async (req, res) => {
    const id = req.query.id;
    if (!id) {
        return res.status(400).json({ error: 'Missing required parameter: id' });
    }
    try {
        const deleted = await userService.deleteUserById(Number(id));
        if (deleted) {
            res.status(200).json({ message: 'User deleted successfully' });
        } else {
            res.status(404).json({ error: 'User not found' });
        }
    }
    catch (error) {
        console.error('Error deleting user:', error);
        res.status(500).json({ error: 'Failed to delete user' });
    }
}
const deleteUserByIds = async (req, res) => {
    const ids = req.body.ids;
    if (!Array.isArray(ids) || ids.length === 0) {
        return res.status(400).json({ error: 'Invalid input. ids must be an array and not empty' });
    }
    try {
        const deleted = await userService.deleteUserByIds(ids);
        if (deleted) {
            res.status(200).json({ message: 'Users deleted successfully' });
        } else {
            res.status(404).json({ error: 'Users not found' });
        }
    }
    catch (error) {
        console.error('Error deleting users:', error);
        res.status(500).json({ error: 'Failed to delete users' });
    }
}

module.exports = {
    getAllUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUserById,
    deleteUserByIds
}