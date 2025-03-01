export const getWinLoseScore = (current: string, score: number, opponentScore: number): string => {
  let [wins, draws, losses] = current.split('-').map(Number);

  if (score > opponentScore) wins++;
  else if (score < opponentScore) losses++;
  else draws++;

  return `${wins}-${draws}-${losses}`;
};

export const getPoint = (current: string, score: number, opponentScore: number): string => {
  let [scored, conceded] = current.split('-').map(Number);
  return `${scored + score}-${conceded + opponentScore}`;
};

export const getPointDiff = (current: number, score: number, opponentScore: number): number => {
  return current + (score - opponentScore);
};

