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

    import { TipoNotificacao } from "@/interfaces/INotificacao";

    import useNotificador from "@/hooks/notificador";

    import { ALTERAR_PROJETO, CADASTRAR_PROJETO } from "@/store/tipo-acoes";

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
            if(this.id) {
                const projeto = this.store.state.projetos.find((proj) => proj.id == this.id);
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
                    this.store.dispatch(ALTERAR_PROJETO, {
                        id: this.id,
                        nome: this.nomeDoProjeto
                    }).then(() => this.lidarComSucesso());
                } else {
                    this.store.dispatch(CADASTRAR_PROJETO, this.nomeDoProjeto).then(() => this.lidarComSucesso());
                }
                
            },
            lidarComSucesso() {
                this.nomeDoProjeto = '';
                this.notificar(TipoNotificacao.SUCESSO, 'Projeto Cadastrado', 'Pronto, seu projeto foi ser cadastrado');
                this.$router.push('/projetos');
            },
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