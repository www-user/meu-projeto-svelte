<script>
    import '../app.css';
</script>

<svelte:head>
    <title>Connect - Conectando Marcas e Criadores</title>
    <meta
        name="description"
        content="Connect é a plataforma para encontrar os melhores criadores de conteúdo e influenciadores digitais em sua cidade."
    />
    <meta property="og:title" content="Connect - Conectando Marcas e Criadores" />
    <meta
        property="og:description"
        content="Encontre os melhores criadores de conteúdo para sua marca."
    />
    <meta property="og:type" content="website" />
</svelte:head>

<div class="site-wrapper">
    <header class="site-header">
        <div class="header-content">
            <a href="/" class="logo">Connect</a>
            <nav class="main-nav">
                <a href="/inscreva-se" class="cta-button">Inscreva-se</a>
            </nav>
        </div>
    </header>

    <main class="site-content">
        <slot />
    </main>

    <footer class="site-footer">
        <p>&copy; {new Date().getFullYear()} Connect. Todos os direitos reservados.</p>
    </footer>
</div>

<style>
	.site-wrapper {
		min-height: 100vh;
		display: flex;
		flex-direction: column;
	}

	.site-content {
		flex-grow: 1;
	}

	.site-header {
		padding: 1rem 1.5rem;
		background-color: var(--cor-branca);
		border-bottom: 1px solid var(--cor-borda);
		position: sticky;
		top: 0;
		z-index: 10;
		backdrop-filter: blur(8px);
		background-color: rgba(255, 255, 255, 0.8);
	}

	.header-content {
		max-width: 1200px;
		margin: 0 auto;
		display: flex;
		justify-content: space-between;
		align-items: center;
	}

	.logo {
		font-family: var(--fonte-serif);
		font-weight: 700;
		font-size: 1.5rem;
		color: var(--cor-texto);
		text-decoration: none;
	}

	.cta-button {
		display: inline-block;
		background: var(--cor-destaque);
		color: var(--cor-branca);
		font-family: var(--fonte-sans);
		font-weight: 500;
		font-size: 0.9rem;
		padding: 0.6rem 1.2rem;
		border-radius: 6px;
		text-decoration: none;
		transition: all 0.2s ease;
	}

	.cta-button:hover {
		background: #4338ca;
	}

	.site-footer {
		padding: 2rem 1.5rem;
		text-align: center;
		color: var(--cor-texto-suave);
		background-color: var(--cor-branca);
		border-top: 1px solid var(--cor-borda);
		font-size: 0.9rem;
	}
</style>