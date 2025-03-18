<script lang="ts">
	import { enhance } from '$app/forms';
	import type { PageServerData } from './$types';

	let { data }: { data: PageServerData } = $props();
</script>

<form method="POST" action="?/vote" use:enhance>
	<input name="losingNameId" value={data.randomNames[1].id} type="hidden" />
	<input name="winningNameId" value={data.randomNames[0].id} type="hidden" />
	<button type="submit">{data.randomNames[0].name}</button>
</form>

<form method="POST" action="?/vote" use:enhance>
	<input name="losingNameId" value={data.randomNames[0].id} type="hidden" />
	<input name="winningNameId" value={data.randomNames[1].id} type="hidden" />
	<button type="submit">{data.randomNames[1].name}</button>
</form>
