<template>
    <header>
        <h1>
            <img src="../assets/logo.png" alt="Logo Alura Tracker">
        </h1>
        <button class="button" @click="alterarTema">
            {{ textoBotao }}
        </button>
        <nav class="panel mt-5">
            <ul>
                <li>
                    <RouterLink to="/" class="link">
                        <i class="fas fa-tasks"></i>
                        Tarefas
                    </RouterLink>
                </li>
                <li>
                    <RouterLink to="/projetos" class="link">
                        <i class="fas fa-project-diagram"></i>
                        Projetos
                    </RouterLink>
                </li>
            </ul>
        </nav>
    </header>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { RouterLink } from 'vue-router';
export default defineComponent({
    name: "BarraLateral",
    emits: ["aoTemaAlterado"],
    data() {
        return {
            modoEscuroAtivo: false,
        };
    },
    computed: {
        textoBotao(): string {
            if (this.modoEscuroAtivo) {
                return "Desativar modo escuro";
            }
            return "Ativar modo escuro";
        },
    },
    methods: {
        alterarTema() {
            this.modoEscuroAtivo = !this.modoEscuroAtivo;
            this.$emit("aoTemaAlterado", this.modoEscuroAtivo);
        },
    },
    components: { RouterLink }
})
</script>

<style scoped>
header {
    padding: 1rem;
    background-color: #0d3b66;
    width: 100%;
    height: 100vh;
    text-align: center;
}
@media only screen and (max-with: 768px) {
    header {
        padding: 2.5rem;
        height: auto;
    }
}
.panel li {
    margin: 8px 0;
}
.link {
    color: #fff;
}
.link:hover {
    color: #faf0ca;
}
.link.router-link-active {
    color: #faf0ca;
}
</style>