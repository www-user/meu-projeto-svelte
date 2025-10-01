<script lang="ts">
	import InfluencerCard from '$lib/components/InfluencerCard.svelte';
	import VideoModal from '$lib/components/VideoModal.svelte';
	import { fly } from 'svelte/transition';
	import { page } from '$app/stores';
	import type { Influencer } from '$lib/types';

	$: data = $page.data;
	let activeNicho = 'todos';

	$: nichos = data.influencers
		? ['todos', ...new Set(data.influencers.map((i: Influencer) => i.nicho))]
		: ['todos'];

	$: filteredInfluencers =
		!data.influencers
			? []
			: activeNicho === 'todos'
			? data.influencers
			: data.influencers.filter((i: Influencer) => i.nicho === activeNicho);
</script>

<div class="container">
	<header class="page-header">
		<h1 in:fly={{ y: -20, duration: 600, delay: 200 }}>UconnectS</h1>
		<p class="subtitle" in:fly={{ y: -20, duration: 600, delay: 300 }}>
			Conectando marcas e criadores de conteúdo em sua cidade.
		</p>
	</header>

	<div class="filtros-container" in:fly={{ y: -20, duration: 600, delay: 400 }}>
		{#each nichos as nicho}
			<button
				class="filtro-btn"
				class:active={nicho === activeNicho}
				on:click={() => (activeNicho = nicho)}
			>
				{nicho}
			</button>
		{/each}
	</div>

	<h2 class="visually-hidden">Nossos Criadores de Conteúdo</h2>

	{#if filteredInfluencers && filteredInfluencers.length > 0}
		<div class="grid">
			{#each filteredInfluencers as influencer, i (influencer.id)}
				<div in:fly={{ y: 20, duration: 500, delay: 500 + i * 80 }} style="min-width: 0;">
					<InfluencerCard {influencer} />
				</div>
			{/each}
		</div>
	{:else}
		<p class="loading-state">Carregando influenciadores...</p>
	{/if}
</div>

<style>
	.container {
		max-width: 1200px;
		margin: 0 auto;
		padding: 4rem 1.5rem;
	}
	.page-header {
		text-align: center;
		margin-bottom: 4rem;
	}
	h1 {
		font-family: var(--fonte-serif);
		font-size: 3rem;
		color: var(--cor-texto);
		font-weight: 700;
	}
	.subtitle {
		font-size: 1.1rem;
		color: var(--cor-texto-suave);
		margin-top: 0.75rem;
		max-width: 450px;
		margin-left: auto;
		margin-right: auto;
	}
	.filtros-container {
		display: flex;
		justify-content: center;
		flex-wrap: wrap;
		gap: 0.75rem;
		margin-bottom: 4rem;
	}
	.filtro-btn {
		background: transparent;
		color: var(--cor-texto-suave);
		border: 1px solid var(--cor-borda);
		padding: 0.5rem 1.25rem;
		border-radius: 50px;
		font-family: var(--fonte-sans);
		font-weight: 500;
		font-size: 0.9rem;
		cursor: pointer;
		text-transform: capitalize;
		transition: all 0.2s ease;
	}
	.filtro-btn:hover {
		border-color: var(--cor-destaque);
		color: var(--cor-destaque);
	}
	.filtro-btn.active {
		background: var(--cor-destaque);
		color: var(--cor-branca);
		border-color: var(--cor-destaque);
	}
	.grid {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
		gap: 2.5rem;
	}
	.loading-state {
		text-align: center;
		color: var(--cor-texto-suave);
		font-size: 1.2rem;
		padding: 4rem 0;
	}
	.visually-hidden {
		border: 0;
		clip: rect(0 0 0 0);
		height: 1px;
		margin: -1px;
		overflow: hidden;
		padding: 0;
		position: absolute;
		width: 1px;
	}
</style>