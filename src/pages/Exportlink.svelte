<script>
    import { Link } from 'svelte-navigator';
    import { onMount } from 'svelte';
    import { player_domain } from '../base/domain.js';
    import Swal from 'sweetalert2';

    let savedmovies = [];
    let selectedDomain = "https://bangentot.netlify.app"; 

    function getSavedMovies() {
        let data = JSON.parse(localStorage.getItem('nonton-nanti')) || [];
        savedmovies = data.reverse();
    }

    onMount(() => {
        getSavedMovies();
    });

    let listdomain = [
        "https://bangentot.netlify.app",
        "https://bokepcinta.netlify.app",
        "https://pengenentot.netlify.app",
        "https://mamaentot.netlify.app",
        "https://binorentot.netlify.app"
    ];

  function copyAllLinks() {
    let textToCopy = '';

    savedmovies.forEach(movie => {
        const title = movie.title;
        const link = `${selectedDomain}/player/${movie.file_code}`;
        textToCopy += `${title}\n${link}\n\n`;
    });

    // Create a textarea element
    const textArea = document.createElement("textarea");

    // Set the value of the textarea to the text you want to copy
    textArea.value = textToCopy;

    // Append the textarea to the DOM
    document.body.appendChild(textArea);

    // Select the text in the textarea
    textArea.select();

    // Copy the selected text to the clipboard
    document.execCommand("copy");

    // Remove the textarea from the DOM
    document.body.removeChild(textArea);

    // Show success message
    Swal.fire({
        icon: 'success',
        title: 'Berhasil',
        text: 'Semua link telah disalin ke clipboard!'
    });
}

</script>

<div style="display: flex;justify-content: space-around;margin-top: 30px">
    <Link to="/tonton" class="btn waves waves-effect pink">Kembali</Link>
    <button class="btn waves waves-effect purple" on:click={copyAllLinks}>Copy Semua Link</button>
</div>

<div class="container" style="margin-top: 40px">
    <h5>Export/ backUp Semua Link Bokep yang Lu simpen</h5>
</div>

<div class="card">
    <div class="container ">
    <h6 style="font-weight: bold">Pilih Domain Web Bokep ( Bebas ) : </h6>
    {#each listdomain as domain}
        <label>
            <input type="radio" bind:group={selectedDomain} value={domain}>
            {domain}
        </label>
    {/each}
</div>
</div>

<div class="container">
<p style="color:red;font-weight: bold">Lu Paste Di catatan Lu atau Di mana aja bebas abis lu klik tombol Copy di pojok kanan atas</p>
<h6 style="font-weight: bold">Total Bokep Lu Simpen: {savedmovies.length}</h6>
</div>
<ul class="listview z-depth-2">
    {#each savedmovies as movie}
        <li>
            <img src={movie.single_img} alt={movie.title} />
            <br>
            <a 
                style="font-weight: bold;color: blue;font-size: 12px" 
                target="_blank"
                href={selectedDomain + '/player/' + movie.file_code}>
                {movie.title}
                <br>
                {selectedDomain + '/player/' + movie.file_code}
            </a>
        </li>
    {/each}
</ul>

<style>
    .listview {
        list-style: none;
        padding: 0;
        margin: 0;
    }

    .listview li {
        padding: 10px;
        border-bottom: 1px solid #ccc;
    }

    .listview li img {
        max-width: 100px;
        max-height: 100px;
        margin-right: 10px;
    }
</style>
