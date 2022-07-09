var timeout;

function startTransition(callback, delay){
    clearTimeout(timeout);
    timeout = setTimeout(() => {callback()}, delay);
}

// startTransition(() => {
//     console.log(`Hello World ${i}`)
// }, 1000)

export default startTransition;