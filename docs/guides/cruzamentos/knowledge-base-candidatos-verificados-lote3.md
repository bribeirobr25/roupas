# Knowledge Base — Candidatos Verificados, LOTE 3: LUXO NAPOLITANO (handoff para Claude Code)

> **Propósito:** terceiro lote da Fase 4. Camisaria de luxo napolitana (Finamore, Kiton, Borrelli). **Este lote exige UMA mudança de schema decidida pelo dono** (ver "DECISÃO DE ENUM" abaixo) — diferente dos lotes 1 e 2, que não tocavam o enum.
> **Regra de ouro (do app):** só entra com dado de fonte oficial. Marketing nunca vira dado. `gsm: null` quando a marca não publica (norma em camisa).
>
> ## ⚠️ DECISÃO DE ENUM JÁ TOMADA PELO DONO — Opção B
> O dono **aprovou adicionar o valor `egyptian` ao enum `FiberType`** em `lib/types.ts`. Contexto:
> - Camisa Finamore publica **"100% Egyptian cotton Giza 45"** (fato oficial). O enum atual (`Supima | Pima | TENCEL | merino | long-staple | organic | generic`) não captura algodão egípcio.
> - **AÇÃO (Claude Code):** adicionar `"egyptian"` ao type `FiberType` em `lib/types.ts`. É a ÚNICA mudança de schema autorizada neste lote.
> - O selo "Giza 45" específico **não vira valor de enum** — fica registrado no campo `fiber` (string livre), ex.: `fiber: "100% Egyptian cotton Giza 45"`. Assim a *categoria* pontuável é `egyptian` e o detalhe Giza 45 fica preservado no texto. (Distinção Giza-vs-egípcio-comum fica para evolução futura, se o dono quiser.)
> - **Verificar impacto:** `FIBER_QUALITY` (em `lib/knowledge/guide.ts`) é tipado como `Record<FiberType, GsmQuality>` — ou seja, ao adicionar `egyptian` ao enum, **o TypeScript obriga** uma entrada nova em `FIBER_QUALITY` (senão não compila; não há risco de default silencioso). Sugestão: `egyptian: 4` (ELS premium, mesmo nível de Supima/Pima/merino/TENCEL). **Adicionar também a `PREMIUM_FIBERS`** (lista em guide.ts) — hoje `["Supima", "Pima", "merino", "TENCEL"]`; egyptian/Giza pertence a esse grupo. Sem isso, seria a única fibra nível-4 fora de PREMIUM_FIBERS.
>
> ## FATO vs. JULGAMENTO (mesma convenção dos lotes 1–2)
> - **FATO da marca (verificado):** `fiber`, `gsm`, `weave`, `origin`, `construction`.
> - **JULGAMENTO editorial:** `tier`.
> - **INFERÊNCIA:** `wrinkle` (camisa de algodão puro plano → high), salvo se a marca declarar.

---

## INSTRUÇÕES PARA O CLAUDE CODE

### O que fazer
1. **Schema:** adicionar `"egyptian"` ao enum `FiberType` em `lib/types.ts` (decisão do dono, Opção B). Por consequência (tipos obrigam): adicionar `egyptian: 4` ao `FIBER_QUALITY` e incluir `"egyptian"` em `PREMIUM_FIBERS`, ambos em `lib/knowledge/guide.ts`.
2. Adicionar a marca **`verified`** (Finamore) ao `AUDITED_BRANDS`.
3. Adicionar as marcas **`partial`** (Kiton, Borrelli) **somente se o dono aprovar** — são luxo real, mas a fibra específica não é cravada (100% cotton genérico). Construção é fato; fibra não.
4. **NÃO** mudar o comportamento de honestidade: KB alimenta só o selo `brandMatch` (SPEC §3), não injeta em `findings`.
5. Rodar `pnpm test`, `pnpm lint`, `pnpm build`; adicionar asserts de `matchBrandByHost` para os novos domínios; **adicionar/atualizar teste do enum** se `knowledge.test.ts` cobrir `FIBER_QUALITY` (provável — o teste já referencia FIBER_QUALITY).
6. Sincronizar `docs/KNOWLEDGE-BASE.md §7`.

