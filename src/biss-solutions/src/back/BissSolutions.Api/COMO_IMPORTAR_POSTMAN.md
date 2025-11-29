# 📬 Como Importar a Collection do Postman

## 🚀 Passo a Passo

### 1. Importar a Collection

1. Abra o **Postman**
2. Clique em **Import** (botão no canto superior esquerdo)
3. Clique em **Upload Files**
4. Selecione o arquivo: `BissSolutions_API.postman_collection.json`
5. Clique em **Import**

### 2. Importar o Environment (Opcional mas Recomendado)

1. No Postman, clique em **Import** novamente
2. Selecione o arquivo: `BissSolutions_API.postman_environment.json`
3. Clique em **Import**

### 3. Configurar a Variável `site-url`

1. No Postman, clique no ícone de **engrenagem** (⚙️) no canto superior direito
2. Selecione o environment **"Biss Solutions API - Environment"**
3. Ou crie um novo environment e adicione a variável:
   - **Key:** `site-url`
   - **Value:** `http://localhost:5000` (ou a URL da sua API)
   - **Type:** `default`

### 4. Selecionar o Environment

No canto superior direito do Postman, selecione o environment **"Biss Solutions API - Environment"** no dropdown.

## 📋 Endpoints Disponíveis

### 1. Health Check
- **GET** `{{site-url}}/health`
- Verifica se a API está funcionando

### 2. Login
- **POST** `{{site-url}}/api/admin/auth/login`
- Body:
```json
{
    "email": "admin@biss.com.br",
    "password": "ChangeThisPassword123!"
}
```
- ⚡ **Automático:** O token JWT é salvo automaticamente na variável `jwt_token` após o login bem-sucedido

### 3. Get Current User (Me)
- **GET** `{{site-url}}/api/admin/auth/me`
- Requer autenticação (token JWT no header)
- ⚡ Usa automaticamente o token salvo na variável `jwt_token`

### 4. Logout
- **POST** `{{site-url}}/api/admin/auth/logout`
- Requer autenticação (token JWT no header)
- ⚡ Usa automaticamente o token salvo na variável `jwt_token`

## 🔐 Credenciais Padrão

- **Email:** `admin@biss.com.br`
- **Senha:** `ChangeThisPassword123!`

⚠️ **IMPORTANTE:** Altere essas credenciais em produção!

## 💡 Dicas

1. **Ordem de Teste Recomendada:**
   - Primeiro: Health Check
   - Depois: Login (o token será salvo automaticamente)
   - Em seguida: Get Current User (para testar o token)
   - Por último: Logout

2. **Token Automático:**
   - Após fazer login com sucesso, o token JWT é automaticamente salvo na variável `jwt_token`
   - Os outros endpoints usam automaticamente esse token no header `Authorization`

3. **Alterar URL:**
   - Para mudar a URL da API, edite a variável `site-url` no environment
   - A URL será atualizada em todos os endpoints automaticamente

4. **Para Produção:**
   - Crie um novo environment para produção
   - Configure `site-url` com a URL de produção (ex: `https://api.biss.com.br`)

## 🎯 Exemplo de Uso

1. Execute **Health Check** para verificar se a API está rodando
2. Execute **Login** (o token será salvo automaticamente)
3. Execute **Get Current User** para ver suas informações
4. Execute **Logout** quando terminar

