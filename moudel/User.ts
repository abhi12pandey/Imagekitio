import mongoose, { Schema, model, models } from "mongoose";
import bcrypt from "bcryptjs";
//object hota hai hai interface bascially define all the datatypes
export interface IUser {
  email: string;
  password: string;
  _id?: mongoose.Types.ObjectId;
  Createat?: Date;
  Updateat?: Date;
}

// now let us create new schema where we have take all the the required value here we have to use generics bascially it is similar like that if not statify iuser condition tbtk input nhi lena; schema include method and object collection ({ each obj:{}})

const UserSchema = new Schema<IUser>(
  {
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true, unique: true },
  },
  {
    timestamps: true,
  }
);
// now we apply hooks basically hooks is as simple to take data from pre  or post  situation simply data ko letge ye phle lena ya bd mai now write a simple function if password modified hota hai to simply bcrpt.hash;
UserSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 10);
  }
  next();
});
//yha hook likh au ky method or event like save hota and other ek async fun define kiye basically wo pasword ko bcrypt krega simply thik hai

// next js access different server if not find then create the model like we defin and follow
const user = models?.user || model<IUser>("user", UserSchema);
export default user;
