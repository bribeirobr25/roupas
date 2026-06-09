# Knowledge Base — Candidatos Verificados, LOTE 5: TECH FIBRA-NATURAL (handoff para Claude Code)

> **Propósito:** quinto e último lote da Fase 4. Decisão de escopo tomada pelo dono: **Opção 2** — a KB inclui tech *com fibra natural* (Insider), mas **NÃO** inclui tech sintético (Sepiia fica de fora). Exige **uma mudança de schema**: adicionar `modal` ao enum `FiberType`.
> **Regra de ouro (do app):** só entra com dado de fonte oficial. A KB é curadoria de qualidade *natural verificada* — é por isso que Insider entra (modal/TENCEL) e Sepiia não (100% poliéster).
>
> ## ⚠️ DECISÃO DE ESCOPO + ENUM (tomada pelo dono — Opção 2)
> - **Incluir Insider** (tech brasileira, fibra modal/TENCEL natural). **NÃO incluir Sepiia** (100% poliéster — o parser do app já a penalizaria sozinho via regra de poliéster; não merece selo de "marca auditada").
> - **AÇÃO de schema (Claude Code):** adicionar `"modal"` ao enum `FiberType` em `lib/types.ts`. Consequências obrigatórias (tipos):
>   - `FIBER_QUALITY` (guide.ts): `modal: 4` (fibra nobre; modal/TENCEL da Lenzing é irmã do TENCEL Lyocell, que já é 4).
>   - `PREMIUM_FIBERS` (guide.ts): incluir `"modal"`.
> - Essa é a ÚNICA mudança de schema deste lote. NÃO adicionar `polyester` (decisão Opção 2: sintético fica fora da KB; o app já tem o campo `polyester` em findings + `POLYESTER_WARN_PCT` para penalizar via parser).
>
> ## FATO vs. JULGAMENTO (mesma convenção dos lotes 1–4)
> - **FATO:** `fiber`, `gsm`, `weave`, `origin`, `construction`.
> - **JULGAMENTO:** `tier`.
> - **INFERÊNCIA:** `wrinkle` (mas ver nota Insider — "desamassa no corpo" é declarado pela marca).

---

## INSTRUÇÕES PARA O CLAUDE CODE

### O que fazer
1. **Schema:** adicionar `"modal"` ao `FiberType` (lib/types.ts) + `modal: 4` em `FIBER_QUALITY` + `"modal"` em `PREMIUM_FIBERS` (lib/knowledge/guide.ts).
2. Adicionar a marca **`verified`** (Insider) ao `AUDITED_BRANDS`.
3. **NÃO** incluir Sepiia (decisão do dono). Está documentada abaixo só como contexto/contraexemplo — não vira código.
4. **NÃO** mudar o comportamento de honestidade: KB alimenta só o selo `brandMatch` (SPEC §3), não injeta em `findings`.
5. Rodar `pnpm test`, `pnpm lint`, `pnpm build`; adicionar assert de `matchBrandByHost` para insiderstore.com.br; atualizar teste se `knowledge.test.ts` cobrir FIBER_QUALITY/PREMIUM_FIBERS.
6. Sincronizar `docs/KNOWLEDGE-BASE.md §7`.

### Critérios de aceite (gate)
- Build/lint/testes verdes.
- `modal` existe em `FiberType`, `FIBER_QUALITY` (=4) e `PREMIUM_FIBERS`.
- `matchBrandByHost` resolve insiderstore.com.br.
- `elastane: 8` (8% elastano da Insider) — o app já tem campo `elastane`; 8% está no limite `ELASTANE_HIGH` do guide.ts (não penaliza forte, mas registrar honesto). Ver nota.
- Demais enums batem com `@/lib/types`.

### O que NÃO fazer
- NÃO adicionar `polyester` ao enum nem incluir Sepiia.
- NÃO classificar `modal` abaixo de 4 (é fibra nobre, não genérica).
- NÃO inventar GSM (a Insider não publica número exato; "20% mais gramatura" na Heavy é relativo, não um valor).

---

## MARCA `verified`

### 1. Insider — domínio `insiderstore.com.br` (BR)
**Método:** `web_search`/fetch das páginas oficiais insiderstore.com.br (fichas Tech T-Shirt + Tech Heavy + NEXTECH + página de tecnologias). Fibra modal/TENCEL da Lenzing (FSC/PEFC), Oeko-Tex, carbono negativa.

