const mongoose = require('mongoose');
//  const bookingSchema = mongoose.Schema({
//     room : {
//         type : String,
//         required :true
//     },
//     roomid : {
//         type : String,
//         required :true
//     },
//     userid: {
//         type : String,
//         required :true
//     },
//     fromdate : {
//         type : String,
//         required :true
//     },
//     todate : {
//         type : String,
//         required :true
//     },
//     totalamount : {
//         type : Number,
//         required :true
//     },
//     totaldays : {
//         type : Number,
//         required :true
//     },
//     transactionId : {
//             type : String,
//             required :true
        
//     },
//     status :{
//         type: String,
//         required :true,
//         default : 'booked'
//     }
// },
// {
//     timestamps : true,
// })



const bookingSchema = mongoose.Schema({
    room: {
        type: String,
        ref: 'Room', // Reference to the Room model
        required: true
    },
    roomid: {
        type: String,
        required: true // Ensure this is the room's unique identifier
    },
    userid: {
        type: String,
        required: true // User ID of the person booking the room
    },
    fromdate: {
        type: String,
        required: true // Start date of the booking
    },
    todate: {
        type: String,
        required: true // End date of the booking
    },
    totalamount: {
        type: Number,
        required: true // Total cost for the booking
    },
    totaldays: {
        type: Number,
        required: true // Total number of days booked
    },
    transactionId: {
        type: String,
        required: false // Can be set after payment confirmation
    },
    status: {
        type: String,
        required: true,
        default: 'booked' // Default status of the booking
    }
}, {
    timestamps: true // Automatically manage createdAt and updatedAt
});

const bookingmodel = mongoose.model('bookings' , bookingSchema)
 module.exports = bookingmodel