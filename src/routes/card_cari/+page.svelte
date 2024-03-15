<script>
	let searchbokep = ""
</script>
<div class="container" style="margin-top: 10px">
	<a href="/"
   class="btn waves waves-effect pink"
	>kembali</a>
	<h6>Masukin Bokep kesukaaan buat Lu cari Disini</h6>
</div>

<div class="card" style="padding: 2px">
	<p style="font-weight: bold">Masukin bokep yg lu mau cari (kode/artis) bebas</p>
	<input type="text" bind:value={searchbokep}
	placeholder="ketik Bokep disini" 
	>
	<div style="display: flex;justify-content: center">
	<a 
	href={"/cari/" + searchbokep}
	class="btn waves waves-effect blue"
	>Cari Bokep</a>
		
	</div>
</div>