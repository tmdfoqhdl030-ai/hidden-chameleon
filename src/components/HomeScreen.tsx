type HomeScreenProps = {
  onStart: () => void;
  onShowHowToPlay: () => void;
  onShowCredits: () => void;
};

export function HomeScreen({ onStart, onShowHowToPlay, onShowCredits }: HomeScreenProps) {
  return (
    <main className="screen homeScreen">
      <section className="homeCard">
        <p className="eyebrow">위장 패턴 관찰</p>
        <h1>카멜레온 관찰 테스트</h1>
        <p className="description">배경 속에 자연스럽게 숨어 있는 형태를 천천히 관찰해 보세요.</p>
        <div className="bestScore" aria-label="체험 안내">
          관찰 주제 <strong>12장면</strong>
        </div>
        <button type="button" className="primaryButton" aria-label="관찰 시작하기" onClick={onStart}>
          관찰 시작하기
        </button>
        <button type="button" className="secondaryButton" aria-label="관찰 방법 보기" onClick={onShowHowToPlay}>
          관찰 방법 보기
        </button>
        <button type="button" className="ghostButton" aria-label="출처 및 안내 보기" onClick={onShowCredits}>
          출처 및 안내
        </button>
      </section>
    </main>
  );
}
