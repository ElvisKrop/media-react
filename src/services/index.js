const _base = "https://conduit.productionready.io/api/";
const _limit = 10;

export default class MediaReactService {
  //проверка на токен
  _getToken = () => {
    const tokenFromLocal = localStorage.getItem("mrToken");
    console.log(tokenFromLocal);
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

  //получение всех статей и их кол-ва
  getArticlesAll = async (pageIndex = 0) => {
    const { articles, articlesCount } = await this._getResourse(
      `articles?limit=${_limit}&offset=${_limit * pageIndex}`
    );
    return {
      articles: articles.map((art) => this._transformArticle(art)),
      articlesCount,
    };
  };

  //получение статей и их кол-ва по тегу
  getArticlesByTag = async (tag = "test", pageIndex = 0) => {
    const { articles, articlesCount } = await this._getResourse(
      `articles?tag=${tag}&limit=${_limit}&offset=${_limit * pageIndex}`
    );
    return {
      articles: articles.map((art) => this._transformArticle(art)),
      articlesCount,
    };
  };

  //получение статей по подписке(follow)
  getArticlesByFollow = async (pageIndex = 0) => {
    const { articles, articlesCount } = await this._getResourse(
      `articles/feed?limit=${_limit}&offset=${_limit * pageIndex}`
    );
    return {
      articles: articles.map((art) => this._transformArticle(art)),
      articlesCount,
    };
  };

  //получение статей созданных пользователя
  // TODO придумать что нибудь с user по умолчанию
  getUserArticles = async (user = "dfgfdgfdgddfglll", pageIndex = 0) => {
    const { articles, articlesCount } = await this._getResourse(
      `articles?author=${user}&limit=${_limit}&offset=${_limit * pageIndex}`
    );
    return {
      articles: articles.map((art) => this._transformArticle(art)),
      articlesCount,
    };
  };

  //получение статей лайкнутых пользователям
  // TODO придумать что нибудь с user по умолчанию
  getArticlesByFavorited = async (user = "dfgfdgfdgddfglll", pageIndex = 0) => {
    const { articles, articlesCount } = await this._getResourse(
      `articles?favorited=${user}&limit=${_limit}&offset=${_limit * pageIndex}`
    );
    return {
      articles: articles.map((art) => this._transformArticle(art)),
      articlesCount,
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
    // TADO tranform
    const articles = await this._postResuurse(`articles/${slug}/favorite`);
    return {
      // TODO сделать свой конструктор
      articles,
    };
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
    const articles = await this._deleteResuurse(`articles/${slug}/favorite`);
    return {
      // TODO сделать свой конструктор
      articles,
    };
  };

  /////////////////// Transform /////////////////////////

  //трансформация данных о статье с сервера
  _transformArticle = (article) => {
    const { author } = article;
    return {
      author: {
        username: author.username,
        bio: author.bio,
        image: author.image,
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
