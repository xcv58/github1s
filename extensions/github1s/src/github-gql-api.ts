/**
 * @file GitHub GraphQL API
 * @author xcv58
 */

import { apolloClient, refsQuery } from './client';

export const getBranches = (owner: string, repo: string) => {
	return apolloClient
	.query({
		query: refsQuery,
		variables: {
			owner,
			repo
		}
	}).then((response) => response.data?.repository?.refs?.nodes);
};
