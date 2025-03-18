import { db } from '$lib/server/db';
import { names, users, votes } from '$lib/server/db/schema';
import { aliasedTable, desc, eq, or, sql } from 'drizzle-orm';
import type { PageServerLoad } from './$types';
import { redirect } from '@sveltejs/kit';

const winningName = aliasedTable(names, 'winningName');
const losingName = aliasedTable(names, 'losingName');

export const load: PageServerLoad = async ({ locals }) => {
	if (!locals.user) {
		redirect(302, '/login');
	}

	const allVotes = await db
		.select({
			voteId: votes.id,
			userName: users.username,
			winningName: winningName.name,
			losingName: losingName.name,
			votePlacedAt: votes.votePlacedAt
		})
		.from(votes)
		.leftJoin(users, eq(votes.userId, users.id))
		.leftJoin(winningName, eq(votes.winningNameId, winningName.id))
		.leftJoin(losingName, eq(votes.losingNameId, losingName.id));

	const mostPopularNames = await db
		.select({
			name: names.name,
			wins: sql<number>`COUNT(DISTINCT CASE WHEN ${votes.winningNameId} = ${names.id} THEN ${votes.id} END)::INTEGER`,
			losses: sql<number>`COUNT(DISTINCT CASE WHEN ${votes.losingNameId} = ${names.id} THEN ${votes.id} END)::INTEGER`
		})
		.from(names)
		.leftJoin(votes, or(eq(names.id, votes.winningNameId), eq(names.id, votes.losingNameId)))
		.groupBy(names.id)
		.orderBy(
			desc(
				sql`COUNT(DISTINCT CASE WHEN ${votes.winningNameId} = ${names.id} THEN ${votes.id} END)::INTEGER - COUNT(DISTINCT CASE WHEN ${votes.losingNameId} = ${names.id} THEN ${votes.id} END)::INTEGER`
			)
		)
		.limit(10);

	return { user: locals.user, allVotes, mostPopularNames };
};
