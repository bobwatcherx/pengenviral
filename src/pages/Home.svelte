<script>
    import { onMount } from 'svelte';
    import {Link,navigate} from 'svelte-navigator'

    import Loadfilm from '../lib/Loadfilm.svelte'
    import Loadingspinner from '../lib/Loadingspinner.svelte'
    import {folder_id,base_netlify_domain } from '../base/domain.js';
      import Swal from 'sweetalert2';

    let filmdata = [];
    let selectedFolder = ''; 
    let currentpage = 1;
    let loading = true
    function handleRadioChange(event) {
        loading = true
        selectedFolder = event.target.value;
        fetchdata();
    }

    async function fetchdata() {
        try {
            const getfirst = await fetch(`${base_netlify_domain}/dood_random/?page=${currentpage}&per_page=66&fld_id=${selectedFolder}`);
            let getdata = await getfirst.json()
            let totalpages = getdata.result.total_pages
            const randomPage = Math.floor(Math.random() * totalpages) + 1;
            
            const response = await fetch(`${base_netlify_domain}/dood_random/?page=${randomPage}&per_page=66&fld_id=${selectedFolder}`);
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

    // TAMBAH Bokep
    async function tambahbokep() {
        try {
        const getfirst = await fetch(`${base_netlify_domain}/dood_random/?page=${currentpage}&per_page=66&fld_id=${selectedFolder}`);
            let getdata = await getfirst.json()
            let totalpages = getdata.result.total_pages
            const randomPage = Math.floor(Math.random() * totalpages) + 1;
            const response = await fetch(`${base_netlify_domain}/dood_random/?page=${randomPage}&per_page=66&fld_id=${selectedFolder}`);
            const data = await response.json();

            filmdata = [...filmdata, ...data.result.files];
            if (!response.ok) {
                throw new Error(`${response.status} Server Lagi Error refresh aja`);
            }
              Swal.fire({
                  title: 'Gw tambahin Bokep Lagi',
                  position: 'top-end',
                  icon: 'success',
                  showConfirmButton: false, // Hide confirm button
                  timer: 2000, // Set the time in milliseconds (3 seconds in this example)
                  })
        } catch (error) {
            console.error("Error fetching data:", error.message);
            Swal.fire({
                  title: 'Lagi error coba lagi',
                  position: 'top-end',
                  icon: 'error',
                  showConfirmButton: false, // Hide confirm button
                  timer: 2000, // Set the time in milliseconds (3 seconds in this example)
                  })
        } 
    }

    onMount(fetchdata);
 

</script>

<div style="display: flex;justify-content: space-around;margin-top: 10px">
    <Link to="/request" class="btn waves waves-effect pink">Request Bokep</Link>
    <Link to="/tonton" class="btn waves waves-effect blue">Daftar Tonton Nanti</Link>
</div>

<!-- cari -->
<div style="display: flex;justify-content: space-between;padding: 5px">
  <div >
    <Link to="/cari" class="btn waves-effect waves purple"
    >
  <i class="material-icons left">search</i>
  cari Bokep Montok
</Link>
</div>
<button 
  on:click={()=>navigate("/chat")}
 class="btn waves waves-effect floatbtn orange">Chat ADMIN</button>
</div>


<div class="card" style="padding:2px">
    <div class="container">
        <h6 style="font-weight: bold">Pilih Genre Bokep</h6>

        <!-- RADIO -->
        <div>
            {#each folder_id as folder}
                {#each Object.entries(folder) as [label, value]}
                    <label>
                        <input name="group1" type="radio" value={value} bind:group={selectedFolder} on:change={handleRadioChange}  
                        />
                        <span style="font-weight: bold;color:#ad0e58">{label}</span>
                    </label>
                {/each}
            {/each}
        </div>
    </div>
</div>

{#if loading}
   <Loadingspinner/>
{:else}
<Loadfilm filmdata={filmdata} />
<div style="display: flex;justify-content: center;margin-bottom: 30px">
    <button class="btn waves waves-effect blue zoom-in-out"
    on:click={tambahbokep}
    >Tambah Bokep BANG</button>
</div>
{/if}
<style>


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