<script>
 import Swal from 'sweetalert2';
  import {gotoplayer} from '../../lib'
  export let data;

  function hapus(file) {
    const index = data.nontonNantiData.findIndex(item => item.file_code === file.file_code);
    if (index !== -1) {
      data.nontonNantiData.splice(index, 1);
      localStorage.setItem('nonton-nanti', JSON.stringify(data.nontonNantiData));

      data.nontonNantiData = [...data.nontonNantiData]; 
    }
    Swal.fire({
      icon: 'success',
      title: 'Bokep Berhasil Dihapus',
      position: 'center',
      showConfirmButton: false,
      timer: 2000
    });
  }
</script>

<style>
  .row .col {
    margin: 0px;
    padding: 0px;
  }
</style>

<div class="container" style="margin-top: 30px">
  <a href="/" class="btn waves waves-effect pink">Kembali</a>
  <h5>Daftar Bokep Yg Disimpan</h5>
  <p style="font-weight: bold">Total Bokep Disimpan : {data.nontonNantiData.length}</p>
</div>

<div class="row">
  {#each data.nontonNantiData as file}
    <div class="col s6 m3 l3">
      <div class="card">
        <div class="card-image">
          <img src="{file.single_img}" alt="{file.title}">
        </div>
        <div class="container">
          <span style="font-size: 13px;color:#82082f;font-weight: bold">{file.title.length > 40 ? file.title.slice(0, 40) + '...' : file.title}</span>
          <p>{file.uploaded}</p>
        </div>
        <div style="display: flex;justify-content: space-around;">
          <button class="btn waves waves-effect red" on:click={() => hapus(file)}>Hapus</button>
          <button class="btn waves waves-effect blue" 
          on:click={()=>gotoplayer(file)}
          >Nonton</button>
        </div>
      </div>
    </div>
  {/each}
</div>
