# Korean Text Humanization Recommendations

Generated via Codex (gpt-5.4) acting as a native Korean speaker (30-something Korean man working at a Kia dealership in Raleigh, NC).

Criteria: "How would a 30-something Korean car salesman actually write on a Korean community forum or text a Korean customer?" Remove anything that sounds like AI, marketing copy, or translation.

---

## Priority Fixes (8 Flagged Items)

### 1. Hero Tagline
**File:** `src/messages/ko.json` > `hero.tagline`

ORIGINAL: 롤리에서 정직하게 차 팔고 있는 제승국이에요
OPTION A: 롤리에서 기아차 판매하고 있는 제승국입니다.
OPTION B: 롤리에서 차 보고 계시면 편하게 연락 주세요. 제승국입니다.
OPTION C: 롤리 기아 딜러십에서 일하는 제승국입니다.
**BEST: OPTION C** — Most straightforward and sounds like a real self-introduction. "정직하게 차 팔고 있는" feels too self-promotional.

### 2. Hero Subtitle
**File:** `src/messages/ko.json` > `hero.subtitle`

ORIGINAL: 부담 없이, 솔직하게, 내 삶에 맞는 차를 같이 찾아봐요
OPTION A: 부담 갖지 마시고 편하게 같이 찾아봐요.
OPTION B: 상황에 맞는 차 같이 편하게 골라봐요.
OPTION C: 무리해서 권하지 않고, 맞는 차 같이 찾아드릴게요.
**BEST: OPTION C** — Natural flow without forcibly listing virtues ("부담 없이/솔직하게"). Less like ad copy.

### 3. Quiz Subtitle
**File:** `src/messages/ko.json` > `quiz.subtitle`

ORIGINAL: 생활 패턴 몇 가지만 알려주시면, 딱 맞는 차를 찾아드릴게요
OPTION A: 평소에 어떻게 타실지만 알려주시면 맞는 차로 같이 골라드릴게요.
OPTION B: 차를 주로 어떻게 쓰실지 말씀해 주시면 거기에 맞춰서 봐드릴게요.
OPTION C: 출퇴근용인지 가족용인지 정도만 알려주시면 추천드리기 훨씬 쉬워요.
**BEST: OPTION B** — Most natural customer-facing tone, less robotic.

### 4. Honest Value Prop
**File:** `src/messages/ko.json` > `story.values.honestDesc`

ORIGINAL: 어떤 차든 솔직하게 말씀드려요 — 제가 판매를 못 하게 되더라도요
OPTION A: 제가 파는 차가 아니어도 솔직하게 말씀드릴게요.
OPTION B: 제 차가 아니더라도 아닌 건 아니라고 말씀드려요.
OPTION C: 굳이 안 사셔도 되는 차면 그건 그렇게 말씀드릴게요.
**BEST: OPTION C** — Most human-sounding, like something a real salesman would actually say during consultation.

### 5. Personal Service Description
**File:** `src/messages/ko.json` > `story.values.personalDesc`

ORIGINAL: 이름도, 가족도, 뭐가 중요한지도 다 기억해요
OPTION A: 그냥 차만 보는 게 아니라, 뭐가 중요하신지도 같이 봐요.
OPTION B: 어떤 분이신지, 뭘 중요하게 보시는지 기억해두는 편이에요.
OPTION C: 한 번 뵈면 어떤 차를 찾으시는 분인지 오래 기억하는 편이에요.
**BEST: OPTION B** — Not overly sentimental. The original "이름도, 가족도" list style feels cringe-worthy.

### 6. No Results Message
**File:** `src/messages/ko.json` > `inventory.noResults`

ORIGINAL: 조건에 맞는 차가 없네요. 검색 조건을 바꿔보세요.
OPTION A: 지금 조건으로는 맞는 차가 안 보이네요.
OPTION B: 지금 보신 조건에는 해당되는 차가 없어요.
OPTION C: 지금 조건엔 맞는 차가 없네요. 조건 조금만 바꿔서 다시 볼까요?
**BEST: OPTION C** — Works well as UI text, less stiff.

### 7. Meta Title
**File:** `src/messages/ko.json` > `meta.title`

