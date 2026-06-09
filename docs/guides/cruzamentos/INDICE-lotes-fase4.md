# Fase 4 — Índice dos Lotes de Knowledge Base (handoff mestre para Claude Code)

> **O que é isto:** índice dos lotes de marcas verificadas produzidos na Fase 4 (pesquisa no chat). Cada lote é um handoff independente. O lote 1 (`knowledge-base-candidatos-verificados.md`) **já foi integrado** (Fase 3, commits c941d29 + c2179c4). Os lotes 2–5 estão **prontos para integrar** (Fase 5), na ordem sugerida abaixo.
>
> **Princípios (válidos para todos os lotes):** fibra/GSM/origem = fato verificado em fonte oficial; tier = julgamento editorial; wrinkle = inferência (salvo quando a marca declara). KB alimenta só o selo `brandMatch`, nunca injeta em `findings`. Nunca inventar GSM. Schema só muda quando explicitado.

## Ordem de integração sugerida (incremental, um lote por vez, gate verde entre eles)

### LOTE 2 — `knowledge-base-candidatos-verificados-lote2.md` (sem mudança de schema)
- **verified:** Asphalte (camisa c/ GSM 150/155, FR/PT), ISTO. camisas (4 produtos 140/160/175/200 — ⚠️ ANEXAR à marca ISTO. existente, não criar nova), American Giant (Supima 102/129/207, US, oz→g).
- **partial (só com aprovação):** Hast (camisa two-ply), Dudalina (egípcio; Wrinkle Free = non-iron químico), Community Clothing (UK).
- **Enum:** nenhuma mudança. `jacquard` (Dudalina) → usar `poplin` + construction.

### LOTE 3 — `knowledge-base-candidatos-verificados-lote3.md` (MUDA SCHEMA: +egyptian)
- **Schema:** adicionar `egyptian` a `FiberType` + `FIBER_QUALITY` (=4) + `PREMIUM_FIBERS`.
- **verified:** Finamore (Giza 45 170/2, IT).
- **partial (só com aprovação):** Kiton (22 passos à mão; 100% cotton genérico), Borrelli (8-9 passos; idem).

### LOTE 4 — `knowledge-base-candidatos-verificados-lote4.md` (sem mudança de schema)
- **Tudo partial e OPCIONAL** (lote mais fraco em dado).
- Pompeii (origem PT — recomendado integrar), Silbon (cobertura ES), Scalpers (⚠️ recomendação: NÃO integrar — marginal).

### LOTE 5 — `knowledge-base-candidatos-verificados-lote5.md` (MUDA SCHEMA: +modal)
- **Schema:** adicionar `modal` a `FiberType` + `FIBER_QUALITY` (=4) + `PREMIUM_FIBERS`.
- **verified:** Insider (92% TENCEL modal + 8% elastano; NEXTECH = TENCEL Lyocell; BR).
- **Sepiia NÃO integrar** (decisão Opção 2 — tech sintético fica fora; parser já penaliza poliéster).

## Recomendação de sequência de commits (Fase 5)
Sugestão: agrupar por afinidade, sempre com gate verde e sem auto-commit, mostrando diff antes:
1. **Lote 2 verified** (Asphalte + ISTO. camisas + American Giant) — sem schema, ganho alto.
2. **Lote 3** (schema egyptian + Finamore) — isolar a mudança de schema num commit próprio.
3. **Lote 5** (schema modal + Insider) — outra mudança de schema isolada.
4. **partials aprovadas dos lotes 2/3/4** — só as que o dono aprovar, num commit de "partials".
> Cada mudança de schema (egyptian, modal) merece commit próprio para rastreabilidade. As marcas `partial` são todas opcionais e dependem de aprovação explícita do dono.

## Resumo do que a Fase 4 acrescenta (se tudo for integrado)
- **Novos verified:** Asphalte, ISTO. (camisas), American Giant, Finamore, Insider.
- **Novos partial (opcionais):** Hast, Dudalina, Community Clothing, Kiton, Borrelli, Pompeii, Silbon, (Scalpers não recomendado).
- **Schema:** +2 fiberTypes (`egyptian`, `modal`), ambos qualidade 4 + PREMIUM_FIBERS.
- **Cobertura nova:** camisaria social europeia com GSM (Asphalte/ISTO.), made-in-USA (American Giant), luxo napolitano (Finamore Giza 45), tech fibra-natural (Insider). Sintético (Sepiia) deliberadamente fora.
- **Decisão registrada:** a KB é curadoria de qualidade *natural* verificada — sintético puro fica para o parser penalizar, não para o selo de marca.
