const { gql } = require("apollo-server-express");

const typeDefs = gql`
    type Activity {
        id: ID!
        date: String
        type: String
        duration: Int
    }

    type Goal {
        id: ID!
        target: String
        progress: Int
    }

    type User {
        id: ID
        name: String
        email: String
        activities: [Activity]
        goals: [Goal]
    }

    type Query {
        users: [User]
        user(id: ID!): User
    }

    type Mutation {
        addUser(name: String!, email: String!): User
        updateUser(id: ID!, name: String, email: String): User
        deleteUser(id: ID!): User
        addActivity(
            userId: ID!
            date: String!
            type: String!
            duration: Int!
        ): User
        updateActivity(
            userId: ID!
            activityId: ID!
            date: String
            type: String
            duration: Int
        ): Activity
        deleteActivity(userId: ID!, activityId: ID!): Activity
        addGoal(userId: ID!, target: String!, progress: Int!): User
        updateGoal(
            userId: ID!
            goalId: ID!
            target: String
            progress: Int
        ): Goal
        deleteGoal(userId: ID!, goalId: ID!): Goal
    }
`;

module.exports = typeDefs;
