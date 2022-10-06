import api from "../../api";

const state = {
  users: [],
  positions: [],
  pages: 0,
  count: 0,
  lastId: 0,
  token: "",
  serverError: "",
  userAdded: false,
  isLoading: false,
};

const getters = {
  USERS: (state) => {
    return state.users;
  },
  PAGES: (state) => {
    return state.pages;
  },
  COUNT: (state) => {
    return state.count;
  },
  LAST_ID: (state) => {
    return state.lastId;
  },
  POSITIONS: (state) => {
    return state.positions;
  },
  TOKEN: (state) => {
    return state.token;
  },
  SERVER_ERROR: (state) => {
    return state.serverError;
  },
  USER_ADDED: (state) => {
    return state.userAdded;
  },
  LOADING: (state) => {
    return state.isLoading;
  },
};

const mutations = {
  SET_DATA(state, payload) {
    state[payload.name] = payload.value;
  },
};

const actions = {
  GET_USERS_BY_PAGE({ commit }, page) {
    commit("SET_DATA", { name: "isLoading", value: true });
    api.getUsersbyPage(page).then((resp) => {
      commit("SET_DATA", { name: "users", value: resp.data.users });
      commit("SET_DATA", { name: "pages", value: resp.data.total_pages });
    });
    window.setTimeout(() => {
      commit("SET_DATA", { name: "isLoading", value: false });
    }, 500);
  },
  GET_POSITIONS({ commit }) {
    api.getUsersPositions().then((resp) => {
      commit("SET_DATA", { name: "positions", value: resp.data.positions });
    });
  },
  GET_TOKEN({ commit }) {
    api.getToken().then((resp) => {
      commit("SET_DATA", { name: "token", value: resp.data.token });
    });
  },
  ADD_USER({ commit }, userData) {
    commit("SET_DATA", { name: "isLoading", value: true });
    api
      .addUser(userData.user, userData.token)
      .then((response) => {
        if (response.data.success) {
          commit("SET_DATA", { name: "userAdded", value: true });
        }
      })
      .catch((error) => {
        commit("SET_DATA", {
          name: "serverError",
          value: error.response.data.message,
        });
        commit("SET_DATA", { name: "userAdded", value: false });
      });

    window.setTimeout(() => {
      commit("SET_DATA", { name: "isLoading", value: false });
    }, 3000);
  },
};

export default {
  state,
  getters,
  mutations,
  actions,
};
