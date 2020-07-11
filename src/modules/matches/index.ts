
import { GraphQLModule } from '@graphql-modules/core';
import typeDefs from './typeDefs';
import resolvers from './resolvers';
import participants from '../participants';
import words from '../words';

export default new GraphQLModule({
  name: 'matches',
	typeDefs,
  resolvers,
  imports: [participants, words]
})