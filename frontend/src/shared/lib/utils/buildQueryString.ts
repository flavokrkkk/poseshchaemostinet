import queryString from "query-string";

export function buildQueryString(
  url: string,
  query: object | undefined
): string {
  return queryString.stringifyUrl(
    { url, query: { ...query } },
    {
      arrayFormat: "bracket",
      skipNull: true,
      skipEmptyString: true,
      encode: true,
    }
  );
}
