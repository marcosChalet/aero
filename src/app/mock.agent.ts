export const dbResponseLatamAccount = {
  id: "account",
  icon: "MdManageAccounts",
  title: "Alteração na Conta LATAM",
  inputs: [
    {
      id: "name",
      label: "Nome do Titular",
      inputRegistryParam: "inputName",
    },
    {
      id: "document",
      label: "CPF ou Nº LATAM Pass",
      inputRegistryParam: "inputCPF",
    },
  ],
  checklists: [
    {
      id: "has_data",
      label: "Dados Preenchidos",
      rule: "document & name",
    },
    {
      id: "security_validated",
      label: "Perguntas de Segurança Válidas",
      rule: "security_check",
    },
  ],
  alerts: [
    {
      id: "doc_empty",
      label: "CPF/LATAM Pass pendente.",
      rule: "document",
    },
    {
      id: "security_not_copied",
      label: "Verificação de segurança pendente.",
      rule: "security_check",
    },
  ],
  scripts: [
    {
      id: "welcome_and_needs",
      label: "Acolhimento e Identificação do Perfil (M1)",
      content:
        "GET_GREETING, GET_HONORIFIC! Meu nome é GET_AGENT_NAME. Compreendi que precisa atualizar os dados da sua conta LATAM. Estou aqui para auxiliar nesse processo.",
    },
    {
      id: "data_collection",
      label: "Solicitação do CPF ou Número LATAM Pass (M2)",
      content:
        "Para localizarmos o seu cadastro, por favor, informe o seu número LATAM Pass ou o seu CPF.",
    },
    {
      id: "security_check",
      label: "Autenticação via Perguntas de Segurança (M3)",
      content:
        "Para garantirmos a segurança e privacidade da sua conta, preciso confirmar três informações: qual a sua data de nascimento, endereço cadastrado e o e-mail atual que consta no sistema?",
    },
    {
      id: "proposal_update",
      label: "Identificação do Dado Desatualizado (M4/M5)",
      content:
        "Segurança validada com sucesso, obrigado. Qual dado você gostaria de atualizar? (E-mail, telefone, endereço ou reset de senha?). Vou enviar um link de validação para o seu celular/e-mail para concluirmos a alteração.",
    },
    {
      id: "resolution_confirmation",
      label: "Confirmação da Alteração Cadastral (M6)",
      content:
        "A atualização dos seus dados cadastrais foi concluída com sucesso no sistema. O prazo para refletir em todas as plataformas é de até 2 horas. Há mais alguma solicitação em que eu possa ser útil?",
    },
    {
      id: "post_sales_and_survey",
      label: "Despedida e Pesquisa de Satisfação (M7/M8)",
      content:
        "Agradecemos a sua fidelidade à LATAM! Peço que não se esqueça de avaliar o meu atendimento de 0 a 5 na tela do chat. Um excelente dia!",
    },
  ],
  links: [
    {
      id: "update_data",
      label: "Atualizar Dados LATAM Pass",
      ref: "https://www.latamairlines.com/br/pt/latam-pass/sobre-o-programa/atualizacao-cadastral",
      type: "blue",
    },
  ],
};

const rebooking = {
  id: "rebooking",
  icon: "GiAirplaneDeparture",
  title: "Remarcação",
  inputs: [
    {
      id: "name",
      label: "Nome",
      inputRegistryParam: "inputName",
    },
    {
      id: "pnr",
      label: "PNR",
      inputRegistryParam: "inputPNR",
    },
  ],
  checklists: [
    {
      id: "has_data",
      label: "Dados Pessoais Preenchidos",
      rule: "name",
    },
    {
      id: "pnr_valid",
      label: "PNR Identificado",
      rule: "pnr",
    },
  ],
  alerts: [
    { id: "pnr_empty", label: "Código de reserva pendente.", rule: "pnr" },
    { id: "name_empty", label: "Nome do passageiro pendente.", rule: "name" },
    {
      id: "itinerary_script_not_copied",
      label: "Novo itinerário pendente.",
      rule: "proposal_update",
    },
    {
      id: "fare_script_not_copied",
      label: "Nova tarifa pendente.",
      rule: "resolution_confirmation",
    },
    {
      id: "confirmation_script_not_copied",
      label: "Confirmação de remarcação pendente.",
      rule: "data_collection",
    },
    {
      id: "epa_script_not_copied",
      label: "EPA pendente.",
      rule: "post_sales_and_survey",
    },
  ],
  scripts: [
    {
      id: "welcome_and_needs",
      label: "Acolhimento e Identificação do Perfil (M1)",
      content:
        "GET_GREETING, GET_HONORIFIC! Meu nome é GET_AGENT_NAME. Compreendi que precisa atualizar os dados da sua conta LATAM. Estou aqui para auxiliar nesse processo.",
    },
    {
      id: "data_collection",
      label: "Solicitação do CPF ou Número LATAM Pass (M2)",
      content:
        "Para localizarmos o seu cadastro, por favor, informe o seu número LATAM Pass ou o seu CPF.",
    },
    {
      id: "security_check",
      label: "Autenticação via Perguntas de Segurança (M3)",
      content:
        "Para garantirmos a segurança e privacidade da sua conta, preciso confirmar três informações: qual a sua data de nascimento, endereço cadastrado e o e-mail atual que consta no sistema?",
    },
    {
      id: "proposal_update",
      label: "Identificação do Dado Desatualizado (M4/M5)",
      content:
        "Segurança validada com sucesso, obrigado. Qual dado você gostaria de atualizar? (E-mail, telefone, endereço ou reset de senha?). Vou enviar um link de validação para o seu celular/e-mail para concluirmos a alteração.",
    },
    {
      id: "resolution_confirmation",
      label: "Confirmação da Alteração Cadastral (M6)",
      content:
        "A atualização dos seus dados cadastrais foi concluída com sucesso no sistema. O prazo para refletir em todas as plataformas é de até 2 horas. Há mais alguma solicitação em que eu possa ser útil?",
    },
    {
      id: "post_sales_and_survey",
      label: "Despedida e Pesquisa de Satisfação (M7/M8)",
      content:
        "Agradecemos a sua fidelidade à LATAM! Peço que não se esqueça de avaliar o meu atendimento de 0 a 5 na tela do chat. Um excelente dia!",
    },
  ],
  links: [
    {
      id: "update_data",
      label: "Atualizar Dados LATAM Pass",
      ref: "https://www.latamairlines.com/br/pt/latam-pass/sobre-o-programa/atualizacao-cadastral",
      type: "blue",
    },
  ],
};

export const mockDbResponseLATAM = [rebooking, dbResponseLatamAccount];
