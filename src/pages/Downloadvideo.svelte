<script>
    import { Link } from 'svelte-navigator';
    import { onMount } from 'svelte';
    import {player_domain} from '../base/domain.js'
    let savedmovies = [];

    function getSavedMovies() {
        let data = JSON.parse(localStorage.getItem('nonton-nanti')) || [];
        savedmovies = data.reverse();
        
    }

    onMount(() => {
        getSavedMovies();
    });
</script>

<div class="container" style="margin-top: 40px">
    <Link to="/" class="btn waves waves-effect pink">Kembali</Link>
    <h5>Langsung download Semua Bokep dari nonton nanti</h5>
    <p style="color: red;font-weight: bold">
        Lewatin iklan nya kalo kebuka iklan lu lewatin nanti masuk ke web download nya

    </p>
    <ul class="listview z-depth-2">
        {#each savedmovies as movie}
            <li>
                <img src={movie.single_img} alt={movie.title} />
                <p style="font-weight: bold">Title: {movie.title}</p>
                <a 
                class="btn waves waves-effect blue" 
                target="_blank"
                href={`https://cuty.io/quick?token=3c2f8445e662326c2ebcd8d60&url=${player_domain}/d/${movie.file_code}`}>Download Bokep</a>
            </li>
        {/each}
    </ul>
</div>

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
