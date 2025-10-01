<script lang="ts">
	import { enhance } from '$app/forms';
	import { fly } from 'svelte/transition';
	import type { ActionData } from './$types';

	
	const { form } = $props<{ form: ActionData }>();
</script>

<div class="container" in:fly={{ y: 20, duration: 500 }}>
	<header class="page-header">
		<h1>Junte-se à Nossa Comunidade</h1>
		<p class="subtitle">Submeta seu perfil para avaliação e faça parte da nossa rede curada de criadores.</p>
	</header>

	{#if form?.success}
		<div class="success-state" in:fly={{ y: 10 }}>
			<h2>Inscrição Recebida!</h2>
			<p>Obrigado pelo seu interesse. A sua submissão será avaliada pela nossa equipa e entraremos em contato em breve.</p>
			<a href="/" class="btn btn-secondary">Voltar à Página Inicial</a>
		</div>
	{:else}
		<form method="POST" use:enhance class="signup-form">
			<div class="form-grid">
				<div class="form-group">
					<label for="nome">Nome Completo</label>
					<input type="text" id="nome" name="nome" required value={form?.data?.nome ?? ''} />
					{#if form?.errors?.nome}<span class="error">{form.errors.nome[0]}</span>{/if}
				</div>

				<div class="form-group">
					<label for="email">E-mail de Contato</label>
					<input type="email" id="email" name="email" required value={form?.data?.email ?? ''} />
					{#if form?.errors?.email}<span class="error">{form.errors.email[0]}</span>{/if}
				</div>

				<div class="form-group">
					<label for="arroba">@Handle (Instagram)</label>
					<input type="text" id="arroba" name="arroba" required value={form?.data?.arroba ?? ''} />
					{#if form?.errors?.arroba}<span class="error">{form.errors.arroba[0]}</span>{/if}
				</div>

				<div class="form-group">
					<label for="nicho">Nicho Principal</label>
					<input type="text" id="nicho" name="nicho" required value={form?.data?.nicho ?? ''} />
					{#if form?.errors?.nicho}<span class="error">{form.errors.nicho[0]}</span>{/if}
				</div>
			</div>

			<div class="form-group">
				<label for="bio">Mini-Biografia (até 300 caracteres)</label>
				<textarea id="bio" name="bio" rows="4" required placeholder="Descreva seu trabalho e paixões em poucas palavras...">{form?.data?.bio ?? ''}</textarea>
				{#if form?.errors?.bio}<span class="error">{form.errors.bio[0]}</span>{/if}
			</div>

			<div class="form-group">
				<label for="website">Website ou Portfólio (Opcional)</label>
				<input type="url" id="website" name="website" placeholder="https://exemplo.com" value={form?.data?.website ?? ''} />
				{#if form?.errors?.website}<span class="error">{form.errors.website[0]}</span>{/if}
			</div>

			<button type="submit" class="cta-button">Enviar Inscrição para Análise</button>
		</form>
	{/if}
</div>

<style>
	.container { max-width: 800px; margin: 4rem auto; padding: 2rem; }
	.page-header { text-align: center; margin-bottom: 3rem; }
	h1 { font-family: var(--fonte-serif); font-size: 2.5rem; }
	.subtitle { font-size: 1.1rem; color: var(--cor-texto-suave); margin-top: 0.75rem; }
	.form-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 1.5rem; }
	.form-group { display: flex; flex-direction: column; margin-bottom: 1.5rem; }
	.form-grid + .form-group { margin-top: 1.5rem; }
	label { font-weight: 500; margin-bottom: 0.5rem; }
	input, textarea { width: 100%; padding: 0.8rem; border: 1px solid var(--cor-borda); border-radius: 6px; font-size: 1rem; font-family: var(--fonte-sans); }
	.cta-button { width: 100%; padding: 1rem; font-size: 1.1rem; border: none; cursor: pointer; background: var(--cor-destaque); color: var(--cor-branca); border-radius: 6px; }
	.error { color: #ef4444; font-size: 0.875rem; margin-top: 0.5rem; }
	.success-state { text-align: center; padding: 3rem; background-color: #f9fafb; border-radius: var(--raio-borda); }
	.success-state h2 { font-family: var(--fonte-serif); }
	.success-state p { margin-top: 1rem; color: var(--cor-texto-suave); }
	.success-state .btn { margin-top: 2rem; }
	.btn-secondary { background-color: transparent; border: 1px solid var(--cor-borda); color: var(--cor-texto); }
	@media (max-width: 640px) { .form-grid { grid-template-columns: 1fr; } }
</style>