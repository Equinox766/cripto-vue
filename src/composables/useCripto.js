import { computed, onMounted, ref } from "vue"

export default function useCripto() {
    const criptos = ref([])
    const monedas = ref([
        { codigo: 'USD', texto: 'Dolar de Estados Unidos'},
        { codigo: 'MXN', texto: 'Peso Mexicano'},
        { codigo: 'EUR', texto: 'Euro'},
        { codigo: 'GBP', texto: 'Libra Esterlina'},
    ])
    const cotizacion = ref({})
    const spiner = ref(false)

    onMounted(() => {
        fetch('https://min-api.cryptocompare.com/data/top/totalvolfull?limit=20&tsym=USD')
          .then(res => res.json())
          .then(({Data}) => criptos.value = Data)
    })

    const obtenerCotizacion = async (cotizar) => {
        spiner.value = true
        cotizacion.value = {}
        try {
          const { moneda, cripto } = cotizar
          const url = `https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${cripto}&tsyms=${moneda}`;
          const res = await fetch(url)
          const data = await res.json() 
          cotizacion.value = data.DISPLAY[cripto][moneda];
        } catch (error) {
          console.log(error);
        } finally {
          spiner.value = false
        }
    }

    
    const mostrarResultado = computed(() => {
        return Object.keys(cotizacion.value).length > 0
    })

    return {
        monedas,
        criptos,
        obtenerCotizacion,
        cotizacion,
        spiner,
        mostrarResultado,
    }
}