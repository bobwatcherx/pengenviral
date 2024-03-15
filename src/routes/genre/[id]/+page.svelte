<script>
	export let data
  import Loaddata from '../../../components/Loaddata.svelte'

</script>
<div class="container" style="margin-top: 30px">
	<a href="/"
    class="btn waves waves-effect pink" 
	>Kembali</a>
</div>
<Loaddata data={data}/>
