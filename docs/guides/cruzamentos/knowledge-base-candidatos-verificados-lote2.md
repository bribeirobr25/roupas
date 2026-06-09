# Knowledge Base — Candidatos Verificados, LOTE 2 (handoff para Claude Code)

> **Propósito:** segundo lote de marcas para `lib/knowledge/brands.ts`, fruto da Fase 4 (aprofundamento, pesquisa no chat). Mesmo método e mesmas regras do lote 1 (`knowledge-base-candidatos-verificados.md`). Este arquivo é independente: o Claude Code pode integrá-lo numa Fase 5 separada.
> **Regra de ouro (do app):** só entra com dado de fonte oficial. `gsm: null` quando a marca não publica. Marketing nunca vira dado.
>
> ## ⚠️ LEIA ANTES DE USAR — o que é FATO vs. JULGAMENTO neste arquivo
> Mesma convenção do lote 1:
> - **FATO da marca (verificado):** `fiber`, `gsm`, `weave`, `origin`, `construction` — extraídos da fonte indicada (método anotado por marca).
> - **JULGAMENTO editorial (NÃO é dado da marca):** `tier` (S/A+/A...) é opinião nossa derivada do guia.
> - **INFERÊNCIA da regra do guia:** `wrinkle` é, na maioria, deduzido (malha → low / camisa de algodão puro plano → high), salvo quando a marca declara.
>
> **Conversão oz→g/m²:** fator 33.906 (usado quando a marca publica em oz/yd²). Cálculo transparente, não estimativa.

---

## INSTRUÇÕES PARA O CLAUDE CODE

### O que fazer
1. Adicionar as **marcas `verified` abaixo** (Asphalte, American Giant) ao array `AUDITED_BRANDS` em `lib/knowledge/brands.ts`, no formato `AuditedBrand` existente.
2. **ISTO. (camisas) — CASO ESPECIAL:** a marca ISTO. **já existe** na KB (com a Supima Tee). Anexar os 4 produtos de camisa ao `products[]` da entrada ISTO. existente — NÃO criar marca nova nem segundo assert de host.
3. Adicionar as **marcas `partial`** (Hast, Dudalina, Community Clothing) **somente se o dono aprovar** — têm fibra/origem de fato, mas sem GSM (camisa social/contagem de fios não publicada; Community sem GSM por SKU). Candidatas legítimas a `confidence: "partial"`, como UNIQLO/Vans.
4. **NÃO** alterar o schema. Tudo cabe no formato atual.
5. **NÃO** mudar o comportamento de honestidade: KB alimenta só o selo `brandMatch` (SPEC §3), não injeta em `findings`.
6. Rodar `pnpm test`, `pnpm lint`, `pnpm build`; adicionar asserts de `matchBrandByHost` para os novos domínios.
7. Sincronizar `docs/KNOWLEDGE-BASE.md §7` (tabela de marcas) com o que for integrado.

### Critérios de aceite (gate)
- Build/lint/testes verdes.
- `matchBrandByHost` resolve: asphalte.com, american-giant.com (+ hastparis.com, dudalina.com.br, communityclothing.co.uk se as partial entrarem). **ISTO. (isto.pt) já resolve — não duplicar.**
- Nenhum `gsm` inventado; `null` preservados.
- Enums (`fiberType`, `weave`, `wrinkle`, `category`) batem com `@/lib/types`. Ver "Notas de enum".

### O que NÃO fazer
- Não promover as `partial` a `verified`.
- Não inferir GSM de "heavyweight"/"premium".
- Não converter as camisas de Asphalte para a categoria tshirt (são `shirt`).

---

## MARCAS `verified` (prontas para integrar)

### 1. Asphalte — domínio `asphalte.com` (FR)
**Método:** `web_fetch`/busca das páginas oficiais asphalte.com (fichas de produto + blog oficial). **Raridade:** publica GSM em CAMISA (quase nenhuma marca de camisa faz). Coton bio, GOTS/Oeko-Tex, transparência via FairlyMade.

