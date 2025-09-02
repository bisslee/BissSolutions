# Guia de Testes - Biss Solutions

Este documento descreve a estratégia de testes implementada no projeto Biss Solutions, incluindo testes unitários, de integração e E2E.

## 📋 Visão Geral

O projeto implementa uma estratégia de testes abrangente com:
- **Testes Unitários**: Cobertura > 80% para componentes e serviços
- **Testes de Integração**: Validação de fluxos entre componentes
- **Testes E2E**: Validação de fluxos críticos do usuário

## 🛠️ Ferramentas Utilizadas

### Testes Unitários e de Integração
- **Jasmine**: Framework de testes
- **Karma**: Test runner
- **Angular Testing Utilities**: Utilitários específicos do Angular
- **Jest**: Alternativa ao Karma (configurado para migração futura)

### Testes E2E
- **Cypress**: Framework para testes end-to-end
- **Custom Commands**: Comandos personalizados para reutilização

## 📁 Estrutura de Testes

```
src/
├── app/
│   ├── components/
│   │   ├── contact-form/
│   │   │   ├── contact-form.component.spec.ts
│   │   │   └── contact-form.integration.spec.ts
│   │   ├── clients/
│   │   │   ├── clients.component.spec.ts
│   │   │   └── clients.integration.spec.ts
│   │   └── toaster/
│   │       ├── toaster.component.spec.ts
│   │       └── toaster.service.spec.ts
│   └── services/
│       ├── contact.service.spec.ts
│       ├── seo.service.spec.ts
│       └── image-optimization.service.spec.ts
├── setup-jest.ts
└── test-setup.ts

cypress/
├── e2e/
│   ├── homepage.cy.ts
│   ├── contact-form.cy.ts
│   ├── navigation.cy.ts
│   ├── services.cy.ts
│   ├── accessibility.cy.ts
│   └── performance.cy.ts
├── support/
│   ├── e2e.ts
│   └── commands.ts
└── fixtures/
    └── example.json
```

## 🚀 Comandos de Teste

### Testes Unitários e de Integração

```bash
# Executar todos os testes
npm test

# Executar testes com cobertura
npm run test:coverage

# Executar testes em modo CI
npm run test:ci

# Executar testes em modo watch
ng test
```

### Testes E2E

```bash
# Executar testes E2E em modo headless
npm run e2e

# Abrir Cypress Test Runner
npm run e2e:open

# Executar todos os testes (unitários + E2E)
npm run test:all
```

## 📊 Cobertura de Testes

### Metas de Cobertura
- **Statements**: > 80%
- **Branches**: > 80%
- **Functions**: > 80%
- **Lines**: > 80%

### Relatórios de Cobertura
Os relatórios de cobertura são gerados em:
- **HTML**: `coverage/biss-solutions-app/index.html`
- **LCOV**: `coverage/biss-solutions-app/lcov.info`
- **JSON**: `coverage/biss-solutions-app/coverage-final.json`

## 🧪 Tipos de Testes

### 1. Testes Unitários

Testam componentes e serviços isoladamente:

```typescript
describe('ContactService', () => {
  it('should send contact form successfully', () => {
    // Arrange
    const mockRequest = { /* ... */ };
    const mockResponse = { /* ... */ };
    
    // Act
    service.sendContact(mockRequest).subscribe(response => {
      // Assert
      expect(response).toEqual(mockResponse);
    });
  });
});
```

### 2. Testes de Integração

Testam a interação entre componentes e serviços:

```typescript
describe('ContactFormComponent Integration Tests', () => {
  it('should integrate form submission with API and toaster service', () => {
    // Testa o fluxo completo: formulário → API → toaster
  });
});
```

### 3. Testes E2E

Testam fluxos críticos do usuário:

```typescript
describe('Contact Form', () => {
  it('should submit form with valid data', () => {
    cy.fillContactForm(validData);
    cy.get('[data-cy="submit-button"]').click();
    cy.get('[data-cy="success-message"]').should('be.visible');
  });
});
```

