//Ejercicio integrador:
// En una estación meteorológica se desea procesar la información correspondiente a las
// mediciones efectuadas durante un mes, con los datos de Temperatura y Humedad medias de cada uno
// de los N días del mes. Para lo cual se deberá realizar un algoritmo que cumpla con las siguientes
// tareas:
// a) Se deberán leer los datos de temperatura y humedad relativa media, correspondientes a cada uno
// de los días del mes. El algoritmo deberá requerir la
// cantidad de días del mes que se desea procesar.
// b) Calcular y mostrar los promedios de Temperatura del mes.
// c) Calcular y mostrar el porcentaje de días para los primeros diez días del mes en que la temperatura
// sea mayor que el promedio calculado en b) y que la humedad relativa sea superior a 50.
// d) Determinar cual fue el día más caluroso del mes, teniendo en cuenta que si se tienen dos días con
// igual temperatura, se considera más caluroso el que tenga mayor humedad.
// e) Asumiendo que el primer día del mes, corresponde a un Lunes, calcular y mostrar el promedio de las
// temperaturas para cada uno de los fines de semana (Sábado y Domingo) del mes
//f) app debe contar con login

//0.1 crear login de la app
//0.1.a) crear arr de uduarios y contraseñas / api

// --- oculatar tarjeta de login y mostrar tarjeta de lectura N --
//0.2 crear card lectura de datos N

//1.leer cantida de dias a ingresar lecturas (segun mer)
//1.a. input para seleccionar  mes y que asigne a N 28/30/31 respectivamente

// --- oculatar tarjeta de lectura N mostrar tarjeta de lectura Registros  --
//0.2 crear card lectura de Registros
// 0.2.a) 2 inpunt y submti

//1.2 ingresar lecturas diarias para Temperatura y humedad
//1.2.a ) relidar 2 input que al enviar info la guarde en 2 array diferentes ( Temp / Hume)

//2.1 calcular promedio de temperaturas mensual
// 2.1.a)  en for  sumar todos los elementos del arr temperatura / N  (PromTemp)
//2.2 mostrar promedio temperaturas mensual
// 2.2.a) enviar info a card Mostrar datos

//3.1 calcular porcentage de dias (en los primeros 10 dias ) con temeperatura mayor al promedio mensual + humedad superior a 50
//3.1.a) contar lecturas de arr Temp hasta 10 donde sean > a PromTemp y Hume[i] sea > 50
//3.1.b) la cantdad de coincidencias  / 10 *100
//3.1.c) enviar datos a Card Mostrar datos

//3.2 calcular dia con mavor temperatura ( en caso de igualdad el de mayor humedad )
//3.2 a) buscar Max  de Temmp en caso de ser mas de un registro comparar valor de Hume
//3.2.b) enviar datos a Card Mostrar datos

//3.3 calcular promedio de temperaturas de los fines de semana
//3.3.a) somar con for los registros  desde 5° avanzando cada 7 registros
//3.3.b) somar con for los registros  desde 6° avanzando cada 7 registros
//3.3.c) calcular a+b /8
//3.3.d)enviar datos a Card Mostrar datos

// --- oculatar tarjeta de lectura Registros y mostrar tarjeta de Mostrar Datos --
//0.3 crear card Mostrar Datos
//0.3.a) tabla con resultados
//0.3.b) resultados a mostrar :
//* Mes cargado / cantidad de lecturas
//*Promedio Temp mensual
//*porcentaje primeros diez dias calurosos
//*Dia de mayor temperatura + valor
//*promedio temperatura fines de semana



