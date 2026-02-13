const Cart = require("../model/cart");

const createrUserCart = async (req, res) => {
    try {
        const { pickUpLocation, item = [], itemOne = [] } = req.body;

        if (!req.user) {
            return res.status(401).json({
                message: "User not authenticated",
            });
        }

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


const updateCartItemQuantity = async (req, res) => {
    try {
        const { cartItemId, type } = req.body; 
        const userId = req.user._id;

        const cart = await Cart.findOne({ userId });

        if (!cart) return res.status(404).json({ message: 'Cart not found' });

       
        let item = cart.item.find(i => i._id.toString() === cartItemId);
        
        if (!item) {
            item = cart.itemOne.find(i => i._id.toString() === cartItemId);
        }

        if (!item) return res.status(404).json({ message: 'Item not found' });

       
        if (type === 'plus') item.quantity += 1;
        if (type === 'minus') item.quantity = Math.max(1, item.quantity - 1);

      
        item.sum = item.price * item.quantity;
        item.totalPrice = item.sum;

       
        const itemTotal = cart.item.reduce((acc, i) => acc + (i.totalPrice || 0), 0);
        const extraTotal = cart.itemOne.reduce((acc, i) => acc + (i.totalPrice || 0), 0);
        cart.cartTotal = itemTotal + extraTotal;

        await cart.save();

        return res.status(200).json({ message: 'Cart updated', cart });

    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Error updating cart' });
    }
};



module.exports = {
    createrUserCart,
    updateCartItemQuantity
};
