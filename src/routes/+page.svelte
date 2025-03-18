<script lang="ts">
	import { enhance } from '$app/forms';
	import type { PageServerData } from './$types';

	let { data }: { data: PageServerData } = $props();
</script>

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
