<script>
	import {
		player_domain,
		tutor_download,
		directlink_url,
		shortlink_token
	} from '../../../base/config.js'
  import Loaddata from '../../../components/Loaddata.svelte'
	 import Swal from 'sweetalert2';
	export let data

	let directshow = true

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

// OPEN DIRECT Link
function open_directlink(){
    window.open(directlink_url,"_blank")
    directshow = false
}
  
  $:{
  	if(data.slugid){
  		directshow = true
  	}
  } 
</script>

<style>
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



<div  style="margin-top: 10px;display: flex;justify-content: space-around;">
	<a href="/"
   class="btn waves waves-effect pink"
	>kembali</a>
	<a href="/nontonnanti"
   class="btn waves waves-effect blue"
	>Bokep tersimpan</a>
</div>
{#each data.file_info.result as d}
	{#if directshow == true}
		 <div class="z-depth-5"
		 style="margin-top: 10px" 
		  on:click={open_directlink}>
                    <div class="position-relative" >
                        <img src={d.single_img} id="imgcover" alt="" style="width: 100%; height: 100%;">
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
		<iframe src={player_domain + "/" + d.protected_embed} frameborder="0"
        allowfullscreen="true"
        allowscrolling="false"
		style="width: 100%;height: 330px;margin-top: 10px" 
		></iframe>
	{/if}
	<div class="container">
		<h6 style="font-weight: bold">{d.title}</h6>
		<a href={"https://cuty.io/quick?token=" + shortlink_token+ "&url="  + player_domain + "/d/" + d.filecode}
        class="btn waves waves-effect pink" 
        style="width: 100%;font-weight: bold" 
        target="_blank"
		>Download Bokep</a>
		<p style="color: red;font-weight: bold">Lewatin Iklan Kalo Mau DOWNLOAD BOKEP</p>
	</div>
	 <button class="btn waves waves-effect purple" 
      on:click={opentutor}
      >Tutor Download BOKEP</button>
{/each}

<div class="container">
	<h5>Bokep Montok Lainnya</h5>
</div>
<Loaddata data={data}/>