## 🎯 Fluxos Críticos Testados

### 1. Formulário de Contato
- ✅ Validação de campos obrigatórios
- ✅ Envio de formulário com dados válidos
- ✅ Tratamento de erros da API
- ✅ Feedback visual (loading, success, error)
- ✅ Reset do formulário após sucesso

### 2. Navegação
- ✅ Navegação entre seções
- ✅ Menu responsivo
- ✅ Destaque do item ativo
- ✅ Scroll suave
- ✅ Navegação por teclado

### 3. Seção de Clientes
- ✅ Exibição de clientes
- ✅ Tratamento de erro de imagens
- ✅ Links para sites externos
- ✅ Responsividade

### 4. Acessibilidade
- ✅ Navegação por teclado
- ✅ Leitores de tela
- ✅ Contraste de cores
- ✅ Estrutura semântica

### 5. Performance
- ✅ Tempo de carregamento
- ✅ Otimização de imagens
- ✅ Lazy loading
- ✅ Service Worker

## 🔧 Configurações

### Karma (angular.json)
```json
{
  "test": {
    "builder": "@angular/build:karma",
    "options": {
      "polyfills": ["zone.js", "zone.js/testing"],
      "tsConfig": "tsconfig.spec.json"
    }
  }
}
```

### Cypress (cypress.config.ts)
```typescript
export default defineConfig({
  e2e: {
    baseUrl: 'http://localhost:4200',
    viewportWidth: 1280,
    viewportHeight: 720,
    video: true,
    screenshotOnRunFailure: true
  }
});
```

## 📝 Convenções de Teste

### Nomenclatura
- **Arquivos de teste**: `*.spec.ts` (unitários), `*.integration.spec.ts` (integração)
- **Testes E2E**: `*.cy.ts`
- **Describe blocks**: Descrevem o componente/serviço sendo testado
- **It blocks**: Descrevem o comportamento específico

### Estrutura AAA
```typescript
it('should do something', () => {
  // Arrange - Configurar dados e mocks
  const mockData = { /* ... */ };
  
  // Act - Executar a ação
  component.doSomething(mockData);
  
  // Assert - Verificar o resultado
  expect(component.result).toBe(expectedResult);
});
```

### Data Attributes
Use `data-cy` para seletores em testes E2E:
```html
<button data-cy="submit-button">Enviar</button>
```

## 🐛 Debugging

### Testes Unitários
```bash
# Executar teste específico
ng test --include="**/contact-form.component.spec.ts"

# Debug no navegador
ng test --watch --browsers=Chrome
```

### Testes E2E
```bash
# Abrir Cypress para debug
npm run e2e:open

# Executar teste específico
npx cypress run --spec "cypress/e2e/contact-form.cy.ts"
```

## 📈 Métricas e Relatórios

### Cobertura de Código
- Relatório HTML disponível em `coverage/biss-solutions-app/index.html`
- Integração com CI/CD para verificação automática
- Alertas quando cobertura cai abaixo de 80%

### Performance
- Testes de tempo de carregamento
- Verificação de otimizações
- Monitoramento de Core Web Vitals

## 🔄 Integração CI/CD

### GitHub Actions (exemplo)
```yaml
- name: Run Unit Tests
  run: npm run test:ci

- name: Run E2E Tests
  run: npm run e2e

- name: Upload Coverage
  uses: codecov/codecov-action@v3
```

## 📚 Recursos Adicionais

- [Angular Testing Guide](https://angular.io/guide/testing)
- [Cypress Documentation](https://docs.cypress.io/)
- [Jasmine Documentation](https://jasmine.github.io/)
- [Testing Best Practices](https://testingjavascript.com/)

## 🤝 Contribuindo

Ao adicionar novos recursos:
1. Escreva testes unitários para novos componentes/serviços
2. Adicione testes de integração para fluxos complexos
3. Crie testes E2E para novos fluxos críticos
4. Mantenha cobertura > 80%
5. Atualize este documento se necessário

---

**Última atualização**: Dezembro 2024
**Versão**: 1.0.0
