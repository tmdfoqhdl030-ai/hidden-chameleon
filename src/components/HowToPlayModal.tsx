import { useEffect } from "react";

type HowToPlayModalProps = {
  onClose: () => void;
};

export function HowToPlayModal({ onClose }: HowToPlayModalProps) {
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  return (
    <div className="modalBackdrop" role="presentation" onClick={onClose}>
      <section className="modal" role="dialog" aria-modal="true" aria-labelledby="how-title" onClick={(event) => event.stopPropagation()}>
        <div className="modalHeader">
          <h2 id="how-title">관찰 방법</h2>
          <button type="button" className="iconButton" aria-label="관찰 방법 닫기" onClick={onClose}>
            X
          </button>
        </div>
        <ul className="howList">
          <li>배경 속에 위장된 사람 형태를 찾아보세요.</li>
          <li>다른 위치를 눌러도 불이익은 없습니다.</li>
          <li>위치 가이드는 숨은 형태 주변을 잠시 표시합니다.</li>
          <li>원하는 만큼 살펴본 뒤 관찰을 마칠 수 있습니다.</li>
        </ul>
      </section>
    </div>
  );
}
