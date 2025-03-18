import { db } from '$lib/server/db';
import { names, users, votes } from '$lib/server/db/schema';
import { aliasedTable, count, desc, eq, sql } from 'drizzle-orm';
import type { PageServerLoad } from './$types';

const winningName = aliasedTable(names, 'winningName');
const losingName = aliasedTable(names, 'losingName');

const wins = aliasedTable(votes, 'wins');
const losses = aliasedTable(votes, 'losses');

export const load: PageServerLoad = async () => {
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
			wins: count(wins.id),
			losses: count(losses.id),
			diff: sql`COUNT(${wins.id}) - COUNT(${losses.id})`,
			totalVotes: sql`COUNT(${wins.id}) + COUNT(${losses.id})`
		})
		.from(names)
		.leftJoin(wins, eq(names.id, wins.winningNameId))
		.leftJoin(losses, eq(names.id, losses.losingNameId))
		.groupBy(names.id)
		.orderBy(desc(sql`COUNT(${wins.id}) - COUNT(${losses.id})`))
		.limit(10);

	return { allVotes, mostPopularNames };
};
