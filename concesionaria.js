let autos = require('./autos.js');
let personas = require('./personas.js');

let concesionaria = {
    autos: autos,

    personas: personas,

    //Recibe por parámetro la patente y devuelve el auto al cual le corresponde.
    buscarAuto: function (patente) {
        for (let i = 0; i < this.autos.length; i++) {

            if (this.autos[i].patente == patente) {
                return this.autos[i];

            }else if ((i+1) == this.autos.length){
                return null;
            
            }
        }
    },

    //Recibe la patente y, en caso de encontrar al automóvil, le asigna el estado de vendido.
    venderAuto: function (patente) {
        this.buscarAuto(patente).vendido = true;
    },

    //Lista de autos para la venta.
    autosParaLaVenta: function (){
        return this.autos.filter (function(autosParaVender){
            return autosParaVender.vendido === false;
        })
    },

    //Lista de autos para la venta que son 0km (Autos nuevos).
    autosNuevos: function(){
        return this.autosParaLaVenta().filter (function(autos0km){
            return autos0km.km < 200;
        });
    },

    //Devuelve una lista que contiene el precio de venta de cada auto vendido.
    listaDeVentas: function(){
        let precioAutosVendidos = [];

        this.autosParaLaVenta().forEach (function(autosVendidos){
            precioAutosVendidos.push(autosVendidos.precio);
        });

        return precioAutosVendidos;
    },

    //Devuelve la sumatoria del valor de todas las ventas realizadas.
    totalDeVentas: function(){
        let initialValue = 0;
        return this.autosParaLaVenta().reduce (function (acumulador, ventas){
            return acumulador  + ventas.precio;
        }, initialValue);
    },

    //Verificar si una persona puede comprar o no un auto.
    puedeComprar: function (auto, persona){
        if (persona.capacidadDePagoTotal >= auto.precio && persona.capacidadDePagoEnCuotas >= (auto.precio / auto.cuotas)){
            return true;
        }else{
            return false;
        }
    },

    //Recibe una persona y devuelve la lista de autos que puede comprar.
    autosQuePuedeComprar: function (persona){

        let autosParaCliente = [];

        this.autosParaLaVenta().forEach (function (auto){
            if (concesionaria.puedeComprar (auto, persona)){
                autosParaCliente.push(auto);
            }
        })

        return autosParaCliente;
    }
};

//console.log(concesionaria.buscarAuto('JJK116'));
//concesionaria.venderAuto('JJK116');
//console.log(concesionaria.autosParaLaVenta());
//console.log(concesionaria.autosNuevos());
//console.log(concesionaria.listaDeVentas());
//console.log(concesionaria.totalDeVentas());
concesionaria.autosQuePuedeComprar(
    {
    nombre: "Juan",
    capacidadDePagoEnCuotas: 30000,
    capacidadDePagoTotal: 100000000
    }
);
//console.log(concesionaria.autos);