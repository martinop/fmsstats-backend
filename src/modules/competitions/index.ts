
import { GraphQLModule } from '@graphql-modules/core';
import typeDefs from './typeDefs';
import resolvers from './resolvers';
import rounds from '../rounds';
import judges from '../judges';

export default new GraphQLModule({
  name: 'competition',
	typeDefs,
  resolvers,
  imports: [rounds, judges]
})