ORIGINAL: Jae Method | 롤리에서 정직하게 차 사기
OPTION A: 롤리에서 차 살 때, 이렇게 도와드립니다
OPTION B: 미국에서 차 살 때 헷갈리는 것들, 제가 미리 설명드릴게요
OPTION C: 롤리에서 차 살 때 부담 덜고 시작하는 법
**BEST: OPTION A** — Works as a meta title, clickable without being self-congratulatory.

### 8. Meta Description
**File:** `src/messages/ko.json` > `meta.description`

ORIGINAL: 제승국과 함께 나한테 딱 맞는 차 찾아보세요. 부담 없는 정직한 상담, 한국어 OK.
OPTION A: 롤리에서 차 찾고 계시면 제승국에게 편하게 문의하세요. 한국어로 상담 가능합니다.
OPTION B: 미국에서 차 사는 게 막막하시면 편하게 물어보세요. 제승국이 한국어로 도와드립니다.
OPTION C: 내 상황에 맞는 차를 편하게 알아보세요. 롤리에서 한국어로 상담해드립니다.
**BEST: OPTION B** — Most natural as a meta description, good for search intent.

---

## Full Site Review: Additional Fixes Needed

### ko.json

| Key | Current | Issue | Recommendation |
|-----|---------|-------|----------------|
| `nav.financing` | 나의 약속 | Slightly awkward | `제 약속` or `약속드리는 것들` |
| `nav.tradeIn` | 트레이드인 | Transliteration-heavy | `내 차 판매` or keep as-is (Konglish is common for this) |
| `hero.greeting` | 안녕하세요, 제승국입니다 | Comma is unnatural | `안녕하세요. 제승국입니다.` (period instead of comma) |
| `story.title` | 두 세계 사이의 삶 | Sounds like a book title / translation | `한국과 미국, 그 사이에서` |
| `story.content` | 군대에서 배운 건 규율이랑, 넘어져도 다시 일어서는 법이었어요... | Too sentimental | `군대에서 버티는 법이랑 끝까지 책임지는 걸 많이 배웠어요.` (rest of paragraph needs similar treatment) |
| `story.values.title` | 왜 저한테 오시나요 | Slightly awkward | `왜 많이들 저한테 오시는지 말씀드릴게요` |
| `story.values.noPressureDesc` | 천천히 생각하세요. 저는 도와드리려고 여기 있는 거예요. | A bit stiff | `바로 결정 안 하셔도 돼요. 편하게 보세요.` |
| `story.values.bilingualDesc` | 한국어로 편하게 상담받으세요. 영어도 물론 돼요. | OK but can improve | `한국어로 편하게 말씀하셔도 되고, 영어로 하셔도 괜찮아요.` |
| `inventory.subtitle` | 지금 구매 가능한 차들이에요 | OK but slightly stiff | `지금 바로 보실 수 있는 차량들이에요` |
| `quiz.resultsSubtitle` | 생활에 맞는 최고의 차량이에요 | "최고의 차량" = translation-style | `지금 보신 조건에 가장 잘 맞는 차예요` |
| `quiz.noMatch` | 지금은 딱 맞는 차가 없네요 — 그래도 연락 주세요! 꼭 맞는 차를 찾아드릴게요. | Slightly pushy | `지금 바로 맞는 차는 안 보이는데, 연락 주시면 같이 찾아봐드릴게요.` |
| `quiz.closeMatch` | 완벽하진 않지만 비슷한 차가 있어요 — 연락 주시면 딱 맞는 걸 찾아드릴게요. | OK but can soften | `완벽히 맞진 않아도 비슷하게 보실 만한 차는 있어요.` |
| `contact.subtitle` | 차 찾을 준비 되셨나요? 편하신 방법으로 연락 주세요. 한국어 OK! | OK but can improve | `차 보실 생각 있으시면 편하게 연락 주세요. 한국어 상담 가능합니다.` |
| `contact.success` | 메시지 잘 받았어요! 곧 연락드릴게요. | Overly casual | `메시지 확인했습니다. 곧 연락드릴게요.` |
| `tradeIn.subtitle` | 지금 타고 계신 차, 제값 받으세요. 사진 올려주시면 정직하게 견적 드릴게요. | "제값" + "정직하게" = ad smell | `타시던 차 사진 올려주시면 시세 맞춰서 견적 봐드릴게요.` |
| `tradeIn.disclaimer` | 이건 견적이에요. 최종 가격은 직접 보고 정해져요. | Slightly blunt | `일단 예상 견적이라고 보시면 되고, 실제 가격은 차 상태 보고 정해집니다.` |
| `guide.title` | 미국에서 처음 차 사세요? | Slightly off | `미국에서 차 사는 게 처음이세요?` |
| `guide.subtitle` | 이민자, 유학생, 처음 차 사는 분들 — 이거 보면 걱정 끝이에요. | "걱정 끝" is overconfident | `처음 차 사시는 분들이 헷갈리는 부분들, 여기서 쉽게 정리해드릴게요.` |
| `financing.title` | 놀랄 일 없는 약속 | Unnatural Korean expression | `미리 다 설명드릴게요` |
| `financing.subtitle` | 다른 딜러는 헷갈리게 하려고 해요. 저는 준비되게 해드려요. | Directly attacks competitors | `딜러십 가면 복잡하게 느껴질 수 있어서, 미리 쉽게 설명드리려고 만들었습니다.` |
| `footer.hours` | 영업시간: 월-토 오전 9시-오후 8시, 일요일 휴무 | Minor formatting | `월~토 오전 9시~오후 8시, 일요일은 휴무입니다.` |

