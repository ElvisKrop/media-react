const _base = "https://conduit.productionready.io/api/";

export default class MediaReactService {
  _getResourse = async (url) => {
    const response = await fetch(new URL(url, _base));
    if (!response.ok) {
      throw new Error(`Could not fetch ${url}, received ${response.status}`);
    }
    const data = await response.json();
    return data;
  };

  getTags = async () => {
    const tags = await this._getResourse("tags/");
    return tags;
  };
}
