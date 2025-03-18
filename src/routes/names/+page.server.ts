import { fail, type Actions } from '@sveltejs/kit';
import { db } from '$lib/server/db';
import { names, users } from '$lib/server/db/schema';
import type { PageServerLoad } from './$types';
import { eq } from 'drizzle-orm';

export const load: PageServerLoad = async () => {
	const result = await db
		.select({
			id: names.id,
			name: names.name,
			createdAt: names.createdAt,
			creator: users.username
		})
		.from(names)
		.innerJoin(users, eq(names.creatorId, users.id));
	return { names: result };
};

export const actions: Actions = {
	createName: async ({ request, locals }) => {
		if (!locals.user) {
			return fail(401);
		}

		const data = await request.formData();
		const name = data.get('name');
		if (typeof name !== 'string' || !name) {
			return fail(400);
		}

		await db.insert(names).values({ name, creatorId: locals.user.id });
	}
};