### guide/page.tsx

| Location | Current | Issue | Recommendation |
|----------|---------|-------|----------------|
| Badge | 완벽 가이드 | Sounds like ad copy / translation | `한눈에 보는 가이드` or `처음 사는 분들 가이드` |
| Quote | 서류 앞에서 뭔 말인지 모르는 그 느낌, 저도 알아요. 저도 겪었으니까요. | Decent but can improve | `계약서나 서류 보면 무슨 말인지 막막한 느낌, 저도 겪어봐서 압니다.` |
| Section title | 미국에서 차 사는 법 단계별로 알려드릴게요 | Slightly long | `미국에서 차 사는 과정, 순서대로 알려드릴게요` |
| Section title | 이것만 알면 안 당해요 | Too strong, clickbait-y | `이 정도는 알고 가시면 훨씬 덜 헷갈립니다` |
| Section title | 딜러 갈 때 이거 챙기세요 | Minor tweak | `딜러십 가실 때 이건 챙겨오세요` |
| Section title | 처음 사시는 분들이 제일 많이 물어보는 것들 | Slightly long | `처음 차 사시는 분들이 많이 물어보시는 것들` |
| CTA label | 뭔데요? | Too blunt for UI | `자세히 보기` or `왜 중요한데요?` |
| CTA label | 연락 페이지 | Awkward | `문의하러 가기` or `연락하기` |

### financing/page.tsx

