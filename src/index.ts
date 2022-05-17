// change ordering here, will affect the bundle
import "./main.css";
import { className, className2 } from "./styles.css";

const addElement = (text: string, className = "") => {
  const el = document.createElement("div");
  if (className) {
    el.classList.add(className, "cl-test");
  }
  el.innerText = text;
  document.body.append(el);
};

addElement(__VERSION__);

if (__DEV__) {
  addElement("develop");
}

addElement("classname 1", className);
addElement("classname 2", className2);
