import { Client, Avatars, Account } from "react-native-appwrite";

export const client = new Client()
  .setProject("6959226e002f7a7965da")
  .setPlatform("dev.myProject.shelfieApp");
// .setEndpoint("<https://fra.cloud.appwrite.io/v1>");

export const account = new Account(client);
export const avatars = new Avatars(client);
