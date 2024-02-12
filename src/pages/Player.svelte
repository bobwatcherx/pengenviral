<script>
    import {Link} from 'svelte-navigator'
    import { base_api,player_domain,key_api } from '../base/domain.js';
    import Loadfilm from '../lib/Loadfilm.svelte'
    import { onMount  } from 'svelte';
    import Swal from 'sweetalert2';
    import Loadingspinner from '../lib/Loadingspinner.svelte'
    
    let loading = true
    let filmdata = [];
	export let id;

	async function fetchdata() {
        try {
            const getfirst = await fetch(`${base_api}/file/list?key=${key_api}&page=1&per_page=66`);
            let getdata = await getfirst.json()
            let totalpages = getdata.result.total_pages
            const randomPage = Math.floor(Math.random() * totalpages) + 1;
            
            const response = await fetch(`${base_api}/file/list?key=${key_api}&page=${randomPage}&per_page=66`);
            const data = await response.json();
            filmdata = data.result.files;
            if (!response.ok) {
                throw new Error(`${response.status} Server Lagi Error refresh aja`);
            }

        } catch (error) {
            console.error("Error fetching data:", error.message);
        } finally{
            loading = false
        }
    }

    onMount(fetchdata);

    function changepage(code){
    	id = code
    	loading= true
    	fetchdata()
    }
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
	<div style="display: flex;justify-content: space-around;">
	<Link to="/" class="btn waves waves-effect pink">kembali</Link>
	<Link to="/tonton" class="btn waves waves-effect blue">Daftar Tonton Nanti</Link>
	</div>

<div style="margin-top: 10px">
	<iframe src={player_domain + "/e/" + id} frameborder="0"
	width="100%" height="330px" allowfullscreen="true"
	scrolling="no"
	></iframe>
	<!-- DOWNLOAD -->
	<div class="container">
		<a href={`https://cuty.io/quick?token=3c2f8445e662326c2ebcd8d60&url=${player_domain}/d/${id}`} 
	target="_blank"
	class="btn waves waves-effect pink"
	style="width: 100%;margin-top: 20px;font-weight: bold" 
	>Download BOKEP disini</a>
	</div>
	<p style="font-weight: bold;color:red">Lewatin Iklannya kalo Mau DOWNLOAD BOKEP nya</p>
</div>

<!-- RELATED -->
<div style="margin-top: 30px">
<div class="container">
	<h5 style="font-weight: bold">Bokep Montok Lainnya</h5>
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
		                    <span style="font-weight: bold;color:#a10b74">{d.title.slice(0, 40)}...</span>
		                {:else}
		                    <span style="font-weight: bold;color:#a10b74">{d.title}</span>
		                {/if}
		                <br>
		                <span style="font-weight: bold">{formatDate(d.uploaded)}</span>
		            </div>
		            <!-- ACTION -->
		            <div style="display: flex;justify-content: space-around;">
		                 <button class="btn waves waves-effect blue" on:click={() => saveToLocalStorage(d)}>Simpan</button>
		                <button 
		                on:click={()=>changepage(d.file_code)}
		                 class="btn waves waves-effect pink">Nonton</button>

		            </div>
		        </div>
		    </div>
		{/each}
		</div>
	{/if}

</div>


</div>