| Location | Current | Issue | Recommendation |
|----------|---------|-------|----------------|
| Badge | 재 메소드 | Sounds odd in Korean, too branding-heavy | `차 구매 과정, 이렇게 진행됩니다` |
| Hero intro | 제승국이에요. 이 페이지는 딜러십 오시기 전에 다 알려드리려고 만들었어요. 놀랄 일 없게. | Decent but can improve | `제승국입니다. 딜러십 오시기 전에 어떤 식으로 진행되는지 미리 보실 수 있게 정리해뒀어요.` |
| Timeline step | 방문 & 인사 | Slightly awkward | `방문 후 상담 시작` |
| Timeline desc | 생활 패턴 가족 구성 예산 등을 여쭤보고... | Missing commas, run-on | `평소 운전 스타일, 가족 구성, 예산 같은 부분 여쭤보고 같이 맞는 차를 봅니다` |
| Timeline step | 숫자 하나하나 다 보여드릴게요 | OK but can soften | `금액은 하나씩 다 설명드릴게요` |
| Timeline step | 집으로 출발 | Copyish | `출고` or `차 받고 귀가` |
| Timeline desc | 키 받고 웃으면서 집으로! | Too ad-like | `차 키 받으시고 출발하시면 됩니다` |
| Note | 어떤 단계에서든 그냥 나가셔도 돼요. 미안해할 필요 없어요. 원치 않으면 전화도 안 해요. | Natural but can polish | `어느 단계에서든 아니다 싶으면 편하게 가셔도 됩니다. 부담 느끼실 필요 없고, 원치 않으시면 따로 연락도 안 드립니다.` |
| Fees title | 비용 — 물어보기 전에 미리 알려드릴게요 | Slightly copy-ish | `비용은 미리 설명드릴게요` |
| Fees subtitle | 숨겨진 비용 없어요 보이는 그대로예요 | Run-on, needs punctuation | `숨겨진 비용 없이 보이는 그대로 안내드립니다` |
| Fee desc | 주 정부에서 허용한 수수료예요 어느 딜러를 가든 다 내는 거예요 | Translation-style | `서류 수수료는 약 $799이고, 딜러십에서 공통으로 들어가는 비용입니다.` |
| Negotiate label | 못 깎는 것 (법으로 정해진 거) | Awkward | `조정 불가 항목 (법/규정상 고정)` |
| Review fear | 첫 차 사는 거라 너무 무서웠어요 | Slightly dramatic | `첫 차라 많이 떨렸어요` |
| Review text | 승국 씨는 전혀 안 밀어요 | Slightly awkward | `전혀 부담 주지 않으셨어요` |
| Review text | 첫 차라서 진짜 떨렸는데 승국 씨 덕분에 편하게 샀어요 | Minor | `승국님 덕분에` (more standard honorific) |
| Promises section | 나의 약속 | Same as nav | `제 약속` |
| Promises intro | 제승국이 직접 드리는 약속이에요 | Copy-style | `제가 직접 약속드리는 부분입니다` |
| Promise | 차 산 다음에도 문자 전화 다 받겠습니다 | Slightly rough | `출고 후에도 문자나 전화 주시면 계속 도와드리겠습니다` |
| Promise | 손님이 아니라 가족처럼 대하겠습니다 | Cringy for Korean audience | `한 번 보고 끝나는 관계처럼 대하지 않겠습니다` or `편하게 믿고 맡기실 수 있게 도와드리겠습니다` |
| FAQ subtitle | 솔직하게 답해드릴게요 눌러서 확인하세요 | Missing period | `솔직하게 답해드릴게요. 눌러서 확인해보세요.` |
| CTA button | 편하게 방문 예약하기 | Too long for button | `방문 예약하기` |
| CTA | 준비 되셨으면 언제든 오세요 | Spacing error | `준비되셨으면 언제든 오세요` (준비되셨으면 is one word) |

---

## Systemic Patterns to Fix

Codex identified 4 recurring anti-patterns across the Korean text:

### 1. Excessive "Good Person Branding"
Words like `정직하게`, `가족처럼`, `놀랄 일 없는 약속` — in Korean, these come across as advertising rather than genuine personality. Real Korean speakers demonstrate trustworthiness through tone, not by stating it explicitly.

### 2. Comma-Separated Virtue Lists
Pattern: `부담 없이, 솔직하게, 내 삶에 맞는 차를` — this reads like marketing tagline structure. Natural Korean uses flowing sentences, not adjective stacking.

### 3. Translation-Style Phrasing
Examples: `두 세계 사이의 삶` (literal "life between two worlds"), `완벽 가이드` (literal "complete guide"), `최고의 차량` (literal "best vehicle"). These are English copy concepts translated word-for-word.

### 4. Over-Confident / Exaggerated Claims
Examples: `걱정 끝이에요` ("worries are over"), `안 당해요` ("you won't get scammed"), `웃으면서 집으로` ("go home smiling"). For Korean-American audiences in their 30s-50s, these can feel lightweight or patronizing. More measured language builds more trust.

---

## Items That Sound Natural (No Changes Needed)

The following were reviewed and judged as natural-sounding:

- All quiz questions (q1-q7) and answer options
- All quiz feature options (q6)
- Most contact form labels
- Guide page step content (the long Korean paragraphs in steps array)
- Guide page trap descriptions and protection advice
- Guide page FAQ questions and answers
- Guide page checklist items
- Financing page FAQ questions and answers
- Most review text quotes
- Navigation items: 홈, 재고 차량, 기아 신차, 중고차, 내 차 찾기, 미국 차 구매 가이드, 연락하기
- Section titles: 단계별 가이드, 이거 조심하세요, 준비물 체크, 자주 묻는 질문, 더 궁금한 거 있으세요?, 한국어든 영어든 편하게 물어보세요, 카카오톡으로도 편하게 연락 주세요
- CTA labels: 이렇게 대처하세요, 문자하기
- Financing: 가격 상담, 서류 작성, 맞는 차 찾기, 둘러보기 & 시승
- Financing reviews: 사라고 압박할까 봐 걱정했어요, 숨겨진 비용이 있을까 봐 걱정했어요, 영어를 잘 못해서 걱정했어요
