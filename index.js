/** @format*/

import { AppRegistry } from "react-native";
import App from "./src"; /* Aqui eu nem preciso passar meu index porque automaticamente ele faz
essa busca quando informo minha pasta */
import  { name as appName } from "./app.json";

AppRegistry.registerComponent(appName, () => App);