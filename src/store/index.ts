import { INotificacao } from "@/interfaces/INotificacao";
import { InjectionKey } from "vue";
import { createStore, Store, useStore as vuexUseStore } from "vuex";
import { NOTIFICAR } from "./mutations-type";
import { EstadoProjeto, projeto } from "./modulo/projeto";
import { EstadoTarefa, tarefa } from "./modulo/tarefa";

export interface Estado {
    notificacoes: INotificacao[],
    projeto: EstadoProjeto,
    tarefa: EstadoTarefa
}

export const key: InjectionKey<Store<Estado>> = Symbol();

export const store = createStore<Estado>({
    state: {
        tarefa: {
            tarefas: []
        },
        notificacoes: [],
        projeto: {
            projetos: []
        }
    },
    mutations: {
        [NOTIFICAR](state, novaNotificacao: INotificacao) {
            novaNotificacao.id = new Date().getTime();
            state.notificacoes.push(novaNotificacao);
            setTimeout(() => {
                state.notificacoes = state.notificacoes.filter(notificacao => notificacao.id != novaNotificacao.id);
            }, 3000);
        },
    },
    modules: {
        projeto,
        tarefa
    }
});

export function useStore(): Store<Estado> {
    return vuexUseStore(key);
}