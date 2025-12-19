export const logoutAllTabs = () => {
  localStorage.setItem("admin-logout", Date.now().toString());
};
