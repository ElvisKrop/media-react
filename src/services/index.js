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
        authorization: this._getToken(),
      },
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

  //получение всех статей и их кол-ва
  getArticlesAll = async (pageIndex = 0) => {
    const { articles, articlesCount } = await this._getResourse(
      `articles?limit=${_limit}&offset=${_limit * pageIndex}`
    );
    return {
      articles: articles.map((art) => this._transformArticle(art)),
      articlesCount: Math.ceil(articlesCount / _limit),
    };
  };

  //получение статей и их кол-ва по тегу
  getArticlesByTag = async (pageIndex = 0, tag = "test") => {
    const { articles, articlesCount } = await this._getResourse(
      `articles?tag=${tag}&limit=${_limit}&offset=${_limit * pageIndex}`
    );
    return {
      articles: articles.map((art) => this._transformArticle(art)),
      articlesCount: Math.ceil(articlesCount / _limit),
    };
  };

  //получение статей по подписке(follow)
  getArticlesByFollow = async (pageIndex = 0) => {
    const { articles, articlesCount } = await this._getResourse(
      `articles/feed?limit=${_limit}&offset=${_limit * pageIndex}`
    );
    return {
      articles: articles.map((art) => this._transformArticle(art)),
      articlesCount: Math.ceil(articlesCount / _limit),
    };
  };

  //получение статей созданных пользователя
  // TODO придумать что нибудь с user по умолчанию
  getUserArticles = async (pageIndex = 0, user = "dfgfdgfdgddfglll") => {
    const { articles, articlesCount } = await this._getResourse(
      `articles?author=${user}&limit=${_limit}&offset=${_limit * pageIndex}`
    );
    return {
      articles: articles.map((art) => this._transformArticle(art)),
      articlesCount: Math.ceil(articlesCount / _limit),
    };
  };

  //получение статей лайкнутых пользователям
  // TODO придумать что нибудь с user по умолчанию
  getArticlesByFavorited = async (pageIndex = 0, user = "dfgfdgfdgddfglll") => {
    const { articles, articlesCount } = await this._getResourse(
      `articles?favorited=${user}&limit=${_limit}&offset=${_limit * pageIndex}`
    );
    return {
      articles: articles.map((art) => this._transformArticle(art)),
      articlesCount: Math.ceil(articlesCount / _limit),
    };
  };

  ////////////////// Post запросы ////////////////////////

  _postResuurse = async (url) => {
    const response = await fetch(new URL(url, _base), {
      method: "POST",
      headers: {
        authorization: this._getToken(),
      },
    });
    if (!response.ok) {
      throw new Error(`Could not fetch ${url}, received ${response.status}`);
    }
    const data = await response.json();
    return data;
  };

  postFavorited = async (slug) => {
    const { article } = await this._postResuurse(`articles/${slug}/favorite`);
    return this._transformArticle(article);
  };

  postFollowig = async (user) => {
    const profile = await this._postResuurse(`profiles/${user}/follow`);
    return profile;
  };

  ///////////////// Delete запросы //////////////////////////

  _deleteResuurse = async (url) => {
    const response = await fetch(new URL(url, _base), {
      method: "DELETE",
      headers: {
        authorization: this._getToken(),
      },
    });
    if (!response.ok) {
      throw new Error(`Could not fetch ${url}, received ${response.status}`);
    }
    const data = await response.json();
    return data;
  };

  deleteFavorited = async (slug) => {
    const { article } = await this._deleteResuurse(`articles/${slug}/favorite`);
    return this._transformArticle(article);
  };

  deleteFollowig = async (user) => {
    const profile = await this._deleteResuurse(`profiles/${user}/follow`);
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
        following: author.following,
      },
      body: article.body,
      createdAt: article.createdAt,
      description: article.description,
      favorited: article.favorited,
      favoritesCount: article.favoritesCount,
      slug: article.slug,
      tagList: article.tagList,
      title: article.title,
      updatedAt: article.updatedAt,
    };
  };
}