| product | category | fiber | fiberType | gsm | weave | construction | origin | wrinkle | tier | confidence |
|---|---|---|---|---|---|---|---|---|---|---|
| Tech T-Shirt | tshirt | 92% TENCEL modal + 8% elastane | modal | null | jersey | ["anti-odor", "8% elastane", "Lenzing FSC", "Oeko-Tex"] | Brazil | low | A+ | verified |
| Tech T-Shirt Heavy | tshirt | modal (encorpada, +20% gramatura vs. original) | modal | null | jersey | ["anti-odor", "heavier knit"] | Brazil | low | A+ | verified |
| NEXTECH Premium | tshirt | TENCEL Lyocell | TENCEL | null | jersey | ["anti-odor", "nanopores"] | Brazil | low | S | verified |

**Notas de honestidade:**
- **Fibra = FATO oficial:** Tech T-Shirt é "92% TENCEL modal + 8% elastano" (cravado). A NEXTECH é TENCEL Lyocell (usar `fiberType: TENCEL`, que já existe e é 4). Modal e Lyocell são ambas fibras nobres da Lenzing.
- `gsm: null` — a marca **não publica número de GSM**; a Heavy é descrita como "+20% gramatura" (relativo, não absoluto). NÃO inventar um número a partir disso.
- ⚠️ **8% elastano:** registrar honestamente. Pelo guide.ts, `ELASTANE_HIGH = 8` — está no limite (acima de 5% "bom equilíbrio", mas não exagerado). É o trade-off da elasticidade tech. Não é defeito grave, mas é fato a registrar (a cor Indigo varia: 62% modal, 30% viscose, 8% elastano — menos nobre; se incluir, `fiber` específico).
- **`wrinkle: low` é DECLARADO pela marca** ("desamassa no corpo"), não só inferido — diferente da maioria dos casos. Mas atenção: aqui o "não amassa" vem de **fibra natural + elastano**, NÃO de tratamento químico nem de sintético. É o caso alinhado ao guia (contraste direto com Sepiia).
- `tier`: NEXTECH (TENCEL Lyocell puro) = S; Tech T-Shirt/Heavy (modal+elastano) = A+ (o elastano segura um pouco).

---

## CONTEXTO — Sepiia (NÃO INTEGRAR, documentado para coerência)

Não entra na KB (decisão Opção 2). Registrado para que a pesquisa ES fique completa e a decisão seja rastreável.

- **Sepiia (sepiia.com, ES):** camisas/camisetas em **100% poliéster microfibra** (74 micro-fios, efeito lótus antimanchas, prata antibacteriana), não amassa, elástica, 100% feita na Espanha.
- **Por que fica de fora:** é tech sintético puro. O guia rebaixa "não amassa via sintético". O app já detecta poliéster (campo `polyester` + `POLYESTER_WARN_PCT = 40`) e penaliza no parser — então, se um usuário colar uma URL da Sepiia, o app já dá o veredito honesto sem precisar de selo de marca auditada.
- **Contraste pedagógico:** Sepiia (100% poliéster, "não amassa") vs. Insider (modal/TENCEL natural, "desamassa no corpo") — mesmo benefício de marketing, qualidades de fibra opostas. Exatamente a lição transversal do projeto.

---

## NOTAS DE ENUM (verificado contra `@/lib/types` e `guide.ts`)
- **`fiberType: "modal"`** — **NÃO existe ainda**. Adicionar ao `FiberType` + `FIBER_QUALITY: modal = 4` + incluir em `PREMIUM_FIBERS`. O tipo `Record<FiberType, GsmQuality>` obriga a entrada no FIBER_QUALITY.
- **`fiberType: "TENCEL"`** — já existe (=4). NEXTECH usa direto.
- **`weave: "jersey"`** — existe. OK.
- **`elastane`** — não é fiberType, é campo numérico em findings. 8% registrar em `construction: ["8% elastane"]` para visibilidade (o app lê elastano do parser na análise ao vivo; na KB é referência).
- NÃO adicionar `polyester` (Opção 2).

---

## RESUMO DO LOTE 5
- **1 mudança de schema (aprovada, Opção 2):** adicionar `modal` a `FiberType` + `FIBER_QUALITY` (=4) + `PREMIUM_FIBERS`.
- **1 marca `verified`:** Insider (92% TENCEL modal + 8% elastano; NEXTECH = TENCEL Lyocell; sem GSM publicado).
- **Sepiia NÃO integrada** (decisão Opção 2): tech sintético fica fora da KB; o parser já o penaliza.
- **Achado central:** "desamassa no corpo" da Insider vem de fibra natural + elastano (alinhado ao guia), não de sintético — o oposto exato da Sepiia. A KB permanece curadoria de qualidade natural.
- Schema: 1 valor novo (`modal`); honestidade inalterada; nenhum GSM inventado.
- **Fase 4 COMPLETA** após este lote (todos os pendentes endereçados).
