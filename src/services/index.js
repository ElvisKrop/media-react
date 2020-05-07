const _base = "https://conduit.productionready.io/api/";
const _limit = 10;

export default class MediaReactService {
  //проверка на токен
  _getToken = () => {
    const tokenFromLocal = localStorage.getItem("mrToken");
    return tokenFromLocal ? `Token ${tokenFromLocal}` : "";
  };

  _getResourse = async (url) => {
    const response = await fetch(new URL(url, _base), {
      headers: {
        authorization: this._getToken()
      }
    });
    if (!response.ok) {
      throw new Error(`Could not fetch ${url}, received ${response.status}`);
    }
    const data = await response.json();
    return data;
  };

  // получение списка всех тегов
  getTags = async () => {
    const tags = await this._getResourse("tags/");
    return tags;
  };

  //получение всех статей и их кол-ва
  getArticlesAll = async (pageIndex = 0) => {
    const { articles, articlesCount } = await this._getResourse(
      `articles?limit=${_limit}&offset=${_limit * pageIndex}`
    );
    return {
      articles: articles.map((art) => this._transformArticle(art)),
      articlesCount
    };
  };

  //получение статей и их кол-ва по тегу
  getArticlesByTag = async (tag = "test", pageIndex = 0) => {
    const { articles, articlesCount } = await this._getResourse(
      `articles?tag=${tag}&limit=${_limit}&offset=${_limit * pageIndex}`
    );
    return {
      articles: articles.map((art) => this._transformArticle(art)),
      articlesCount
    };
  };

  // получение статьи по slug
  getOneArticle = async (slug) => {
    const { article } = await this._getResourse(`articles/${slug}`);
    return await this._transformArticle(article);
  };

  //трансформация данных о статье с сервера
  _transformArticle = (article) => {
    const { author } = article;
    return {
      author: {
        username: author.username,
        bio: author.bio,
        image: author.image,
        following: author.following
      },
      body: article.body,
      createdAt: article.createdAt,
      description: article.description,
      favorited: article.favorited,
      favoritesCount: article.favoritesCount,
      slug: article.slug,
      tagList: article.tagList,
      title: article.title,
      updatedAt: article.updatedAt
    };
  };
}
