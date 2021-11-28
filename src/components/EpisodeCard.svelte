<script lang="ts">
  import Icon from 'fa-svelte'
  import {faSpotify, faApple} from '@fortawesome/free-brands-svg-icons'

    interface Episode {
		id: number
		episode_name: string
		publish_date: string 
		description: string
		itunes_url: string 
		spotify_url: string
    episode_len: number
	}


  
  let expand:boolean = false
  export let episodeData:Episode 

  function convertMils(mils:number):string {
    let hours:number = Math.floor((mils / (1000 * 60 * 60)) % 24)
    let minutes:number = Math.floor((mils / (1000 * 60)) % 60)

    let h:string = hours == 1 ? `${hours.toString()} hour` : `${hours} hours`
    let m:string = minutes == 1 ? `${minutes} min` : `${minutes} minutes`

    return `${h} and ${m}`
  }


</script>

<div class='card'>
  <div class='head'>
    <div class='left'>
      <h2>{episodeData.episode_name}</h2>
      <h5>Publish Date: {episodeData.publish_date}</h5>
      <h6>Length: {convertMils(episodeData.episode_len)}</h6>
    </div>
    <h5 style='align-self:center;'>11:59 Media</h5>
    <div class="links">
      <a href={episodeData.itunes_url} class='icon' ><Icon icon={faApple} /></a>
      <a href={episodeData.spotify_url} class='icon' ><Icon icon={faSpotify} /></a>
    </div>
  </div>
  {#if !expand}
    <article>{episodeData.description.substr(0, 49)}... <span on:click={() => expand = true}>more</span></article>
  {:else}
  <article>{episodeData.description}</article>
  {/if}
</div>

<style>
  .card {
    background-color: #eeeefa;
    margin: 5px;
    padding: 0;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
    border: 1px solid #aaa;
    border-radius: 10px;
    width: 75vw;
    box-shadow: 1px 1px #ddd;
  }

  .card:hover {
    background-color: #eeffff;
  }

  h2, h5, h6 {
    font-weight: 200;
    margin: 0;
    padding-left: 10px;
  }

  .head {
    display: flex;
    flex-direction: row;
    width: 100%;
    border-bottom: 1px solid #aaa;
    padding: 5px;
  }

  .left {
    flex: 1;
    justify-self: start;
  }

  .links {
    align-self: center;
    margin-right: 10px;
  }

  
  .icon {
    color: #224;
    font-size: 1.5rem;
    margin-left: 10px
  }
  
  .icon:hover {
    color: tomato
  }

  article {
    font-weight: 200;
    padding: 10px;
  }

  span {
    color: #4500ff;
  }

  span:hover {
    cursor: pointer;
  }

  @media (max-width: 640px) {
    .card {
      width: 100%;
    }

    .head {
      flex-direction: row;
    }

    .links {
      align-self: flex-endx;
    }
  }


</style>