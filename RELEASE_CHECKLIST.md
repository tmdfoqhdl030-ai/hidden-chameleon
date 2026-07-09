# 숨은 카멜레온 출시 체크리스트

## 완료
- React + TypeScript + Vite 빌드 통과
- 단위 테스트 통과
- 로컬 단독 실행 가능
- Apps in Toss SDK가 없어도 localStorage fallback 동작
- 실제 현금성 포인트/리워드 지급 기능 없음
- 게임 내부 점수만 사용
- 이미지 출처와 라이선스 기록 포함
- 에러 발생 시 빈 화면 대신 복구 화면 표시
- 이미지 로딩 실패 시 SVG fallback 사용
- ESC로 모달 닫기 지원
- prefers-reduced-motion 대응

## 출시 전 최종 확인
- 앱인토스 콘솔 등록 정보와 앱 이름 일치 여부 확인
- 배경 이미지 CC BY attribution 표기 방식 검토
- 실제 기기 360px, 390px, 430px 폭에서 터치 판정 확인
- 앱 심사 문구에 현금성 보상으로 오해될 표현이 없는지 확인
- 운영 배포 URL에서 HTTPS 동작 확인
