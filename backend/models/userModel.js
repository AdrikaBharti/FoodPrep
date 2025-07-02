const mongoose = require('mongoose')
const userSchema = new mongoose.Schema(
    {
        name:{type:String,required:true},
        email:{type:String,required:true,unique:true},
        password:{type:String,required:true},
        cartData:{type:Object,default:{}},
        wishlist: { type: [String], default: [] }
    },{minimize:false}
)
const userModel = mongoose.models.User || mongoose.model("User",userSchema)
module.exports = userModel;