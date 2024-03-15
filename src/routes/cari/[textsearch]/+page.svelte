<script>
	import Loadcari from '../../../components/Loadcari.svelte'
	export let data
</script>
<div class="container" style="margin-top: 10px">
	<a href="/"
   class="btn waves waves-effect pink" 
	>kembali</a>
	<a href="/nontonnanti"
   class="btn waves waves-effect blue" 
	>bokep tersimpan</a>
	<h5>Hasil Pencarian "{data.searchparams}"</h5>
</div>

<Loadcari data={data}/>
