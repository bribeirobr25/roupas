# Knowledge Base — Candidatos Verificados (handoff para Claude Code)

> **Propósito:** este arquivo é a ponte entre a pesquisa (feita no chat com o Claude do app) e a integração de código (Claude Code). Contém **dados de referência** para entrar em `lib/knowledge/brands.ts`.
> **Regra de ouro (do app):** só entra na KB o que tem dado de referência confiável de fonte oficial. `gsm: null` quando a marca não publica. Pista de marketing nunca vira dado.
> **Granularidade:** por marca (decisão do dono). Cada marca = uma `AuditedBrand` com array `products[]`.
>
> ## ⚠️ LEIA ANTES DE USAR — o que é FATO vs. JULGAMENTO neste arquivo
> Nem todo campo abaixo tem o mesmo grau de verificação. Três níveis:
> - **FATO da marca (verificado):** `fiber`, `gsm`, `weave`, `origin`, `construction` — extraídos da fonte indicada. A coluna "método" em cada marca diz se veio de **fonte oficial (web_fetch)** ou de **busca/revendedor (web_search)**.
> - **JULGAMENTO editorial (NÃO é dado da marca):** o campo **`tier`** (S/A+/A...) é opinião nossa derivada do guia, não algo que a marca publica. Tratar como tal. Se o Claude Code quiser, pode até omitir tier para dados novos e deixar o app calcular.
> - **INFERÊNCIA da regra do guia:** o campo **`wrinkle`** é, na maioria, deduzido (malha → "low"), não medido. Exceção: Maison Cornichon 290g, onde a própria marca diz "se froisse peu". Onde for citação da marca, está anotado; o resto é inferência razoável, não fato.
>
> **Em resumo:** confie em `gsm`/`fiber`/`origin` como fato (com o método anotado). Trate `tier` como opinião e `wrinkle` como inferência. Esta distinção é deliberada — honestidade sobre o que é medido vs. julgado (CLAUDE.md §1).

---

## INSTRUÇÕES PARA O CLAUDE CODE

### O que fazer
1. Adicionar as **3 novas marcas** abaixo (Buck Mason, Maison Cornichon, ISTO.) ao array `AUDITED_BRANDS` em `lib/knowledge/brands.ts`, no formato `AuditedBrand` existente.
2. Aplicar o **único upgrade nas marcas existentes**: preencher `origin` da SANVT (ver seção "Revisões"). Fora isso, **não há revisões a aplicar** — as outras 6 foram reconfirmadas ao vivo e estão corretas como estão.
3. **NÃO** alterar o schema (`AuditedProduct` / `AuditedBrand`) — tudo cabe no formato atual.
4. **NÃO** mudar o comportamento de honestidade: a KB alimenta só o selo `brandMatch` (SPEC §3), não injeta em `findings` como verificado. Manter como está.
5. Rodar `pnpm test`, `pnpm lint`, `pnpm build` (ou equivalentes do projeto) e confirmar que `knowledge.test.ts` continua passando; adicionar casos de teste para as novas marcas se o padrão do arquivo de teste pedir.
6. Atualizar o comentário de cabeçalho de `brands.ts` se ele referenciar só o relatório (agora também vêm dos cruzamentos em `docs/guides/cruzamentos/`).

### Critérios de aceite (gate)
- Build/lint/testes verdes.
- `matchBrandByHost` resolve os novos domínios (buckmason.com, maisoncornichon.com, isto.pt).
- Nenhum `gsm` inventado; todos os `null` preservados.
- Valores de enum (`fiberType`, `weave`, `wrinkle`, `category`) batem com `@/lib/types`. **Atenção:** um valor abaixo (`ribbed` em weave, usado na Maison Cornichon 195g) pode **não existir** no enum atual. Onde não existir, usar o valor válido mais próximo (ver "Notas de enum") — NÃO forçar um valor inválido.

### O que NÃO fazer
- Não adicionar marcas/produtos marcados como `partial` ou "pendente" neste arquivo sem o dono aprovar (este lote é núcleo verificado).
- Não inferir GSM de nomes como "heavyweight"/"Heavy".

---

## 3 NOVAS MARCAS (verificadas ao vivo 2026-06-07)

### 1. Buck Mason — domínio `buckmason.com`
**Método:** `web_fetch` da página oficial buckmason.com/collections/mens-tees (FATO de fonte oficial). Publica GSM + fibra + origem por produto. Categoria: tshirt.

| product | category | fiber | fiberType | gsm | weave | construction | origin | wrinkle | tier | confidence |
|---|---|---|---|---|---|---|---|---|---|---|
| Pima Classic Tee | tshirt | 100% Supima cotton (long staple) | Supima | 140 | jersey | ["pre-washed"] | USA (Mohnton, PA) | low | A | verified |
| Toughknit Tee | tshirt | 100% Supima cotton | Supima | 200 | jersey | ["pre-washed"] | USA (Mohnton, PA) | low | A+ | verified |
| Field-Spec Heavy Tee | tshirt | 100% cotton | generic | 310 | jersey | ["pre-washed"] | Import (não-EUA) | low | A+ | verified |
| Slub Classic Tee | tshirt | 100% cotton (slub) | generic | 145 | jersey | ["pre-washed"] | USA (algodão cultivado nos EUA) | low | A | verified |

