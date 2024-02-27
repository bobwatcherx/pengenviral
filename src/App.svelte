<script>
  import { Router, Link, Route ,navigate} from "svelte-navigator";
  import Navbarmenu from './lib/Navbarmenu.svelte'

  // PAGES
  import Home from './pages/Home.svelte'
  import Request from './pages/Request.svelte'
  import Player from './pages/Player.svelte'
  import Tonton from './pages/Tonton.svelte'
  import Chat from './pages/Chat.svelte'
  import Cari from './pages/Cari.svelte'
  import Downloadvideo from './pages/Downloadvideo.svelte'
  import Exportlink from './pages/Exportlink.svelte'

  // TOGGLE DARK MODE
  let darkMode = false;
    function toggle() {
        darkMode = !darkMode;
        window.document.body.classList.toggle('dark');
    }
</script>


<Router>
<Navbarmenu/>

  <div>

    <!-- FLOAT BUTTON -->
    <button class="btn waves waves-effect  floatbtn" on:click={toggle}>
    {#if darkMode }
        <i class="material-icons">wb_sunny</i> GELAP
    {:else}
        <i class="material-icons">nights_stay</i> TERANG
    {/if}
    </button>


    <Route path="/">
      <Home />
    </Route>
    <Route path="request" component={Request} />
    <Route path="chat" component={Chat} />
    <Route path="tonton" component={Tonton} />
    <Route path="cari" component={Cari} />
    <Route path="download" component={Downloadvideo} />
    <Route path="exportlink" component={Exportlink} />
    <Route path="/player/:id" let:params>
      <Player id={params.id} />
    </Route>
  </div>
</Router>

<style>
  .floatbtn{
    position: fixed;
    z-index: 3;
    left: 3px;
    bottom: 107px;
    border-radius: 30px;
    width:140px;
    height: 50px;
    background: black;
    border: 3px solid var(--text-color);
  }

  :root{
        --bg-color: #FFFFFF;
        --text-color: black;
    }
    :global(body) {
        background: var(--bg-color);
        color: var(--text-color);
    }
    
    :global(body.dark) {
        --bg-color: #000000;
        --text-color: pink;
    }


</style>