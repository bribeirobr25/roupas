# Knowledge Base — Candidatos, LOTE 4: PENDENTES ESPANHA (handoff para Claude Code)

> **Propósito:** quarto lote da Fase 4. Pendentes do cruzamento Espanha (Silbon, Scalpers, Pompeii). **Todas `partial`** — nenhuma publica GSM ou contagem de fios por SKU. Mesmo método e regras dos lotes anteriores.
> **Aviso honesto:** este é o lote **mais fraco em dado verificável** até agora. Nenhuma destas três crava GSM nem fibra longa nomeada. São candidatas legítimas a `partial`, mas o dono pode razoavelmente decidir **não integrar** as mais marginais (ver recomendação por marca). Registrado para completar a Espanha com transparência, não porque agreguem muito à KB.
>
> ## FATO vs. JULGAMENTO (mesma convenção dos lotes 1–3)
> - **FATO:** `fiber`, `weave`, `origin`, `construction` (quando publicados).
> - **JULGAMENTO:** `tier`.
> - **INFERÊNCIA:** `wrinkle`.

---

## INSTRUÇÕES PARA O CLAUDE CODE

### O que fazer
1. Estas são **todas `partial`** e **opcionais** — integrar **somente as que o dono aprovar explicitamente**. Não integrar em bloco por padrão.
2. Para as aprovadas: adicionar ao `AUDITED_BRANDS` no formato `AuditedBrand`, com `confidence: "partial"` e `gsm: null`.
3. **NÃO** alterar schema nem comportamento de honestidade.
4. Rodar gate (test/lint/build) + asserts de `matchBrandByHost` só para as aprovadas.
5. Sincronizar `docs/KNOWLEDGE-BASE.md §7`.

### O que NÃO fazer
- NÃO inventar GSM nem contagem de fios (nenhuma das três publica).
- NÃO classificar BCI como marcador de fibra longa (BCI = certificação de cultivo sustentável, não qualidade de fibra). É nota de origem/sustentabilidade, não de qualidade têxtil.
- NÃO promover nenhuma a `verified`.

---

## MARCAS `partial`

### 1. Silbon — domínio `silbonshop.com` (ES) — recomendação: integrar se quiser cobertura ES
**Método:** `web_search`/fetch das páginas oficiais silbonshop.com (fichas de produto + coleções). Marca de Córdoba, smart-casual.

| product | category | fiber | fiberType | gsm | weave | construction | origin | wrinkle | tier | confidence |
|---|---|---|---|---|---|---|---|---|---|---|
| Camisa Sport Oxford | shirt | 100% cotton (algumas BCI) | generic | null | oxford | ["button-down"] | null | high | B+ | partial |
| Camisa de Vestir | shirt | 100% cotton | generic | null | poplin | ["cutaway collar"] | null | high | B+ | partial |

**Notas de honestidade:**
- Composição (100% algodão, às vezes BCI) e tecelagem (oxford/popelín) = **fato oficial**. Falta GSM e contagem de fios → `partial`.
- BCI (Better Cotton Initiative) é certificação de cultivo, NÃO fibra longa — não inflar tier por causa disso.
- `origin: null` — a oficial não declara país de confecção por SKU nesta verificação.
- `tier: B+` = julgamento (algodão puro + oxford são corretos, mas sem nada que destaque a fibra).

### 2. Pompeii — domínio `pompeiibrand.com` (ES) — recomendação: integrar (origem PT é um diferencial)
**Método:** `web_search`/fetch das páginas oficiais pompeiibrand.com (coleção camisas). Marca de Madrid.

| product | category | fiber | fiberType | gsm | weave | construction | origin | wrinkle | tier | confidence |
|---|---|---|---|---|---|---|---|---|---|---|
| Camisa (linha geral) | shirt | natural fibers (cotton/linen) | generic | null | poplin | [] | Portugal | high | B+ | partial |

**Notas de honestidade:**
- **Diferencial factual:** as camisas são "fabricadas em Portugal, com tecidos das melhores casas, qualidades naturais" (declaração oficial). Origem Portugal + fibra natural = fato positivo.
- Mas a página de coleção **não expõe GSM nem composição exata por SKU** nesta verificação → `partial`, `fiber` genérico. Se uma ficha individual confirmar composição/GSM, promover.
- `tier: B+` (origem PT puxa um pouco acima de uma marca de tendência pura).

### 3. Scalpers — domínio `scalperscompany.com` (ES) — recomendação: ⚠️ NÃO integrar (marginal)
**Método:** `web_search`/fetch das páginas oficiais scalperscompany.com. Marca de Sevilha, moda/tendência (caveiras, estampados).

| product | category | fiber | fiberType | gsm | weave | construction | origin | wrinkle | tier | confidence |
|---|---|---|---|---|---|---|---|---|---|---|
| Camiseta básica / Pocket Logo | tshirt | 100% cotton (BCI / às vezes organic) | generic | null | jersey | [] | null | low | C+ | partial |
| Camisa Popelín | shirt | 100% cotton | generic | null | poplin | [] | null | high | C+ | partial |

**Notas de honestidade:**
- ⚠️ **Recomendação: NÃO integrar.** É a marca mais fraca do conjunto em dado de qualidade: 100% algodão genérico, sem GSM, sem fibra longa, sem origem declarada. Forte em design/tendência, fraca nos marcadores que o guia valoriza.
- Pelo princípio "a KB só deve conter o que agrega sinal", a Scalpers adiciona pouco. Registrada aqui por completude da pesquisa ES, mas o `brandMatch` dela diria pouco ao usuário.
- Se integrada mesmo assim: `partial`, `tier: C+`, tudo `null` onde não há dado.

---

## NOTAS DE ENUM
- Nenhuma mudança de enum. Tudo usa valores existentes (`generic`, `oxford`, `poplin`, `jersey`).

---

## RESUMO DO LOTE 4
- **3 marcas `partial`, todas opcionais e fracas em dado.** Nenhuma publica GSM/contagem de fios.
- **Recomendação por marca:** Pompeii (integrar — origem PT é diferencial), Silbon (integrar se quiser cobertura ES), Scalpers (⚠️ não integrar — marginal, só design).
- **Achado de honestidade:** completar um mercado não significa forçar marcas fracas na KB. A Espanha tem suas estrelas reais em outro perfil (ex.: o caso Sepiia, que é tech/sintético — lote separado). Estas três são o "meio de tabela" espanhol, sem marcador de fibra que as eleve.
- Schema inalterado; honestidade inalterada; nenhum dado inventado.
- **Único pendente restante da Fase 4:** Insider/Sepiia (tech/sintético) — exige decisão de enum/escopo (próximo e último).
