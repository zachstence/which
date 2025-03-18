<script lang="ts">
	import { enhance } from '$app/forms';
	import type { PageProps } from './$types';

	let { data }: PageProps = $props();
</script>

<div class="flex w-full flex-col items-center gap-8">
	<form method="POST" action="?/createName" use:enhance class="flex flex-row gap-4">
		<!-- svelte-ignore a11y_autofocus -->
		<input
			type="text"
			name="name"
			placeholder="Add Name"
			aria-label="Add Name"
			required
			class="input"
			autofocus
		/>
		<button type="submit" class="btn btn-primary">Add</button>
	</form>

	<div class="border-base-content/5 w-full rounded-sm border">
		<table class="table-zebra table-pin-rows table">
			<thead>
				<tr>
					<th>Name</th>
					<th>Created By</th>
					<th>Created At</th>
				</tr>
			</thead>
			<tbody>
				{#each data.names as { id, name, creator, createdAt } (id)}
					<tr>
						<td>{name}</td>
						<td>{creator}</td>
						<td>{createdAt.toLocaleString()}</td>
					</tr>
				{/each}
			</tbody>
		</table>
	</div>
</div>
