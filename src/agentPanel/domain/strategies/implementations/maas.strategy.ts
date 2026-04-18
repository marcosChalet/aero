/* eslint-disable @typescript-eslint/no-unused-vars */
import { getGreeting, getHonorific } from "../../../utils/formatters";
import {
  AggregatorType,
  type IServiceStrategy,
} from "../../models/strategy.types";
import { MdAssistWalker } from "react-icons/md";

export const MAASService: IServiceStrategy = {
  icon: MdAssistWalker,
  title: "Assistência Especial (MAAS / BLND / DEAF / DPNA)",
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

        if (category.includes("cognitiv") || category.includes("intelectual")) {
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
};
