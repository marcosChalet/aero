/* eslint-disable @typescript-eslint/no-unused-vars */
import { FaShieldDog } from "react-icons/fa6";
import {
  AggregatorType,
  type IServiceStrategy,
} from "../../models/strategy.types";
import { getGreeting, getHonorific } from "../../../utils/formatters";

export const ServiceAnimalService: IServiceStrategy = {
  icon: FaShieldDog,
  title: "Animal de Assistência (ESAN/SVAN)",
  inputs: [
    { id: "name", label: "Nome" },
    { id: "pnr", label: "PNR" },
  ],
  checklist: [
    { id: "has_data", label: "Dados Pessoais Preenchidos", completed: false },
    { id: "pnr_valid", label: "PNR Identificado", completed: false },
  ],
  alerts: [
    { id: "pnr_empty", label: "Código de reserva pendente." },
    {
      id: "route_check_not_copied",
      label: "Aviso de restrição de rota pendente.",
    },
    {
      id: "forms_not_copied",
      label: "Informações sobre formulários médicos pendentes.",
    },
  ],
  scripts: [
    {
      id: "welcome_and_needs",
      label: "Acolhimento e Entendimento da Assistência (M1)",
      content: (values: Record<string, string>) =>
        `${getGreeting()}, ${getHonorific(values.gender, values.name)}! Sou ${values.agentName}. Vamos cuidar para que você e seu animal de assistência tenham uma viagem tranquila e segura. Como posso te ajudar com essa solicitação?`,
    },
    {
      id: "data_collection",
      label: "Solicitação do Localizador/PNR (M2)",
      content: (_: Record<string, string>) =>
        `Para iniciarmos a solicitação, por favor, me informe o código da sua reserva (PNR).`,
    },
    {
      id: "data_confirmation",
      label: "Diferenciação (Cão Guia vs. Suporte Emocional) (M3)",
      content: (values: Record<string, string>) =>
        `Localizei a reserva ${values.pnr || "[PNR]"}. Trata-se de um cão de serviço (cão guia/assistência) ou um cão de suporte emocional (ESAN)?`,
    },
    {
      id: "route_and_rules",
      label: "Validação de Rotas Permitidas (Ex: Colômbia/México) (M4)",
      content: (_: Record<string, string>) =>
        `Importante informar que cães de serviço (treinados) são aceitos em todas as rotas. Já o cão de suporte emocional (ESAN) é aceito exclusivamente em voos com origem ou destino ao México ou Colômbia. O animal deve caber aos seus pés sem obstruir os corredores, ok?`,
    },
    {
      id: "medical_forms",
      label: "Orientações sobre Laudos e Formulário MEDIF (M5)",
      content: (_: Record<string, string>) =>
        `Lembrando que o serviço é isento de taxas. No entanto, é obrigatório preencher o formulário médico (MEDIF) ou apresentar os laudos do psiquiatra/psicólogo com até 48 horas de antecedência do voo pelo nosso site. Posso confirmar o registro da sua solicitação na reserva?`,
    },
    {
      id: "resolution_confirmation",
      label: "Registro da Solicitação e Envio de Links Médicos (M6)",
      content: (values: Record<string, string>) =>
        `Solicitação registrada com sucesso na reserva ${values.pnr || "[PNR]"}! Te enviei por e-mail os links diretos para o envio da documentação médica. Posso ajudar com mais alguma coisa?`,
    },
    {
      id: "post_sales_and_survey",
      label: "Despedida e Pesquisa de Satisfação (M7/M8)",
      content: (_: Record<string, string>) =>
        `Obrigado por escolher a LATAM! Desejo uma viagem maravilhosa. Ao finalizarmos, peço que avalie o meu atendimento de 0 a 5. Até logo!`,
    },
  ],
  links: [
    {
      id: "service_animal",
      title: "Regras Cão de Serviço/Guia",
      ref: "https://www.latamairlines.com/br/pt/experiencia/prepare-sua-viagem/necessidades-especiais/cao-guia",
      type: AggregatorType.GREEN,
    },
    {
      id: "esan",
      title: "Regras Suporte Emocional (ESAN)",
      ref: "https://www.latamairlines.com/br/pt/experiencia/prepare-sua-viagem/necessidades-especiais/cao-assistencia-emocional",
      type: AggregatorType.YELLOW,
    },
  ],
  // autoCheck: (values, copiedScripts) => {
  //   const completed = [];
  //   if (values.name?.length > 3) completed.push("has_data");
  //   if (values.pnr?.length === 6) completed.push("pnr_valid", "pnr_empty");

  //   if (copiedScripts.includes("route_and_rules"))
  //     completed.push("route_check_not_copied");
  //   if (copiedScripts.includes("medical_forms"))
  //     completed.push("forms_not_copied");
  //   return completed;
  // },
};
