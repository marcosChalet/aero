/* eslint-disable @typescript-eslint/no-unused-vars */
import { GiAirplaneDeparture } from "react-icons/gi";
import { getGreeting, getHonorific } from "../utils/formatters";
import type { CategoryStrategy } from "./types";
import { FaHandsHoldingChild, FaShieldDog, FaWallet } from "react-icons/fa6";
import { AggregatorType } from "../types/aggregator";
import {
  MdEdit,
  MdManageAccounts,
  MdOutlineWheelchairPickup,
  MdPets,
  MdAssistWalker,
} from "react-icons/md";

export const STRATEGIES: Record<string, CategoryStrategy> = {
  REBOOKING: {
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
  },
  UMNR: {
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
    autoCheck: (values, copiedScripts) => {
      const completed = [];
      if (values.name?.length > 3) completed.push("has_data", "name_empty");
      if (values.pnr?.length === 6) completed.push("pnr_valid", "pnr_empty");
      if (values.minorAge?.length > 0)
        completed.push("age_validated", "age_empty");

      if (copiedScripts.includes("service_rules")) {
        completed.push("rules_script_not_copied");
      }
      if (copiedScripts.includes("fare_and_fees")) {
        completed.push("fee_script_not_copied");
      }
      return completed;
    },
  },

  CANCELLATION: {
    icon: FaWallet,
    title: "Cancelamento e Reembolso",
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
  },
  PET: {
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
    autoCheck: (values, copiedScripts) => {
      const completed = [];
      if (values.name?.length > 3) completed.push("has_data");
      if (values.pnr?.length === 6) completed.push("pnr_valid", "pnr_empty");
      if (values.petWeight?.length > 0)
        completed.push("weight_validated", "weight_empty");

      if (copiedScripts.includes("pet_proposal_rules"))
        completed.push("kennel_rules_not_copied");
      if (copiedScripts.includes("pet_fees"))
        completed.push("pet_fee_not_copied");
      return completed;
    },
  },

  SERVICE_ANIMAL: {
    icon: FaShieldDog, // Ou outro ícone de sua preferência
    title: "Animal de Assistência (ESAN/SVAN)",
    inputs: [
      { id: "name", label: "Nome" },
      { id: "pnr", label: "PNR" },
      { id: "animalType", label: "Tipo (Cão Guia / Suporte Emocional)" },
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
    autoCheck: (values, copiedScripts) => {
      const completed = [];
      if (values.name?.length > 3) completed.push("has_data");
      if (values.pnr?.length === 6) completed.push("pnr_valid", "pnr_empty");

      if (copiedScripts.includes("route_and_rules"))
        completed.push("route_check_not_copied");
      if (copiedScripts.includes("medical_forms"))
        completed.push("forms_not_copied");
      return completed;
    },
  },

  WHEELCHAIR: {
    icon: MdOutlineWheelchairPickup,
    title: "Cadeira de Rodas / Assistência",
    inputs: [
      { id: "name", label: "Nome" },
      { id: "pnr", label: "PNR" },
      { id: "chairType", label: "Tipo (Manual / Motorizada)" },
    ],
    checklist: [
      { id: "has_data", label: "Dados Pessoais Preenchidos", completed: false },
      { id: "pnr_valid", label: "PNR Identificado", completed: false },
    ],
    alerts: [
      { id: "pnr_empty", label: "Código de reserva pendente." },
      {
        id: "battery_info_not_copied",
        label: "Alerta de bateria de íon-lítio pendente.",
      },
      {
        id: "checkin_time_not_copied",
        label: "Aviso de tempo de check-in pendente.",
      },
    ],
    scripts: [
      {
        id: "welcome_and_needs",
        label: "Acolhimento e Oferta de Acessibilidade (M1)",
        content: (values: Record<string, string>) =>
          `${getGreeting()}, ${getHonorific(values.gender, values.name)}! Meu nome é ${values.agentName}. Entendo que você precisa de assistência de locomoção. Vou organizar tudo para que sua experiência no aeroporto seja a mais confortável possível.`,
      },
      {
        id: "data_collection",
        label: "Solicitação do Localizador/PNR (M2)",
        content: (_: Record<string, string>) =>
          `Para localizarmos a viagem, por favor, me passe o seu localizador (código da reserva).`,
      },
      {
        id: "data_confirmation",
        label: "Mapeamento da Dificuldade (WCHR/WCHS/WCHC) (M3)",
        content: (_: Record<string, string>) =>
          `Obrigado. Você precisa da cadeira apenas para distâncias longas (WCHR), para subir escadas (WCHS) ou não pode caminhar até o assento da aeronave (WCHC)? E a cadeira é própria ou você precisará de uma emprestada no aeroporto?`,
      },
      {
        id: "battery_rules",
        label: "Validação de Segurança (Bateria de Íon-Lítio) (M4)",
        content: (_: Record<string, string>) =>
          `Certo. Como a cadeira é própria e motorizada, por questões de segurança de voo, preciso confirmar se a bateria é derramável, não derramável ou de íon-lítio. Se for de íon-lítio, ela não pode ultrapassar 300 Wh. Os cabos devem estar desconectados e os terminais isolados no momento do check-in.`,
      },
      {
        id: "transparency_time",
        label: "Alerta sobre Antecedência Mínima no Aeroporto (M5)",
        content: (_: Record<string, string>) =>
          `Este serviço não possui custos. No entanto, para despachar cadeiras motorizadas com toda a segurança, solicitamos que chegue ao balcão de check-in com pelo menos 2 horas de antecedência para voos nacionais, ou 3 horas para internacionais. Confirma a inclusão?`,
      },
      {
        id: "resolution_confirmation",
        label: "Inclusão da Solicitação WCH na Reserva (M6)",
        content: (values: Record<string, string>) =>
          `A assistência para uso de cadeira de rodas foi confirmada na sua reserva ${values.pnr || "[PNR]"}. As instruções sobre o despacho e baterias foram enviadas para o seu e-mail. Há algo mais em que posso ajudar?`,
      },
      {
        id: "post_sales_and_survey",
        label: "Despedida e Pesquisa de Satisfação (M7/M8)",
        content: (values: Record<string, string>) =>
          `Conte sempre com a LATAM para uma viagem acessível e segura, ${getHonorific(values.gender, values.name)}. Peço a gentileza de responder à pesquisa de satisfação sobre o meu atendimento, de 0 a 5, assim que encerrarmos. Um ótimo dia!`,
      },
    ],
    links: [
      {
        id: "wheelchair",
        title: "Regras Cadeiras de Rodas",
        ref: "https://www.latamairlines.com/br/pt/experiencia/prepare-sua-viagem/necessidades-especiais/cadeira-rodas",
        type: AggregatorType.BLUE,
      },
    ],
    autoCheck: (values, copiedScripts) => {
      const completed = [];
      if (values.name?.length > 3) completed.push("has_data");
      if (values.pnr?.length === 6) completed.push("pnr_valid", "pnr_empty");

      if (copiedScripts.includes("battery_rules"))
        completed.push("battery_info_not_copied");
      if (copiedScripts.includes("transparency_time"))
        completed.push("checkin_time_not_copied");
      return completed;
    },
  },

  MAAS_COMPLETO: {
    icon: MdAssistWalker,
    title: "Assistência Especial Completa (MAAS / BLND / DEAF / DPNA)",
    inputs: [
      { id: "name", label: "Nome do Passageiro" },
      { id: "pnr", label: "PNR" },
      {
        id: "maasCategory",
        label: "Categoria (Visual / Auditiva / Cognitiva / Idoso)",
      },
    ],
    checklist: [
      { id: "has_data", label: "Dados Pessoais Preenchidos", completed: false },
      { id: "pnr_valid", label: "PNR Identificado", completed: false },
      {
        id: "category_validated",
        label: "Categoria de Assistência Mapeada",
        completed: false,
      },
    ],
    alerts: [
      { id: "pnr_empty", label: "Código de reserva pendente." },
      { id: "category_empty", label: "Categoria da assistência pendente." },
      {
        id: "safety_rules_not_copied",
        label: "Análise de regras de segurança/MEDIF pendente.",
      },
      {
        id: "time_alert_not_copied",
        label: "Aviso de tempo de antecedência pendente.",
      },
    ],
    scripts: [
      {
        id: "welcome_and_needs",
        label: "Acolhimento e Entendimento da Necessidade (M1)",
        content: (values: Record<string, string>) =>
          `${getGreeting()}, ${getHonorific(values.gender, values.name)}! Meu nome é ${values.agentName}. Compreendo que o passageiro precisará de acompanhamento no aeroporto. Conte com a nossa equipe em solo para garantir uma experiência acessível, segura e muito confortável.`,
      },
      {
        id: "data_collection",
        label: "Solicitação do Localizador/PNR (M2)",
        content: (_: Record<string, string>) =>
          `Para que eu possa registrar essa assistência corretamente no seu voo, por favor, me informe o código da reserva (PNR de 6 dígitos).`,
      },
      {
        id: "data_confirmation",
        label: "Mapeamento Exato da Condição (M3)",
        content: (values: Record<string, string>) =>
          `Localizei a reserva ${values.pnr || "[PNR]"}. Para enviarmos o código correto à equipe do aeroporto, qual seria exatamente o perfil da assistência? Trata-se de deficiência visual, deficiência auditiva, alguma condição cognitiva/intelectual, ou seria auxílio para idoso/barreira linguística?`,
      },
      {
        id: "assistance_rules_dynamic",
        label: "Proposta de Solução e Regras de Voo (M4)",
        content: (values: Record<string, string>) => {
          // Lógica para adaptar o roteiro à categoria escolhida
          const category = values.maasCategory?.toLowerCase() || "";

          if (
            category.includes("cognitiv") ||
            category.includes("intelectual")
          ) {
            return `Entendido. Para casos de condições cognitivas (Autismo, Alzheimer, etc.), a assistência é garantida. Porém, por regras de segurança, preciso confirmar: o passageiro consegue compreender as instruções de segurança da tripulação e atender às suas necessidades básicas sozinho? Caso não, ele precisará viajar com um acompanhante maior de idade e enviar o formulário MEDIF.`;
          }
          if (category.includes("visual") || category.includes("auditiva")) {
            return `Perfeito. Registrarei a necessidade de guia para deficiência ${category.includes("visual") ? "visual (BLND)" : "auditiva (DEAF)"}. Um funcionário da LATAM irá acompanhá-lo desde o check-in, passando pelo raio-x, até o assento na aeronave. Este serviço é totalmente isento de taxas.`;
          }
          // Default para Idosos (MAAS padrão) ou primeira viagem
          return `Certo. Registrarei o serviço de Meet and Assist (MAAS). Um funcionário da LATAM dará todo o suporte para locomoção e orientação no aeroporto, do check-in até o portão de embarque. Este serviço não tem nenhum custo.`;
        },
      },
      {
        id: "transparency_time",
        label: "Transparência de Antecedência e Bagagem (M5)",
        content: (_: Record<string, string>) =>
          `Apenas um ponto importante de alinhamento: para que possamos organizar o funcionário que fará esse acompanhamento com excelência, solicitamos a apresentação no balcão de check-in com no mínimo 2 horas de antecedência para voos nacionais (ou 3 horas para internacionais). O(a) senhor(a) está de acordo?`,
      },
      {
        id: "resolution_confirmation",
        label: "Inclusão Sistêmica e Confirmação (M6)",
        content: (values: Record<string, string>) =>
          `A assistência foi incluída com sucesso na reserva ${values.pnr || "[PNR]"}! Ao chegar no aeroporto, basta o passageiro se dirigir à fila do atendimento preferencial da LATAM. Há mais algum detalhe da viagem em que eu possa te ajudar agora?`,
      },
      {
        id: "post_sales_and_survey",
        label: "Despedida e Pesquisa de Satisfação (M7/M8)",
        content: (values: Record<string, string>) =>
          `Foi um prazer organizar essa assistência para você, ${getHonorific(values.gender, values.name)}! A LATAM preza muito pela acessibilidade e segurança. Ao encerrarmos, peço que avalie o meu atendimento com uma nota de 0 a 5 na tela. Desejo uma viagem maravilhosa!`,
      },
    ],
    links: [
      {
        id: "special_assistance_general",
        title: "Regras de Assistência Especial",
        ref: "https://www.latamairlines.com/br/pt/experiencia/prepare-sua-viagem/necessidades-especiais",
        type: AggregatorType.BLUE,
      },
      {
        id: "medif_form",
        title: "Regras para Acompanhante / MEDIF",
        ref: "https://www.latamairlines.com/br/pt/experiencia/prepare-sua-viagem/necessidades-especiais/atestado-medico-medif",
        type: AggregatorType.GREEN,
      },
      {
        id: "sensory_cognitive",
        title: "Deficiência Sensorial e Cognitiva",
        ref: "https://www.latamairlines.com/br/pt/experiencia/prepare-sua-viagem/necessidades-especiais/deficiencia-cognitiva-sensorial",
        type: AggregatorType.YELLOW,
      },
    ],
    autoCheck: (values, copiedScripts) => {
      const completed = [];
      if (values.name?.length > 3) completed.push("has_data");
      if (values.pnr?.length === 6) completed.push("pnr_valid", "pnr_empty");
      if (values.maasCategory?.length > 3)
        completed.push("category_validated", "category_empty");

      if (copiedScripts.includes("assistance_rules_dynamic")) {
        completed.push("safety_rules_not_copied");
      }
      if (copiedScripts.includes("transparency_time")) {
        completed.push("time_alert_not_copied");
      }
      return completed;
    },
  },

  NAME_CORRECTION: {
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
    autoCheck: (values, copiedScripts) => {
      const completed = [];
      if (values.name?.length > 3) completed.push("has_data");
      if (values.pnr?.length === 6) completed.push("pnr_valid", "pnr_empty");
      if (values.correctName?.length > 3) completed.push("name_validated");

      if (copiedScripts.includes("correction_rules"))
        completed.push("rules_not_copied");
      return completed;
    },
  },

  LATAM_ACCOUNT: {
    icon: MdManageAccounts,
    title: "Alteração na Conta LATAM",
    inputs: [
      { id: "name", label: "Nome do Titular" },
      { id: "document", label: "CPF ou Nº LATAM Pass" },
    ],
    checklist: [
      { id: "has_data", label: "Dados Preenchidos", completed: false },
      {
        id: "security_validated",
        label: "Perguntas de Segurança Válidas",
        completed: false,
      },
    ],
    alerts: [
      { id: "doc_empty", label: "CPF/LATAM Pass pendente." },
      {
        id: "security_not_copied",
        label: "Verificação de segurança pendente.",
      },
    ],
    scripts: [
      {
        id: "welcome_and_needs",
        label: "Acolhimento e Identificação do Perfil (M1)",
        content: (values: Record<string, string>) =>
          `${getGreeting()}, ${getHonorific(values.gender, values.name)}! Meu nome é ${values.agentName}. Compreendi que precisa atualizar os dados da sua conta LATAM. Estou aqui para auxiliar nesse processo.`,
      },
      {
        id: "data_collection",
        label: "Solicitação do CPF ou Número LATAM Pass (M2)",
        content: (_: Record<string, string>) =>
          `Para localizarmos o seu cadastro, por favor, informe o seu número LATAM Pass ou o seu CPF.`,
      },
      {
        id: "security_check",
        label: "Autenticação via Perguntas de Segurança (M3)",
        content: (_: Record<string, string>) =>
          `Para garantirmos a segurança e privacidade da sua conta, preciso confirmar três informações: qual a sua data de nascimento, endereço cadastrado e o e-mail atual que consta no sistema?`,
      },
      {
        id: "proposal_update",
        label: "Identificação do Dado Desatualizado (M4/M5)",
        content: (_: Record<string, string>) =>
          `Segurança validada com sucesso, obrigado. Qual dado você gostaria de atualizar? (E-mail, telefone, endereço ou reset de senha?). Vou enviar um link de validação para o seu celular/e-mail para concluirmos a alteração.`,
      },
      {
        id: "resolution_confirmation",
        label: "Confirmação da Alteração Cadastral (M6)",
        content: (_: Record<string, string>) =>
          `A atualização dos seus dados cadastrais foi concluída com sucesso no sistema. O prazo para refletir em todas as plataformas é de até 2 horas. Há mais alguma solicitação em que eu possa ser útil?`,
      },
      {
        id: "post_sales_and_survey",
        label: "Despedida e Pesquisa de Satisfação (M7/M8)",
        content: (_: Record<string, string>) =>
          `Agradecemos a sua fidelidade à LATAM! Peço que não se esqueça de avaliar o meu atendimento de 0 a 5 na tela do chat. Um excelente dia!`,
      },
    ],
    links: [
      {
        id: "update_data",
        title: "Atualizar Dados LATAM Pass",
        ref: "https://www.latamairlines.com/br/pt/latam-pass/sobre-o-programa/atualizacao-cadastral",
        type: AggregatorType.YELLOW,
      },
    ],
    autoCheck: (values, copiedScripts) => {
      const completed = [];
      if (values.name?.length > 3) completed.push("has_data");
      if (values.document?.length > 5) completed.push("doc_empty");

      // Assumindo que clicar na checagem de segurança indica validação
      if (copiedScripts.includes("security_check"))
        completed.push("security_not_copied", "security_validated");
      return completed;
    },
  },
};
