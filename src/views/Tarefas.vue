<template>
    <FormularioVue @ao-salvar-tarefa="salvarTarefa" />

    <div id="listaTarefa" class="lista">
        <Box v-if="listaEstaVazia">
            Você não está muito produtivo hoje :(
        </Box>
        <TarefaVue v-for="(tarefa, index) in tarefas" :key="index" :tarefa="tarefa" @ao-tarefa-clicada="selecionarTarefa"/>
        <div class="modal" :class="{ 'is-active': tarefaSelecionada }">
            <div class="modal-background"></div>
            <div class="modal-card">
                <header class="modal-card-head">
                    <p class="modal-card-title">Modal title</p>
                    <button class="delete" aria-label="close"></button>
                </header>
                <section class="modal-card-body">
                    <!-- Content ... -->
                </section>
                <footer class="modal-card-foot">
                    <button class="button is-success">Save changes</button>
                    <button class="button">Cancel</button>
                </footer>
            </div>
        </div>
    </div>
</template>
  
<script lang="ts">

import { computed, defineComponent } from 'vue';

import { useStore } from '@/store';

import Box from '../components/Box.vue';

import FormularioVue from '../components/Formulario.vue';

import TarefaVue from '../components/Tarefa.vue';

import { OBTER_TAREFAS, CADASTRAR_TAREFA, OBTER_PROJETOS } from '@/store/tipo-acoes';

import ITarefa from '@/interfaces/ITarefa';

export default defineComponent({
    name: 'App',
    components: {
        FormularioVue,
        TarefaVue,
        Box,
    },
    data() {
       return {
        tarefaSelecionada: null as ITarefa | null
       } 
    },
    methods: {
        salvarTarefa(tarefa: ITarefa) {
            this.store.dispatch(CADASTRAR_TAREFA, tarefa);
        },
        selecionarTarefa(tarefa: ITarefa) {
            this.tarefaSelecionada = tarefa;
        },
    },
    computed: {
        listaEstaVazia(): boolean {
            return this.tarefas.length == 0;
        }
    },
    setup() {
        const store = useStore();
        store.dispatch(OBTER_TAREFAS);
        store.dispatch(OBTER_PROJETOS);
        return {
            tarefas: computed(() => store.state.tarefas),
            store
        }
    }
});
</script>
