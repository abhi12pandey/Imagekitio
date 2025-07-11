import mongoose from "mongoose"

const MONGODB_URI = process.env.MONGODB_URI!;

if (!MONGODB_URI) {
  throw new Error("pleae define MONDODB_URI");
}

// create a new variable called cashed where place global data

let cached = global.mongoose;

//global.mongoose is not define then this happend basically not decalre  global varible in the node ..

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

//this fun check whete the conn is connected with database or not...
//main crux of whole of data base
export async function connectToDatabase() {
  if (cached.conn) {
    return cached.conn; //global inside i.e check types.d.ts easy understand we define global inside we placed conn,promise
  }

  //main connection here take place
  //cached not present then two possiblity here first one is not connected and no promise take place

  if (!cached.promise) {
    const opts = {
      bufferCommands: true,
      maxPoolSize: 10,
    }

    //this will connect the databse mostly time we simply write this but for best practice we can use this try and catch block and throw an error if async function always use await for promise this come under whole database conn promise is on the way then await for the promise if an error then throw the error

    mongoose.connect(MONGODB_URI, opts).then(() => mongoose.connection)
  }

  // see line 39  or in one line async fun uses await
  try {
    cached.conn = await cached.promise;
  } catch (error) {
    cached.promise = null;
    throw error;
  }
  return cached.conn;
}