### Critérios de aceite (gate)
- Build/lint/testes verdes.
- `egyptian` existe em `FiberType`, em `FIBER_QUALITY` (=4) e em `PREMIUM_FIBERS`.
- `matchBrandByHost` resolve: finamore.it (+ kiton.com, luigiborrelli.com se as partial entrarem).
- Nenhum `gsm` inventado; camisa social sem GSM publicado = `null`.
- Demais enums batem com `@/lib/types`.

### O que NÃO fazer
- NÃO criar valor de enum "giza"/"giza45" — Giza 45 fica no campo `fiber` (texto), categoria é `egyptian`.
- NÃO promover Kiton/Borrelli a `verified` (fibra genérica).
- NÃO inventar contagem de fios nem GSM para nenhuma das três.

---

## MARCA `verified`

### 1. Finamore 1925 — domínio `finamore.it` (IT)
**Método:** `web_search`/fetch das páginas oficiais finamore.it (fichas de produto Napoli 170 a due + home). Camisaria napolitana fundada em 1925; 7–12 passos artesanais.

| product | category | fiber | fiberType | gsm | weave | construction | origin | wrinkle | tier | confidence |
|---|---|---|---|---|---|---|---|---|---|---|
| Napoli 170 a due (Giza 45) | shirt | 100% Egyptian cotton Giza 45 | egyptian | null | poplin | ["two-ply (170/2)", "handmade Naples", "mother-of-pearl"] | Italy (Naples) | high | S | verified |

**Notas de honestidade:**
- **Fibra = FATO oficial forte:** a ficha crava "100% Egyptian cotton Giza 45" e fio "170/2" (two-ply). Giza 45 é o algodão egípcio mais nobre (ELS). `fiberType: egyptian`; o "Giza 45" e "170/2" ficam no `fiber`/`construction`.
- `gsm: null` — camisa social não publica GSM (norma). Não é falha; é por isso que a confiança é `verified` pela FIBRA, não pelo peso. (O app pontua fibra + construção; GSM ausente em camisa é esperado.)
- `weave: "poplin"` (a popeline Giza 45 170/2 é o carro-chefe; oferecem também oxford/twill). Existe no enum. OK.
- `tier: S` = julgamento nosso (topo de fibra + manufatura à mão). `wrinkle: high` = inferência (algodão puro plano).

---

## MARCAS `partial` (só com aprovação do dono)

### 2. Kiton — domínio `kiton.com` (IT)
**Método:** `web_search`/fetch das páginas oficiais kiton.com (fichas de camisa). Atelier de Nápoles, 22 passos à mão.

| product | category | fiber | fiberType | gsm | weave | construction | origin | wrinkle | tier | confidence |
|---|---|---|---|---|---|---|---|---|---|---|
| Camicia Cotone (white) | shirt | 100% cotton (fine natural cotton) | generic | null | poplin | ["22 steps handmade Naples", "Pinctada Maxima mother-of-pearl"] | Italy (Naples) | high | A+ | partial |

**Notas de honestidade:**
- ⚠️ **Fibra genérica:** a ficha oficial diz "100% cotton" / "fine natural cotton" / às vezes "cotton blend" / "cotton-cashmere" — **não crava Giza nem contagem de fios**. Por isso `fiberType: generic` e `confidence: partial`, apesar do preço/prestígio. Honestidade: marketing de luxo ≠ fibra especificada.
- A excelência **verificável** está na MANUFATURA (22 passos à mão, madrepérola Pinctada Maxima entalhada) — registrada em `construction`. Isso é fato; a fibra premium específica, não.
- `tier: A+` (não S) justamente porque a fibra não é cravada — coerente com "fibra > marketing".
- Variantes cotton-cashmere existem (mandarin collar) — se o dono quiser, entram como produto à parte com `fiber: "cotton-cashmere blend"`.

