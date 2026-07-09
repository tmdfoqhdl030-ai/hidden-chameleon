import { useEffect } from "react";
import { assetCredits } from "../game/assetCredits";

type CreditsModalProps = {
  onClose: () => void;
};

export function CreditsModal({ onClose }: CreditsModalProps) {
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  return (
    <div className="modalBackdrop" role="presentation" onClick={onClose}>
      <section className="modal creditsModal" role="dialog" aria-modal="true" aria-labelledby="credits-title" onClick={(event) => event.stopPropagation()}>
        <div className="modalHeader">
          <h2 id="credits-title">출처 및 안내</h2>
          <button type="button" className="iconButton" aria-label="출처 안내 닫기" onClick={onClose}>
            X
          </button>
        </div>
        <p className="creditsNotice">이 콘텐츠는 배경 속 위장 패턴을 살펴보는 관찰 테스트입니다. 실제 현금성 보상이나 토스 포인트를 지급하지 않으며, 개인정보를 수집하지 않습니다.</p>
        <ul className="creditsList" aria-label="배경 이미지 출처 목록">
          {assetCredits.map((credit) => (
            <li key={credit.file}>
              <a href={credit.source} target="_blank" rel="noreferrer">
                {credit.title}
              </a>
              <span>{credit.creator} · {credit.license}</span>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
