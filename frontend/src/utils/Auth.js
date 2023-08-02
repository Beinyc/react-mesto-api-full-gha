export const BASE_URL = "https://api.beiny.students.nomoreparties.co";
// export const BASE_URL = "http://localhost:3000";

const getResponseData = (res) => {
  if (!res.ok) {
      return Promise.reject(`Ошибка: ${res.status}`); 
  }
  return res.json();
}

export const register = (email, password) => {
  return fetch(`${BASE_URL}/signup`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    credentials: 'include',
    body: JSON.stringify({ email, password }),
  }).then(getResponseData
  );
};

export const autHorizen = (email, password) => {
  return fetch(`${BASE_URL}/signin`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    credentials: 'include',
    body: JSON.stringify({ email, password }),
  }).then(getResponseData
  );
};

export const getContent = () => {
  return fetch(`${BASE_URL}/users/me`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    credentials: 'include',
  }).then(getResponseData
  );
};

// запрос логаута
export const logout = () => {
  return fetch(`${BASE_URL}/logout`, {
      method: 'GET',
      headers: {
          "Accept": "application/json",
          "Content-Type": "application/json"
      },
      credentials: 'include'
  })
  .then((res) => {
      console.log(res);
  })
  .catch((err) => {
      console.log(err.status);
  })
}