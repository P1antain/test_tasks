import React from "react";
import styles from "./App.module.css";
import Login from "../Login/Login";
import { Route, Switch, useHistory, useLocation } from "react-router-dom";
import Page404 from "../page404/page404";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";
import Cabinet from "../Cabinet/Cabinet";
import { api } from "../../utils/api";

function App() {
  const history = useHistory();
  const locationNow = useLocation();
  const [loggedIn, setLoggedIn] = React.useState(false);
  const [inDataPost, setDataPost] = React.useState([]);

  //Для перенаправления к разделу входа в приложение при первом входе
  React.useEffect(() => {
    if (locationNow.pathname === "/") {
      history.push("/signin");
      console.log("проверка единичного рендеринга");
    }
  }, []);
  // Выполняем вход в аккаунт
  const sendLogin = (data) => {
    const { email, password } = data;
    console.log(email);
    api
      .onLogin(email, password)
      .then((res) => {
        console.log(res);
        setLoggedIn(true);
        localStorage.setItem("token", res.accessToken);
        history.push("/cabinet");
      })
      .catch((err) => {
        console.log(err);
        localStorage.removeItem("token");
      });
  };
  //Проверяем, если токен есть в локальном хранилище, перенаправляет в кабинет
  React.useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setLoggedIn(true);
      history.push("/cabinet");
    } else {
      localStorage.removeItem("token");
    }
  }, []);
  //Обновляем текущие данные
  React.useEffect(() => {
    setData();
  }, []);
  function setData() {
    api.getPost().then((data) => {
      setDataPost(data);
    });
  }
  //Удаление карты
  const deleteCard = (card) => {
    api.deleteCard(card).then((data) => {
      console.log(data);
      setData();
    });
  };
  //Поиск контакта
  const handleSearch = (data) => {
    const filterTel = inDataPost.filter((i) => {
      return i.tel.toLowerCase().includes(data.search.toLowerCase());
    });
    const filterName = inDataPost.filter((i) => {
      return i.name.toLowerCase().includes(data.search.toLowerCase());
    });
    if (filterTel.length > 0) {
      setDataPost(filterTel);
    }
    if (filterName.length > 0) {
      setDataPost(filterName);
    }
  };
  //Добавление новой карточки
  const handleNewContact = (data) => {
    const { name, tel } = data;
    api.newCard(name, tel).then((data) => {
      console.log(data);
      setData();
    });
  };
  //Редактирование контакта
  const handleDataEdit = (data, card) => {
    const { name, tel } = data;
    const { id } = card;
    console.log(name, tel, id);
    api.updateCard(name, tel, card.id).then((data) => {
      console.log(data);
      setData();
    });
  };
  return (
    <>
      <div className={styles.page}>
        <Switch>
          <Route exact path={"/signin"}>
            <Login sendLogin={sendLogin} />
          </Route>
          <ProtectedRoute
            path={"/cabinet"}
            component={Cabinet}
            loggedIn={loggedIn}
            inDataPost={inDataPost}
            deleteCard={deleteCard}
            handleSearch={handleSearch}
            handleNewContact={handleNewContact}
            handleDataEdit={handleDataEdit}
          />
          <Route path={"*"}>
            <Page404 />
          </Route>
        </Switch>
      </div>
    </>
  );
}

export default App;
