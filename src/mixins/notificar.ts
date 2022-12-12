import { TipoNotificacao } from "@/interfaces/INotificacao";
import { NOTIFICAR } from "@/store/mutations-type";
import { store } from "@/store";
export const noticacaoMixin = {
    methods: {
        notificar(tipo: TipoNotificacao, titulo: string, texto: string): void {
            store.commit(NOTIFICAR, {
                titulo: titulo,
                texto: texto,
                tipo: tipo,
            });
        }
    }
};