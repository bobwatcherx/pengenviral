<script>
  import { simpanbokep } from '../myfunction/index.js';
  
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
        <div class="card waves waves-effect">
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
            <a
              class="btn waves waves-effect pink"
              href={"/player/" + file.file_code}
            >Nonton</a>
          </div>
        </div>
      </div>
    {/each}
  </div>
{/if}
