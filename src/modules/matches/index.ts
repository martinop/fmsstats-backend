
import { GraphQLModule } from '@graphql-modules/core';
import typeDefs from './typeDefs';
import resolvers from './resolvers';
import participants from '../participants';
import words from '../words';
import thematics from '../thematics';
import votes from '../votes';

export default new GraphQLModule({
  name: 'matches',
	typeDefs,
  resolvers,
  imports: [participants, words, thematics, votes]
})