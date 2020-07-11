
import { GraphQLModule } from '@graphql-modules/core';
import typeDefs from './typeDefs';
import resolvers from './resolvers';
import competitions from '../competitions';

export default new GraphQLModule({
  name: 'positions',
	typeDefs,
  resolvers,
  imports: [competitions]
})