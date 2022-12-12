<template>
    <section>
        <form @submit.prevent="salvar">
            <div class="field">
                <label for="nomeDoProjeto" class="label">
                    Nome do Projeto
                </label>
                <input type="text" name="nomeDoProjeto" id="nomeDoProjeto" class="input" v-model="nomeDoProjeto">
            </div>
            <div class="field">
                <button type="submit" class="button">
                    Salvar
                </button>
            </div>
        </form>
    </section>
</template>

<script lang="ts">
    import { useStore } from "@/store";

    import { defineComponent } from 'vue';

    import { ADICIONA_PROJETO } from "@/store/mutations-type";

    import { TipoNotificacao } from "@/interfaces/INotificacao";

    import useNotificador from "@/hooks/notificador";
    
    import { ALTERAR_PROJETO } from "@/store/tipo-acoes";

    //import { noticacaoMixin } from "@/mixins/notificar";

    export default defineComponent({
        name: 'FormularioView',
        props: {
            id: {
                type: String,
            }
        },
        /* mixins: [
            noticacaoMixin
        ], */
        mounted() {
            console.log(this.store.state.projetos);
            if(this.id) {
                const projeto = this.store.state.projetos.find(proj => proj.id === this.id);
                this.nomeDoProjeto = projeto?.nome || '';
            }
        },
        data () {
            return {
                nomeDoProjeto: '',
            };
        },
        methods: {
            salvar() {
                if(this.id) {
                    this.store.commit(ALTERAR_PROJETO, {
                        id: this.id,
                        nome: this.nomeDoProjeto
                    });
                } else {
                    this.store.commit(ADICIONA_PROJETO, this.nomeDoProjeto);
                }
                this.nomeDoProjeto = '';

                this.notificar(TipoNotificacao.SUCESSO, 'Projeto Cadastrado', 'Pronto, seu projeto foi ser cadastrado');

                this.$router.push('/projetos');
            }
        },
        setup() {
            const store = useStore();
            const { notificar } = useNotificador()
            return {
                store,
                notificar
            }
        }
    });
</script>