### 3. Luigi Borrelli — domínio `luigiborrelli.com` (IT)
**Método:** `web_search`/fetch das páginas oficiais luigiborrelli.com (fichas de camisa + home). Fundada 1957, Nápoles; 8–9 passos à mão.

| product | category | fiber | fiberType | gsm | weave | construction | origin | wrinkle | tier | confidence |
|---|---|---|---|---|---|---|---|---|---|---|
| Cotton Shirt (white) | shirt | 100% cotton | generic | null | poplin | ["8-9 steps handmade Naples", "mother-of-pearl", "taffeta gusset"] | Italy (Naples) | high | A+ | partial |
| Twill Shirt | shirt | 100% cotton | generic | null | twill | ["handmade Naples", "mother-of-pearl"] | Italy (Naples) | high | A | partial |

**Notas de honestidade:**
- ⚠️ Mesma situação da Kiton: ficha oficial diz **"100% cotton" genérico** (poplin/twill/oxford), sem Giza nem contagem de fios → `fiberType: generic`, `partial`.
- Excelência verificável na MANUFATURA: 8–9 passos à mão, madrepérola, triângulo de tafetá branco nas laterais (assinatura Borrelli) — em `construction`. Fato.
- `tier: A+/A` = julgamento; `wrinkle: high` = inferência.

---

## NOTAS DE ENUM (verificado contra `@/lib/types` e `guide.ts`)
- **`fiberType: "egyptian"`** — **NÃO existe ainda**. Adicionar ao `FiberType` (lib/types.ts) + `FIBER_QUALITY: egyptian = 4` + incluir em `PREMIUM_FIBERS` (lib/knowledge/guide.ts). O tipo `Record<FiberType, GsmQuality>` obriga a entrada no FIBER_QUALITY — o compilador garante.
- **`weave: "poplin"`, `"twill"`, `"oxford"`** — todos existem. OK.
- **`fiberType: "generic"`** — existe (Kiton/Borrelli). OK.
- **Contexto de pontuação (confirmado em guide.ts):** para camisa, GSM 130–180 é `quality: 4` e a fibra entra com peso máximo — a Finamore (egyptian=4 + poplin + two-ply/handmade) pontua alto mesmo com `gsm: null`, pois fibra+construção carregam o score. Coerente com `tier: S`.
- Construções (passos à mão, madrepérola, tafetá) → `construction` (string[] livre). Nota: `mother-of-pearl` e `two-ply` já são CONSTRUCTION_SIGNALS canônicos (guide.ts) — usar essas chaves exatas onde aplicável para o app reconhecer.

---

## RESUMO DO LOTE 3
- **1 mudança de schema (aprovada, Opção B):** adicionar `egyptian` a `FiberType` + `FIBER_QUALITY` (=4) + `PREMIUM_FIBERS`.
- **1 marca `verified`:** Finamore (Giza 45 170/2 = fibra de fato; sem GSM, norma de camisa).
- **2 marcas `partial`** (só com aprovação): Kiton (22 passos à mão; fibra 100% cotton genérica) e Borrelli (8-9 passos à mão; idem).
- **Achado de honestidade central:** nem todo luxo napolitano publica a fibra. Finamore crava Giza 45 (verified pela fibra); Kiton e Borrelli vendem manufatura, não fibra especificada (partial). Coerente com "fibra/fato > marketing".
- **Construção como fato:** as três têm manufatura artesanal verificável (passos à mão, madrepérola) — registrada em `construction`, que o app pontua.
- **Pendentes restantes na Fase 4:** ES (Scalpers/Silbon/Pompeii), Insider/Sepiia (tech/sintético — decisão sobre se/como entram na KB).
