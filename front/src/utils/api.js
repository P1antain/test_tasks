class Api {
  constructor({ url }) {
    this._url = url;
  }
  _getData(res) {
    if (!res.ok) {
      return Promise.reject(`Ошибка: ${res.status}`);
    }
    return res.json();
  }

  onLogin(email, password) {
    return fetch(`${this._url}/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    }).then(this._getData);
  }
  getPost(){
      return fetch(`${this._url}/posts`,{
          method: "GET",
          headers: {
              "Content-Type": "application/json",
          }
      }).then(this._getData);
  }
  deleteCard(item){
      return fetch(`${this._url}/posts/${item.id}`,{
          method: "DELETE",
          headers: {
              "Content-Type": "application/json",
          }
      }).then(this._getData);
  }
  newCard(name, tel){
      return fetch(`${this._url}/posts`, {
          method: "POST",
          headers: {
              "Content-Type": "application/json",
          },
          body: JSON.stringify({
              name: name,
              tel: tel,
          }),
      }).then(this._getData);
  }
  updateCard(name, tel, item){
      return fetch(`${this._url}/posts/${item}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
            name: name,
            tel: tel
        }),
      }).then(this._getData);
  }
}

export const api = new Api({
  url: "http://localhost:3000",
});
