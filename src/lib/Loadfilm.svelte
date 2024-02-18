<script>
    import {Link} from 'svelte-navigator'
	export let filmdata;
    import Swal from 'sweetalert2';

	 function formatDate(dateString) {
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', options);
        }

    function saveToLocalStorage(film) {
        let nontonNantiData = localStorage.getItem('nonton-nanti');

        if (nontonNantiData) {
            let existingData = JSON.parse(nontonNantiData);
            existingData.push(film);
            localStorage.setItem('nonton-nanti', JSON.stringify(existingData));
        Swal.fire({
            toast:true,
          title: 'Bokep nya Disimpen ke tonton nanti',
          position: 'center',
          icon: 'success',
          showConfirmButton: false, // Hide confirm button
          timer: 2000, 
          })
        } else {
            localStorage.setItem('nonton-nanti', JSON.stringify([film]));
        }
    }
</script>

<style>
    .row .col{
        padding: 0px;
        margin: 0px
    }
    .card{
        background:var(--bg-color);
        color: var(--text-color);
    }
    .titletxt{
        color: var(--text-color);
    }
</style>



<div class="row" >
{#each filmdata as d}
    <div class="col s6 m3 l3">
        <div class="card waves waves-effect">
            <div class="card-image">
                <img src={d.single_img} alt={d.title}>
            </div>
            <div class="container">
                {#if d.title.length > 40}
                    <span 
                    class="titletxt" 
                    style="font-weight: bold;">{d.title.slice(0, 40)}...</span>
                {:else}
                    <span 
                    class="titletxt" 

                    style="font-weight: bold;">{d.title}</span>
                {/if}
                <br>
                <span style="font-weight: bold">{formatDate(d.uploaded)}</span>
            </div>
            <!-- ACTION -->
            <div style="display: flex;justify-content: space-around;">
                 <button class="btn waves waves-effect blue" on:click={() => saveToLocalStorage(d)}>Simpan</button>
                <Link to={`/player/${d.file_code}`} class="btn waves waves-effect pink">Nonton</Link>

            </div>
        </div>
    </div>
{/each}
</div>