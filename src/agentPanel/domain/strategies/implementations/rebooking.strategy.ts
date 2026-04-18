/* eslint-disable @typescript-eslint/no-unused-vars */
import { GiAirplaneDeparture } from "react-icons/gi";
import { getGreeting, getHonorific } from "../../../utils/formatters";
import {
  AggregatorType,
  type IServiceStrategy,
} from "../../models/strategy.types";

export const RebookingService: IServiceStrategy = {
  icon: GiAirplaneDeparture,
  title: "Remarcação",
  inputs: [
    { id: "name", label: "Nome" },
    { id: "pnr", label: "PNR" },
  ],
  checklist: [
    { id: "has_data", label: "Dados Pessoais Preenchidos", completed: false },
    { id: "pnr_valid", label: "PNR Identificado", completed: false },
  ],
  alerts: [
    { id: "pnr_error", label: "Código de reserva inválido." },
    { id: "pnr_empty", label: "Código de reserva pendente." },
    { id: "name_empty", label: "Nome do passageiro pendente." },
    { id: "itinerary_script_not_copied", label: "Novo itinerário pendente." },
    { id: "fare_script_not_copied", label: "Nova tarifa pendente." },
    {
      id: "confirmation_script_not_copied",
      label: "Confirmação de remarcação pendente.",
    },
    { id: "epa_script_not_copied", label: "EPA pendente." },
  ],
  scripts: [
    {
      id: "welcome_and_needs",
      label: "Boas vindas e identificação da necessidade",
      content: (
        values: Record<string, string>,
      ) => `${getGreeting()}, ${getHonorific(values.gender, values.name)}! Me chamo ${values.agentName}
          e estou aqui para te ajudar com sua remarcação. Para que eu possa entender melhor
          e te oferecer a melhor solução, poderia me dar mais detalhes sobre a sua solicitação?`,
    },
    {
      id: "data_collection",
      label: "Coleta de dados (Identificação)",
      content: (
        _: Record<string, string>,
      ) => `Com certeza, vamos verificar isso agora. Para localizar sua viagem, por gentileza, forneça o
          código da reserva (localizador).`,
    },
    {
      id: "data_confirmation",
      label: "Análise (Confirmação de dados)",
      content: (
        values: Record<string, string>,
      ) => `${getHonorific(values.gender, values.name)}, Para garantir a segurança dos seus dados,
          poderia confirmar o nome completo do/dos passageiros em questão da reserva ${values.pnr}?`,
    },
    {
      id: "itinerary_proposal",
      label: "Proposta de Solução (Itinerário)",
      content: (
        values: Record<string, string>,
      ) => `Entendido. Para buscarmos as melhores opções de voo, qual seria o novo itinerário
          e a data desejada paraa reserva ${values.pnr}?`,
    },
    {
      id: "fare_options",
      label: "Transparência e Execução (Tarifas)",
      content: (
        values: Record<string, string>,
      ) => `Encontrei as opções disponíveis! Sobre os valores, ${getHonorific(values.gender, values.name)}, você prefere
          manter a mesma categoria de tarifa atual ou gostaria de conhecer opções com diferentes benefícios (como bagagem ou flexibilidade)?`,
    },
    {
      id: "resolution_confirmation",
      label: "Confirmação de Resolução e Pesquisa (Adicionados)",
      content: (
        values: Record<string, string>,
      ) => `Pronto! A alteração da reserva ${values.pnr} foi realizada com sucesso
          e os detalhes atualizados chegarão no seu e-mail em instantes. Ficou mais alguma dúvida em que eu possa te ajudar agora
          ou considera que o motivo da sua ligação foi totalmente atendido?`,
    },
    {
      id: "post_sales_and_survey",
      label: "Pós-venda e Relacionamento (Adicionado)",
      content: (
        values: Record<string, string>,
      ) => `Com tudo finalizado, ${getHonorific(values.gender, values.name)}, te desejo desde já uma excelente viagem
          e conte conosco para o que precisar! Ah, só um aviso: ao final aqui do chat, aparecerá uma rápida avaliação de 0 a 5 sobre o meu atendimento.
          Além disso, em até 24h, você receberá por e-mail uma pesquisa um pouco mais detalhada, de 0 a 10. Se puder responder, me ajuda muito!`,
    },
  ],
  links: [
    {
      id: "fares",
      title: "Tarifas",
      ref: "https://latam.com/tarifas",
      type: AggregatorType.BLUE,
    },
    {
      id: "benefits",
      title: "Tarifas e Benefícios",
      ref: "https://www.latamairlines.com/br/pt/experiencia/prepare-sua-viagem/tarifas",
      type: AggregatorType.BLUE,
    },
    {
      id: "noshow",
      title: "Realizar No Show",
      ref: "https://www.latamairlines.com/br/pt/central-ajuda/perguntas/remarcacoes/passagens/ida-nao-voada",
      type: AggregatorType.GREEN,
    },
    {
      id: "rebooking_noshow",
      title: "Remarcar Reserva em Aberto",
      ref: "https://www.latamairlines.com/es/pt/central-ajuda/perguntas/remarcacoes/passagens/remarcar-passagem-aberta",
      type: AggregatorType.GREEN,
    },
    {
      id: "latam_flex",
      title: "LATAM FLEX",
      ref: "https://www.latamairlines.com/es/pt/central-ajuda/perguntas/remarcacoes/latam-flex/como-usar",
      type: AggregatorType.YELLOW,
    },
  ],
  autoCheck: (values, copiedScripts) => {
    const completed = [];
    if (values.name?.length > 3) completed.push("has_data", "name_empty");
    if (values.pnr?.length === 6)
      completed.push("pnr_valid", "pnr_empty", "pnr_error");
    if (
      ["itinerary_proposal"].every((scriptId: string) =>
        copiedScripts.includes(scriptId),
      )
    ) {
      completed.push("itinerary_script_not_copied");
    }
    return completed;
  },
};
