// Diccionario extendido en español (aquí solo se muestra una pequeña parte por simplicidad)
const dictionary = [
    // Artículos
    "el", "la", "los", "las", "un", "una", "unos", "unas",

    // Verbos
    "ser", "estar", "tener", "hacer", "poder", "decir", "ir", "ver", "dar", "saber", "querer", "llegar", 
    "pasar", "deber", "poner", "parecer", "quedar", "creer", "hablar", "llevar", "dejar", "seguir", 
    "encontrar", "llamar", "venir", "pensar", "salir", "volver", "tomar", "conocer", "vivir", "sentir",
    "tratar", "mirar", "contar", "empezar", "esperar", "buscar", "entrar", "trabajar", "escribir", 
    "perder", "producir", "ocurrir", "entender", "pedir", "recibir", "recordar", "terminar", "permitir", 
    "aparecer", "conseguir", "comenzar", "servir", "sacar", "necesitar", "mantener", "resultar", 
    "leer", "caer", "cambiar", "presentar", "crear", "abrir", "considerar", "oír", "acabar", "convertir", 
    "ganar", "formar", "traer", "partir", "morir", "aceptar", "realizar", "suponer", "comprender", 
    "lograr", "explicar", "preguntar", "tocar", "reconocer", "estudiar", "alcanzar", "nacer", "dirigir", 
    "correr", "utilizar", "pagar", "ayudar", "gustar", "jugar", "escuchar", "cumplir", "ofrecer", 
    "descubrir", "levantar", "intentar", "usar", "decidir", "repetir", "aprender", "mostrar", "dirigir", 
    "cumplir", "obtener", "enseñar", "desarrollar", "explicar", "quitar", "describir", "superar",

    // Adverbios
    "aquí", "allí", "cerca", "lejos", "arriba", "abajo", "ahora", "después", "antes", "tarde", "temprano", 
    "bien", "mal", "mejor", "peor", "más", "menos", "muy", "poco", "mucho", "casi", "nunca", "siempre", 
    "también", "tampoco", "todavía", "ya", "quizás", "tal vez",

    // Adjetivos
    "bueno", "malo", "nuevo", "viejo", "grande", "pequeño", "alto", "bajo", "largo", "corto", "bonito", 
    "feo", "fácil", "difícil", "caro", "barato", "rápido", "lento", "caliente", "frío", "limpio", "sucio", 
    "fuerte", "débil", "rico", "pobre", "feliz", "triste", "amable", "grosero", "joven", "adulto", 
    "inteligente", "tonto", "trabajador", "perezoso", "valiente", "cobarde",

    // Sustantivos comunes
    "casa", "perro", "gato", "ciudad", "pueblo", "coche", "avión", "libro", "mesa", "silla", "ordenador", 
    "teléfono", "persona", "niño", "niña", "hombre", "mujer", "trabajo", "escuela", "universidad", "familia", 
    "amigo", "amor", "dinero", "tiempo", "agua", "comida", "ropa", "música", "película", "deporte", 
    "historia", "arte", "ciencia", "política", "economía", "naturaleza", "tecnología", "salud", "vida",

    // Pronombres
    "yo", "tú", "él", "ella", "nosotros", "nosotras", "vosotros", "vosotras", "ellos", "ellas", "me", 
    "te", "se", "nos", "os", "mí", "ti", "sí", "mi", "tu", "su", "nuestro", "vuestro", "mis", "tus", 
    "sus", "nuestros", "vuestros",

    // Conjunciones
    "y", "o", "pero", "aunque", "porque", "ya que", "si", "como", "cuando", "mientras", "tan pronto como", 
    "hasta que", "después de que", "antes de que", "para que", "sin que",

    // Preposiciones
    "a", "ante", "bajo", "con", "contra", "de", "desde", "durante", "en", "entre", "hacia", "hasta", "para", 
    "por", "según", "sin", "sobre", "tras",

    // Interjecciones
    "¡hola!", "¡adiós!", "¡gracias!", "¡por favor!", "¡lo siento!", "¡perdón!", "¡ay!", "¡uf!", "¡oh!", "¡eh!", 
    "¡vaya!", "¡caramba!", "¡dios mío!", "¡cuidado!", "¡genial!", "¡fantástico!", "¡excelente!", "¡increíble!", 
    "¡maravilloso!", "¡estupendo!", "¡bravo!", "¡bien hecho!", "¡felicidades!", "¡salud!", "¡buen provecho!", 
    "¡feliz cumpleaños!", "¡feliz año nuevo!", "¡feliz navidad!", "¡feliz pascua!"
];

// Nodo del BK-tree
class BKTreeNode {
    constructor(word) {
        this.word = word;
        this.children = {};
    }
}

// BK-tree
class BKTree {
    constructor() {
        this.root = null;
    }

    add(word) {
        if (this.root === null) {
            this.root = new BKTreeNode(word);
        } else {
            this._add(this.root, word);
        }
    }

    _add(node, word) {
        const distance = this._levenshteinDistance(node.word, word);
        if (node.children[distance] === undefined) {
            node.children[distance] = new BKTreeNode(word);
        } else {
            this._add(node.children[distance], word);
        }
    }

    search(word, maxDistance) {
        let result = [];
        if (this.root !== null) {
            this._search(this.root, word, maxDistance, result);
        }
        return result;
    }

    _search(node, word, maxDistance, result) {
        const distance = this._levenshteinDistance(node.word, word);
        if (distance <= maxDistance) {
            result.push(node.word);
        }

        const minDistance = Math.max(0, distance - maxDistance);
        const maxDistanceRange = distance + maxDistance;

        for (let i = minDistance; i <= maxDistanceRange; i++) {
            if (node.children[i] !== undefined) {
                this._search(node.children[i], word, maxDistance, result);
            }
        }
    }

    _levenshteinDistance(a, b) {
        const matrix = [];

        for (let i = 0; i <= b.length; i++) {
            matrix[i] = [i];
        }

        for (let j = 0; j <= a.length; j++) {
            matrix[0][j] = j;
        }

        for (let i = 1; i <= b.length; i++) {
            for (let j = 1; j <= a.length; j++) {
                if (b.charAt(i - 1) === a.charAt(j - 1)) {
                    matrix[i][j] = matrix[i - 1][j - 1];
                } else {
                    matrix[i][j] = Math.min(matrix[i - 1][j - 1] + 1, Math.min(matrix[i][j - 1] + 1, matrix[i - 1][j] + 1));
                }
            }
        }

        return matrix[b.length][a.length];
    }
}

// Crear el BK-tree y añadir las palabras del diccionario
const bkTree = new BKTree();
dictionary.forEach(word => bkTree.add(word));

// Función para revisar la ortografía
function checkSpelling() {
    const inputText = document.getElementById('inputText').value;
    const words = inputText.split(/\s+/);
    const output = document.getElementById('output');
    output.innerHTML = '';

    words.forEach(word => {
        if (!dictionary.includes(word)) {
            const suggestions = bkTree.search(word, 2);
            output.innerHTML += `<p>Palabra incorrecta: <b>${word}</b>. ¿Quisiste decir: <b>${suggestions.join(', ')}</b>?</p>`;
        }
    });

    if (output.innerHTML === '') {
        output.innerHTML = '<p style="color: green;">¡No se encontraron errores ortográficos!</p>';
    }

    // Animación de opacidad para la salida
    output.style.opacity = 0;
    setTimeout(() => {
        output.style.opacity = 1;
    }, 100);
}
