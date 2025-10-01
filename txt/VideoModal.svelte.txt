<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import { fly, fade } from 'svelte/transition';

	export let videoUrl: string;
	export let isOpen: boolean;

	const dispatch = createEventDispatcher();

	function closeModal() {
		dispatch('close');
	}

	function handleKeydown(event: KeyboardEvent) {
		if (isOpen && event.key === 'Escape') {
			closeModal();
		}
	}

	let videoId = '';
	$: if (isOpen && videoUrl) {
		try {
			const patterns = [
				/(?:https?:\/\/)?(?:www\.)?youtube\.com\/watch\?v=([a-zA-Z0-9_-]{11})/,
				/(?:https?:\/\/)?(?:www\.)?youtu\.be\/([a-zA-Z0-9_-]{11})/,
				/(?:https?:\/\/)?(?:www\.)?youtube\.com\/embed\/([a-zA-Z0-9_-]{11})/
			];
			videoId = '';
			for (const pattern of patterns) {
				const match = videoUrl.match(pattern);
				if (match && match[1]) {
					videoId = match[1];
					break;
				}
			}
			if (!videoId) throw new Error('ID do vídeo não encontrado na URL');
		} catch (e) {
			console.error("Erro ao processar URL de vídeo:", videoUrl, e);
			videoId = '';
		}
	} else if (!isOpen) {
		videoId = '';
	}
</script>

<svelte:window on:keydown={handleKeydown} />

{#if isOpen}
    <div role="presentation" class="overlay" on:click|self={closeModal} transition:fade={{ duration: 200 }}>
		<div class="modal-content" transition:fly={{ y: -30, duration: 300 }} role="dialog" aria-modal="true">
			<button class="close-btn" on:click={closeModal} aria-label="Fechar modal">&times;</button>
			{#if videoId}
				<div class="video-container">
                    <iframe
						src="https://www.youtube.com/embed/{videoId}?autoplay=1&rel=0"
						title="YouTube video player"
						frameborder="0"
						allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
						allowfullscreen
					></iframe>
				</div>
			{:else}
				<div class="error-container">
					<p>Não foi possível carregar o vídeo. Verifique a URL.</p>
				</div>
			{/if}
		</div>
	</div>
{/if}

<style>
	/* ... seu CSS continua o mesmo ... */
    .overlay {
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		background: rgba(17, 24, 39, 0.8);
		backdrop-filter: blur(4px);
		z-index: 1000;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.modal-content {
		position: relative;
		background: var(--cor-branca);
		border-radius: var(--raio-borda);
		width: 90%;
		max-width: 800px;
		box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
	}

	.close-btn {
		position: absolute;
		top: -35px;
		right: -10px;
		background: transparent;
		border: none;
		color: var(--cor-branca);
		font-size: 2.5rem;
		cursor: pointer;
		opacity: 0.8;
		transition: opacity 0.2s;
	}

	.close-btn:hover {
		opacity: 1;
	}

	.video-container {
		position: relative;
		padding-bottom: 56.25%; /* Proporção 16:9 */
		height: 0;
		overflow: hidden;
		border-radius: var(--raio-borda);
		background: #000;
	}

	iframe {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
	}

	.error-container {
		padding: 2rem;
		text-align: center;
		font-family: var(--fonte-titulo);
	}
</style>