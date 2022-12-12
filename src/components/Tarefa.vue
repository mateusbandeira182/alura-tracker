<template>
    <BoxVue>
        <div class="columns">
            <div class="column is-4">
                {{ tarefa.descricao || 'Tarefa sem descrição' }}
            </div>
            <div class="column is-3">
                {{ tarefa.projeto?.nome || 'N/D' }}
            </div>
            <div class="column">
                <CronometroVue :tempo-em-segundos="tarefa.duracaoEmSegundos"/>
            </div>
        </div>
    </BoxVue>
</template>

<script lang="ts">
    import ITarefa from '@/interfaces/ITarefa';
    import { defineComponent, PropType } from 'vue';
    import CronometroVue from './Cronometro.vue';
    import BoxVue from './Box.vue';
    export default defineComponent({
        name: "TarefaVue",
        components: {
            CronometroVue,
            BoxVue,
        },
        props: {
            tarefa: {
                type: Object as PropType<ITarefa>,
                required: true,
            }
        },
    });
</script>

<style scoped>
   
</style>