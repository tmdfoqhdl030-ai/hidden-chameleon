import { calculateAccuracy } from "../game/scoring";

type ResultScreenProps = {
  foundCount: number;
  totalTapCount: number;
  hintUsedCount: number;
  onRetry: () => void;
  onHome: () => void;
};

function getObservationType(foundCount: number, totalTapCount: number): string {
  const accuracy = calculateAccuracy(foundCount, totalTapCount);
  if (foundCount >= 8 && accuracy >= 70) return "패턴 감지형";
  if (foundCount >= 5) return "꼼꼼한 관찰형";
  if (totalTapCount >= 10) return "탐색 확장형";
  return "차분한 관찰형";
}

export function ResultScreen({ foundCount, totalTapCount, hintUsedCount, onRetry, onHome }: ResultScreenProps) {
  const accuracy = calculateAccuracy(foundCount, totalTapCount);
  const observationType = getObservationType(foundCount, totalTapCount);

  return (
    <main className="screen resultScreen">
      <section className="resultHeader">
        <p className="eyebrow">관찰 요약</p>
        <h1>{observationType}</h1>
        <p className="rankLabel">배경 속 패턴 변화를 살펴보는 데 집중하셨습니다.</p>
      </section>
      <section className="resultGrid" aria-label="관찰 요약">
        <article>
          <span>발견한 형태</span>
          <strong>{foundCount}</strong>
        </article>
        <article>
          <span>살펴본 위치</span>
          <strong>{totalTapCount}</strong>
        </article>
        <article>
          <span>가이드 사용</span>
          <strong>{hintUsedCount}</strong>
        </article>
        <article>
          <span>감지율</span>
          <strong>{accuracy}%</strong>
        </article>
      </section>
      <p className="bestScore resultBest">이 결과는 기기 안에서만 표시되는 관찰 요약입니다.</p>
      <div className="resultActions">
        <button type="button" className="primaryButton" aria-label="다시 관찰하기" onClick={onRetry}>
          다시 관찰하기
        </button>
        <button type="button" className="secondaryButton" aria-label="홈으로 이동" onClick={onHome}>
          홈으로
        </button>
      </div>
    </main>
  );
}
