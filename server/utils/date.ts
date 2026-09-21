const fifteenMinutesFromNow = (): Date => new Date(Date.now() + 15 * 60 * 1000);
const thirtyDaysFromNow = (): Date => new Date(Date.now() + 30 * 24 * 60 * 60 * 1000);

export { fifteenMinutesFromNow, thirtyDaysFromNow };