<script>
  import { Router, Link, Route ,navigate} from "svelte-navigator";
  import Navbarmenu from './lib/Navbarmenu.svelte'

  // PAGES
  import Home from './pages/Home.svelte'
  import Request from './pages/Request.svelte'
  import Player from './pages/Player.svelte'
  import Tonton from './pages/Tonton.svelte'
  import Chat from './pages/Chat.svelte'
</script>


<Router>
<Navbarmenu/>
<button 
  on:click={()=>navigate("/chat")}
 class="btn waves waves-effect floatbtn purple">Obrol Bokep</button>
  <div>
    <Route path="/">
      <Home />
    </Route>
    <Route path="request" component={Request} />
    <Route path="chat" component={Chat} />
    <Route path="tonton" component={Tonton} />
    <Route path="/player/:id" let:params>
      <Player id={params.id} />
    </Route>
  </div>
</Router>

<style>
  .floatbtn{
    position: fixed;
    z-index: 3;
    right: 3px;
    bottom: 5px;
    border-radius: 30px;
    width:140px;
    height: 50px
  }
</style>