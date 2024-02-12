<script>
	import { Link } from 'svelte-navigator';
	import { onMount } from 'svelte';
	import Swal from 'sweetalert2';

	let savedmovies = [];

	function getSavedMovies() {
		let data = JSON.parse(localStorage.getItem('nonton-nanti')) || [];
		savedmovies = data.reverse();
	}

	onMount(() => {
		getSavedMovies();
	});

	const updateLocalStorage = () => {
  localStorage.setItem('nonton-nanti', JSON.stringify(savedmovies));
};
		const hapusfilm = (fileCode) => {
	  savedmovies = savedmovies.filter(item => item.file_code !== fileCode);
	  updateLocalStorage();
	  Swal.fire({
	    icon: 'success',
	    title: 'Film berhasil dihapus dari daftar',
	    confirmButtonText: 'OK',
	    showConfirmButton: true
	  });
	};
</script>

<div style="margin-top: 10px">
	<div class="container">
		<Link to="/" class="btn waves waves-effect pink">kembali</Link>
	</div>

	<div class="container">
		<h5>Daftar Tonton Nanti Bokep yg lu Simpen</h5>
	</div>
</div>

<div class="row">
	{#each savedmovies as d}
	<div class="col s6 m3 l3">
		<div class="card waves waves-effect">
			<div class="card-image">
				<img src={d.single_img} alt={d.title}>
			</div>
			<div class="container">
				{#if d.title.length > 40}
				<span style="font-weight: bold;color:#a10b74">{d.title.slice(0, 40)}...</span>
				{:else}
				<span style="font-weight: bold;color:#a10b74">{d.title}</span>
				{/if}
				<br>
			</div>
			<!-- ACTION -->
			<div style="display: flex;justify-content: end;">
				<button class="btn waves waves-effect red" on:click={() => hapusfilm(d.file_code)}>Hapus</button>
				<Link to={`/player/${d.file_code}`} class="btn waves waves-effect blue">Nonton</Link>
			</div>
		</div>
	</div>
	{/each}
</div>

{#if savedmovies.length == 0}
	<div class="container">
		<h6 style="font-weight: bold">Ga ada bokep nya kosong, ga ada yg lu simpen</h6>
	</div>
{/if}
