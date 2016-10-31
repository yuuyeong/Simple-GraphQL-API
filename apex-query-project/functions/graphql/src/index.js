import 'babel-polyfill'

import schema from './schema';
import { graphql } from 'graphql';

export default function(event, context, callback){
  let query = event.query;
  console.log("query : ", query);
  
  if (event.query && event.query.hasOwnProperty('query')) {
    query = event.query.query.replace("\n", ' ', "g");
  }

  graphql(schema, query).then(function(result){
    context.done(null, result);
  });
};