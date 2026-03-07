# 🚀 Guia de Deploy Seguro - 2026

## Checklist de Segurança Pré-Deploy

### 1. Verificações Locais

- [ ] `npm audit` sem vulnerabilidades críticas
- [ ] `npm run build` roda sem erros
- [ ] Não há senhas/tokens no código
- [ ] Não há `console.log` em produção
- [ ] `.env` não está commitado
- [ ] Versão do Node.js é ^18+

```bash
# Executar antes de fazer deploy
npm audit
npm run build
git log --oneline -1  # Verificar último commit
```

### 2. Configuração de Headers de Segurança

**Para Vercel (recomendado para React apps):**

Crie `vercel.json`:
```json
{
  "headers": [
    {
      "source": "/(.*)",
      "headers": [
        {
          "key": "Strict-Transport-Security",
          "value": "max-age=31536000; includeSubDomains; preload"
        },
        {
          "key": "X-Content-Type-Options",
          "value": "nosniff"
        },
        {
          "key": "X-Frame-Options",
          "value": "DENY"
        },
        {
          "key": "Referrer-Policy",
          "value": "strict-origin-when-cross-origin"
        },
        {
          "key": "Permissions-Policy",
          "value": "camera=(), microphone=(), geolocation=()"
        }
      ]
    }
  ]
}
```

**Para Nginx (se self-hosted):**
```nginx
add_header Strict-Transport-Security "max-age=31536000; includeSubDomains; preload" always;
add_header X-Content-Type-Options "nosniff" always;
add_header X-Frame-Options "DENY" always;
add_header Referrer-Policy "strict-origin-when-cross-origin" always;
add_header Permissions-Policy "camera=(), microphone=(), geolocation=()" always;
add_header X-Permitted-Cross-Domain-Policies "none" always;
```

### 3. HTTPS (Obrigatório)

- [ ] Certificado SSL/TLS ativo
- [ ] HSTS habilitado (veja headers acima)
- [ ] Redirecionamento HTTP → HTTPS
- [ ] Certificado válido e atualizado

### 4. Variáveis de Ambiente

**Nunca exponha em `REACT_APP_*`:**
- ❌ API Keys secretas
- ❌ Senhas
- ❌ Tokens de autenticação privados
- ❌ Chaves de criptografia

**Seguro para `REACT_APP_*`:**
- ✅ URLs públicas
- ✅ IDs de usuário público
- ✅ Configurações públicas

### 5. CSP (Content Security Policy)

Já configurada no `public/index.html`. Monitorar:
- [ ] Nenhum script inline não autorizado
- [ ] Nenhum style inline não autorizado

### 6. Monitoramento Contínuo

```bash
# Executar mensalmente
npm audit

# Atualizar dependências
npm update

# Verificar vulnerabilidades críticas
npm audit --audit-level=critical
```

### 7. Logs e Debugging

**Ambiente de Produção:**
- ❌ Sem `console.log`
- ❌ Sem `debugger` statements
- ✅ Use service como Sentry para error tracking
- ✅ Implemente structured logging

### 8. Backup e Disaster Recovery

- [ ] Backups automáticos habilitados
- [ ] Plano de recuperação documentado
- [ ] Testes de restore periódicos

## Checklist de Deploy

```bash
# 1. Verificar tudo
npm audit
npm run build
npm test

# 2. Fazer commit
git add .
git commit -m "feat: ready for production deploy"
git push production main

# 3. Trigger deploy (depende do seu provider)
# Vercel: automático ao fazer push para main/production
# Manual: ./scripts/deploy.sh
```

## Recursos de Segurança 2026

- [OWASP Top 10](https://owasp.org/www-project-top-ten/)
- [Web Security Academy](https://portswigger.net/web-security)
- [Mozilla Security Guidelines](https://infosec.mozilla.org/guidelines/)
- [NIST Cybersecurity Framework](https://www.nist.gov/cyberframework)

## SLA de Segurança

| Severidade | Tempo de Resposta |
|-----------|------------------|
| Crítica   | < 1 hora         |
| Alta      | < 24 horas       |
| Média     | < 7 dias         |
| Baixa     | < 30 dias        |

---

**Última atualização**: 7 de março de 2026
