const Menu = require('../model/menu');

const createMenu = async (req, res) => {
    try {
        const { name, price, image, description, subMenu } = req.body;

        if (!name || !price || !image || !description) {
            return res.status(400).json({ message: 'Name, price, and image are required' });
        }

        if (!subMenu || subMenu.length === 0) {
            return res.status(400).json({ message: 'subMenu is required and cannot be empty' });
        }

        const fields = {
            name,
            price,
            image,
            description,
            subMenu
        };

        const meal = await Menu.create(fields);

        return res.status(201).json({
            message: 'Meal created successfully',
            meal
        });

    } catch (error) {
        console.error('Error creating menu:', error);
        return res.status(500).json({
            message: 'An error occurred',
            err: error.message
        });
    }
};




module.exports = {
    createMenu
};
