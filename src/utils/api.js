class Api {
  constructor({ baseUrl }) {
    this.baseUrl = baseUrl;
  }

  async _fetchApi(method, path = "", body = undefined) {
    const response = await fetch(`${this.baseUrl}/${path}`, {
      method,
      headers: {
        "Content-Type": body ? "application/json" : undefined,
      },
      body: body ? JSON.stringify(body) : undefined,
    });
    if (!response.ok) {
      return Promise.reject(`Error: ${response.status}`);
    }
    const json = await response.json();
    return json;
  }

  setNewUser({ username, email, birth_date, password, password_confirm }) {
    return this._fetchApi("POST", "register/", {
      username: username,

      email: email,

      birth_date: birth_date,

      password: password,

      password_confirm: password_confirm,
    });
  }

  setNewAchievement({ titulo, fecha, area, descripcion, imagen }) {
    return this._fetchApi("POST", "logro/", {
      titulo: titulo,

      fecha: fecha,

      area: area,

      descripcion: descripcion,

      imagen: imagen,
    });
  }

  loginUser({ email, password }) {
    return this._fetchApi("POST", "login/", {
      email: email,

      password: password,
    });
  }

  getPosts() {
    return this._fetchApi("GET", "posts/");
  }

  getUserInfo() {
    return this._fetchApi("GET", "users/me");
  }

  setUserInfo({ name, about }) {
    return this._fetchApi("PATCH", "users/me", { name, about });
  }

  setUserImage(imageURL) {
    return this._fetchApi("PATCH", "users/me/avatar", { avatar: imageURL });
  }
}

const api = new Api({
  baseUrl: "https://ashoka.onrender.com/",
});

export default api;
