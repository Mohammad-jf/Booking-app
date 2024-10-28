import { Client, Databases, Account, Storage } from "node-appwrite";

//admin client
const createAdminClient = async () => {
  const adminClient = new Client()
    .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT) // API Endpoint
    .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT) // project ID
    .setKey(process.env.NEXT_APPWRITE_KEY); // API KEY

  return {
    get account() {
      return new Account(adminClient);
    },
    get databases() {
      return new Databases(adminClient);
    },
    get storage() {
      return new Storage(adminClient);
    },
  };
};

// session client
const createSessionClient = async (session) => {
  const client = new Client()
    .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT) // Your API Endpoint
    .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT); // Your project ID

  if (session) {
    client.setSession(session);
  }

  return {
    get account() {
      return new Account(client);
    },
    get databases() {
      return new Databases(client);
    },
  };
};

export { createAdminClient, createSessionClient };
