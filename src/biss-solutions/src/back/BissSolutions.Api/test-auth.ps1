# Script de Teste - Autenticação API
# PowerShell Script para testar os endpoints de autenticação

$baseUrl = "http://localhost:5000"

Write-Host "🧪 Testando API de Autenticação Biss Solutions" -ForegroundColor Cyan
Write-Host ""

# Teste 1: Health Check
Write-Host "1️⃣ Testando Health Check..." -ForegroundColor Yellow
try {
    $healthResponse = Invoke-WebRequest -Uri "$baseUrl/health" -Method GET -UseBasicParsing
    Write-Host "✅ Health Check OK - Status: $($healthResponse.StatusCode)" -ForegroundColor Green
} catch {
    Write-Host "❌ Health Check FALHOU: $($_.Exception.Message)" -ForegroundColor Red
    Write-Host "   Certifique-se de que a API está rodando!" -ForegroundColor Yellow
    exit 1
}
Write-Host ""

# Teste 2: Login
Write-Host "2️⃣ Testando Login..." -ForegroundColor Yellow
$loginBody = @{
    email = "admin@biss.com.br"
    password = "ChangeThisPassword123!"
} | ConvertTo-Json

try {
    $loginResponse = Invoke-WebRequest -Uri "$baseUrl/api/admin/auth/login" -Method POST -Body $loginBody -ContentType "application/json" -UseBasicParsing
    $loginData = $loginResponse.Content | ConvertFrom-Json
    
    Write-Host "✅ Login OK!" -ForegroundColor Green
    Write-Host "   Token recebido: $($loginData.token.Substring(0, 50))..." -ForegroundColor Gray
    Write-Host "   Usuário: $($loginData.user.email)" -ForegroundColor Gray
    Write-Host "   Nome: $($loginData.user.fullName)" -ForegroundColor Gray
    
    $token = $loginData.token
} catch {
    Write-Host "❌ Login FALHOU: $($_.Exception.Message)" -ForegroundColor Red
    if ($_.Exception.Response) {
        $reader = New-Object System.IO.StreamReader($_.Exception.Response.GetResponseStream())
        $responseBody = $reader.ReadToEnd()
        Write-Host "   Resposta: $responseBody" -ForegroundColor Yellow
    }
    exit 1
}
Write-Host ""

# Teste 3: Obter informações do usuário
if ($token) {
    Write-Host "3️⃣ Testando GET /api/admin/auth/me..." -ForegroundColor Yellow
    try {
        $headers = @{
            "Authorization" = "Bearer $token"
        }
        $meResponse = Invoke-WebRequest -Uri "$baseUrl/api/admin/auth/me" -Method GET -Headers $headers -UseBasicParsing
        $meData = $meResponse.Content | ConvertFrom-Json
        
        Write-Host "✅ GET /me OK!" -ForegroundColor Green
        Write-Host "   ID: $($meData.id)" -ForegroundColor Gray
        Write-Host "   Email: $($meData.email)" -ForegroundColor Gray
        Write-Host "   Nome: $($meData.fullName)" -ForegroundColor Gray
    } catch {
        Write-Host "❌ GET /me FALHOU: $($_.Exception.Message)" -ForegroundColor Red
    }
    Write-Host ""
}

# Teste 4: Logout
if ($token) {
    Write-Host "4️⃣ Testando Logout..." -ForegroundColor Yellow
    try {
        $headers = @{
            "Authorization" = "Bearer $token"
        }
        $logoutResponse = Invoke-WebRequest -Uri "$baseUrl/api/admin/auth/logout" -Method POST -Headers $headers -UseBasicParsing
        Write-Host "✅ Logout OK!" -ForegroundColor Green
    } catch {
        Write-Host "❌ Logout FALHOU: $($_.Exception.Message)" -ForegroundColor Red
    }
    Write-Host ""
}

Write-Host "🎉 Testes concluídos!" -ForegroundColor Cyan

