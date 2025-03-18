<script>
	import { enhance } from '$app/forms';
</script>

<form method="POST" action="?/createName" use:enhance>
	<label for="name">Name</label>
	<input id="name" type="text" name="name" required />
	<button type="submit">Create</button>
</form>
