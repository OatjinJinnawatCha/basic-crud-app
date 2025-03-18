const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const getAllUsers = async () => {
    try {
        const users = await prisma.user.findMany();
        return users;
    } catch (error) {
        console.error('Error fetching users:', error);
        return []; // Return an empty array to avoid undefined return values
    }
};
const getUserById = async (id) => {
    try {
        const user = await prisma.user.findUnique({ where: { id: parseInt(id) } });
        return user;
    }
    catch (error) {
        console.error('Error fetching user:', error);
        return null; // Return null to avoid undefined return values
    }
};
const createUser = async (data) => {
    try {
        const newUser = await prisma.user.create({ data });
        return newUser;
    } catch (error) {
        console.error('Error creating user:', error);
        return null; // Return null to avoid undefined return values
    }
};
const updateUser = async (id, data) => {
    try {
        const updatedUser = await prisma.user.update({
            where: { id: parseInt(id) },
            data
        });
        return updatedUser;
    } catch (error) {
        console.error('Error updating user:', error);
        return null; // Return null to avoid undefined return values
    }
};
const deleteUserById = async (id) => {
    try {
        await prisma.user.delete({ where: { id: parseInt(id) } });
        return true;
    } catch (error) {
        console.error('Error deleting user:', error);
        return false;
    }
};
const deleteUserByIds = async (ids) => {
    try {
        await prisma.user.deleteMany({
            where: {
                id: {
                    in: ids.map(id => parseInt(id))
                }
            }
        });
        return true;
    } catch (error) {
        console.error('Error deleting users:', error);
        return false;
    }
};

module.exports = {
    getAllUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUserById,
    deleteUserByIds
}