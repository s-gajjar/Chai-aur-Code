//Immediately Invoked Function Expression (IIFE)

(function chai(){
    console.log(`DB connected`);
})();

//upar wale ko pata nahi chalega ki rokna kab hai to ham ; lagainge

((name) =>{
    console.log(`DB connected ${name}`);
})('shreyansh')