| product | category | fiber | fiberType | gsm | weave | construction | origin | wrinkle | tier | confidence |
|---|---|---|---|---|---|---|---|---|---|---|
| Chemise Chambray | shirt | 100% organic cotton | organic | 155 | chambray | ["plain weave", "enzyme-washed"] | Portugal | high | A+ | verified |
| Chemise Oxford (v4) | shirt | 100% organic cotton | organic | 150 | oxford | ["button-down", "7 stitches/cm", "enzyme-washed"] | France (Emanuel Lang, Alsace) ou Portugal | high | A+ | verified |

**Notas de honestidade:**
- GSM 155 (Chambray) e 150 (Oxford v4) = **fato publicado pela marca** (raro em camisa). Caem na faixa "premium social" do guia camisa (130–180).
- `weave: "chambray"` e `"oxford"` já existem no enum (Norse usa oxford). Confirmar `chambray` em `@/lib/types`; se não existir, usar `plain`/`poplin` + `construction: ["chambray"]`.
- `wrinkle: high` = inferência (algodão puro, armadura toile/oxford amassam). A marca usa enzyme-wash que ameniza, mas não a ponto de "low"; manter `high` honesto.
- Origin do Oxford varia por versão (Alsace/Emanuel Lang em algumas; Portugal em outras) — registrei ambas; o Claude Code pode escolher a string mais conservadora ("France/Portugal").
- Chemise d'Hiver (twill escovado, pré-lavada, Portugal) existe mas **sem GSM publicado nesta verificação** → fica de fora ou `partial`.

### 2. ISTO. (CAMISAS) — domínio `isto.pt` (PT) — ⚠️ MARCA JÁ EXISTE NA KB
**Método:** `web_fetch`/busca das páginas oficiais isto.pt (fichas Oxford Shirt + flanelas + página de fabrics). A ISTO. **publica GSM em camisa** (raro). A marca já está em `brands.ts` com a Supima T-Shirt (160g) — estes são **produtos adicionais a anexar ao array `products[]` da marca ISTO. existente**, NÃO uma marca nova.

| product | category | fiber | fiberType | gsm | weave | construction | origin | wrinkle | tier | confidence |
|---|---|---|---|---|---|---|---|---|---|---|
| Oxford Shirt | shirt | 100% organic cotton (GOTS) | organic | 175 | oxford | ["washed", "pre-shrunk", "box pleat"] | Portugal (Somelos + DOCAS) | high | A+ | verified |
| Lightweight Flannel Shirt | shirt | 100% organic cotton (GOTS) | organic | 140 | flannel | ["regular fit"] | Portugal | high | A | verified |
| Midweight Flannel Shirt | shirt | 100% organic cotton (GOTS) | organic | 160 | flannel | [] | Portugal | high | A+ | verified |
| Checked Flannel Shirt | shirt | 100% organic cotton (GOTS) | organic | 200 | flannel | ["bio resin buttons"] | Portugal | high | A+ | verified |

**Notas de honestidade:**
- **AÇÃO ESPECIAL:** anexar estes 4 produtos ao `products[]` da ISTO. já existente (que tem isto.pt e a Supima Tee). NÃO criar segunda entrada "ISTO.". `matchBrandByHost` já resolve isto.pt — nenhum assert novo necessário para a ISTO.
- GSM 175/140/160/200 = **fato publicado** (oficial). Todos GOTS, Portugal. A Oxford 175g e a Checked Flannel 200g são camisas encorpadas (acima da faixa premium 130–180 a 200g).
- `weave: "flannel"` existe no enum (confirmado em types.ts). OK.
- `wrinkle: high` = inferência (algodão puro plano/flanela amassam). Honesto.
- A Linen Shirt (100% linho francês da Normandia, Portugal) existe mas **sem GSM publicado** → fica de fora deste lote ou entra como `partial` sem gsm.

### 3. American Giant — domínio `american-giant.com` (US)
**Método:** `web_fetch`/busca da página oficial american-giant.com/pages/greatest-american-t-shirt. Publica peso em **oz/yd²** (convertido com fator 33.906). 100% Supima cultivado nos EUA, Made in USA.

