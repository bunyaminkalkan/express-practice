import {
  Bucket,
  Cluster,
  Collection,
  connect,
  ConnectOptions,
  Scope,
} from 'couchbase';

const DB_USERNAME = process.env.DB_USERNAME;
const DB_PASSWORD = process.env.DB_PASSWORD;
const DB_CONN_STR = process.env.DB_CONN_STR || "";

export const connectToDatabase = async () => {
  try {
    const connectOptions: ConnectOptions = {
      username: DB_USERNAME,
      password: DB_PASSWORD,
    };

    const cluster: Cluster = await connect(DB_CONN_STR, connectOptions);
    console.log(cluster)
    const bucket: Bucket = cluster.bucket("authbucket");
    const scope: Scope = bucket.scope('auth');
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
    console.error("Failed to connect to Couchbase:", error);
    throw error;
  }
}
