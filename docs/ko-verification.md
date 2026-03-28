# Korean Text Verification Report

Independently verified by Codex (gpt-5.4) acting as a 35-year-old Korean woman living in Raleigh NC, looking to buy a car. NOT a marketer or writer -- just a regular Korean person evaluating the proposed text.

Date: 2026-03-27

---

## Verification Summary

Overall verdict from the verifier: The recommended texts are a significant improvement over the originals, but some items still carry a subtle "AI copy review" or "marketing brochure" feel. The core issue identified: **the site tone still "explains trustworthiness" rather than "showing it through natural tone."**

---

## Priority 8 Items: Pass/Fail

### PASSED (Naturalness 8+)

| # | Text | Score | Verifier Notes |
|---|------|-------|----------------|
| 1 | `롤리 기아 딜러십에서 일하는 제승국입니다.` | **8/10** | Most straightforward. Minor note: `기아 딜러로 일하는` or `기아 매장에서 일하는` also common among gyopo. |
| 3 | `차를 주로 어떻게 쓰실지 말씀해 주시면 거기에 맞춰서 봐드릴게요.` | **9/10** | Very natural. Closest to actual consultation tone. No changes needed. |
| 4 | `굳이 안 사셔도 되는 차면 그건 그렇게 말씀드릴게요.` | **8/10** | Sounds human. Slight "calculated trust appeal" vibe in context, but acceptable. |
| 6 | `지금 조건엔 맞는 차가 없네요. 조건 조금만 바꿔서 다시 볼까요?` | **9/10** | Excellent UI text. Soft and non-robotic. |

### NEEDS WORK (Naturalness < 8)

| # | Text | Score | Issue | Codex Alternative |
|---|------|-------|-------|-------------------|
| 2 | `무리해서 권하지 않고, 맞는 차 같이 찾아드릴게요.` | **7/10** | Still has faint ad-copy feel. `맞는 차 찾아드릴게요` is sales phrasing. | `편하게 같이 봐드릴게요` -- more human |
| 5 | `어떤 분이신지, 뭘 중요하게 보시는지 기억해두는 편이에요.` | **7/10** | Too polished for a male Korean dealer's voice. | `어떤 걸 중요하게 보시는지 기억해두는 편입니다` |
| 7 | `롤리에서 차 살 때, 이렇게 도와드립니다` | **5/10** | Feels like content marketing headline, not a person. | Verifier accepts this is a meta title so some formality is expected, but suggests: `롤리에서 차 사실 때 도와드립니다 - 제승국` |
| 8 | `미국에서 차 사는 게 막막하시면 편하게 물어보세요. 제승국이 한국어로 도와드립니다.` | **7/10** | `도와드립니다` is slightly stiff PR tone. | `도와드릴게요` is warmer and more alive |

---

## Full Site Review Items: Verification

The verifier strongly agreed with these flagged anti-patterns from the humanization report:

### Confirmed Translation-Feel Expressions (must change)
- `두 세계 사이의 삶` -- English copy concept translated literally
- `완벽 가이드` -- literal "complete guide"
- `최고의 차량` -- literal "best vehicle"
- `놀랄 일 없는 약속` -- unnatural Korean
- `내 삶에 맞는 차` -- English marketing phrasing in Korean
- `웃으면서 집으로` -- ad-like

### Confirmed Over-Marketing Expressions (must change)
- `정직하게` (repeated too often across site)
- `부담 없이, 솔직하게` (comma-stacked virtue list)
- `가족처럼 대하겠습니다` (cringy for Korean audience)
- `걱정 끝이에요` (overconfident)
- `안 당해요` (clickbait-y)
- `제값 받으세요` + `정직하게` combo (ad smell)

### Additional Fixes Recommendations: All Confirmed

The verifier found the additional fixes table (ko.json, guide/page.tsx, financing/page.tsx) recommendations to be reasonable and should be adopted. No objections raised.

---

## FINAL APPROVED TEXT

Based on cross-referencing the humanizer's recommendations with the verifier's independent assessment:

### Priority 8 Items

| # | Section | FINAL APPROVED TEXT | Source |
|---|---------|-------------------|--------|
| 1 | Hero Tagline | `롤리 기아 딜러십에서 일하는 제승국입니다.` | Humanizer Option C (passed as-is) |
| 2 | Hero Subtitle | `편하게 같이 봐드릴게요.` | Codex verifier alternative (warmer than Option C) |
| 3 | Quiz Subtitle | `차를 주로 어떻게 쓰실지 말씀해 주시면 거기에 맞춰서 봐드릴게요.` | Humanizer Option B (passed as-is) |
| 4 | Honest Value Prop | `굳이 안 사셔도 되는 차면 그건 그렇게 말씀드릴게요.` | Humanizer Option C (passed as-is) |
| 5 | Personal Service | `어떤 걸 중요하게 보시는지 기억해두는 편입니다.` | Codex verifier tweak (slightly more natural) |
| 6 | No Results | `지금 조건엔 맞는 차가 없네요. 조건 조금만 바꿔서 다시 볼까요?` | Humanizer Option C (passed as-is) |
| 7 | Meta Title | `롤리에서 차 사실 때 도와드립니다 - 제승국` | Codex verifier alternative (less marketing, includes name for SEO) |
| 8 | Meta Description | `미국에서 차 사는 게 막막하시면 편하게 물어보세요. 제승국이 한국어로 도와드릴게요.` | Humanizer Option B with verifier fix (`도와드립니다` -> `도와드릴게요`) |