| product | category | fiber | fiberType | gsm | weave | construction | origin | wrinkle | tier | confidence |
|---|---|---|---|---|---|---|---|---|---|---|
| Classic Tee | tshirt | 100% American-grown Supima cotton | Supima | 129 | jersey | ["3.8 oz/yd²"] | USA | low | A | verified |
| Slub Tee (best-seller) | tshirt | 100% American-grown Supima cotton (heavyweight slub) | Supima | 207 | jersey | ["6.1 oz/yd²", "slub"] | USA | low | A+ | verified |
| Airy Supima Tee | tshirt | 100% American-grown Supima cotton | Supima | 102 | jersey | ["3 oz/yd²"] | USA | low | A- | verified |

**Notas de honestidade:**
- GSM = conversão de oz publicado pela marca: 3.8 oz → 129; 6.1 oz → 207; 3 oz → 102 (fator 33.906). Cálculo transparente, não estimativa. Se preferir, o Claude Code pode guardar o oz original no `construction` (já feito) e o g/m² no `gsm`.
- Fibra **Supima nomeada pela marca** + origem USA = fato forte. `fiberType: Supima` já existe no enum.
- `tier`/`wrinkle` = nossos (julgamento/inferência). O Slub 6.1oz (~207, premium) é o destaque; o Airy 3oz é ultraleve (banda básica por GSM, mas fibra excelente — coerente com "fibra > GSM" do guia).

---

## MARCAS `partial` (só com aprovação do dono)

### 5. Hast — domínio `hastparis.com` (FR)
**Método:** `web_fetch`/busca das páginas oficiais hastparis.com (ficha de produto + home + glossário). Marca **100% natural** (evita poliéster/elastano/poliamida explicitamente).

| product | category | fiber | fiberType | gsm | weave | construction | origin | wrinkle | tier | confidence |
|---|---|---|---|---|---|---|---|---|---|---|
| Chemise popeline (col français) | shirt | 100% cotton double retors (two-ply) | generic | null | poplin | ["two-ply", "yarn 100/2", "mother-of-pearl"] | Europe | high | A | partial |

**Notas de honestidade:**
- `fiber` (two-ply/double retors), `yarn 100/2`, botões nácar, tecida na Europa, linha premium pinpoint na **Albini** (IT) = **fato oficial**.
- `gsm: null` — camisa social não publica GSM por norma; isso é esperado, não uma falha. Por isso `partial` (não `verified`), exatamente como UNIQLO/Vans.
- `wrinkle: high` = inferência (algodão puro plano); a linha pinpoint Albini "easy care" amassa menos, mas é exceção da linha premium.
- Tecelagens oferecidas: poplin, twill, oxford, chambray, flanela, linho.

### 6. Dudalina — domínio `dudalina.com.br` (BR)
**Método:** `web_fetch`/busca das páginas oficiais dudalina.com.br (fichas de produto + coleção). Camisaria social brasileira de referência.

| product | category | fiber | fiberType | gsm | weave | construction | origin | wrinkle | tier | confidence |
|---|---|---|---|---|---|---|---|---|---|---|
| Camisa Comfort Jacquard Fio Egípcio | shirt | 100% Egyptian cotton | long-staple | null | jacquard | ["Italian collar", "comfort fit"] | Brazil | high | A- | partial |
| Camisa Slim Wrinkle Free | shirt | Egyptian cotton, wrinkle-free treated | long-staple | null | poplin | ["non-iron (wrinkle-free)"] | Brazil | medium | B | partial |

**Notas de honestidade:**
- **Algodão egípcio = fibra longa nobre (fato positivo).** `fiberType: long-staple` (egípcio é ELS; o enum não tem "egyptian" — usar long-staple + `fiber: "100% Egyptian cotton"`. Decisão de enum egípcio fica para o lote napolitano).
- `gsm: null` — a ficha oficial da Dudalina **não publica contagem de fios nem GSM por SKU**. O "fio 120" aparece só em revendedores/tecidos avulsos, NÃO na oficial. Não inventar → `partial`.
- ⚠️ **A linha Wrinkle Free é non-iron QUÍMICO** ("fios banhados em solução que mantém o fio reto"). Pelo guia, non-iron é **sinal de cautela**, não de qualidade natural. O app já detecta `nonIron` e penaliza no score — então marcar `construction: ["non-iron (wrinkle-free)"]` e `wrinkle: medium` é honesto e coerente. NÃO classificar a Wrinkle Free como premium natural.
- `weave: "jacquard"` — confirmar no enum `Weave`. Se NÃO existir (provável), usar `poplin`/`twill` + `construction: ["jacquard"]`. NÃO inventar valor de enum.
- A Dudalina mistura linhas (egípcio puro vs. tech/wrinkle-free) — exatamente o caso "olhar vários produtos por marca". As duas linhas têm tiers diferentes de propósito.

