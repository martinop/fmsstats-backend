
import { GraphQLModule } from '@graphql-modules/core';
import typeDefs from './typeDefs';
import resolvers from './resolvers';
import participants from '../participants';

export default new GraphQLModule({
  name: 'competition',
	typeDefs,
  resolvers,
  imports: [participants]
})