//0.1.a)*//arr de obj con Usuario y clave para validacion de Login
const usersData = [
  { user: "user1", password: "user1" },
  { user: "user2", password: "user2" },
  { user: "user3", password: "user3" },
  { user: "user4", password: "user4" },
];
// funciones para mostrar y ocultar tarjetas tomando como parametro el id de CARD
const mostrarCard = (idCard) => {
  try {
    const card = document.querySelector(`#${idCard}`);
    card.classList.remove("d-none");
    // elimina display none de las Class de la card
  } catch (error) {
    console.log("error mostrando card: " + idCard);
    console.error(error);
  }
};
const ocultarCard = (idCard) => {
  try {
    const card = document.querySelector(`#${idCard}`);
    card.classList = "card d-none";
    // inserta display none de las Class de la card
  } catch (error) {
    console.log("error ocultando card: " + idCard);
  }
};
//0.1 *// funcion de validacion de login ,toma datos de "formLogin" [[ funcionando / maneja masl el error ]]!!!
const Login = (usersData) => {
  return new Promise( (resolve, reaject) => {
    try {
      const formElement = document.querySelector("form");
      formElement.addEventListener("submit", (evento) => {
        evento.preventDefault();
        const user = document.querySelector("#User");
        const password = document.querySelector("#Password");
        console.log(password.value);
        console.log(user.value);
        const errorLog = () => {
          const message = document.querySelector("#alert");
          console.log("error de entrada ");
          message.innerHTML = "Usuario o Contraseña incorrectos";
          setTimeout(() => {
            message.innerHTML = " ";
          }, 2000);
        };

        usersData.forEach((dato) => {
          user.value == dato.user && password.value == dato.password
            ? resolve(user.value)
            : errorLog();
        });
      });
    } catch (error) {
      reaject;
    }
  });
};
// funcion seleccionadora de mes devuelve el Mes y cantidad de dias para lectura, toma datos de "cardMes"
const selectMes = () => {
  mostrarCard("cardMes");
  return new Promise(async (resolve, reject) => {
    try {
      const SelectButton = document.querySelector("#selectButton");
      SelectButton.addEventListener("click", async (e) => {
        e.preventDefault();
        const seleccion = {
          Mes: document.querySelector("#selectMes option:checked").text,
          Dias: parseInt(
            document.querySelector("#selectMes option:checked").value
          ),
          Orden: parseInt(
            document.querySelector("#selectMes option:checked").id
          ),
        };
        resolve(seleccion);
        console.log(typeof resolve);
        console.log(seleccion);
      });
    } catch (error) {
      reject(error);
    }
  });
};
// funcion Carga de datos toma datos de "cardLectura",parametro cantidad de dias , devuelve Json con temp y hume [[FUNCIONANDO]]
const cargaDatos = async (Dias) => {
  let cont = 0;
  const formLectura = document.querySelector("#formLectura");
  const temperatura = document.querySelector("#EntryTemp");
  const message1 = document.querySelector("#alert1");
  // const message2 = document.querySelector("#alert2");
  const humedad = document.querySelector("#EntryHume");
  const errorTemp = "introduce un valor de Temp. entre -50 y 50";
  const errorHume = "introduce  un valor de Hum. entre 0 y 100";
  temperatura.placeholder = "Temperatura dia: " + (cont + 1);
  humedad.placeholder = "Humedad dia: " + (cont + 1);
  return new Promise(async (resolve, reject) => {
    const lecturas = {
      temperatura: [],
      humedad: [],
    };
    const errorLoad = (error) => {
      // console.log("error de entrada ");
      message1.innerHTML = error;
      setTimeout(() => {
        message1.innerHTML = " ";
      }, 2000);
    };
    try {
      formLectura.addEventListener("submit", (e) => {
        e.preventDefault();

        if (
          !isNaN(parseFloat(temperatura.value)) &&
          parseFloat(temperatura.value) <= 50 &&
          parseFloat(temperatura.value) >= -50
        ) {
          if (
            !isNaN(parseFloat(humedad.value)) &&
            parseFloat(humedad.value) <= 100 && parseFloat(humedad.value) >= 0
          ) {
            lecturas.humedad.push(parseFloat(humedad.value));
            lecturas.temperatura.push(parseFloat(temperatura.value));
            cont++;
            console.log(cont);

            temperatura.value = " ";
            humedad.value = " ";
          } else {
            errorLoad(errorHume);
          }
        } else {
          errorLoad(errorTemp);
        }       

        if (cont < Dias) {
          temperatura.placeholder = "Temperatura dia: " + (cont + 1);
          humedad.placeholder = "Humedad dia: " + (cont + 1);
        } else {
          ocultarCard("cardLectura");
          // mostrarCard("cardResultados");
          resolve(lecturas);
        }
      });
    } catch (error) {
      reject(error);
    }
  });
};
//fuencion de sumatoria de temperaturas en array [[funcionando]]
const SumarTemp = (Temp) => {
  let SUM = 0;
  for (let i = 0; i < Temp.length; i++) {
    SUM += Temp[i];
  }
  console.log("sumarTemp: " + SUM + " esta ok ");
  return SUM;
};
// compara los primero 10 reg de los array Temp y HUme con el promedio de temeperatura y devuelve porcentaje [[FUNCIONANDO]]
const RachaCalor = async (Temp, Hume, PromTemp) => {
  let cont = 0;
  for (let i = 0; i < 10; i++) {
    Temp[i] > PromTemp && Hume[i] >= 50 && cont++;
  }
  return ((cont / 10) * 100).toFixed();
};
// compara todos los registros del array Temp y Hume , envia la posicion del mas alto [[OK]]
const MaxTemp = async (Temp, Hume) => {
  let MaxTemp = 0;
  let MaxHume = 0;
  let Dia = 0;
  for (let i = 0; i < Temp.length; i++) {
    if (MaxTemp < Temp[i]) {
      MaxTemp = Temp[i];
      MaxHume = Hume[i];
      Dia = i;
    }
    if (MaxTemp == Temp[i] && MaxHume < Hume[i]) {
      MaxHume = Hume[i];
      Dia = i;
    }
  }
  console.log("temperatura maxima: " + MaxTemp);

  return Dia;
};
// sumatoria de Temperaturas solo para los registro 5,6 y sus consecuentres c/7  [[OK]]
const TempFin = async (Temp) => {
  let sumaFin = 0;
  for (let i = 5; i < Temp.lenght; i + 7) {
    sumaFin += Temp[i];
  }
  for (let i = 6; i < Temp.lenght; i + 7) {
    sumaFin += Temp[i];
  }
  return sumaFin;
};
//funcion envia datos a DOM , "cardResultados", toma como parametros id de H6 y dato a asentar 
const EnviarDato = (idDato, dato) => {
  try {
    const Datos = document.querySelector(`#${idDato}`);
    Datos.innerHTML = Datos.innerHTML + dato;
  } catch (error) {
    console.log("error cargando dato: " + idCard);
    console.error(error);
  }
};
// app principal
const App = async () => {
  let Temp = [];
  let Hume = [];
  let Usuario = await Login(usersData);
  alert("Bienvenido " + Usuario);
  ocultarCard("cardLogin");
  console.log("previa carga");
  const seleccionarMes = await selectMes();

  const Dias = seleccionarMes.Dias;
  const Mes = seleccionarMes.Mes;
  const Orden = seleccionarMes.Orden;
  const Año = 2023;

  console.log("elegido mes:" + Mes);
  console.log("con " + Dias + " dias");
  ocultarCard("cardMes");
  const headLectura = document.querySelector("#Hmes");
  headLectura.innerHTML = "Ingreso de datos de:  <strong>" + Mes + "</strong>";
  mostrarCard("cardLectura");

  const lecturas = await cargaDatos(Dias);

  Temp = lecturas.temperatura;
  Hume = lecturas.humedad;
  const SumTemp = SumarTemp(Temp);
  console.log(lecturas);
  // tratamiento de datos
  //2.1 busca promedio de temperatura mensual [[FUNCIONANDO ]]
  const PromTemp = (SumTemp / Dias).toFixed(2);
  console.log("Temperatura pormedio: " + PromTemp);
  //3.1 busca racha de calor en los primeros 10 dias [[FUNCIONANDO ]]
  let DiasCalor = await RachaCalor(Temp, Hume, PromTemp);
  DiasCalor=`${DiasCalor} %`
  console.log("racha calor: " + DiasCalor + "% ");
  //3.2 busca dia de mayor temperatura
  let Diacaluroso = (await MaxTemp(Temp, Hume))+1;
  Diacaluroso= `${Diacaluroso}/${Orden}/${Año}`;
  console.log(`el dias mas caluroso fuer el ${Diacaluroso}`);
  //3.3 calcular promedio de temp solo fines de semana
  const PromTempFIN = (((await TempFin(Temp)) / 8).toFixed()+`%`);
  console.log("Temperatura pormedio fines de semana : " + PromTempFIN);

  mostrarCard("cardResultados");
  EnviarDato("Res_A", Mes);
  EnviarDato("Res_B", PromTemp);
  EnviarDato("Res_C", DiasCalor);
  EnviarDato("Res_D", Diacaluroso);
  EnviarDato("Res_E", PromTempFIN);
};

