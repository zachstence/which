<script lang="ts">
	import { enhance } from '$app/forms';
	import type { LayoutProps } from './$types';
	import '../../app.css';

	let { data, children }: LayoutProps = $props();
</script>

<div class="flex h-screen w-screen flex-col items-center justify-center gap-4 overflow-hidden">
	<header class="navbar shrink-0 px-6 select-none">
		<div class="navbar-start">
			<span class="hidden text-xl italic md:block">Which?</span>
		</div>
		<div class="navbar-center flex flex-row items-center justify-center gap-4">
			<a class="btn btn-primary btn-ghost" href="/">Vote</a>
			<a class="btn btn-primary btn-ghost" href="/names">Names</a>
			<a class="btn btn-primary btn-ghost" href="/results">Results</a>
		</div>
		<div class="navbar-end">
			<span class="hidden px-4 md:block">{data.user.username}</span>
		</div>
	</header>

	<main class="container flex min-h-0 flex-1 items-center justify-center">
		{@render children()}
	</main>

	<footer class="flex w-full shrink-0 flex-row items-center justify-between px-2 pb-2">
		<form class="contents" method="POST" action="?/logout" use:enhance>
			<button type="submit" class="btn btn-ghost btn-error">Logout</button>
		</form>
		<a href="https://github.com/zachstence/which" class="btn btn-ghost rounded-full">GitHub</a>
	</footer>
</div>
