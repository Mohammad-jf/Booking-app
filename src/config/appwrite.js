import { Client, Databases, Account, Storage } from "node-appwrite";

//admin client

const createAdminClient = async () => {
  const adminClient = new Client()
    .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT) // Your API Endpoint
    .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT) // Your project ID
    .setKey(process.env.NEXT_APPWRITE_KEY); //api key

  return {
    get Account() {
      return new Account(adminClient);
    },
    get Databases() {
      return new Databases(adminClient);
    },
    get Storage() {
      return new Storage(adminClient);
    },
  };
};

const createSessionClient = async (session) => {
  const client = new Client()
    .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT) // Your API Endpoint
    .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT); // Your project ID

  if (session) {
    client.setSession(session);
  }

  return {
    get Account() {
      return new Account(client);
    },
    get Databases() {
      return new Databases(client);
    },
  };
};

export { createAdminClient, createSessionClient };
