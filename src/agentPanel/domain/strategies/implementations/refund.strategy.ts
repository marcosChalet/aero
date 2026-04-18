/* eslint-disable @typescript-eslint/no-unused-vars */
import { FaWallet } from "react-icons/fa6";
import {
  AggregatorType,
  type IServiceStrategy,
} from "../../models/strategy.types";
import { getGreeting, getHonorific } from "../../../utils/formatters";

export const RefundService: IServiceStrategy = {
  icon: FaWallet,
  title: "Cancelamento e Reembolso",
  inputs: [
    { id: "name", label: "Nome" },
    { id: "pnr", label: "PNR" },
    { id: "ticket", label: "Bilhete" },
  ],
  checklist: [
    { id: "has_data", label: "Dados Pessoais Preenchidos", completed: false },
    { id: "pnr_valid", label: "PNR Identificado", completed: false },
  ],
  alerts: [
    { id: "pnr_empty", label: "Código de reserva pendente." },
    { id: "name_empty", label: "Nome do passageiro pendente." },
    {
      id: "retention_script_not_copied",
      label: "Tentativa de retenção (Travel Voucher) pendente.",
    },
    {
      id: "rules_script_not_copied",
      label: "Regras de multa/reembolso não lidas.",
    },
  ],
  scripts: [
    {
      id: "welcome_and_needs",
      label: "Acolhimento e Motivo do Cancelamento (M1)",
      content: (values: Record<string, string>) =>
        `${getGreeting()}, ${getHonorific(values.gender, values.name)}! Sou ${values.agentName}. Entendo que você deseja realizar um cancelamento. Estou aqui para te auxiliar e apresentar as melhores alternativas.`,
    },
    {
      id: "data_collection",
      label: "Solicitação do Localizador/PNR (M2)",
      content: (_: Record<string, string>) =>
        `Para localizarmos sua passagem e verificarmos as regras da sua tarifa, por favor, me informe o código da reserva (PNR) de 6 dígitos.`,
    },
    {
      id: "data_confirmation",
      label: "Confirmação dos Passageiros Afetados (M3)",
      content: (values: Record<string, string>) =>
        `Localizei a reserva ${values.pnr || "[PNR]"}. Sinto muito que não possa realizar esta viagem agora. Para garantir a segurança do procedimento, poderia confirmar os nomes dos passageiros que terão o voo cancelado?`,
    },
    {
      id: "retention_proposal",
      label: "Tentativa de Retenção via Travel Voucher (M4)",
      content: (values: Record<string, string>) =>
        `Antes de seguirmos com o cancelamento padrão, ${getHonorific(values.gender, values.name)}, gostaria de oferecer a conversão do valor em um Travel Voucher LATAM. Ele é gerado na hora, isento de algumas multas, e você tem até 12 meses para usar em uma nova viagem. O que acha dessa alternativa?`,
    },
    {
      id: "transparency_rules",
      label: "Leitura das Regras de Multa e Estorno (M5)",
      content: (_: Record<string, string>) =>
        `Compreendo sua decisão. De acordo com a tarifa adquirida, o cancelamento possui uma multa de [VALOR MULTA]. O valor a ser reembolsado será de [VALOR FINAL], devolvido na mesma forma de pagamento em até [PRAZO] faturas. Você confirma o cancelamento nestas condições?`,
    },
    {
      id: "resolution_confirmation",
      label: "Efetivação Sistêmica e Geração de Protocolo (M6)",
      content: (values: Record<string, string>) =>
        `O cancelamento da reserva ${values.pnr || "[PNR]"} foi processado com sucesso e o código de protocolo é [PROTOCOLO]. Você receberá o comprovante no seu e-mail. Posso te ajudar com mais alguma informação?`,
    },
    {
      id: "post_sales_and_survey",
      label: "Despedida e Pesquisa de Satisfação (M7/M8)",
      content: (_: Record<string, string>) =>
        `Agradeço por voar LATAM e espero que possamos recebê-lo(a) a bordo no futuro. Por favor, deixe sua avaliação de 0 a 5 sobre o meu atendimento logo após encerrarmos aqui. Um excelente dia!`,
    },
  ],
  links: [
    {
      id: "refund_rules",
      title: "Regras de Reembolso",
      ref: "https://www.latamairlines.com/br/pt/central-ajuda/perguntas/reembolso",
      type: AggregatorType.GREEN,
    },
    {
      id: "travel_voucher",
      title: "Como usar Travel Voucher",
      ref: "https://www.latamairlines.com/br/pt/central-ajuda/perguntas/travel-voucher/o-que-e",
      type: AggregatorType.YELLOW,
    },
  ],
  autoCheck: (values, copiedScripts) => {
    const completed = [];
    if (values.name?.length > 3) completed.push("has_data", "name_empty");
    if (values.pnr?.length === 6) completed.push("pnr_valid", "pnr_empty");

    if (copiedScripts.includes("retention_proposal")) {
      completed.push("retention_script_not_copied");
    }
    if (copiedScripts.includes("transparency_rules")) {
      completed.push("rules_script_not_copied");
    }
    return completed;
  },
};
