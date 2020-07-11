
import { GraphQLModule } from '@graphql-modules/core';
import typeDefs from './typeDefs';
import resolvers from './resolvers';
import matches from '../matches';

export default new GraphQLModule({
  name: 'competition',
	typeDefs,
  resolvers,
  imports: [matches]
})