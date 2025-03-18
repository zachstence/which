<script lang="ts">
	import { enhance } from '$app/forms';
	import type { ActionData } from './$types';
	import '../../app.css';

	let { form }: { form: ActionData } = $props();
</script>

<main class="flex h-screen w-screen items-center justify-center">
	<form method="post" action="?/login" use:enhance class="flex flex-col gap-4">
		<label>
			Username
			<input class="input" name="username" />
		</label>
		<label>
			Password
			<input class="input" type="password" name="password" />
		</label>
		<button class="btn btn-primary">Login</button>
		<button class="btn btn-primary btn-outline" formaction="?/register">Register</button>

		<div class="text-error">{form?.message ?? ''}</div>
	</form>
</main>
