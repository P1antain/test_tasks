import React from "react";
import { useHistory } from "react-router-dom";

export default function Page404() {
  const history = useHistory();
  function clickGoBack() {
    history.goBack();
  }
  return (
    <>
      <h1>Page not found</h1>
      <button onClick={clickGoBack}>Вернуться назад</button>
    </>
  );
}
