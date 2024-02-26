<script>
    import {Link} from 'svelte-navigator'
    import { base_api,directlink_url,player_domain,key_api,tutor_download } from '../base/domain.js';
    import Loadfilm from '../lib/Loadfilm.svelte'
    import { onMount  } from 'svelte';
    import Swal from 'sweetalert2';
    import Loadingspinner from '../lib/Loadingspinner.svelte'
    
    let loading = true
    let filmdata = [];
    let detaildata = [];
    let showgambar_direct = true
	export let id;

    async function fetchdetail(){
        try{
            const getinfo = await fetch(`${base_api}/file/info?key=${key_api}&file_code=${id}`)
            let info = await getinfo.json()
            detaildata = info.result
        }
        catch (error) {
            console.error("Error fetching data:", error.message);
        }
    }

    // RELATED
	async function fetchrelated() {
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

    onMount(()=>{
        fetchdetail()
        fetchrelated()
    });

    function changepage(code){
    	id = code
    	loading= true
        showgambar_direct = true
        fetchdetail()
    	fetchrelated()
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

    function opentutor() {

    Swal.fire({
        title: "Tutor Download BOKEP",
        html: `
            <div>
                <h6 style="color:red">Lu back aja Setiap kebuka web iklan</h6>
                <iframe src="${tutor_download}"
                    width="100%"
                    allowfullscreen
                />
            </div>
        `,
        showConfirmButton: false,
        showCloseButton: true,
        customClass: {
            content: 'sweetalert-video-content',
        },
    });
}

// SIMPAN BOKEP PLAYER
async function saveBokep() {
    try {
        const response = await fetch(`${base_api}/file/info?key=${key_api}&file_code=${id}`);
        if (!response.ok) {
            throw new Error('Gagal menyimpan bokep');
        }
        const data = await response.json();
        // Ubah struktur data sesuai dengan yang diharapkan saat menyimpan ke localStorage
        const result = {
            canplay: data.result[0].canplay,
            download_url: data.result[0].protected_dl,
            file_code: data.result[0].filecode, 
            fld_id: data.result[0].fld_id,
            length: data.result[0].length,
            single_img: data.result[0].single_img,
            splash_img: data.result[0].splash_img,
            title: data.result[0].title,
            uploaded: data.result[0].uploaded,
            views: data.result[0].views
        };
        saveToLocalStorage(result);

        Swal.fire({
            title: 'Bokep berhasil Disimpan',
            text: 'Disimpan Di Nonton nanti',
            icon: 'success',
            showConfirmButton: false,
            timer: 2000
        });
    } catch (error) {
        console.error('Error menyimpan bokep:', error.message);
        Swal.fire({
            title: 'Gagal Menyimpan Bokep',
            text: 'Terjadi kesalahan saat menyimpan bokep.',
            icon: 'error',
            showConfirmButton: true
        });
    }
}

// OPEN DIRECT Link
function open_directlink(){
    window.open(directlink_url,"_blank")
    showgambar_direct = false
}
    

</script>

<div style="margin-top: 10px;">
	<div style="display: flex;justify-content: space-around;">
	<Link to="/" class="btn waves waves-effect pink">kembali</Link>
	<Link to="/tonton" class="btn waves waves-effect blue">Daftar Tonton Nanti</Link>
	</div>

<div style="margin-top: 10px">
    {#if detaildata != ""}
    {#each detaildata as detail}
        {#if showgambar_direct == true}
            <div class="z-depth-5" on:click={open_directlink}>
                    <div class="position-relative" >
                        <img src={detail.single_img} id="imgcover" alt="" style="width: 100%; height: 100%;">
                        <div class="overlay" id="overlay">
                            <div class="play-button-container">
                                <span class="play-button-background"></span>
                                <span class="play-button">▶</span>
                            </div>
                            
                        </div>
                    </div>
                <p style="text-align: center;font-weight: bold">Klik Untuk Memulai Video</p>
            </div>

        {:else}
            <iframe src={`${player_domain}/e/${detail.filecode}`}
              width="100%" height="330px" allowfullscreen allowscrolling="no" 
             frameborder="0"></iframe>
         {/if}
         <br>
         <div class="container">
             <span style="font-weight: bold;color: purple">{detail.title}</span>
         </div>
         <br>
    {/each}
    {:else}
    <div class="container">
        <span style="margin-top:30px;margin-bottom:30px;font-weight: bold">Sedang Mencari Bokep ...</span>
    </div>
    {/if}
    

	<!-- DOWNLOAD -->
	<div style="display: flex;justify-content: space-around;">
		<button class="btn waves waves-effect blue"
        on:click={saveBokep}
        >Simpan Bokep</button>
        <a href={`https://cuty.io/quick?token=3c2f8445e662326c2ebcd8d60&url=${player_domain}/d/${id}`} 
	target="_blank"
	class="btn waves waves-effect pink"
	style="font-weight: bold" 
	>Download  Bokep</a>
     
	</div>
	<div style="margin-top: 10px;" >
      <button class="btn waves waves-effect purple" 
      on:click={opentutor}
      >Tutor Download BOKEP</button>
      
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

<style>
    .row .col{
        padding: 0px;
        margin: 0px
    }
     .card{
        background:var(--bg-color);
        color: var(--text-color);
    }
.position-relative {
    position: relative;
}

.play-button-container {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
}

.play-button-background {
    display: inline-block;
    width: 70px;
    height: 70px;
    background-color: white;
    border-radius: 50%;
    position: relative;
    animation: zoomInOut 0.5s infinite alternate; 
}

.play-button {
    font-size: 54px;
    color: red;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);

}

@keyframes zoomInOut {
    0% {
        transform: scale(1);
    }
    100% {
        transform: scale(1.2);
    }
}



</style>
