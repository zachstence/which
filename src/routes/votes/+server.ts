import { db } from '$lib/server/db';
import { votes } from '$lib/server/db/schema';
import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

export const GET: RequestHandler = async () => {
	const result = await db.select().from(votes);
	return json(result);
};
