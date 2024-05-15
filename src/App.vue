<script setup>
  import { ref, onMounted, reactive, computed } from 'vue';
  import Alert from './components/Alert.vue'
  import Spiner from './components/Spiner.vue'
  import Cotizacion from './components/Cotizacion.vue';
  import useCripto from './composables/useCripto'

  const { monedas, criptos, obtenerCotizacion, cotizacion, spiner, mostrarResultado } = useCripto()

  const error = ref('')

  const cotizar = reactive({
    moneda: '',
    cripto: ''
  })

  const cotizarCripto = () => {
    if(Object.values(cotizar).includes('')) {
      error.value = 'Todos los campos son obligatorios.';
      setTimeout(() => {
        error.value = ''
      }, 3000);
    }

    obtenerCotizacion(cotizar)
  }
</script>

<template>
  <div class="contenedor">
    <h1 class="titulo">Cotizador de <span>Criptomonedas</span></h1>
    <div class="contenido">
      <Alert 
        v-if="error"
      >
        {{ error }}
      </Alert>
      <form 
        class="formulario"
        @submit.prevent="cotizarCripto"
      >
        <div class="campo">
          <label for="moneda" class="mondeda">Moneda:</label>
          <select 
            id="moneda" 
            v-model="cotizar.moneda" 
          >
            <option value="">--selecciona--</option>
            <option 
            v-for="moneda in monedas"
            :value="moneda.codigo"
            >
            {{ moneda.texto }}
          </option>
        </select>
        <label for="cripto" class="cripto">Cripto:</label>
        <select 
          id="cripto" 
          v-model="cotizar.cripto" 
        >
          <option value="">--selecciona--</option>
            <option 
              v-for="cripto in criptos"
              :value="cripto.CoinInfo.Name" 
            >
              {{ cripto.CoinInfo.FullName }}
            </option>
          </select>
        </div>

        <input type="submit" value="Cotizar"/>
      </form>

      <Spiner v-if="spiner"/>
      <Cotizacion 
        v-if="mostrarResultado"
        :cotizacion="cotizacion"
      />

    </div>
  </div>
</template>

<style scoped>
</style>
