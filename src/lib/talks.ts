export interface TalkStatusLike {
  event: string;
  year: number;
  startDate?: string;
  placeholder?: boolean;
}

export function getUpcomingTalk<T extends TalkStatusLike>(talks: T[], now = new Date()) {
  const nowTime = now.getTime();

  return talks
    .filter((talk) => !talk.placeholder && talk.startDate)
    .map((talk) => ({ talk, time: new Date(talk.startDate as string).getTime() }))
    .filter(({ time }) => Number.isFinite(time))
    .filter(({ time }) => time >= nowTime)
    .sort((a, b) => a.time - b.time)[0]?.talk;
}

export function formatTalkStatus(talk: TalkStatusLike) {
  return `${talk.event} ${talk.year}`;
}
