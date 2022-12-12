<template>
    <FormularioVue @ao-salvar-tarefa="salvarTarefa"/>
    <div id="listaTarefa" class="lista">
        <TarefaVue v-for="(tarefa, index) in tarefas" :key="index" :tarefa="tarefa"/>
        <Box v-if="listaEstaVazia">
        Você não está muito produtivo hoje :(
        </Box>
    </div>
</template>
  
<script lang="ts">
    import { defineComponent } from 'vue';

    import Box from '../components/Box.vue';

    import FormularioVue from '../components/Formulario.vue';

    import TarefaVue from '../components/Tarefa.vue';

    import ITarefa from '../interfaces/ITarefa';

    export default defineComponent({
    name: 'App',
    components: {
        FormularioVue,
        TarefaVue,
        Box,
    },
    data() {
        return {
        tarefas: [] as ITarefa[],
        }
    },
    computed: {
        listaEstaVazia(): boolean {
        return this.tarefas.length === 0;
        }
    },
    methods: {
        salvarTarefa(tarefa: ITarefa) {
        this.tarefas.push(tarefa);
        },
    },
    });
</script>