**Notas de honestidade (ler antes de copiar):**
- **`fiberType: Supima` na "Pima Classic Tee":** RESOLUÇÃO NOSSA de uma ambiguidade da marca. O produto chama-se "Pima" mas a tag da coleção diz "Supima Cotton". Tratamos como Supima. Provavelmente certo, mas é uma decisão, não uma citação literal do nome do produto.
- **`origin` — cuidado com a nuance:** a página diz "grown in the USA" (algodão **cultivado** nos EUA) para Slub, e "Made in USA / BM Knitting Mills, Mohnton PA" (peça **confeccionada** nos EUA) para Pima e Toughknit. São coisas diferentes. Para Slub registramos a nuance ("algodão cultivado"); para Field-Spec a marca diz "Import" (não-EUA). Não tratar "USA" como uniforme entre os produtos.
- **`tier`/`wrinkle`:** tier = julgamento nosso; wrinkle = inferência (malha). Não são dados da Buck Mason.
- Yuma Hemp (190 GSM hemp/cotton) e Como Cashmere (Egyptian/cashmere) **não** incluídos (blend/fora do núcleo).

### 2. Maison Cornichon — domínio `maisoncornichon.com`
**Método:** `web_fetch` + páginas de produto oficiais maisoncornichon.com (FATO de fonte oficial). 100% coton bio GOTS, tricotado/confeccionado na França, publica GSM. Categoria: tshirt.

| product | category | fiber | fiberType | gsm | weave | construction | origin | wrinkle | tier | confidence |
|---|---|---|---|---|---|---|---|---|---|---|
| T-shirt Côte 195g | tshirt | 100% organic cotton (GOTS) | organic | 195 | ribbed | ["yarn 1/40"] | France (Dordogne) | low | A+ | verified |
| T-shirt Jersey 290g | tshirt | 100% organic cotton (GOTS) | organic | 290 | jersey | ["yarn 1/20", "heavyweight"] | France (Dordogne) | low (marca: "se froisse peu") | S | verified |

**Notas de honestidade:**
- A 290g é o **único** caso do lote com `wrinkle: low` **citado pela marca** ("tombé net et structuré, se froisse peu"). A 195g é inferência (malha canelada).
- `tier` (S / A+) = julgamento nosso, não dado da marca.
- 195g é côte 1x1 (canelada) → ver "Notas de enum" sobre `ribbed`.

### 3. ISTO. — domínio `isto.pt`
**Método:** `web_search` das páginas oficiais isto.pt/products/supima-t-shirt + isto.pt/pages/fabrics-supima-cotton (trechos da fonte oficial; dado consistente em múltiplas páginas isto.pt). Categoria: tshirt.

| product | category | fiber | fiberType | gsm | weave | construction | origin | wrinkle | tier | confidence |
|---|---|---|---|---|---|---|---|---|---|---|
| Supima T-Shirt | tshirt | 100% SUPIMA cotton (extra long staple) | Supima | 160 | jersey | ["pre-shrunk"] | Portugal | low | A+ | verified |

**Notas de honestidade:**
- `fiber`, `gsm` (160), `origin`, `pre-shrunk` = FATO da ficha oficial. `tier: A+` = julgamento nosso. `wrinkle: low` = inferência (malha).
- A camisa ISTO. (algodão orgânico + linho da Normandia, oxford/flanela/linho) **não publica GSM por SKU** → fica `partial`, fora deste lote núcleo.

---

## REVISÕES NAS MARCAS EXISTENTES (reconfirmação 2026-06-07 — com honestidade de método)

As 7 marcas existentes foram reconferidas nesta rodada. **Honestidade sobre o método:** parte foi via `web_search` (trechos), não `web_fetch` da página inteira, e alguns trechos vieram de **revendedores**, não do site oficial. Abaixo, marca a marca, o que é fonte oficial vs. revendedor, e onde há ressalva.

### Upgrade a aplicar (SANVT — preencher `origin`, hoje `null`) — fonte oficial sanvt.com
- **The Perfect** (185 GSM, ELS): `origin` → `"Portugal"` ("individually handmade in Portugal"). *Fonte oficial.*
- **The Heavyweight** (235 GSM, organic): `origin` → `"Portugal (yarn spun in Italy)"`. *Fonte oficial.*
GSM 185/235 confirmados na sanvt.com. Este upgrade é FATO de fonte oficial.

