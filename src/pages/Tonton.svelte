<script>
	import { Link } from 'svelte-navigator';
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

	function downloadsemua() {
  let content = "<ul>";
  savedmovies.forEach(movie => {
    let shortenedTitle = movie.title.length > 30 ? `${movie.title.slice(0, 30)}...` : movie.title;
    content += `<li><a href="${player_domain}/d/${movie.file_code}" target="_blank">${shortenedTitle}</a></li>`;
    // Anda dapat menambahkan informasi lain yang ingin Anda tampilkan di sini
  });
  content += "</ul>";

  Swal.fire({
    title: 'Langsung DOWNLOAD semuanya ',
    html: content,
    confirmButtonText: 'OK',
    showConfirmButton: true,
    heightAuto: false, // Menetapkan ketinggian tidak otomatis
    customClass: {
      popup: 'custom-popup-class' // Menambahkan kelas kustom untuk menyesuaikan lebar
    },
    onBeforeOpen: () => {
      const popup = document.querySelector('.custom-popup-class .swal2-popup');
      popup.style.maxHeight = '70vh'; // Mengatur tinggi maksimum untuk memicu scrollbar vertikal
    }
  });
}

</script>

<div style="margin-top: 10px">
	<div style="display: flex;justify-content: space-between;">
		<Link to="/" class="btn waves waves-effect pink">kembali</Link>
		<button
		on:click={downloadsemua}
		 class="btn waves-effect waves blue">Download</button>
		<button
		on:click={clearLocalStorage}
		 class="btn waves-effect waves red">Hapus Semua </button>
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

<style>
	.row .col{
		padding: 0px;
		margin:0px;
	}
</style>