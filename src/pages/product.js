/* Estruturar meu componente */
import React from "react";

import { WebView } from "react-native-webview";

 const Product = ({ navigation })  => (
     
   
    <WebView source={{ uri: navigation.state.params.product.url }} />
);
     

/* Antes eu tinha uma propriedade estática dentro da classe, mas como acima, eu não tenho uma classe e sim uma variável, é do modo abaixo que eu defino minhas propriedades estáticas. Então esse padrão de variável que criamos, nunca vai poder ter estado (state). O nome disso é stateless component */    /* Desestruturação para acessa o navigation */
Product.navigationOptions = ({ navigation }) => ({/* Podemos escrever o navigation em formato de função para conseguir ter acesso ao navigation e aos parametros que passamos na navegação, assim consigo puxar o title e apresentar na página o titulo do item clicado */
    title: navigation.state.params.product.title/* acessando os parametros da minha página para retornar cada titulo de forma individual, referente a cada clique realizado em página*/
});


export default Product;

