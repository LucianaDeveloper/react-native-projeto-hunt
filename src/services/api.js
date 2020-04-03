import axios from "axios"; 
/* yarn add axios -> importando */

const api = axios.create({/* criei uma variavel chamada api e vou utilizar o axios.create para conseguir definir uma baseurl onde todas as chamadas nossas api vão partir */
    baseURL: "https://rocketseat-node.herokuapp.com/api"
});

/* exportar a variavel que acabei de criar aqui de dentro do arquivo api.js */
export default api; /* vou chamar ele no main.js */