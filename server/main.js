import { Meteor } from "meteor/meteor";
import { LinksCollection } from "/imports/api/borrower";
import { transaction } from "/imports/api/borrower";

Meteor.startup(async () => {
  Meteor.publish("borrower", function () {
    return LinksCollection.find();
  });
});

Meteor.methods({
  "borrower.create": function ({ email, password, role }) {
    console.log("Creating link...", { email, password, role });
    try {
      const result = LinksCollection.insert({ email, password, role });
      console.log("Link created successfully:", result);
      return result;
    } catch (error) {
      console.error("Error creating link:", error);
      throw new Meteor.Error(
        "create-error",
        `Unable to create link: ${error.message}`
      );
    }
  },
  "transaction.create": function ({ email, Principle, ROI, Time }) {
    console.log("Creating link...", {
      email,
      Principle,
      ROI,
      Time,
      status: "Pending",
    });
    try {
      const result = transaction.insert({
        email,
        Principle,
        ROI,
        Time,
        status: "Pending",
        paidBy: "",
      });
      console.log("Link created successfully:", result);
      return result;
    } catch (error) {
      console.error("Error creating link:", error);
      throw new Meteor.Error(
        "create-error",
        `Unable to create link: ${error.message}`
      );
    }
  },
  "transaction.update": function ({ _id, email }) {
    // return transaction.remove({ _id });
    console.log("Updating link...", { _id, email });
    try {
      const result = transaction.update(
        { _id },
        {
          $set: {
            status: "Approved",
            paidBy: email,
          },
        }
      );
      console.log("Link updated successfully:", result);
      return result;
    } catch (error) {
      console.error("Error updating link:", error);
      throw new Meteor.Error(
        "update-error",
        `Unable to update link: ${error.message}`
      );
    }
  },
});
