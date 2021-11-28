<script lang="ts">
	// import {db} from './db'
	import {onMount} from 'svelte'
	import EpisodeCard from './components/EpisodeCard.svelte'
	import jsonList from './episodes.json'

	interface Episode {
		id: number
		episode_name: string
		publish_date: string 
		description: string
		itunes_url: string 
		spotify_url: string
		episode_len: number
	}

	let episodes:Array<Episode> = jsonList
	let loading:Boolean = true
	let page:number = 0
	let pageList = episodes.slice(page, page + 5)

		// async function getEpisodeData() {
			// let {data, error} = await db.from('Episodes').select('*').range(page, page + 9).order('id', {ascending: true})

			// if (error) {
			// 	console.log(error.message)
			// }
			// 	console.log(data)
			// 	episodes = data
			// 	loading = false
			
		// }

		onMount(() => {
			loading = false
		})

		function changePage(e) {
			if (e.target.name == 'next') {
				page += 5
				pageList = episodes.slice(page, page + 5)
				console.log(page, pageList)
			}

			if (e.target.name == 'prev') {
				page -= 5
				pageList = episodes.slice(page, page + 5)
				console.log(page, pageList)
			}
		}
	
</script>

<main>
	<img src='tck_logo.jpeg' alt='Logo for True Crime Kent podcast. Crude drawing of a redneck giving a thumbs up, standing next to a trailer on cinderblocks and an old pickup truck.' />
	{#if loading}
		<p>Loading...</p>

	{:else}
		{#each pageList as episode}
			<EpisodeCard episodeData={episode} />
		{/each}
		{#if page < 5}
		<button on:click|preventDefault={changePage} name="next">Next</button>
		{:else if page >= episodes.length -4}
		<button on:click|preventDefault={changePage} name='prev'>Prev</button>
		{:else}
		<div class="btn-container">
			<button on:click|preventDefault={changePage} name='prev'>Prev</button>
			<button on:click|preventDefault={changePage} name="next">Next</button>
		</div>
		{/if}
		{/if}
</main>

<style>
	main {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
	}

	img {
		width: 250px;
		height: 250px;
	}

	.btn-container {
		display: flex;
		flex-direction: row;
	}

	button {
		margin: 5px;
		padding: 5px 15px;
		border: 1px solid slategray;
		border-radius: 15px;
		color: slategray;
		background-color: transparent;
	}

	button:hover {
		background-color: lightsteelblue;
		color: white;
	}

	@media (max-width: 640px) {

		img {
			width: 175px;
			height: 175px;
		}
	}
</style>