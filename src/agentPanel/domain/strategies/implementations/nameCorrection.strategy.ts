/* eslint-disable @typescript-eslint/no-unused-vars */
import { MdEdit } from "react-icons/md";
import {
  AggregatorType,
  type IServiceStrategy,
} from "../../models/strategy.types";
import { getGreeting, getHonorific } from "../../../utils/formatters";

export const NameCorrectionService: IServiceStrategy = {
  icon: MdEdit,
  title: "Correção de Nome",
  inputs: [
    { id: "name", label: "Nome Atual" },
    { id: "pnr", label: "PNR" },
    { id: "correctName", label: "Nome Correto" },
  ],
  checklist: [
    { id: "has_data", label: "Dados Pessoais Preenchidos", completed: false },
    { id: "pnr_valid", label: "PNR Identificado", completed: false },
    {
      id: "name_validated",
      label: "Nome Correto Informado",
      completed: false,
    },
  ],
  alerts: [
    { id: "pnr_empty", label: "Código de reserva pendente." },
    {
      id: "rules_not_copied",
      label: "Regras de correção (letras x titularidade) pendentes.",
    },
  ],
  scripts: [
    {
      id: "welcome_and_needs",
      label: "Acolhimento e Entendimento do Erro de Digitação (M1)",
      content: (values: Record<string, string>) =>
        `${getGreeting()}, ${getHonorific(values.gender, values.name)}! Meu nome é ${values.agentName}. Identificou algum erro no nome da sua passagem? Fique tranquilo(a), vou te ajudar a verificar as possibilidades de correção.`,
    },
    {
      id: "data_collection",
      label: "Solicitação do Localizador/PNR (M2)",
      content: (_: Record<string, string>) =>
        `Para acessar a sua passagem, por gentileza, me informe o seu localizador (PNR de 6 dígitos).`,
    },
    {
      id: "data_confirmation",
      label: "Conferência do Nome (Passagem vs. Documento) (M3)",
      content: (values: Record<string, string>) =>
        `Localizei a reserva ${values.pnr || "[PNR]"}. Como o nome está escrito atualmente na passagem e qual é a forma exata e correta que consta no seu documento de identidade que será usado no embarque?`,
    },
    {
      id: "correction_rules",
      label:
        "Análise da Regra (Erro Ortográfico vs. Troca de Titularidade) (M4/M5)",
      content: (_: Record<string, string>) =>
        `Apenas para alinhar: correções de até 3 letras (erros de digitação) ou inversão de sobrenomes são feitas sem custo, desde que não alterem a pessoa física. A alteração total de titularidade (passar a passagem para outra pessoa) não é permitida por lei. Como seu caso se enquadra na correção de erro de digitação, vamos ajustar agora sem custos.`,
    },
    {
      id: "resolution_confirmation",
      label: "Efetivação Sistêmica da Correção Nominal (M6)",
      content: (values: Record<string, string>) =>
        `Pronto! O nome na reserva ${values.pnr || "[PNR]"} foi corrigido com sucesso para "${values.correctName || "[NOME CORRETO]"}". Um novo e-mail de confirmação foi enviado. Ficou alguma dúvida?`,
    },
    {
      id: "post_sales_and_survey",
      label: "Despedida e Pesquisa de Satisfação (M7/M8)",
      content: (values: Record<string, string>) =>
        `Fico feliz em ter resolvido isso para você, ${getHonorific(values.gender, values.name)}. Desejo uma ótima viagem! Avalie meu atendimento na pesquisa logo a seguir. Um excelente dia!`,
    },
  ],
  links: [
    {
      id: "name_correction_rules",
      title: "Regras de Correção de Nome",
      ref: "https://www.latamairlines.com/br/pt/central-ajuda/perguntas/correcao-nome",
      type: AggregatorType.GREEN,
    },
  ],
  // autoCheck: (values, copiedScripts) => {
  //   const completed = [];
  //   if (values.name?.length > 3) completed.push("has_data");
  //   if (values.pnr?.length === 6) completed.push("pnr_valid", "pnr_empty");
  //   if (values.correctName?.length > 3) completed.push("name_validated");

  //   if (copiedScripts.includes("correction_rules"))
  //     completed.push("rules_not_copied");
  //   return completed;
  // },
};
