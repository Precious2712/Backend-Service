const mongoose = require("mongoose");
const { Schema } = mongoose;

const cartItemSchema = new Schema({
    imagery: { type: String, required: true },
    price: { type: Number, required: true },
    quantity: { type: Number, default: 1 },
    sum: Number,
    totalPrice: Number,
});

cartItemSchema.pre("save", function () {
    this.sum = this.price * this.quantity;
    this.totalPrice = this.sum;
});

const cartBox = new Schema({
    pickUpLocation: { type: String, required: true },
    userId: { type: Schema.Types.ObjectId, ref: "users", required: true },
    item: [cartItemSchema],
    itemOne: [cartItemSchema],
    cartTotal: { type: Number, default: 0 },
});

cartBox.pre("save", function () {
    const itemTotal = this.item.reduce((acc, i) => acc + (i.totalPrice || 0), 0);
    const extraTotal = this.itemOne.reduce((acc, i) => acc + (i.totalPrice || 0), 0);

    this.cartTotal = itemTotal + extraTotal;
});

const ContainerItem = mongoose.model("carts", cartBox);

module.exports = ContainerItem;