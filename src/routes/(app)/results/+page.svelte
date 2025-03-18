<script lang="ts">
	import type { PageServerData } from './$types';

	type Props = {
		data: PageServerData;
	};

	let { data }: Props = $props();
</script>

<div class="grid h-full w-full grid-cols-2 gap-16 overflow-hidden">
	<div class="flex h-full flex-col overflow-hidden">
		<h1 class="mb-4 text-2xl font-bold">Top Names</h1>
		<div class="min-h-0 flex-1 overflow-y-auto">
			<table class="table-zebra table-pin-rows table">
				<thead>
					<tr>
						<th>Name</th>
						<th>Score</th>
						<th>Total Votes</th>
					</tr>
				</thead>
				<tbody>
					{#each data.mostPopularNames as { name, wins, losses } (name)}
						{@const diff = wins - losses}
						{@const totalVotes = wins + losses}
						<tr>
							<td>{name}</td>
							<td class:text-success={diff > 0} class:text-error={diff < 0}
								>{diff > 0 ? '+' : diff < 0 ? '-' : ''}{Math.abs(diff)}</td
							>
							<td>{totalVotes}</td>
						</tr>
					{/each}
				</tbody>
			</table>
		</div>
	</div>

	<div class="flex h-full flex-col overflow-hidden">
		<h1 class="mb-4 shrink-0 text-2xl font-bold">All Votes</h1>
		<div class="min-h-0 flex-1 overflow-y-auto">
			<table class="table-zebra table-pin-rows table">
				<thead>
					<tr>
						<th>Voter</th>
						<th>Winner</th>
						<th>Loser</th>
						<th>Voted At</th>
					</tr>
				</thead>
				<tbody>
					{#each data.allVotes as { voteId, userName, winningName, losingName, votePlacedAt } (voteId)}
						<tr>
							<td>{userName}</td>
							<td class="text-success">{winningName}</td>
							<td class="text-error">{losingName}</td>
							<td>{votePlacedAt.toLocaleString()}</td>
						</tr>
					{/each}
				</tbody>
			</table>
		</div>
	</div>
</div>
