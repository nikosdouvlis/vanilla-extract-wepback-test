// change ordering here, will affect the bundle
import "./main.css";
import { className, className2, typedClass } from "./styles.css";

const addElement = (text: string, className = "") => {
  console.log(className);
  const el = document.createElement("div");
  if (className) {
    el.classList.add("cl-header-title", "cl-internal-styles:", ...className.split(" "));
  }
  el.innerText = text;
  document.body.append(el);
};

addElement(__VERSION__);

if (__DEV__) {
  addElement("develop");
}

addElement("classname 1", className);
addElement("classname 1", className2);
addElement("classname 3", typedClass);
