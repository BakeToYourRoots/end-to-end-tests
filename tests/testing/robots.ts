import robotsParser from "robots-parser";

export const expectation = async (robotsTxt: any) => {
  const fileContents = await robotsTxt.page.content();

  const parsedRobotsTxt = robotsParser(process.env.BASE_URL!, fileContents);
  const numberOfSitemaps = parsedRobotsTxt.getSitemaps().length;

  const pass = numberOfSitemaps > 0;

  const message = pass
    ? () => `robots.txt references ${numberOfSitemaps} sitemaps.`
    : () => "robots.txt does not reference any sitemaps.";

  return {
    message,
    name: "toReferenceSitemaps",
    expected: "> 0",
    actual: numberOfSitemaps,
    pass,
  };
};
