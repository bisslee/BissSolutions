# 🚀 Como Testar a API de Autenticação

## Passo 1: Iniciar a API

Execute no terminal (na pasta do projeto):
```powershell
dotnet run
```

Aguarde a mensagem indicando que a aplicação está rodando (geralmente em `http://localhost:5000` ou `https://localhost:5001`).

## Passo 2: Testar os Endpoints

### Opção A: Usar o Script PowerShell (Recomendado)

Em outro terminal, execute:
```powershell
cd src\biss-solutions\src\back\BissSolutions.Api
.\test-auth.ps1
```

### Opção B: Teste Manual com curl ou Postman

#### 1. Health Check
```bash
curl http://localhost:5000/health
```

#### 2. Login (Obter Token)
```bash
curl -X POST http://localhost:5000/api/admin/auth/login \
  -H "Content-Type: application/json" \
  -d "{\"email\":\"admin@biss.com.br\",\"password\":\"ChangeThisPassword123!\"}"
```

**Credenciais padrão:**
- Email: `admin@biss.com.br`
- Senha: `ChangeThisPassword123!`

#### 3. Obter Informações do Usuário (Substitua {TOKEN} pelo token recebido)
```bash
curl -X GET http://localhost:5000/api/admin/auth/me \
  -H "Authorization: Bearer {TOKEN}"
```

#### 4. Logout
```bash
curl -X POST http://localhost:5000/api/admin/auth/logout \
  -H "Authorization: Bearer {TOKEN}"
```

## 🔍 O que esperar:

1. **Primeira execução**: O banco de dados será criado automaticamente e o usuário admin será criado
2. **Login bem-sucedido**: Retorna um token JWT válido por 60 minutos
3. **Endpoint /me**: Retorna as informações do usuário logado
4. **Logout**: Finaliza a sessão

## ⚠️ Problemas Comuns:

- **Erro de conexão com banco**: Verifique se o SQL Server LocalDB está instalado e rodando
- **Usuário não encontrado**: O usuário admin é criado automaticamente na primeira execução. Se não foi criado, verifique os logs
- **Token inválido**: Certifique-se de copiar o token completo e incluir "Bearer " antes dele no header Authorization

## 📝 Notas:

- O Swagger foi temporariamente desabilitado devido a incompatibilidade com .NET 10
- O banco de dados é criado automaticamente em desenvolvimento
- As credenciais padrão devem ser alteradas em produção

