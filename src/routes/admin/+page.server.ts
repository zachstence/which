import { fail, type Actions } from '@sveltejs/kit';
import { db } from '$lib/server/db';
import { names } from '$lib/server/db/schema';

export const actions: Actions = {
	createName: async ({ request }) => {
		const data = await request.formData();
		const name = data.get('name');
		if (typeof name !== 'string' || !name) {
			return fail(400);
		}

		await db.insert(names).values({ name });
	}
};
