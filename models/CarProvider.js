const mongoose = require('mongoose');

const CarProviderSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please add a name'],
        unique: true,
        trim: true,
        maxlength: [50, 'Name can not be more than 50 characters']
    },
    address: {
        type: String,
        required: [true, 'Please add an address']
    },
    tel: {
        type: String,
        required: [true, 'Please add a telephone number'],
        match: [/^[0-9\-\+]+$/, 'Please add a valid telephone number']
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
}, {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
});

// TODO: wait for Rental
// CarProviderSchema.pre('remove', async function (next) {
//     console.log(`Rentals being removed from carProvider ${this._id}`);
//     await this.model('Rental').deleteMany({ carProvider: this._id })
//     next()
// });

// CarProviderSchema.virtual('rentals', {
//     ref: 'Rental',
//     localField: '_id',
//     foreignField: 'CarProvider',
//     justOne: false
// });

module.exports = mongoose.model('CarProvider', CarProviderSchema)