<script lang="ts">
	import { enhance } from '$app/forms';
	import type { PageServerData } from './$types';

	let { data }: { data: PageServerData } = $props();
</script>

<div class="flex h-screen w-screen flex-col items-center justify-center">
	<header class="navbar shrink-0">
		<span class="navbar-start text-xl italic">Which?</span>
		<div class="navbar-center flex flex-row items-center justify-center gap-4">
			<a class="btn btn-primary btn-ghost" href="/">Vote</a>
			<a class="btn btn-primary btn-ghost" href="/names">Names</a>
			<a class="btn btn-primary btn-ghost" href="/results">Results</a>
		</div>
		<div class="navbar-end flex items-center justify-end">
			<span class="px-4">{data.user.username}</span>
			<div class="bg-base-content/50 mx-4 h-6 w-[1px]"></div>
			<form class="contents" method="POST" action="?/logout" use:enhance>
				<button type="submit" class="btn btn-ghost btn-error">Logout</button>
			</form>
		</div>
	</header>

	<main class="container flex flex-1 items-center justify-center">
		<div class="flex h-3/4 w-3/4 flex-col items-center justify-center gap-16 lg:flex-row">
			<form method="POST" action="?/vote" use:enhance class="contents">
				<input name="losingNameId" value={data.randomNames[1].id} type="hidden" class="sr-only" />
				<input name="winningNameId" value={data.randomNames[0].id} type="hidden" class="sr-only" />
				<button
					type="submit"
					class="btn btn-primary w-full flex-1 overflow-hidden text-center text-xl font-semibold text-wrap break-all lg:h-full lg:w-auto xl:text-2xl"
				>
					{data.randomNames[0].name}
				</button>
			</form>

			<div class="bg-base-content/50 relative h-[1px] w-1/2 lg:h-1/2 lg:w-[1px]">
				<span
					class="bg-base-100 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 transform p-4"
				>
					or
				</span>
			</div>

			<form method="POST" action="?/vote" use:enhance class="contents">
				<input name="losingNameId" value={data.randomNames[0].id} type="hidden" class="sr-only" />
				<input name="winningNameId" value={data.randomNames[1].id} type="hidden" class="sr-only" />
				<button
					type="submit"
					class="btn btn-primary w-full flex-1 overflow-hidden text-center text-xl font-semibold text-wrap break-all lg:h-full lg:w-auto xl:text-2xl"
				>
					{data.randomNames[1].name}
				</button>
			</form>
		</div>
	</main>

	<footer class="flex w-full shrink-0 flex-row items-center justify-end">
		<a href="https://github.com/zachstence/which">GitHub</a>
	</footer>
</div>
