console.log(process.env.NODE_ENV);
const LOCAL_IP_ADDRESS = "localhost";
const SERVE_IP_ADDRESS = "106.54.42.57";
export const modules = {
  "module-html": `http://${
    process.env.NODE_ENV === "development" ? LOCAL_IP_ADDRESS : SERVE_IP_ADDRESS
  }:9001/module-html/main.js`,
  "module-css": `http://${
    process.env.NODE_ENV === "development" ? LOCAL_IP_ADDRESS : SERVE_IP_ADDRESS
  }:9002/module-css/main.js`
};
