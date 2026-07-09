export type RewardResult = {
  granted: boolean;
  reason?: string;
};

export interface RewardService {
  grantGameScoreReward(score: number): Promise<RewardResult>;
}

export const noopRewardService: RewardService = {
  async grantGameScoreReward() {
    return { granted: false, reason: "MVP에서는 실제 리워드 지급을 제공하지 않습니다." };
  }
};
