import { createContext, useContext, useState } from "react";

const AdminContext = createContext();

export const AdminProvider = ({ children }) => {
  const [content, setContent] = useState({
    heading: "Welcome To EMR&RC-Educational Broadcasting",
    scrolling: "Lorem ipsum scrolling text",
    liveHeading: "BRAOU conducts interactive live programs...",
    liveLink: "https://www.youtube.com/@BRAOU/",
    ytLink: "https://www.youtube.com/@BRAOU/streams",
    radioLink: "https://www.youtube.com/",
    tsatScrolling: "T-SAT scrolling text",
    tsatLink: "https://www.youtube.com/",
    airScrolling: "AIR scrolling text",
    airSchedule: null,
    bannerFile: null,
  });

  const updateField = (field, value) => {
    setContent((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <AdminContext.Provider value={{ content, updateField }}>
      {children}
    </AdminContext.Provider>
  );
};

export const useAdmin = () => useContext(AdminContext);
