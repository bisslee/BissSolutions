# 🧪 Guia de Teste da API - Autenticação

## 📋 Endpoints de Autenticação

### 1. Health Check
```bash
curl -X GET http://localhost:5000/health
```

### 2. Login (Obter Token JWT)
```bash
curl -X POST http://localhost:5000/api/admin/auth/login \
  -H "Content-Type: application/json" \
  -d "{\"email\":\"admin@biss.com.br\",\"password\":\"ChangeThisPassword123!\"}"
```

**Resposta esperada:**
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "refreshToken": "...",
  "expiration": "2025-11-29T...",
  "user": {
    "id": "...",
    "email": "admin@biss.com.br",
    "fullName": "Administrador",
    "userName": "admin@biss.com.br"
  }
}
```

### 3. Obter Informações do Usuário Logado (Requer Autenticação)
```bash
# Substitua {TOKEN} pelo token recebido no login
curl -X GET http://localhost:5000/api/admin/auth/me \
  -H "Authorization: Bearer {TOKEN}"
```

### 4. Logout
```bash
# Substitua {TOKEN} pelo token recebido no login
curl -X POST http://localhost:5000/api/admin/auth/logout \
  -H "Authorization: Bearer {TOKEN}"
```

## 🔧 Credenciais Padrão (Desenvolvimento)

- **Email:** `admin@biss.com.br`
- **Senha:** `ChangeThisPassword123!`

⚠️ **IMPORTANTE:** Altere essas credenciais em produção!

## 📝 Notas

- O usuário admin é criado automaticamente na primeira execução
- O token JWT tem validade de 60 minutos (configurável em appsettings.json)
- Use o token no header `Authorization: Bearer {TOKEN}` para acessar rotas protegidas

