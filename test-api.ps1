# Script de teste da API Biss Solutions
# Testa os endpoints de autenticação

$baseUrl = "http://localhost:5000"
if (-not $baseUrl) {
    Write-Host "⚠️  API não está rodando na porta padrão. Verifique a porta nos logs." -ForegroundColor Yellow
    exit
}

Write-Host "🚀 Testando API Biss Solutions..." -ForegroundColor Cyan
Write-Host ""

# Teste 1: Health Check
Write-Host "1️⃣  Testando Health Check..." -ForegroundColor Yellow
try {
    $healthResponse = Invoke-WebRequest -Uri "$baseUrl/health" -Method GET -UseBasicParsing -ErrorAction Stop
    Write-Host "✅ Health Check OK - Status: $($healthResponse.StatusCode)" -ForegroundColor Green
} catch {
    Write-Host "❌ Health Check falhou: $($_.Exception.Message)" -ForegroundColor Red
    Write-Host "   Verifique se a API está rodando na porta correta." -ForegroundColor Yellow
    exit
}

Write-Host ""

# Teste 2: Swagger
Write-Host "2️⃣  Verificando Swagger..." -ForegroundColor Yellow
try {
    $swaggerResponse = Invoke-WebRequest -Uri "$baseUrl/swagger" -Method GET -UseBasicParsing -ErrorAction Stop
    Write-Host "✅ Swagger disponível - Status: $($swaggerResponse.StatusCode)" -ForegroundColor Green
    Write-Host "   Acesse: $baseUrl/swagger" -ForegroundColor Cyan
} catch {
    Write-Host "⚠️  Swagger não disponível (pode estar desabilitado)" -ForegroundColor Yellow
}

Write-Host ""

# Teste 3: Login com credenciais padrão
Write-Host "3️⃣  Testando Login..." -ForegroundColor Yellow
$loginData = @{
    email = "admin@biss.com.br"
    password = "ChangeThisPassword123!"
} | ConvertTo-Json

try {
    $loginResponse = Invoke-WebRequest -Uri "$baseUrl/api/admin/auth/login" -Method POST -Body $loginData -ContentType "application/json" -UseBasicParsing -ErrorAction Stop
    $loginResult = $loginResponse.Content | ConvertFrom-Json
    
    if ($loginResult.token) {
        Write-Host "✅ Login bem-sucedido!" -ForegroundColor Green
        Write-Host "   Token recebido: $($loginResult.token.Substring(0, 50))..." -ForegroundColor Cyan
        Write-Host "   Usuário: $($loginResult.user.email)" -ForegroundColor Cyan
        Write-Host "   Expira em: $($loginResult.expiration)" -ForegroundColor Cyan
        
        $global:authToken = $loginResult.token
        $global:refreshToken = $loginResult.refreshToken
    } else {
        Write-Host "❌ Login falhou: Token não recebido" -ForegroundColor Red
    }
} catch {
    $errorDetails = $_.Exception.Response
    if ($errorDetails) {
        $reader = New-Object System.IO.StreamReader($errorDetails.GetResponseStream())
        $responseBody = $reader.ReadToEnd()
        Write-Host "❌ Login falhou: $($_.Exception.Message)" -ForegroundColor Red
        Write-Host "   Resposta: $responseBody" -ForegroundColor Yellow
    } else {
        Write-Host "❌ Login falhou: $($_.Exception.Message)" -ForegroundColor Red
    }
}

Write-Host ""

# Teste 4: Obter informações do usuário logado (se login foi bem-sucedido)
if ($global:authToken) {
    Write-Host "4️⃣  Testando endpoint /api/admin/auth/me..." -ForegroundColor Yellow
    try {
        $headers = @{
            "Authorization" = "Bearer $global:authToken"
        }
        $meResponse = Invoke-WebRequest -Uri "$baseUrl/api/admin/auth/me" -Method GET -Headers $headers -UseBasicParsing -ErrorAction Stop
        $meResult = $meResponse.Content | ConvertFrom-Json
        
        Write-Host "✅ Informações do usuário obtidas!" -ForegroundColor Green
        Write-Host "   ID: $($meResult.id)" -ForegroundColor Cyan
        Write-Host "   Email: $($meResult.email)" -ForegroundColor Cyan
        Write-Host "   Nome: $($meResult.fullName)" -ForegroundColor Cyan
        Write-Host "   Username: $($meResult.userName)" -ForegroundColor Cyan
    } catch {
        Write-Host "❌ Falha ao obter informações do usuário: $($_.Exception.Message)" -ForegroundColor Red
    }
}

Write-Host ""
Write-Host "✅ Testes concluídos!" -ForegroundColor Green

