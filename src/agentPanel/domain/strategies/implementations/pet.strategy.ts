/* eslint-disable @typescript-eslint/no-unused-vars */
import { MdPets } from "react-icons/md";
import {
  AggregatorType,
  type IServiceStrategy,
} from "../../models/strategy.types";
import { getGreeting, getHonorific } from "../../../utils/formatters";

export const PetService: IServiceStrategy = {
  icon: MdPets,
  title: "PETC/AVIH",
  inputs: [
    { id: "name", label: "Nome do Passageiro" },
    { id: "pnr", label: "PNR" },
    { id: "petWeight", label: "Peso total (Pet + Caixa)" },
  ],
  checklist: [
    { id: "has_data", label: "Dados Pessoais Preenchidos", completed: false },
    { id: "pnr_valid", label: "PNR Identificado", completed: false },
    {
      id: "weight_validated",
      label: "Peso do Pet Validado",
      completed: false,
    },
  ],
  alerts: [
    { id: "pnr_empty", label: "Código de reserva pendente." },
    { id: "weight_empty", label: "Peso do pet não informado." },
    {
      id: "kennel_rules_not_copied",
      label: "Regras da caixa de transporte pendentes.",
    },
    { id: "pet_fee_not_copied", label: "Aviso de taxa de serviço pendente." },
  ],
  scripts: [
    {
      id: "welcome_and_needs",
      label: "Boas-vindas e Preparação para o Pet (M1)",
      content: (values: Record<string, string>) =>
        `${getGreeting()}, ${getHonorific(values.gender, values.name)}! Sou ${values.agentName}. Que legal que você vai viajar com seu pet! Estou aqui para te ajudar a garantir que a viagem dele seja super segura e confortável.`,
    },
    {
      id: "data_collection",
      label: "Solicitação do Localizador/PNR (M2)",
      content: (_: Record<string, string>) =>
        `Para verificarmos a disponibilidade do serviço no seu voo, por gentileza, me informe o código da reserva (PNR).`,
    },
    {
      id: "data_confirmation",
      label: "Validação do Peso Total (Pet + Caixa) (M3)",
      content: (_: Record<string, string>) =>
        `Obrigado! Para definirmos se o seu pet viajará com você na cabine ou no compartimento de cargas (porão), preciso saber: qual é o peso aproximado do pet somado ao peso da caixa de transporte?`,
    },
    {
      id: "pet_proposal_rules",
      label: "Definição de Cabine/Porão e Padrões da Caixa (M4)",
      content: (values: Record<string, string>) => {
        const weight = Number(values.petWeight);
        const location = weight && weight <= 7 ? "na cabine" : "no porão";
        return `Perfeito. Com esse peso, seu pet viajará ${location}. É fundamental que a caixa de transporte tenha ventilação adequada e tamanho suficiente para ele ficar em pé e dar a volta em si mesmo. Além disso, você precisará apresentar o atestado de saúde e carteira de vacinação atualizada no check-in.`;
      },
    },
    {
      id: "pet_fees",
      label: "Aviso de Cobrança da Taxa de Transporte (M5)",
      content: (values: Record<string, string>) =>
        `Sobre o valor do serviço, ${getHonorific(values.gender, values.name)}, a taxa para o transporte do pet é de [VALOR DA TAXA] por trecho. O pagamento pode ser feito agora com cartão de crédito. Podemos prosseguir com a reserva do espaço para o seu pet?`,
    },
    {
      id: "resolution_confirmation",
      label: "Confirmação do Serviço e Regras de Check-in (M6)",
      content: (values: Record<string, string>) =>
        `Tudo certo! O serviço de transporte de pet foi incluído na reserva ${values.pnr || "[PNR]"}. O comprovante de pagamento e as regras detalhadas da caixa de transporte estão indo agora para o seu e-mail. Ficou alguma dúvida sobre o embarque do seu pet?`,
    },
    {
      id: "post_sales_and_survey",
      label: "Despedida e Pesquisa de Satisfação (M7/M8)",
      content: (_: Record<string, string>) =>
        `Foi um prazer te atender! Desejo uma excelente viagem para você e para o seu pet. Peço que não esqueça de avaliar o meu atendimento com uma nota de 0 a 5 na pesquisa que vai aparecer na tela. Um ótimo dia!`,
    },
  ],
  links: [
    {
      id: "pet_cabin",
      title: "Regras Pet na Cabine",
      ref: "https://www.latamairlines.com/br/pt/experiencia/prepare-sua-viagem/viajar-com-animais/mascotes-cabine",
      type: AggregatorType.BLUE,
    },
    {
      id: "pet_hold",
      title: "Regras Pet no Porão",
      ref: "https://www.latamairlines.com/br/pt/experiencia/prepare-sua-viagem/viajar-com-animais/mascotes-porao",
      type: AggregatorType.GREEN,
    },
  ],
  // autoCheck: (values, copiedScripts) => {
  //   const completed = [];
  //   if (values.name?.length > 3) completed.push("has_data");
  //   if (values.pnr?.length === 6) completed.push("pnr_valid", "pnr_empty");
  //   if (values.petWeight?.length > 0)
  //     completed.push("weight_validated", "weight_empty");

  //   if (copiedScripts.includes("pet_proposal_rules"))
  //     completed.push("kennel_rules_not_copied");
  //   if (copiedScripts.includes("pet_fees"))
  //     completed.push("pet_fee_not_copied");
  //   return completed;
  // },
};
