// const p1 = new Promise((resolve, reject) => {
//     setTimeout(() => {
//         const randomNumber = Math.random();

//         if (randomNumber >= 0.5) {
//             resolve(randomNumber);
//         } else {
//             reject(randomNumber);
//         }
//     }, 3000);
// });

// p1
//     .then(res => console.log(`Promise terminada. ${res.toFixed(2)}`))
//     .catch(res => console.log(`Erro na promise! ${res.toFixed(2)}`))
//     .finally(() => console.log('Finally'));

// console.log('Continuacao...');

// const loop = () => {
//     let i = 0;
//     setInterval(() => console.log(++i), 1000);
// }

// const app = async () => {
//     try {
//         const res = await p1;
//         console.log(res);
//     } catch (err) {
//         console.log(`ERRO! ${err}`);
//     } finally {
//         console.log('Complete');
//     }

//     console.log('...');
// };

// app();
// loop();

const p1 = new Promise((resolve, reject) => setTimeout(() => resolve('P1'), 1000));
const p2 = new Promise((resolve, reject) => setTimeout(() => resolve('P2'), 500));
const p3 = 'Hello, world!';
const p4 = Promise.resolve('P4');

Promise.all([p1, p2, p3, p4]).then(res => console.log(res));
