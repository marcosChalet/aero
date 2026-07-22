/* eslint-disable @typescript-eslint/no-unused-vars */
import { FaHandsHoldingChild } from "react-icons/fa6";
import {
  AggregatorType,
  type IServiceStrategy,
} from "../../models/strategy.types";
import { getGreeting, getHonorific } from "../../../utils/formatters";

export const UMNRService: IServiceStrategy = {
  icon: FaHandsHoldingChild,
  title: "Menor Desacompanhado (UMNR)",
  inputs: [
    { id: "name", label: "Nome do Solicitante" },
    { id: "pnr", label: "PNR" },
    { id: "minorAge", label: "Idade do Menor" },
  ],
  checklist: [
    { id: "has_data", label: "Dados Pessoais Preenchidos", completed: false },
    { id: "pnr_valid", label: "PNR Identificado", completed: false },
    {
      id: "age_validated",
      label: "Idade do Menor Validada",
      completed: false,
    },
  ],
  alerts: [
    { id: "pnr_empty", label: "Código de reserva pendente." },
    { id: "name_empty", label: "Nome do solicitante pendente." },
    { id: "age_empty", label: "Idade do menor não informada." },
    {
      id: "rules_script_not_copied",
      label: "Regras de documentação pendentes.",
    },
    {
      id: "fee_script_not_copied",
      label: "Aviso de taxa de serviço pendente.",
    },
  ],
  scripts: [
    {
      id: "welcome_and_needs",
      label: "Acolhimento e Entendimento da Demanda (M1)",
      content: (values: Record<string, string>) =>
        `${getGreeting()}, ${getHonorific(values.gender, values.name)}! Meu nome é ${values.agentName}. Entendi que você precisa de informações ou contratar o serviço de Menor Desacompanhado, correto? Vou te auxiliar com todos os detalhes de segurança e documentação.`,
    },
    {
      id: "data_collection",
      label: "Solicitação do Localizador/PNR (M2)",
      content: (_: Record<string, string>) =>
        `Para verificarmos a viabilidade do serviço no voo desejado, você poderia me informar o código da reserva (PNR) ou o trecho que o menor irá voar?`,
    },
    {
      id: "data_confirmation",
      label: "Confirmação da Idade no Dia do Voo (M3)",
      content: (_: Record<string, string>) =>
        `Obrigado. Para garantir que passaremos as regras corretas, poderia me confirmar a idade exata que a criança/adolescente terá no dia do voo?`,
    },
    {
      id: "service_rules",
      label: "Explicação de Regras e Documentação Exigida (M4)",
      content: (values: Record<string, string>) =>
        `Perfeito. Para a idade de ${values.minorAge || "[IDADE]"} anos, o serviço de Menor Desacompanhado é ${Number(values.minorAge) >= 8 && Number(values.minorAge) <= 11 ? "obrigatório" : "opcional"}. É imprescindível apresentar no aeroporto o documento de identidade original do menor e a autorização judicial ou formulário de autorização com firma reconhecida.`,
    },
    {
      id: "fare_and_fees",
      label: "Aviso sobre a Taxa de Serviço (M5)",
      content: (_: Record<string, string>) =>
        `Gostaria de informar que este serviço possui uma taxa adicional de [VALOR DA TAXA] por trecho, que pode ser paga agora via cartão de crédito ou diretamente no aeroporto. Como o(a) senhor(a) prefere seguir?`,
    },
    {
      id: "umnr_informations",
      label: "Solicitação de dados para realizar a solicitação (M4)",
      content: (_: Record<string, string>) =>
        `Por favor, preencha, ou envie na sequência, as informações abaixo para a solicitação de Menor Desacompanhado (UMNR):

          *Informações Gerais:*
            E-mail:

          *Dados do Responsável pela Entrega (Origem):*
            Nome:
            Sobrenome:
            Telefone de Contato:

          *Dados do Responsável pelo Recebimento (Destino):*
            Nome:
            Sobrenome:
            Telefone de Contato:

          ---
          *Nota: Verifique se os dados conferem exatamente com os documentos de identificação que serão apresentados no aeroporto.*
      `,
    },
    {
      id: "resolution_confirmation",
      label: "Inclusão do Serviço e Envio de Comprovante (M6)",
      content: (values: Record<string, string>) =>
        `Serviço adicionado com sucesso à reserva ${values.pnr || "[PNR]"}! O comprovante e as instruções de documentação foram enviados para o seu e-mail. Ficou alguma dúvida sobre o embarque ou há mais algo em que eu possa ajudar?`,
    },
    {
      id: "post_sales_and_survey",
      label: "Despedida e Pesquisa de Satisfação (M7/M8)",
      content: (values: Record<string, string>) =>
        `Agradeço o seu contato com a LATAM, ${getHonorific(values.gender, values.name)}. Desejo uma viagem muito segura e tranquila para o passageiro! Ao encerrar, peço que responda à nossa breve pesquisa de satisfação sobre o meu atendimento de 0 a 5 aqui na tela. Um excelente dia!`,
    },
  ],
  links: [
    {
      id: "umnr_rules",
      title: "Regras Menor Desacompanhado",
      ref: "https://www.latamairlines.com/br/pt/experiencia/prepare-sua-viagem/menores-desacompanhados",
      type: AggregatorType.BLUE, // Substitua pelo seu enum/constante
    },
    {
      id: "docs_needed",
      title: "Documentação Exigida (Brasil)",
      ref: "https://www.latamairlines.com/br/pt/experiencia/prepare-sua-viagem/documentos-viagem",
      type: AggregatorType.YELLOW,
    },
  ],
  // autoCheck: (values, copiedScripts) => {
  //   const completed = [];
  //   if (values.name?.length > 3) completed.push("has_data", "name_empty");
  //   if (values.pnr?.length === 6) completed.push("pnr_valid", "pnr_empty");
  //   if (values.minorAge?.length > 0)
  //     completed.push("age_validated", "age_empty");

  //   if (copiedScripts.includes("service_rules")) {
  //     completed.push("rules_script_not_copied");
  //   }
  //   if (copiedScripts.includes("fare_and_fees")) {
  //     completed.push("fee_script_not_copied");
  //   }
  //   return completed;
  // },
};
