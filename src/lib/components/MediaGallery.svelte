<script lang="ts">
	type ImageAsset = {
		id: number;
		filename: string;
		alt: string;
	};

	const { images } = $props<{ images: ImageAsset[] }>();
</script>

<div class="gallery-grid">
	{#each images as image (image.id)}
		<div class="gallery-item">
			<img
				src={image.filename + '/m/20x0/filters:blur(10)'}
				alt=""
				class="placeholder"
				aria-hidden="true"
			/>
			<img
				src={image.filename + '/m/600x0/filters:format(webp)'}
				alt={image.alt || 'Imagem da galeria'}
				class="full-res"
				loading="lazy"
				decoding="async"
				onload={(event) => ((event.currentTarget as HTMLImageElement).style.opacity = '1')}
			/>
		</div>
	{/each}
</div>

<style>
	
	.gallery-grid {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
		gap: 1rem;
	}
	.gallery-item {
		position: relative;
		aspect-ratio: 1 / 1;
		overflow: hidden;
		border-radius: var(--raio-borda);
		background-color: #f0f0f0;
	}
	.gallery-item img {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		object-fit: cover;
	}
	.placeholder {
		filter: blur(5px);
	}
	.full-res {
		opacity: 0;
		transition: opacity 0.4s ease-in-out;
	}
</style>