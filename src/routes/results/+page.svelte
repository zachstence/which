<script lang="ts">
	import type { PageServerData } from './$types';

	type Props = {
		data: PageServerData;
	};

	let { data }: Props = $props();
</script>

<pre class="font-mono">{JSON.stringify(data, null, 2)}</pre>
