<script lang="ts">
	import { page } from '$app/stores';
	import VideoModal from '$lib/components/VideoModal.svelte';
	import { fly } from 'svelte/transition';
	import MediaGallery from '$lib/components/MediaGallery.svelte';

	$: story = $page.data.story;
	let isModalOpen = false;

	function openModal() {
		isModalOpen = true;
	}
	function closeModal() {
		isModalOpen = false;
	}
</script>

{#if story}
	<div class="profile-container">
		<header class="hero-section" in:fly={{ y: -20, duration: 600 }}>
			<img
				src={story.content.foto_url.filename}
				alt="Foto de {story.content.nome}"
				class="hero-image"
			/>
			<div class="hero-overlay"></div>
			<div class="hero-content">
				<h1 class="influencer-name">{story.content.nome}</h1>
				<p class="influencer-handle">@{story.content.arroba}</p>
				<div class="niche-tags">
					<span class="tag">{story.content.nicho}</span>
				</div>
				<div class="cta-buttons">
					<button class="btn btn-primary" on:click={openModal}>Ver Vídeo Principal</button>
					<a href={story.content.contato_link.url} class="btn btn-secondary">Contato</a>
					<a
						href={story.content.instagram_link.url}
						target="_blank"
						rel="noopener noreferrer"
						class="btn btn-ghost">Ver no Instagram</a
					>
				</div>
			</div>
		</header>

		<div class="main-content">
			<section class="bio-section">
				<h2>Sobre {story.content.nome}</h2>
				<p>{story.content.bio}</p>
			</section>
			<aside class="media-gallery">
				<h2>Galeria</h2>
				{#if story.content.galeria && story.content.galeria.length > 0}
					<MediaGallery images={story.content.galeria} />
				{:else}
					<p class="placeholder-text">Nenhuma imagem na galeria ainda.</p>
				{/if}
			</aside>
		</div>
	</div>
{/if}

<VideoModal bind:isOpen={isModalOpen} videoUrl={story?.content.video_url.url} on:close={closeModal} />

<style>
	.profile-container {
		width: 100%;
	}
	.hero-section {
		position: relative;
		height: 60vh;
		display: flex;
		align-items: center;
		justify-content: center;
		text-align: center;
		color: var(--cor-branca);
	}
	.hero-image {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		object-fit: cover;
		z-index: 1;
	}
	.hero-overlay {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		background: rgba(0, 0, 0, 0.5);
		z-index: 2;
	}
	.hero-content {
		position: relative;
		z-index: 3;
		padding: 2rem;
	}
	.influencer-name {
		font-family: var(--fonte-serif);
		font-size: clamp(2.5rem, 5vw, 4rem);
		margin: 0;
	}
	.influencer-handle {
		font-size: 1.2rem;
		opacity: 0.8;
		margin-top: 0.5rem;
	}
	.niche-tags {
		margin-top: 1.5rem;
	}
	.tag {
		background-color: rgba(255, 255, 255, 0.1);
		border: 1px solid rgba(255, 255, 255, 0.2);
		padding: 0.4rem 1rem;
		border-radius: 50px;
		font-size: 0.9rem;
		font-family: var(--fonte-sans);
		font-weight: 500;
	}
	.cta-buttons {
		margin-top: 2rem;
		display: flex;
		gap: 1rem;
		justify-content: center;
	}
	.btn {
		padding: 0.8rem 1.8rem;
		font-size: 1rem;
		border-radius: 6px;
		font-family: var(--fonte-sans);
		font-weight: 500;
		transition: all 0.2s ease;
		text-decoration: none;
		border: 1px solid transparent;
		cursor: pointer;
	}
	.btn-primary {
		background: var(--cor-destaque);
		color: var(--cor-branca);
	}
	.btn-primary:hover {
		background: #4338ca;
	}
	.btn-secondary {
		background: var(--cor-branca);
		color: var(--cor-texto);
	}
	.btn-secondary:hover {
		background: #f0f0f0;
	}
	.btn-ghost {
		background: transparent;
		color: var(--cor-branca);
		border-color: var(--cor-branca);
	}
	.btn-ghost:hover {
		background: var(--cor-branca);
		color: var(--cor-texto);
	}
	.main-content {
		max-width: 1200px;
		margin: 4rem auto;
		padding: 0 1.5rem;
		display: grid;
		grid-template-columns: 2fr 1fr;
		gap: 3rem;
	}
	.bio-section h2 {
		font-family: var(--fonte-serif);
		font-size: 2rem;
		margin-bottom: 1rem;
	}
	.bio-section p {
		line-height: 1.7;
		color: var(--cor-texto-suave);
	}
	.placeholder-text {
		color: var(--cor-texto-suave);
	}

	@media (max-width: 768px) {
		.main-content {
			grid-template-columns: 1fr;
		}
	}
</style>