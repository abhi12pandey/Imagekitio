import { promises } from "dns";
import { Connection } from "mongoose";

// declare globol varibale which check the connection and also aware if new coneection come

declare global {
  var mongoose: {
    conn: Connection | null;
    promise: Promise<Connection> | null;
  };
}
export {};
