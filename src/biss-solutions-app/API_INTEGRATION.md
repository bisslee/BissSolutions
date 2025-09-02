# 🌐 Integração com API - Formulário de Contato

## 📋 Visão Geral

O formulário de contato da aplicação Biss Solutions foi integrado com a API oficial da empresa para processar e armazenar as mensagens dos usuários.

## 🔗 Endpoint da API

**URL:** `https://mktools.biss.com.br/api/Contact/BissSolutions`  
**Método:** `POST`  
**Content-Type:** `application/json`

## 📊 Estrutura dos Dados

### Request (Envio)

```typescript
interface ContactRequest {
  fullName: string;    // Nome completo (obrigatório)
  email: string;       // E-mail válido (obrigatório)
  phone: string;       // Telefone (obrigatório)
  company?: string;    // Empresa (opcional)
  subject: string;     // Assunto (obrigatório)
  message: string;     // Mensagem (obrigatório)
}
```

### Response (Resposta)

#### Sucesso (200)
```json
{
  "message": "Mensagem enviada com sucesso!",
  "contactId": "4fb66b35-738e-46f1-a133-58b2d2a99f3a"
}
```

#### Erro de Validação (400)
```json
{
  "type": "https://tools.ietf.org/html/rfc9110#section-15.5.1",
  "title": "One or more validation errors occurred.",
  "status": 400,
  "errors": {
    "FullName": [
      "The FullName field is required."
    ]
  },
  "traceId": "00-4bddd03bb0bda2fc6d75e8a3386f540a-45224506fcfe32e2-00"
}
```

## 🚀 Como Funciona

### 1. Validação do Formulário
- Todos os campos obrigatórios são validados antes do envio
- E-mail é validado com regex para formato correto
- Telefone é obrigatório (atualizado recentemente)

### 2. Mapeamento de Dados
```typescript
// Mapeia os dados do formulário para o formato da API
const contactRequest: ContactRequest = {
  fullName: this.formData.name,        // name → fullName
  email: this.formData.email,          // email → email
  phone: this.formData.phone,          // phone → phone
  company: this.formData.company,      // company → company (opcional)
  subject: this.formData.subject,      // subject → subject
  message: this.formData.message       // message → message
};
```

### 3. Tratamento de Respostas
- **Sucesso:** Mostra mensagem de confirmação e limpa o formulário
- **Erro:** Exibe mensagem de erro específica para o usuário
- **Validação:** Trata erros de campos obrigatórios da API

## 🛠️ Implementação Técnica

### Serviço de Contato
```typescript
@Injectable({
  providedIn: 'root'
})
export class ContactService {
  private readonly apiUrl = 'https://mktools.biss.com.br/api/Contact/BissSolutions';

  sendContact(contactData: ContactRequest): Observable<ContactResponse> {
    return this.http.post<ContactResponse>(this.apiUrl, contactData)
      .pipe(
        map(response => response),
        catchError(this.handleError)
      );
  }
}
```

### Tratamento de Erros
- **Erro de Cliente:** Problemas de rede ou formato
- **Erro de Servidor:** Validação ou problemas internos
- **Erro de Conexão:** Problemas de conectividade

## 📱 Interface do Usuário

### Estados do Formulário
- **Normal:** Campos vazios com placeholders
- **Validação:** Campos obrigatórios destacados em vermelho
- **Envio:** Botão desabilitado com spinner "Enviando..."
- **Sucesso:** Mensagem de confirmação via toaster
- **Erro:** Mensagem de erro específica via toaster

### Campos Obrigatórios
- ✅ Nome Completo
- ✅ E-mail
- ✅ Telefone (novo campo obrigatório)
- ✅ Assunto
- ✅ Mensagem

### Campos Opcionais
- ℹ️ Empresa

## 🔒 Segurança e Validação

### Validação do Cliente
- Regex para e-mail válido
- Verificação de campos obrigatórios
- Sanitização básica de entrada

### Validação da API
- Validação de campos obrigatórios
- Formato de e-mail
- Comprimento mínimo das strings

## 📝 Exemplo de Uso

### cURL
```bash
curl -X 'POST' \
  'https://mktools.biss.com.br/api/Contact/BissSolutions' \
  -H 'accept: */*' \
  -H 'Content-Type: application/json' \
  -d '{
    "fullName": "João Silva",
    "email": "joao@exemplo.com",
    "phone": "(11) 99999-9999",
    "company": "Empresa Exemplo",
    "subject": "Solicitar Orçamento",
    "message": "Gostaria de saber mais sobre os serviços..."
  }'
```

### JavaScript/TypeScript
```typescript
const contactData = {
  fullName: "João Silva",
  email: "joao@exemplo.com",
  phone: "(11) 99999-9999",
  company: "Empresa Exemplo",
  subject: "Solicitar Orçamento",
  message: "Gostaria de saber mais sobre os serviços..."
};

this.contactService.sendContact(contactData).subscribe({
  next: (response) => {
    console.log('Sucesso:', response.message);
  },
  error: (error) => {
    console.error('Erro:', error.message);
  }
});
```

## 🧪 Testes

### Cenários de Teste
1. **Formulário Válido:** Todos os campos preenchidos corretamente
2. **Campo Obrigatório Vazio:** Validação de erro
3. **E-mail Inválido:** Formato incorreto
4. **Telefone Vazio:** Novo campo obrigatório
5. **Erro de Rede:** Problemas de conectividade
6. **Erro da API:** Resposta de erro do servidor

## 📊 Monitoramento

### Logs de Sucesso
- ID do contato retornado pela API
- Timestamp do envio
- Dados do formulário (sem informações sensíveis)

### Logs de Erro
- Tipo de erro (cliente/servidor)
- Código de status HTTP
- Mensagem de erro específica
- Trace ID para debugging

## 🔄 Manutenção

### Atualizações da API
- Endpoint configurável via variável de ambiente
- Tratamento de erros flexível
- Logs detalhados para debugging

### Monitoramento de Performance
- Tempo de resposta da API
- Taxa de sucesso/erro
- Alertas para falhas de conectividade

## 📞 Suporte

Para dúvidas sobre a integração com a API:
- **Desenvolvedor:** Equipe de desenvolvimento
- **API:** Suporte técnico da Biss Solutions
- **Documentação:** Este arquivo e README.md
