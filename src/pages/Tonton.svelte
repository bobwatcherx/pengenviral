<script>
	import { Link,navigate } from 'svelte-navigator';
	import { onMount } from 'svelte';
	import Swal from 'sweetalert2';
	import {player_domain} from '../base/domain.js'
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

	// CLEAR SEMUA TONTONAN
	const clearLocalStorage = () => {
		    try {
		        localStorage.removeItem('nonton-nanti');
		        // Perbarui variabel reactive
		        getSavedMovies();
		        Swal.fire({
		            icon: 'success',
		            title: 'Daftar Film Sudah Di hapus semuanya ',
		            confirmButtonText: 'ok Bang makasih',
		            showConfirmButton: true
		        });
		    } catch (error) {
		        console.error('Error clearing localStorage:', error);
		        Swal.fire({
		            icon: 'error',
		            title: 'Oops...',
		            text: 'Something went wrong while clearing localStorage!',
		        });
		    }
		};



</script>

<div style="margin-top: 10px">
	<div style="display: flex;justify-content: space-between;">
		<Link to="/" class="btn waves waves-effect pink">kembali</Link>
		<button
		on:click={()=>navigate("/download")}
		 class="btn waves-effect waves blue">Download</button>
		<button
		on:click={clearLocalStorage}
		 class="btn waves-effect waves red">Hapus Semua </button>
	</div>

	<button
	style="margin-top: 20px"
		on:click={()=>navigate("/exportlink")}
		 class="btn waves-effect waves orange">Export / BackUp Semua Link Nonton Nanti</button>

	<div class="container">
		<h5>Daftar Tonton Nanti Bokep yg lu Simpen</h5>
		<h6 style="font-weight: bold">Total Bokep Lu simpen : {savedmovies.length}</h6>
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

<style>
	.row .col{
		padding: 0px;
		margin:0px;
	}
</style>