var Schema = mongoose.Schema;
var userSchema = new Schema({
name : String,
age : Number,
DOB : Date,
isAlive : Boolean
});