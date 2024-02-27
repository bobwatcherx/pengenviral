<script>
    import {Link} from 'svelte-navigator'
    import Loadingspinner from '../lib/Loadingspinner.svelte'
    import Swal from 'sweetalert2';
   	import {base_netlify_domain} from '../base/domain.js'
   	  let filmdata = [];
    let currentpage = 1;
    let loading = false
    let caribokep = ""

function formatDate(dateString) {
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', options);
        }

   async function fetchdata() {
     loading = true

        try {
            const response = await fetch(`${base_netlify_domain}/dood_cari/?search_term=${caribokep}`);
            const data = await response.json();
            filmdata = data.result;
            if (!response.ok) {
                throw new Error(`${response.status} Server Lagi Error refresh aja`);
            }

        } catch (error) {
            console.error("Error fetching data:", error.message);
            Swal.fire({
            toast:true,
          title: 'server lama respon , lu coba lagi',
          position: 'center',
          icon: 'error',
          })
        } finally{
            loading = false
        }
    }
    

function saveToLocalStorage(film) {
        let nontonNantiData = localStorage.getItem('nonton-nanti');

        if (nontonNantiData) {
            let existingData = JSON.parse(nontonNantiData);
            existingData.push(film);
            localStorage.setItem('nonton-nanti', JSON.stringify(existingData));
        Swal.fire({
            toast:true,
          title: 'Film nya Disimpen ke tonton nanti',
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

<div style="margin-top: 10px;">
	<div >
	<Link to="/" class="btn waves waves-effect pink">kembali</Link>
	<Link to="/tonton" class="btn waves waves-effect blue">Daftar Nonton nanti</Link>
	</div>

</div>

<div class="container">
	<h5>Lu Masukin bokep yg lu mau cari bisa kode jepang atau artis bokep</h5>
</div>
<div class="z-depth-3" style="margin-bottom: 20px;background-color: white">
	<div class="container">
		<p style="font-weight: bold">masukin bokep yg mau lu Cari</p>
		<input type="text" bind:value={caribokep} placeholder="masukin kata kata bokep">

		<button 
		style="margin:5px" 
		on:click={()=>fetchdata()}
		class="btn waves waves-effect pink">cari bokep</button>
	</div>
</div>

{#if loading}
   <Loadingspinner/>
{:else}

<div class="row" >
{#each filmdata as d}
    <div class="col s6 m3 l3">
        <div class="card waves waves-effect">
            <div class="card-image">
                <img src={d.single_img} alt={d.title}>
            </div>
            <div class="container">
                {#if d.title.length > 40}
                    <span style="font-weight: bold;">{d.title.slice(0, 40)}...</span>
                {:else}
                    <span style="font-weight: bold;">{d.title}</span>
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
{/if}
<style>
   .card{
        background:var(--bg-color);
        color: var(--text-color);
    }
    .row .col{
      padding: 0px;
      margin:0px;
    }


     .zoom-in-out {
    animation: zoomInOut 1.5s infinite alternate;
  }

  @keyframes zoomInOut {
    0% {
      transform: scale(1);
    }
    100% {
      transform: scale(1.5);
    }
  }
</style>