import { Mongo } from "meteor/mongo";
export const LinksCollection = new Mongo.Collection("borrower");
export const transaction = new Mongo.Collection("transaction");
