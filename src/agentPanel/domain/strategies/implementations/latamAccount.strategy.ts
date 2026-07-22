/* eslint-disable @typescript-eslint/no-unused-vars */
import { MdManageAccounts } from "react-icons/md";
import {
  AggregatorType,
  type IServiceStrategy,
} from "../../models/strategy.types";
import { getGreeting, getHonorific } from "../../../utils/formatters";
import ID from "../../../../shared/value-objects/ID";
import AgentInputName from "../../../../shared/value-objects/AgentInputName";
import AgentAlert from "../../../../shared/value-objects/AgentAlert";
import AgentInputCPF from "../../../../shared/value-objects/AgentInputCPF";
import Rule from "../../../../shared/value-objects/Rule";
import AgentChecklist from "../../../../shared/value-objects/AgentChecklist";
import AgentScript from "../../../../shared/value-objects/AgentScript";
import AgentLink from "../../../../shared/value-objects/AgentLink";

export const LatamAccountService: IServiceStrategy = {
  icon: MdManageAccounts,
  title: "Alteração na Conta LATAM",
  inputs: [
    new AgentInputName(new ID("name"), "Nome do Titular", ""),
    new AgentInputCPF(new ID("document"), "CPF ou Nº LATAM Pass", ""),
  ],
  checklist: [
    new AgentChecklist(
      new ID("has_data"),
      "Dados Preenchidos",
      new Rule("document & name"),
    ),
    new AgentChecklist(
      new ID("security_validated"),
      "Perguntas de Segurança Válidas",
      new Rule("security_check"),
    ),
  ],
  alerts: [
    new AgentAlert(
      new ID("doc_empty"),
      "CPF/LATAM Pass pendente.",
      new Rule("document"),
    ),
    new AgentAlert(
      new ID("security_not_copied"),
      "Verificação de segurança pendente.",
      new Rule("security_check"),
    ),
  ],
  scripts: [
    new AgentScript(
      new ID("welcome_and_needs"),
      "Acolhimento e Identificação do Perfil (M1)",
      (values: Record<string, string>) =>
        `${getGreeting()}, ${getHonorific(values.gender, values.name)}! Meu nome é ${values.agentName}. Compreendi que precisa atualizar os dados da sua conta LATAM. Estou aqui para auxiliar nesse processo.`,
    ),

    new AgentScript(
      new ID("data_collection"),
      "Solicitação do CPF ou Número LATAM Pass (M2)",
      (_: Record<string, string>) =>
        `Para localizarmos o seu cadastro, por favor, informe o seu número LATAM Pass ou o seu CPF.`,
    ),

    new AgentScript(
      new ID("security_check"),
      "Autenticação via Perguntas de Segurança (M3)",
      (_: Record<string, string>) =>
        `Para garantirmos a segurança e privacidade da sua conta, preciso confirmar três informações: qual a sua data de nascimento, endereço cadastrado e o e-mail atual que consta no sistema?`,
    ),

    new AgentScript(
      new ID("proposal_update"),
      "Identificação do Dado Desatualizado (M4/M5)",
      (_: Record<string, string>) =>
        `Segurança validada com sucesso, obrigado. Qual dado você gostaria de atualizar? (E-mail, telefone, endereço ou reset de senha?). Vou enviar um link de validação para o seu celular/e-mail para concluirmos a alteração.`,
    ),

    new AgentScript(
      new ID("resolution_confirmation"),
      "Confirmação da Alteração Cadastral (M6)",
      (_: Record<string, string>) =>
        `A atualização dos seus dados cadastrais foi concluída com sucesso no sistema. O prazo para refletir em todas as plataformas é de até 2 horas. Há mais alguma solicitação em que eu possa ser útil?`,
    ),

    new AgentScript(
      new ID("post_sales_and_survey"),
      "Despedida e Pesquisa de Satisfação (M7/M8)",
      (_: Record<string, string>) =>
        `Agradecemos a sua fidelidade à LATAM! Peço que não se esqueça de avaliar o meu atendimento de 0 a 5 na tela do chat. Um excelente dia!`,
    ),
  ],
  links: [
    new AgentLink(
      new ID("update_data"),
      "Atualizar Dados LATAM Pass",
      "https://www.latamairlines.com/br/pt/latam-pass/sobre-o-programa/atualizacao-cadastral",
      AggregatorType.YELLOW,
    ),
  ],
};
