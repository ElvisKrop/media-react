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

  getTags = async () => {
    const tags = await this._getResourse("tags/");
    return tags;
  };

  getProfile = async (username) => {
    const profile = await this._getResourse(`profiles/${username}`);
    return profile;
  };

  _getArticles = async (pageIndex = 0, param = "?") => {
    const { articles, articlesCount } = await this._getResourse(
      `articles${param}limit=${_limit}&offset=${_limit * pageIndex}`
    );
    return {
      articles: articles.map((art) => this._transformArticle(art)),
      articlesCount: Math.ceil(articlesCount / _limit)
    };
  };

  //получение всех статей и их кол-ва
  getArticlesAll = async (pageIndex) => {
    return this._getArticles(pageIndex);
  };

  //получение статей и их кол-ва по тегу
  getArticlesByTag = async (pageIndex, tag) => {
    return this._getArticles(pageIndex, `?tag=${tag}&`);
  };

  //получение статей по подписке(follow)
  getArticlesByFollow = async (pageIndex) => {
    return this._getArticles(pageIndex, "/feed?");
  };

  //получение статей созданных пользователем
  getUserArticles = async (pageIndex = 0, user) => {
    return this._getArticles(pageIndex, `?author=${user}&`);
  };

  //получение статей лайкнутых пользователям
  getArticlesByFavorited = async (pageIndex = 0, user) => {
    return this._getArticles(pageIndex, `?favorited=${user}&`);
  };

  ////////////////// Post запросы ////////////////////////
  _postDataToResourse = async (url, data = {}) => {
    const response = await fetch(new URL(url, _base), {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        authorization: this._getToken()
      },
      body: JSON.stringify(data)
    });
    if (!response.ok) {
      if (Object.keys(data).length) {
        throw await response.json();
      }
      throw new Error(`Could not fetch ${url}, received ${response.status}`);
    }
    return await response.json();
  };

  postUserToLogin = async (user = {}) => {
    const response = await this._postDataToResourse("users/login", { user });
    return await response;
  };

  postUserToRegister = async (user = {}) => {
    const response = await this._postDataToResourse("users", { user });
    return await response;
  };

  postFavorited = async (slug) => {
    const { article } = await this._postDataToResourse(
      `articles/${slug}/favorite`
    );
    return this._transformArticle(article);
  };

  postFollowig = async (user) => {
    const profile = await this._postDataToResourse(`profiles/${user}/follow`);
    return profile;
  };

  ///////////////// Delete запросы //////////////////////////
  _deleteResourse = async (url) => {
    const response = await fetch(new URL(url, _base), {
      method: "DELETE",
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

  deleteFavorited = async (slug) => {
    const { article } = await this._deleteResourse(`articles/${slug}/favorite`);
    return this._transformArticle(article);
  };

  deleteFollowig = async (user) => {
    const profile = await this._deleteResourse(`profiles/${user}/follow`);
    return profile;
  };

  /////////////////// Transform /////////////////////////
  //трансформация данных о статье с сервера
  _transformArticle = (article) => {
    const { author } = article;
    return {
      author: {
        username: author.username,
        bio: author.bio,
        image:
          author.image ||
          "https://static.productionready.io/images/smiley-cyrus.jpg",
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
