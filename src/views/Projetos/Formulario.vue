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

    import { defineComponent, ref } from 'vue';

    import { TipoNotificacao } from "@/interfaces/INotificacao";

    import useNotificador from "@/hooks/notificador";

    import { ALTERAR_PROJETO, CADASTRAR_PROJETO } from "@/store/tipo-acoes";

    import { useRouter } from "vue-router";

    //import { noticacaoMixin } from "@/mixins/notificar";

    export default defineComponent({
        name: 'FormularioView',
        props: {
            id: {
                type: String,
            }
        },
        setup(props) {

            const router = useRouter();

            const store = useStore();
            const { notificar } = useNotificador();
            const nomeDoProjeto = ref("");

            if(props.id) {
                const projeto = store.state.projeto.projetos.find((proj) => proj.id == props.id);
                nomeDoProjeto.value = projeto?.nome || "";
            }

            const lidarComSucesso = () => {
                nomeDoProjeto.value = '';
                notificar(TipoNotificacao.SUCESSO, 'Projeto Cadastrado', 'Pronto, seu projeto foi ser cadastrado');
                router.push('/projetos');
            }

            const salvar = () => {
                if(props.id) {
                    store.dispatch(ALTERAR_PROJETO, {
                        id: props.id,
                        nome: nomeDoProjeto.value
                    }).then(() => lidarComSucesso());
                } else {
                    store.dispatch(CADASTRAR_PROJETO, nomeDoProjeto.value).then(() => lidarComSucesso());
                }
                
            }


            return {
                nomeDoProjeto,
                salvar
            }
        }
    });
</script>