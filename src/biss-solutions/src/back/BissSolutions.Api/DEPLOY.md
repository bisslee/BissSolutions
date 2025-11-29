# 🚀 Guia de Deploy da API Biss Solutions

## 📋 Pré-requisitos

- .NET 8 SDK instalado
- SQL Server (ou banco de dados configurado)
- Servidor com IIS ou Linux (para Docker)

## 🔧 Configuração para Produção

### 1. Configurar appsettings.Production.json

Edite o arquivo `appsettings.Production.json` com suas configurações:

```json
{
  "ConnectionStrings": {
    "DefaultConnection": "Server=SEU_SERVIDOR;Database=BissSolutionsDb;User Id=SEU_USUARIO;Password=SUA_SENHA;TrustServerCertificate=true;"
  },
  "EmailSettings": {
    "SmtpServer": "mail.biss.com.br",
    "SmtpPort": 587,
    "EnableSsl": true,
    "SmtpUsername": "contato@biss.com.br",
    "SmtpPassword": "SUA_SENHA_EMAIL",
    "FromEmail": "contato@biss.com.br",
    "ToEmail": "ivana@biss.com.br"
  }
}
```

### 2. Variáveis de Ambiente (Recomendado)

Para maior segurança, use variáveis de ambiente:

```bash
# Connection String
ASPNETCORE_ConnectionStrings__DefaultConnection="Server=..."

# Email Settings
ASPNETCORE_EmailSettings__SmtpPassword="..."
```

## 🐳 Deploy com Docker

### Build da Imagem

```bash
cd src/biss-solutions/src/back/BissSolutions.Api
docker build -t biss-solutions-api:latest .
```

### Executar Container

```bash
docker run -d \
  --name biss-api \
  -p 80:80 \
  -p 443:443 \
  -e ASPNETCORE_ENVIRONMENT=Production \
  -e ASPNETCORE_ConnectionStrings__DefaultConnection="Server=..." \
  -e ASPNETCORE_EmailSettings__SmtpPassword="..." \
  biss-solutions-api:latest
```

### Docker Compose (Opcional)

Crie um `docker-compose.yml`:

```yaml
version: '3.8'
services:
  api:
    build: .
    ports:
      - "80:80"
      - "443:443"
    environment:
      - ASPNETCORE_ENVIRONMENT=Production
      - ASPNETCORE_ConnectionStrings__DefaultConnection=Server=...
    restart: unless-stopped
```

## 🌐 Deploy no IIS (Windows Server)

### 1. Publicar a Aplicação

```bash
dotnet publish -c Release -o ./publish
```

### 2. Configurar IIS

1. Instale o **ASP.NET Core Hosting Bundle** (versão 8.0)
2. Crie um novo site no IIS
3. Configure o Application Pool para **No Managed Code**
4. Aponte o site para a pasta `publish`
5. Configure o binding (HTTP/HTTPS)

### 3. Configurar web.config (se necessário)

O .NET 8 gera automaticamente, mas você pode criar um `web.config`:

```xml
<?xml version="1.0" encoding="utf-8"?>
<configuration>
  <location path="." inheritInChildApplications="false">
    <system.webServer>
      <handlers>
        <add name="aspNetCore" path="*" verb="*" modules="AspNetCoreModuleV2" resourceType="Unspecified" />
      </handlers>
      <aspNetCore processPath="dotnet" 
                  arguments=".\BissSolutions.Api.dll" 
                  stdoutLogEnabled="false" 
                  stdoutLogFile=".\logs\stdout" 
                  hostingModel="inprocess" />
    </system.webServer>
  </location>
</configuration>
```

## 🐧 Deploy no Linux (Nginx + Systemd)

### 1. Publicar

```bash
dotnet publish -c Release -o /var/www/biss-api
```

### 2. Criar Service File

Crie `/etc/systemd/system/biss-api.service`:

```ini
[Unit]
Description=Biss Solutions API
After=network.target

[Service]
Type=notify
ExecStart=/usr/bin/dotnet /var/www/biss-api/BissSolutions.Api.dll
Restart=always
RestartSec=10
KillSignal=SIGINT
SyslogIdentifier=biss-api
User=www-data
Environment=ASPNETCORE_ENVIRONMENT=Production
Environment=ASPNETCORE_URLS=http://localhost:5000

[Install]
WantedBy=multi-user.target
```

### 3. Configurar Nginx

Crie `/etc/nginx/sites-available/biss-api`:

```nginx
server {
    listen 80;
    server_name api.biss.com.br;

    location / {
        proxy_pass http://localhost:5000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection keep-alive;
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
```

### 4. Habilitar e Iniciar

```bash
sudo systemctl enable biss-api
sudo systemctl start biss-api
sudo ln -s /etc/nginx/sites-available/biss-api /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl reload nginx
```

## ☁️ Deploy no Azure

### Azure App Service

1. Crie um App Service no Azure Portal
2. Configure:
   - Runtime Stack: .NET 8
   - Operating System: Linux ou Windows
3. Configure as Connection Strings e App Settings
4. Faça deploy via:
   - Azure DevOps
   - GitHub Actions
   - Visual Studio
   - Azure CLI

```bash
az webapp up --name biss-api --resource-group biss-resources --runtime "DOTNET|8.0"
```

## 🔒 Segurança

### 1. HTTPS

Configure certificado SSL/TLS no servidor ou use Let's Encrypt.

### 2. Secrets

**NUNCA** commite credenciais no repositório. Use:
- Azure Key Vault
- AWS Secrets Manager
- Variáveis de ambiente
- User Secrets (desenvolvimento)

### 3. CORS

O CORS já está configurado para aceitar apenas:
- `https://biss.com.br`
- `https://www.biss.com.br`

## 📊 Monitoramento

### Logs

Os logs são gerados automaticamente. Configure em `appsettings.Production.json`:

```json
"Logging": {
  "LogLevel": {
    "Default": "Information"
  }
}
```

### Health Checks (Opcional)

Adicione health checks no `Program.cs`:

```csharp
builder.Services.AddHealthChecks();
app.MapHealthChecks("/health");
```

## 🔄 Atualizações

### Processo de Atualização

1. Faça backup do banco de dados
2. Publique nova versão
3. Teste em ambiente de staging
4. Faça deploy em produção
5. Monitore logs

## 📞 Suporte

Para dúvidas ou problemas:
- Email: contato@biss.com.br
- Telefone: (11) 95273-9399

---

**Última atualização:** 2025-01-XX

