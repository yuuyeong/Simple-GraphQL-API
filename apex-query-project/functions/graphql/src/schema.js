import { getProject } from './db'
import {
  GraphQLObjectType,
  GraphQLNonNull,
  GraphQLString,
  GraphQLID,
  GraphQLInt,
  GraphQLSchema
} from 'graphql';

const Project = new GraphQLObjectType({
  name: 'Project',
  fields: () => {
    return {
      id: {
        type: new GraphQLNonNull(GraphQLID),
        resolve(project){
          return project.id
        }
      },
      title: {
        type: GraphQLString,
        resolve(project){
          return project.title
        }
      },
      permalink: {
        type: GraphQLString,
        resolve(project){
          return project.permalink
        }
      },
      fundingGoal: {
        type: GraphQLInt,
        resolve(project){
          return project.completemoney
        }
      },
      shortDescription: {
        type: GraphQLString,
        resolve(project){
          return project.short_description
        }
      }
    }
  }
});

const Query = new GraphQLObjectType({
  name: 'Query',
  fields: () => {
    return {
      project: {
        type: Project,
        args: {
          id: {
            type: GraphQLID
          },
          title: {
            type: GraphQLString
          },
          permalink: {
            type: GraphQLString
          },
          fundingGoal: {
            type: GraphQLInt
          },
          shortDescription: {
            type: GraphQLString
          }
        },
        resolve(root, args) {
          return getProject(args);
        }
      }
    }
  }
});

const Schema = new GraphQLSchema({
  query: Query
});

export default Schema;