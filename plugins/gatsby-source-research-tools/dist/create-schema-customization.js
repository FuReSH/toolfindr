"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createSchemaCustomization = void 0;
const constants_1 = require("./constants");
const createSchemaCustomization = ({ actions }) => {
    const { createTypes } = actions;
    createTypes(`
        type ${constants_1.NODE_TYPES.Tool} implements Node {
          id: ID!
          _id: String!
          slug: String!
          concepts: [${constants_1.NODE_TYPES.Concept}!]! @link(by: "_id")
        }
  
        type ${constants_1.NODE_TYPES.Concept} implements Node {
          id: ID!
          _id: String!
          label: String!
        }

      `);
};
exports.createSchemaCustomization = createSchemaCustomization;