App();
/// ojo cambios async///



// CORTAR silvio//

// const temperaturas = [
//   22, 23, 24, 56, 56, 56, 32, 32, 43, 23, 12, 32, 23, 43, 23, 12, 21, 21, 12,
//   12, 21, 23, 21, 21, 21, 12, 21, 21,
// ];
// const humedad = [
//   20, 23, 23, 23, 21, 12, 43, 54, 56, 67, 67, 43, 43, 32, 32, 43, 34, 23, 23,
//   23, 23, 23, 23, 34, 34, 34, 34, 34,
// ];
// const temperaturaMaxima = Math.max(...temperaturas);
// const indexMayoresTemperaturas = [];
// const arrayHumedadesConMayorTemperatura = [];
// let diaMayorHumedadTemperatura = 0;
// let mayor = 0;
// temperaturas.map(
//   (temperatura, index) =>
//     temperatura == temperaturaMaxima && indexMayoresTemperaturas.push(index)
// );
// indexMayoresTemperaturas.forEach((indexMaxTemp, index) => {
//   arrayHumedadesConMayorTemperatura.push(humedad[indexMaxTemp]);
//   if (humedad[indexMaxTemp] > mayor) {
//     mayor = humedad[indexMaxTemp];
//     diaMayorHumedadTemperatura = indexMaxTemp;
//   }
// });
// const humedadMaxima = Math.max(...arrayHumedadesConMayorTemperatura);
// console.log(diaMayorHumedadTemperatura);
