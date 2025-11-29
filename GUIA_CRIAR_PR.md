# 📝 Guia: Como Criar Pull Requests Corretamente

## 🎯 Passo a Passo para Criar PRs

### PR 1: `feature/performance-seo` → `develop`

#### 1. Verificar estado atual
```bash
# Verificar branch atual
git branch

# Verificar se está tudo commitado
git status

# Ver commits que serão incluídos
git log develop..feature/performance-seo --oneline
```

#### 2. Criar Pull Request no GitHub

**No GitHub:**
1. Vá para: https://github.com/bisslee/BissSolutions
2. Clique em **"Pull requests"**
3. Clique em **"New pull request"**
4. Configure:
   - **Base:** `develop` ← Branch de destino
   - **Compare:** `feature/performance-seo` ← Sua branch
5. Preencha:

**Título:**
```
feat: Adiciona Pacote Promocional de Final de Ano - v2.6.2
```

**Descrição (copie do template):**
```markdown
# 🚀 Pull Request: Pacote Promocional de Final de Ano - v2.6.2

## 📋 Descrição

Esta PR adiciona o novo **Pacote Promocional de Final de Ano** ao site e atualiza a versão para **2.6.2**.

## ✨ O que foi implementado

### 🎄 Pacote Promocional de Final de Ano
- ✅ Novo serviço: Landing Page Profissional + Hospedagem 1 ano + 5 e-mails por R$ 200,00
- ✅ Página detalhada completa (`/services/pacote-completo`)
  - FAQ com 8 perguntas
  - Depoimentos de clientes
  - Processo de contratação explicado
- ✅ Card destacado na página de serviços (primeiro card)
- ✅ Destaque no carrossel da home (primeiro slide)
- ✅ Rota e breadcrumb configurados
- ✅ SEO otimizado

### 📦 Atualizações de Versão
- ✅ Versão atualizada para **2.6.2**
  - `package.json`: 2.6.2
  - `version.service.ts`: 2.6.2

### 📚 Documentação
- ✅ README atualizado com changelog da versão 2.6.2

## 🔧 Arquivos Principais

### Novos Arquivos
- `src/app/pages/services/pacote-completo/` (3 arquivos)

### Arquivos Modificados
- `src/app/pages/services/services.html`
- `src/app/components/carousel/carousel.ts`
- `src/app/app.routes.ts`
- `src/app/services/breadcrumb.service.ts`
- `src/app/services/version.service.ts`
- `package.json`
- `README_COMPLETO.md`

## ✅ Checklist

- [x] Código testado localmente
- [x] Build de produção gerado com sucesso
- [x] Versão atualizada em todos os arquivos necessários
- [x] README atualizado
- [x] Sem erros de linting
- [x] Imagens otimizadas (57.7% de redução)
- [x] SEO implementado corretamente

## 🧪 Como Testar

1. Acesse `/services` - Card do pacote deve aparecer primeiro
2. Acesse a home - Slide promocional deve aparecer primeiro
3. Acesse `/services/pacote-completo` - Verifique conteúdo completo
4. Verifique versão 2.6.2 no footer e página "Sobre"

---

**Versão:** 2.6.2 | **Data:** Dezembro 2024
```

6. Clique em **"Create pull request"**

---

### PR 2: `develop` → `main` (Após merge da PR 1)

#### 1. Fazer merge da PR anterior primeiro
- Aguardar aprovação e merge da PR `feature/performance-seo` → `develop`
- Ou fazer merge local se tiver permissões

#### 2. Atualizar develop local
```bash
# Trocar para develop
git checkout develop

# Atualizar do remoto
git pull origin develop

# Verificar diferenças com main
git log main..develop --oneline
```

#### 3. Criar Pull Request no GitHub

**No GitHub:**
1. Vá para: https://github.com/bisslee/BissSolutions
2. Clique em **"Pull requests"**
3. Clique em **"New pull request"**
4. Configure:
   - **Base:** `main` ← Branch de destino
   - **Compare:** `develop` ← Branch de origem
5. Preencha:

**Título:**
```
Release: Versão 2.6.2 - Pacote Promocional de Final de Ano
```

**Descrição:**
```markdown
# 🚀 Release: Versão 2.6.2 - Pacote Promocional de Final de Ano

## 📋 Descrição

Esta PR mergeia todas as funcionalidades desenvolvidas na branch `develop` para `main`, incluindo o novo **Pacote Promocional de Final de Ano** e atualização para versão **2.6.2**.

## 📦 Conteúdo da Release

### ✨ Novas Funcionalidades
- 🎄 **Pacote Promocional de Final de Ano**
  - Landing Page Profissional + Hospedagem 1 ano + 5 e-mails por R$ 200,00
  - Página detalhada completa
  - Destaque no carrossel da home
  - Card destacado na página de serviços

### 🔧 Melhorias Técnicas
- Breadcrumb system implementado
- Cookie alerts adicionados
- Ajustes de SEO
- Ajustes de 404 e redirecionamento
- Sistema de versionamento

## 🏗️ Build de Produção

- ✅ Build gerado com sucesso
- ✅ Tamanho otimizado: 363.22 kB (98.41 kB comprimido)
- ✅ Imagens otimizadas: 57.7% de redução

## ✅ Checklist para Merge

- [x] Todas as PRs anteriores foram revisadas e aprovadas
- [x] Build de produção testado
- [x] Versão atualizada corretamente
- [x] Documentação atualizada
- [x] Não há conflitos com main

## 🚀 Deploy

Após o merge:
1. Criar tag: `git tag -a v2.6.2 -m "Release v2.6.2"`
2. Push da tag: `git push origin v2.6.2`
3. Fazer deploy do build de produção

---

**Versão:** 2.6.2 | **Data:** Dezembro 2024
```

6. Clique em **"Create pull request"**

---

## ⚠️ Solução para Problema: "Só aparece comparação e nada mais"

Se ao criar a PR você só vê a comparação sem opção de criar:

### Problema 1: Branch não foi pushada
**Solução:**
```bash
git push origin feature/performance-seo
```

### Problema 2: Sem commits diferentes
**Verificar:**
```bash
# Ver diferenças com develop
git log develop..feature/performance-seo --oneline

# Se não mostrar nada, não há diferenças
```

### Problema 3: Branch base incorreta
**Solução:**
- Certifique-se de que está selecionando:
  - **Base:** branch de destino (develop ou main)
  - **Compare:** sua branch (feature/performance-seo ou develop)

### Problema 4: Falta preencher descrição
**Solução:**
- Sempre preencha título e descrição antes de criar
- Use os templates fornecidos acima

### Problema 5: GitLab ao invés de GitHub
**Solução:**
- Se for GitLab, o processo é similar mas a interface pode variar
- Use o mesmo conteúdo de título e descrição

---

## 📋 Checklist Final

Antes de criar PR:
- [ ] Branch pushada para o remoto
- [ ] Commits diferentes do branch base verificados
- [ ] Título descritivo preparado
- [ ] Descrição completa preparada
- [ ] Checklist preenchida
- [ ] Build de produção testado

---

**Dica:** Salve os templates em arquivos separados e copie/cole ao criar as PRs para garantir que nada seja esquecido!

