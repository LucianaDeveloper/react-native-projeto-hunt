/* Importando minhas páginas: */
 import Main from "./pages/main";
 import Product from "./pages/product";
/* Ambos vão: permitir acessos para a navegação acontecer */
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
/* createStackNavigator = Vai nos dar acesso a uma navegação stack que fazemos geralmente por cliques em botões. Há também  a navegação por abas, por menu lateral mas, a que vamos utilizar é por botão mesmo */
const AppNavigator = createStackNavigator({/* Declarar o stackNavigator e então, posso passar um objeto */
/* fazendo a atribuição das rotas*/
    Main,/* Repassar o main aqui para dentro. Assim ele consegue entender que minha primeira página vai ser o main*/
    Product
  }, { 
    defaultNavigationOptions:{
      headerStyle: {
          backgroundColor: "#A569BD"
      },
      headerTintColor: "#FFF"
},
});

export default createAppContainer(AppNavigator);