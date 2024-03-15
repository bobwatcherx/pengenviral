<script>
  export let data;
  import Loaddata from '../components/Loaddata.svelte'
  import {folder_id} from '../base/config.js'
      let selectedFolder = ''; 

    function handleRadioChange(event) {
        selectedFolder = event.target.value;
    }


</script>

<div style="margin-top: 30px">
  
<div class="container">
  <a href="/nontonnanti"
   class="btn waves waves-effect blue" 
  >Bokep Tersimpan</a>
   <a href="/chat"
   class="btn waves waves-effect orange" 
  >Chat ADMIN</a>
  
</div>
 <!-- GENRE -->
       <div class="card">
        <div class="container">
  <h6 style="font-weight: bold">Pilih Genre Bokep</h6>
        </div>
     {#each folder_id as folder}
    {#each Object.entries(folder) as [label, value]}
      <a 
        class="btn waves-effect waves-light pink" 
        style="margin-right: 10px;color:white; margin-bottom: 10px;"
        href={"/genre/" + value}
      >
        <span style="font-weight: bold;">{label}</span>
      </a>
    {/each}
  {/each}
</div>
<div class="container">
  <h5>Semua Bokep Montok Terbaru</h5>
</div>
<Loaddata data={data}/>
</div>