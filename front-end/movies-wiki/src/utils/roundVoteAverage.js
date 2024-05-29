export const roundVoteAverage = (voteAverage) => {
  if (typeof voteAverage !== "number" || isNaN(voteAverage)) {
    return null;
  }

  const roundedNumber = parseFloat(voteAverage.toFixed(1));
  return roundedNumber;
};
