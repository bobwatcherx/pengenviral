
<script>
  import { simpanbokep } from '../myfunction/index.js';
  import {directlink_url} from '../base/config.js'


	 let loading = true; 
	export let data;  
  $: {
    if (data) {
      loading = false; 
    }
  }

function formatDate(dateString) {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', options);
    }


function gotoplayer(file) {
  let opsi = [1, 2, 3];
  let randomIndex = Math.floor(Math.random() * opsi.length); 
  let selectedOption = opsi[randomIndex]; 
  
  if (selectedOption === 2) {
    window.open(directlink_url,"_blank")
  } else {
    window.location.href = "/player/" + file.file_code
  }
}


</script>
<style>
  .row .col {
    margin: 0px;
    padding: 0px;
  }
</style>


{#if loading} 
  <div class="center-align">
    <h5 style="margin-top: 50px">Sedang Mencari Bokep montok ....</h5>
  </div>
{:else} 
  <div class="row">
    {#each data.item.result.files as file}
      <div class="col s6 m3 l3">
        <div class="card waves waves-effect z-depth-5">
          <div class="card-image">
            <img src="{file.single_img}" alt="{file.title}">
          </div>
          <div class="container">
            <span style="font-size: 13px;color:#82082f;font-weight: bold">{file.title.length > 40 ? file.title.slice(0, 40) + '...' : file.title}</span>
            <p style="font-weight: bold">{formatDate(file.uploaded)}</p>
          </div>
          <div style="display: flex;justify-content: space-around;">
            <button
              class="btn waves waves-effect blue"
              on:click={() => simpanbokep(file)}
            >Simpan</button>
            <button
            on:click={()=>gotoplayer(file)}
              class="btn waves waves-effect pink"
            >Nonton</button>
          </div>
        </div>
      </div>
    {/each}
  </div>
{/if}
