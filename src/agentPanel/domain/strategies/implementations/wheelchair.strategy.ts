/* eslint-disable @typescript-eslint/no-unused-vars */
import { MdOutlineWheelchairPickup } from "react-icons/md";
import {
  AggregatorType,
  type IServiceStrategy,
} from "../../models/strategy.types";
import { getGreeting, getHonorific } from "../../../utils/formatters";

export const WheelchairService: IServiceStrategy = {
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
  // autoCheck: (values, copiedScripts) => {
  //   const completed = [];
  //   if (values.name?.length > 3) completed.push("has_data");
  //   if (values.pnr?.length === 6) completed.push("pnr_valid", "pnr_empty");

  //   if (copiedScripts.includes("battery_rules"))
  //     completed.push("battery_info_not_copied");
  //   if (copiedScripts.includes("transparency_time"))
  //     completed.push("checkin_time_not_copied");
  //   return completed;
  // },
};
