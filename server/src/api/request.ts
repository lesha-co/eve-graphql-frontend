import fetch from "node-fetch";
export const ROOT = `https://esi.evetech.net/latest/`;

export const request = async (
  api: string,
  query: Record<string, string> = {}
) => {
  const url = new URL(api, ROOT);
  const searchParams = new URLSearchParams(query);
  url.search = searchParams.toString();

  const response = await fetch(url, {
    headers: {
      Accept: "application/json",
      "Accept-Language": "en-us"
    }
  });
  return await response.json();
};
