import React from "react"; /* Importar o react sem o component */
import Routes from "./routes"; /* E importar meu arquivo de rotas */
import "./config/StatusBarConfig"; /* Importando minha configuração de estilização na StatusBar */

const App = () => <Routes />;/* definindo função */
/* Não estou criando uma classe. Porque? Outra forma de definir componentes no react é criando funções. E posso cria-la usando arrow function (=>) criando uma função que simplesmente retorna um código jsx. 
 Dessa forma que eu fiz é a mesma coisa se eu houvesse criado da seguinte forma:
  
class App extends Component {
render() {
    return <Routes />
  }
}
A diferença é que com o component eu consigo acessar algumas funcionalidades do react a mais, as quais não vou necessariamente utilizar aqui, então, posso definir como uma simples função
*/
export default App;
/* Por padrão preciso sempre exportar meu componente dentro do arquivo */