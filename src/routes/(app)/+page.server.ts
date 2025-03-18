import * as auth from '$lib/server/auth';
import { fail, redirect } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';
import { db } from '$lib/server/db';
import { names, votes, type Name } from '$lib/server/db/schema';
import { selectRandom } from '$lib/server/db/selectRandom';

export const load: PageServerLoad = async () => {
	const randomNames = await selectRandom(names, 2);

	if (randomNames.length !== 2) {
		return {
			randomNames: undefined
		};
	}

	return { randomNames: randomNames as [Name, Name] };
};

export const actions: Actions = {
	vote: async ({ locals, request }) => {
		if (!locals.user) {
			return fail(401);
		}

		const data = await request.formData();
		const winningNameId = data.get('winningNameId');
		const losingNameId = data.get('losingNameId');
		if (
			typeof winningNameId !== 'string' ||
			!winningNameId ||
			typeof losingNameId !== 'string' ||
			!losingNameId
		) {
			return fail(400);
		}

		await db.insert(votes).values({
			userId: locals.user.id,
			winningNameId,
			losingNameId
		});
	},
	logout: async (event) => {
		if (!event.locals.session) {
			return fail(401);
		}
		await auth.invalidateSession(event.locals.session.id);
		auth.deleteSessionTokenCookie(event);

		return redirect(302, '/login');
	}
};
