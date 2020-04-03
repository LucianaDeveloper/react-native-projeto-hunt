import React, { Component } from "react";
import api from "../services/api";

/* O que vou importar: */
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from "react-native";
/* FlatList tem uma performance melhor de atualizações dos itens */
/* Criando nosso componente: */
export default class Main extends Component {
/* Adicionando uma propriedade estática na classe.
 Dentro das chaves eu passo meu objeto */
 static navigationOptions = {
   title: "JSHunt",
 };

 state = {
   productInfo: {}, /* armazenando dados da api */
   docs: [],
   page: 1, /* armazenando minha página */
    /*counter: 0,/* para ver quantos registros ele consegue puxar da minha api */
 };
 /* Estate: uma variavel que serve para armazenar toda informação que manipularmos por dentro da nossa classe. Todas as variáveis vão para dentro do nosso estado. Usamos um estado e não várias variáveis porque o react fica ouvindo as alterações no estado e toda vez que houver uma alteração dentro dele, ele vai executar o método render. Isso é bom porque faz que a renderização seja automática */

/* Chamada a api:
Um método que é disparado automaticamente assim que nosso componente é montado/exibido em tela / método inicial disparado automaticamente: */
 componentDidMount() {/* aqui dentro é o melhor local para fazer a chamada a api e mostrar os resultados depois em tela */
   this.loadProducts(); 
 }/* em seguida criar um segundo método chamado loadProducts 
 Só fazendo o repasse de uma chamada para outra função */
 /* quando a criação não é um método padrão do próprio react */
 /* função dentro de uma classe que não segue o padrão de => passa a não funfar pq não acha o this: */
 loadProducts = async (page = 1) => {/* Só que diferente da acima (que eu poderia ter escrito da mesma forma) nessa vou utilizar uma arrow function. Por padrão no react quando estou utilizando um método que é do próprio react como estou utilizando ali no render ou no componentDidMount, podemos utilizar o mesmo padrão acima sem problema algum, só que o que não vai funcionar se criarmos esse padrão um método criado pela gente: quando criamos uma função dentro de uma classe que não segue o modelo padrão de arrow function ela não consegue enxergar o this assim, ela não consegue mais localizar o this dentro da variavel e assim para de conseguir de referenciar outras informações da classe por dentro dessa função. Então, se eu tivesse criado loadProducts com o mesmo formato do  "componentDidMount() {}" eu não conseguiria acessar o this pra referênciar minha classe. Por isso o padrão de => que ele consegue manter esse padrão já que ele nunca cria um novo escopo de função, e sim passa a herdar o escopo acima dele */
  /* Criando variavel response */
  const response = await api.get(`/products?page=${page}`);/* Enviando um parametro (page) que é a pagina que estou chamando da minha api */
  const { docs, ...productInfo } = response.data; /* pegando os docs que recebo da response / enquanto em um eu pego os docs da minha api, no outro eu guardo os outros dados que tem nessa api */
  //console.log(docs);
  /* habilitar esse se utilizar o counter this.setState({ counter: docs.length });
  e no text: <Text>Página Main: {this.state.counter}</Text>*/
  /* Para não sobrescrever as info. na minha tela:
  copiar tudo que tenho no states, de docs e somar com tudo que recebo unindo assim, duas arrays que tenho no setState */
  this.setState({/* preenchendo os docs e os dados dentro do nosso estado */
     docs: [ ...this.state.docs, ...docs ],
      productInfo,
      page /* Atualizar o numero da página no state que estamos recebendo no começõ dessa função, assim, ele para de recarregar infinitamente e assim, de gerar erro */
     });
};
  loadMore = () => { /* A função vai buscar o page e productInfo do nosso state usando a desestruturação que é uma funcionalidade do S6 */
    const { page, productInfo } = this.state;

    if ( page === productInfo.pages ) return;
    /* SE ( minha pagina atual é igual ao total de paginas que tenho na api) ele não faz nada, ou seja, o return nem continua a execução da funçao */
    const pageNumber = page + 1;
    /* SENÃO vou definir um pageNumber/a página atual que estou e dar +1 nela, como se eu quisesse a próxima página */
    this.loadProducts(pageNumber);
    /* então chamo a função loadProducts que eu já tinha antes e que agora recebe um parametro da página [na seção: loadProducts = async (page = 1) => {} ], com o pageNumber que acabei de carregar*/
  };
/* Eu poderia chamar outra função aqui fora que ele ia ler e por sequencia ele puxaria as informações semelhantes que estivessem em seguida, como abaixo
loadTeste = async () => {
};*/
/* O renderItem vai receber uma série de parametros:
O item guarda todas as informações dos meus produtos */
/* o nome após o title, é baseado no nome que peguei lá no console das informações que estavam retornando da minha api */
  renderItem = ({ item }) => (
    <View style={styles.productContainer}>
      <Text style={styles.productTitle}>{item.title}</Text>
      <Text style={styles.productDescription}>{item.description}</Text>
      
      
      <TouchableOpacity
       style={styles.productButton}
        onPress={() => {/* Acessando a propriedade do navigation, chama a função navigate e informa qual tela será acessada, e usar um segundo parametro para enviar a informação do produto que eu cliquei para a página */
          this.props.navigation.navigate("Product", {product: item });
        }
        /* onPress é uma propriedade obrigatória, que é basicamente qual
  função a gente vai executar assim que o usuário clicar nesse botão */}>
        <Text style={styles.productButtonText} >Acessar</Text>
      </TouchableOpacity>
    </View>
  )
/* Método obrigatório: */
    render() {
      return (
        <View style={styles.container}>

          <FlatList /* Propriedades: */
          contentContainerStyle={styles.list}/* Quando queremos estilizar toda a parte do conteúdo da FlatList e não necessariamente a FlatList em si. Como se fosse um elemento dentro do outro */
          data={this.state.docs}/* Passando os dados (docs) do meu estado (state) passando a variavel que armazena esses dados */
          keyExtractor={item => item._id} /* Função que recebe cada item e retorna qual campo que é unico la dentro*/
          renderItem={this.renderItem} /* Função que vai renderizar cada item dessa lista, e vou renderizar essa função em outra função dentro da classe */
          onEndReached={this.loadMore}/* Função automáticamente disparada quando chegar ao final da lista na page */
          onEndReachedThreshold={0.1}/* Qual percentual eu quero chegar ao fim da lista para começar a carregar os novo itens*/
          
          /*<Text>Página Main:</Text>            
          {this.state.docs.map(product => (
              <Text key={product._id}>{product.title}</Text>
               ))
               /* Sempre que uso o map tenho que usar um componente que tenha uma propriedade chamada key */
               /*uma forma de escrever tb 
               {this.state.docs.map((product, key) => 
               <Text key={key}>{product.title}</Text>
               ) */
            /* ele passa pelo state, pega variavel docs onde vai estar meu array de documentos que estão sendo puxados da api, e no .map ele vai mapear/percorrer fazer a iteração sobre algum array dentro do javascript. No parenteses ele abre uma função, e como parametro ele vai receber cada uma dessas informações que eu vou chamar de product.
            ps: tirei um return daqui de dentro e {} e () porque como não tenho muitas linhas de código não preciso de manter tantas chaves e assim posso deixar meu codigo mais enxuto*/
            />
        </View>
      );
    }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FAFAFA"
  },
  list: {/* borda em relação ao entorno */
    padding: 20
  },
  productContainer: {
    backgroundColor: "#FFF",
    borderWidth: 1,
    borderColor: "#DDD",
    borderRadius: 5,
    padding: 20,
    marginBottom: 20,
  },
  productTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333"
  },
  productDescription: {
    fontSize: 16,
    color: "#999",
    marginTop: 5,
    lineHeight: 24
  },
  productButton: {
    height: 42,
    borderRadius: 5,
    borderWidth: 2,
    borderColor: "#A569BD",
    backgroundColor: "transparent",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
  },
  productButtonText: {
    fontSize: 16,
    color: "#A569BD",
    fontWeight: "bold"
  }
});
