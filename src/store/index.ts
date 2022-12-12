import { INotificacao } from "@/interfaces/INotificacao";
import IProjeto from "@/interfaces/IProjeto";
import { InjectionKey } from "vue";
import { createStore, Store, useStore as vuexUseStore } from "vuex";
import { ADICIONA_PROJETO, ALTERA_PROJETO, DEFINIR_PROJETOS, EXCLUIR_PROJETO, NOTIFICAR } from "./mutations-type";
import { CADASTRAR_PROJETO, OBTER_PROJETOS, ALTERAR_PROJETO } from "./tipo-acoes";
import http from "@/http";

interface Estado {
    projetos: IProjeto[];
    notificacoes: INotificacao[];
}

export const key: InjectionKey<Store<Estado>> = Symbol();

export const store = createStore<Estado>({
    state: {
        projetos: [],
        notificacoes: [],
    },
    mutations: {
        [ADICIONA_PROJETO](state, nomeDoProjeto: string) {
            const projeto = {
                id: new Date().toISOString(),
                nome: nomeDoProjeto
            } as IProjeto;
            state.projetos.push(projeto);
        },
        [ALTERA_PROJETO](state, projeto: IProjeto) {
            const index = state.projetos.findIndex(proj => proj.id === projeto.id);
            state.projetos[index] = projeto;
        },
        [EXCLUIR_PROJETO](state, id: string) {
            state.projetos = state.projetos.filter(proj => proj.id === id);
        },
        [NOTIFICAR](state, novaNotificacao: INotificacao) {
            novaNotificacao.id = new Date().getTime();
            state.notificacoes.push(novaNotificacao);
            setTimeout(() => {
                state.notificacoes = state.notificacoes.filter(notificacao => notificacao.id != novaNotificacao.id);
            }, 3000);
        },
        [DEFINIR_PROJETOS](state, projetos: IProjeto[]) {
            state.projetos = projetos;
        }
    },
    actions: {
        [OBTER_PROJETOS]({ commit }) {
            http.get('projetos')
            .then(resposta => commit(DEFINIR_PROJETOS, resposta.data));
        },
        [CADASTRAR_PROJETO](contexto, nomeDoProjeto: string) {
            return http.post('/projetos', {
                nome: nomeDoProjeto
            });
        },
        [ALTERAR_PROJETO](contexto, projeto: IProjeto) {
            return http.put(`/projetos/${projeto.id}`, projeto);
        }
    }
});

export function useStore(): Store<Estado> {
    return vuexUseStore(key);
}