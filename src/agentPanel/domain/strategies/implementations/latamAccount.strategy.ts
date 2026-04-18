/* eslint-disable @typescript-eslint/no-unused-vars */
import { MdManageAccounts } from "react-icons/md";
import {
  AggregatorType,
  type IServiceStrategy,
} from "../../models/strategy.types";
import { getGreeting, getHonorific } from "../../../utils/formatters";

export const LatamAccountService: IServiceStrategy = {
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

    if (copiedScripts.includes("security_check"))
      completed.push("security_not_copied", "security_validated");
    return completed;
  },
};
