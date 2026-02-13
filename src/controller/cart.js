const Cart = require("../model/cart");

const createrUserCart = async (req, res) => {
    try {
        const { pickUpLocation, item = [], itemOne = [] } = req.body;
        const id = req.user;

        if (!pickUpLocation) {
            return res.status(400).json({
                message: "Pick up location is required",
            });
        }

        if (!Array.isArray(item) || !Array.isArray(itemOne)) {
            return res.status(400).json({
                message: "item and itemOne must be arrays",
            });
        }

  
        let owner = await Cart.findOne({ userId: id._id });

        if (!owner) {
            owner = await Cart.create({
                userId: id._id,
                pickUpLocation,
                item,
                itemOne,
            });
        } else {
            // owner.pickUpLocation = pickUpLocation;

            item.forEach((newItem) => {
                const existing = owner.item.find(
                    (i) => i.imagery === newItem.imagery
                );

                if (existing) {
                    existing.quantity += newItem.quantity || 1;
                } else {
                    owner.item.push(newItem);
                }
            });

           
            itemOne.forEach((newItem) => {
                const existing = owner.itemOne.find(
                    (i) => i.imagery === newItem.imagery
                );

                if (existing) {
                    existing.quantity += newItem.quantity || 1;
                } else {
                    owner.itemOne.push(newItem);
                }
            });

            await owner.save(); 
        }

        return res.status(200).json({
            message: "Cart updated successfully",
            cart: owner,
        });
    } catch (error) {
        console.error("Error creating cart:", error);

        return res.status(500).json({
            message: "An error occurred",
            err: error.message,
        });
    }
};



module.exports = {
    createrUserCart,
};
