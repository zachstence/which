<script lang="ts">
	import { enhance } from '$app/forms';
	import type { LayoutProps } from './$types';
	import '../app.css';

	let { data, children }: LayoutProps = $props();
</script>

<div class="flex h-screen w-screen flex-col items-center justify-center gap-4 overflow-hidden">
	<header class="navbar shrink-0 select-none">
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

	<main class="container flex min-h-0 flex-1 items-center justify-center">
		{@render children()}
	</main>

	<footer class="flex w-full shrink-0 flex-row items-center justify-end">
		<a href="https://github.com/zachstence/which" class="btn btn-ghost rounded-full">GitHub</a>
	</footer>
</div>
