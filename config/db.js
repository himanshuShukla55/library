import { connect } from "mongoose";

const connection = (url) => connect(url);

export default connection;