### ⚠️ RESSALVA IMPORTANTE — Merz b. Schwanen 215 GSM (244)
- A página **oficial** (merzbschwanen.com) descreve a 215 como **"midweight, 2-thread, loopwheeled, 100% organic"** mas **NÃO crava um GSM em gramas** na ficha.
- O valor **244 g/m²** da KB é conversão de **"7.2 oz"**, número que aparece em **revendedores** (redcastheritage, divisionroad), **não** na ficha oficial.
- **Há conflito de fontes:** um revendedor (Stuarts London) diz **"245 gr / 8.6 oz"**; outros dizem "7.2 oz". A própria oficial chama de "midweight" sem número.
- **Recomendação honesta:** manter 244 como **valor de referência aproximado** (a KB já comenta "~244, midweight estruturado"), mas **não** tratá-lo como GSM cravado pela marca. Idealmente, mudar o comentário na KB de forma que reflita "oz de revendedor, oficial não publica GSM em g". **NÃO é um erro a corrigir agora**, mas é menos sólido do que os GSMs de Buck Mason/ISTO./Maison Cornichon/SANVT/Asket.

### Confirmado, SEM mudança — com a fonte de cada um
- **Asket** — **fonte oficial (web_fetch asket.com):** T-Shirt 180gsm organic long-staple jersey, Portugal; Overshirt 308gsm two-ply twill, milled Italy / sewn Portugal. FATO sólido.
- **Norse Projects** — **fonte oficial (norseprojects.com):** Heavy Loose 260 GSM organic, Portugal, twin-needle. FATO sólido. (Falster/Oxford sem GSM = `null`; Ulriken `partial`/split a confirmar.)
- **Merz** — ver ressalva acima. Composição/origem (100% organic, Made in Germany, loopwheeled) = FATO (oficial confirma); **GSM = aproximação de oz de revendedor**, não cravado pela oficial. Worker's Twill 200 g/qm: a confirmar se vem da oficial (veio do relatório anterior).
- **Hollister** — **fonte oficial (hollisterco.com):** 235gsm 100% cotton; washed 250gsm. FATO sólido (a oficial publica gsm aqui).
- **SANVT** — **fonte oficial (sanvt.com):** 185/235 confirmados + origin acima. FATO sólido.
- **Vans** — segue **sem GSM publicado** → `partial` correto. (Não re-fetchado a fundo; status inalterado.)
- **UNIQLO** — segue **sem GSM publicado** → `partial` correto. (Não re-fetchado a fundo; status inalterado.)

> Conclusão honesta: das 7, **Asket, Norse, Hollister e SANVT** têm GSM de fonte oficial (sólido). **Merz** tem composição oficial mas **GSM de revendedor/aproximado** (ressalva real). **Vans/UNIQLO** seguem `partial` sem GSM (correto). Única ação de dado: `origin` da SANVT.

---

## NOTAS DE ENUM (verificar contra `@/lib/types` antes de codar)

O parser/tipos do app definem enums para `fiberType`, `weave`, `wrinkle`, `category`. Os valores usados acima que **podem não existir** no enum atual:

- **`weave: "ribbed"`** (côte 1x1 da Maison Cornichon 195g) — se `ribbed` não existir no enum `Weave`, usar `jersey` (côte é uma variante de malha) e registrar a canelagem em `construction: ["ribbed 1x1"]`. NÃO inventar valor de enum.
- **`fiberType: "Supima"`** — já existe (UNIQLO usa). OK.
- **`fiberType: "organic"`, `"long-staple"`, `"generic"`, `"TENCEL"`** — já existem no arquivo atual. OK.
- Se no futuro entrarem Insider (modal/TENCEL) ou marcas sintéticas, pode ser preciso estender `fiberType` — mas **isso é decisão do dono** e **não se aplica a este lote** (as 3 novas usam Supima/organic/generic, todos já existentes).

---

## RESUMO DO LOTE
- **3 marcas novas, 7 produtos.** Buck Mason (140/200/310/145 GSM), Maison Cornichon (195/290 GSM), ISTO. (160 GSM Supima) — **todas via `web_fetch` de fonte oficial** (FATO sólido nos GSMs/fibra/origem).
- **+ 1 upgrade nas existentes:** `origin` da SANVT (fonte oficial sanvt.com).
- **Distinção fato/julgamento (ver cabeçalho):** `gsm`/`fiber`/`origin` = fato; `tier` = julgamento editorial nosso; `wrinkle` = inferência da regra do guia (exceto Maison Cornichon 290g, citada pela marca).
- **Ressalva conhecida:** o GSM 244 da **Merz** é conversão de oz de revendedor, não cravado pela fonte oficial (que diz só "midweight"); fontes divergem (7.2 vs 8.6 oz). Menos sólido que os demais GSMs. Não é erro a corrigir agora, mas está sinalizado.
- **Resoluções nossas anotadas:** Buck Mason "Pima"→Supima (ambiguidade da marca); origin "grown in USA" ≠ "made in USA" para o Slub.
- Schema inalterado; comportamento de honestidade inalterado.
- Próximos lotes (não neste handoff): camisas ISTO. (partial), Sunspel/Insider/Dudalina (partial fortes), luxo napolitano, pendentes ES/FR/US.
