<template>
    <div class="box formulario">
        <div class="columns">
            <div class="column is-5" role="form" aria-label="Formulário para criação de uma nova tarefa">
                <input type="text" class="input" placeholder="Qual tarefa você deseja iniciar?" v-model="descricao">
            </div>
            <div class="column is-3">
                <div class="select">
                    <select v-model="idProjeto">
                        <option value="">Selecione um projeto</option>
                        <option :value="projeto.id" v-for="projeto in projetos" :key="projeto.id">
                            {{ projeto.nome }}
                        </option>
                    </select>
                </div>
            </div>
            <div class="column">
                <TemporizadorVue @ao-temporizador-finalizado="finalizarTarefa"/>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
    import { key } from '@/store';
    import { defineComponent, computed } from 'vue';
    import { useStore } from 'vuex';
    import TemporizadorVue from './Temporizador.vue';

    export default defineComponent({
        name: 'FormularioVue',
        emits: ['aoSalvarTarefa'],
        components: {
            TemporizadorVue,
        },
        data() {
            return {
                descricao: '',
                idProjeto: '',
            }
        },
        methods: {
            finalizarTarefa(tempoDecorrido: number): void {
                this.$emit('aoSalvarTarefa', {
                    duracaoEmSegundos: tempoDecorrido,
                    descricao: this.descricao,
                    projeto: this.projetos.find(proj => proj.id === this.idProjeto)
                });
                this.descricao = '';
            }
        },
        setup() {
            const store = useStore(key);
            return {
                projetos: computed(() => store.state.projetos)
            }
        }
    })
</script>

<style>
.formulario {
    background-color: var(--bg-primario);
    color: var(--texto-primario);
}
</style>