### 7. Community Clothing — domínio `communityclothing.co.uk` (UK)
**Método:** `web_fetch`/busca das páginas oficiais communityclothing.co.uk + Wikipédia (fundação/origem). Fundada por Patrick Grant, Blackburn/Lancashire.

| product | category | fiber | fiberType | gsm | weave | construction | origin | wrinkle | tier | confidence |
|---|---|---|---|---|---|---|---|---|---|---|
| Pure Cotton T-Shirt | tshirt | 100% cotton (organic disponível) | generic | null | jersey | ["UK spun + knitted + sewn", "plastic-free"] | UK (Blackburn, Lancashire) | low | B+ | partial |

**Notas de honestidade:**
- 100% algodão, 100% manufaturado no UK (fiação→costura tudo no UK), plastic-free = **fato oficial**. Cadeia rastreável "farm to finished garment".
- `gsm: null` — as páginas de coleção **não expõem GSM por SKU** nesta verificação. Não inventar. Por isso `partial`.
- `fiberType: generic` porque a versão padrão é "100% cotton finest" sem certificação orgânica nomeada por SKU (há linha organic separada). Se uma ficha individual confirmar "organic" + GSM, promover.
- `tier: B+` = julgamento nosso (origem UK + cadeia limpa puxam pra cima; falta de GSM segura).

---

## NOTAS DE ENUM (verificado contra `@/lib/types`)
- **`weave: "chambray"`** (Asphalte Chambray) — **existe** no enum `Weave` (confirmado em lib/types.ts). OK, usar direto.
- **`weave: "oxford"`, `"poplin"`, `"twill"`, `"jersey"`, `"flannel"`** — todos existem (confirmado em types.ts). OK.
- **`weave: "jacquard"`** (Dudalina) — **NÃO existe** no enum atual (`Weave` tem: twill, oxford, poplin, chambray, flannel, corduroy, denim, jersey, french-terry, fleece). Usar `poplin` + `construction: ["jacquard"]`. NÃO inventar.
- **`fiberType: "Supima"`, `"organic"`, `"generic"`, `"long-staple"`** — todos existem. OK (Dudalina egípcio → `long-staple`).
- Sobre as construções em oz (American Giant): `construction` é `string[]` livre, então `"6.1 oz/yd²"` etc. entram sem problema de enum.
- Nenhuma marca deste lote força extensão de enum de fibra (egípcio cabe em long-staple). O lote napolitano (próximo) é que vai forçar a decisão de criar um `fiberType` egípcio/Giza dedicado, se o dono quiser distinguir.

---

## RESUMO DO LOTE 2
- **3 fontes `verified`:** Asphalte (camisa com GSM! 150/155, FR/PT), ISTO. camisas (4 produtos 140/160/175/200, PT — anexar à marca existente), American Giant (Supima 102/129/207, US, oz→g convertido).
- **3 marcas `partial`** (só com aprovação): Hast (camisa two-ply 100/2, sem GSM), Dudalina (egípcio, sem contagem de fios oficial; linha Wrinkle Free é non-iron químico), Community Clothing (UK, 100% algodão, sem GSM por SKU).
- **Destaques factuais:** Asphalte e ISTO. são raras por publicarem GSM de camisa; American Giant Slub 6.1oz (~207) é Supima heavyweight made-in-USA.
- **Achado de honestidade:** a Dudalina Wrinkle Free é non-iron químico → sinal de cautela do guia, não premium natural. Registrado como tal.
- Schema inalterado; honestidade inalterada; nenhum GSM inventado; único enum novo evitado (jacquard→construction).
- **Ainda pendentes (Fase 4 continua no chat):** luxo napolitano (Finamore Giza 45/Kiton/Borrelli — força decisão de enum egípcio dedicado), pendentes ES (Scalpers/Silbon/Pompeii), Insider/Sepiia (decisão sobre tech/sintético).
