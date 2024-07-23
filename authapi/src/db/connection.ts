import {
  Bucket,
  Cluster,
  Collection,
  connect,
  ConnectOptions,
} from 'couchbase';

const DB_USERNAME = process.env.DB_USERNAME;
const DB_PASSWORD = process.env.DB_PASSWORD;
const DB_CONN_STR = process.env.DB_CONN_STR || "";
const DB_BUCKET_NAME = process.env.DB_BUCKET_NAME || "";

console.log(DB_BUCKET_NAME, DB_CONN_STR, DB_USERNAME, DB_PASSWORD)

export async function connectToDatabase() {
  try {
    const connectOptions: ConnectOptions = {
      username: DB_USERNAME,
      password: DB_PASSWORD,
    };
    console.log(connectOptions)

    const cluster: Cluster = await connect(DB_CONN_STR, connectOptions);
    const bucket: Bucket = cluster.bucket(DB_BUCKET_NAME);
    const scope = bucket.scope('auth');
    const usersCollection: Collection = scope.collection('users');

    let dbConnection = {
      cluster,
      bucket,
      scope,
      usersCollection,
    };

    console.log("Successfully connected to Couchbase");
    return dbConnection;
  } catch (error) {
    // Check the connection
    console.error("Failed to connect to Couchbase:", error);
    throw error;
  }
}