### Full Site Review: Approved Recommendations

All recommendations from the humanization report's "Full Site Review" tables are approved as written. Specifically:

**ko.json changes (all approved):**
- `nav.financing`: `제 약속`
- `hero.greeting`: `안녕하세요. 제승국입니다.`
- `story.title`: `한국과 미국, 그 사이에서`
- `story.content`: `군대에서 버티는 법이랑 끝까지 책임지는 걸 많이 배웠어요.`
- `story.values.title`: `왜 많이들 저한테 오시는지 말씀드릴게요`
- `story.values.noPressureDesc`: `바로 결정 안 하셔도 돼요. 편하게 보세요.`
- `story.values.bilingualDesc`: `한국어로 편하게 말씀하셔도 되고, 영어로 하셔도 괜찮아요.`
- `inventory.subtitle`: `지금 바로 보실 수 있는 차량들이에요`
- `quiz.resultsSubtitle`: `지금 보신 조건에 가장 잘 맞는 차예요`
- `quiz.noMatch`: `지금 바로 맞는 차는 안 보이는데, 연락 주시면 같이 찾아봐드릴게요.`
- `quiz.closeMatch`: `완벽히 맞진 않아도 비슷하게 보실 만한 차는 있어요.`
- `contact.subtitle`: `차 보실 생각 있으시면 편하게 연락 주세요. 한국어 상담 가능합니다.`
- `contact.success`: `메시지 확인했습니다. 곧 연락드릴게요.`
- `tradeIn.subtitle`: `타시던 차 사진 올려주시면 시세 맞춰서 견적 봐드릴게요.`
- `tradeIn.disclaimer`: `일단 예상 견적이라고 보시면 되고, 실제 가격은 차 상태 보고 정해집니다.`
- `guide.title`: `미국에서 차 사는 게 처음이세요?`
- `guide.subtitle`: `처음 차 사시는 분들이 헷갈리는 부분들, 여기서 쉽게 정리해드릴게요.`
- `financing.title`: `미리 다 설명드릴게요`
- `financing.subtitle`: `딜러십 가면 복잡하게 느껴질 수 있어서, 미리 쉽게 설명드리려고 만들었습니다.`
- `footer.hours`: `월~토 오전 9시~오후 8시, 일요일은 휴무입니다.`

**guide/page.tsx changes (all approved):**
- Badge: `처음 사는 분들 가이드`
- Quote: `계약서나 서류 보면 무슨 말인지 막막한 느낌, 저도 겪어봐서 압니다.`
- Section: `미국에서 차 사는 과정, 순서대로 알려드릴게요`
- Section: `이 정도는 알고 가시면 훨씬 덜 헷갈립니다`
- Section: `딜러십 가실 때 이건 챙겨오세요`
- Section: `처음 차 사시는 분들이 많이 물어보시는 것들`
- CTA: `자세히 보기`
- CTA: `문의하러 가기`

**financing/page.tsx changes (all approved):**
- Badge: `차 구매 과정, 이렇게 진행됩니다`
- Hero intro: `제승국입니다. 딜러십 오시기 전에 어떤 식으로 진행되는지 미리 보실 수 있게 정리해뒀어요.`
- Timeline: `방문 후 상담 시작`
- Timeline desc: `평소 운전 스타일, 가족 구성, 예산 같은 부분 여쭤보고 같이 맞는 차를 봅니다`
- Timeline: `금액은 하나씩 다 설명드릴게요`
- Timeline: `출고` or `차 받고 귀가`
- Timeline desc: `차 키 받으시고 출발하시면 됩니다`
- Note: `어느 단계에서든 아니다 싶으면 편하게 가셔도 됩니다. 부담 느끼실 필요 없고, 원치 않으시면 따로 연락도 안 드립니다.`
- Fees title: `비용은 미리 설명드릴게요`
- Fees subtitle: `숨겨진 비용 없이 보이는 그대로 안내드립니다`
- Fee desc: `서류 수수료는 약 $799이고, 딜러십에서 공통으로 들어가는 비용입니다.`
- Negotiate label: `조정 불가 항목 (법/규정상 고정)`
- Review: `첫 차라 많이 떨렸어요`
- Review: `전혀 부담 주지 않으셨어요`
- Review: `승국님 덕분에`
- Promises section: `제 약속`
- Promises intro: `제가 직접 약속드리는 부분입니다`
- Promise: `출고 후에도 문자나 전화 주시면 계속 도와드리겠습니다`
- Promise: `편하게 믿고 맡기실 수 있게 도와드리겠습니다`
- FAQ subtitle: `솔직하게 답해드릴게요. 눌러서 확인해보세요.`
- CTA button: `방문 예약하기`
- CTA: `준비되셨으면 언제든 오세요`

---

## Key Insight from Verifier

> "전체 철학이 아직 '신뢰를 보여주기보다 신뢰를 설명하려는 톤'이에요. 그게 제일 AI 같고 마케팅 같아요."

Translation: "The overall philosophy is still 'explaining trustworthiness rather than showing it through tone.' That's the most AI-like and marketing-like quality."

This is the single most important takeaway. The approved texts above address this by:
1. Removing explicit trust claims (`정직하게`, `가족처럼`, `놀랄 일 없는`)
2. Using conversational endings (`-드릴게요` over `-드립니다` where appropriate)
3. Letting the helpfulness of the content itself convey trust, rather than stating it
