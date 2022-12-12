<template>
    <BoxVue>
        <div class="columns" @click="tarefaClicada">
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
        emits: ['aoTarefaClicada'],
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
        methods: {
            tarefaClicada(): void {
                this.$emit('aoTarefaClicada', this.tarefa);
            }
        },
        computed: {
            tempoGasto() : string {
                return new Date(this.tarefa.duracaoEmSegundos * 1000).toISOString().substring(11, 19);
            }
        }
    });
</script>

<style scoped>
   
</style>