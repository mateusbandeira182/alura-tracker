<template>
    <FormularioVue @ao-salvar-tarefa="salvarTarefa" />

    <div id="listaTarefa" class="lista">
        <Box v-if="listaEstaVazia">
            Você não está muito produtivo hoje :(
        </Box>
        <div class="field">
            <p class="control has-icons-left">
                <input class="input" type="text" placeholder="Digite para filtrar" v-model="filtro">
                <span class="icon is-small is-left">
                    <i class="fas fa-search"></i>
                </span>
            </p>
        </div>
        <TarefaVue v-for="(tarefa, index) in tarefas" :key="index" :tarefa="tarefa"
            @ao-tarefa-clicada="selecionarTarefa" />
        <Modal :mostrar="tarefaSelecionada != null">
            <template v-slot:cabecalho >
                <p class="modal-card-title">Editar tarefa</p>
                <button class="delete" aria-label="close" @click="fecharModal"></button>
            </template>
            <template v-slot:corpo>
                <div class="field">
                    <label for="descricaoDaTarefa" class="label">
                        Descrição
                    </label>
                    <input type="text" name="descricaoDaTarefa" id="descricaoDaTarefa" class="input"
                        v-model="tarefaSelecionada.descricao">
                </div>
            </template>
            <template v-slot:rodape>
                <button @click="alterarTarefa" class="button is-success">Salvar alterações</button>
                <button @click="fecharModal" class="button">Cancelar</button>
            </template>
        </Modal>
    </div>
</template>
  
<script lang="ts">

import { computed, defineComponent, ref, watchEffect } from 'vue';

import { useStore } from '@/store';

import Box from '../components/Box.vue';

import FormularioVue from '../components/Formulario.vue';

import TarefaVue from '../components/Tarefa.vue';

import { OBTER_TAREFAS, CADASTRAR_TAREFA, OBTER_PROJETOS, ALTERAR_TAREFA } from '@/store/tipo-acoes';

import ITarefa from '@/interfaces/ITarefa';
import Modal from '@/components/Modal.vue';

export default defineComponent({
    name: 'App',
    components: {
        FormularioVue,
        TarefaVue,
        Box,
        Modal
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
        fecharModal() {
            this.tarefaSelecionada = null;
        },
        alterarTarefa() {
            this.store.dispatch(ALTERAR_TAREFA, this.tarefaSelecionada).then(() => this.fecharModal());
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

        const filtro = ref("");

        watchEffect(() => {
            store.dispatch(OBTER_TAREFAS, filtro.value);
        });

        //const tarefas = computed((t) => !filtro.value || t.descricao.includes(filtro.value));

        return {
            tarefas: computed(() => store.state.tarefa.tarefas),
            store,
            filtro
        }
    }
});
</script>
