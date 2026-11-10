
import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  ScrollView,
  StatusBar,
  Pressable
} from 'react-native';

export default function App() {
  const [cliente, setCliente] = useState('');
  const [producto, setProducto] = useState('');
  const [cantidad, setCantidad] = useState('');
  const [precio, setPrecio] = useState('');
  const [mensaje, setMensaje] = useState('');
  const [contador, setContador] = useState(0);
  const [tipoMensaje, setTipoMensaje] = useState('');

  const formatoDinero = (valor) => {
    return Number(valor).toLocaleString('es-CO');
  };

  const registrarPedido = () => {
    const nombreCliente = cliente.trim();
    const nombreProducto = producto.trim();
    const numeroCantidad = Number(cantidad);
    const precioUnitario = Number(precio);

    if (nombreCliente === '') {
      setTipoMensaje('error');
      setMensaje('Por favor, ingresa el nombre del cliente.');
      return;
    }

    if (nombreProducto === '') {
      setTipoMensaje('error');
      setMensaje('Por favor, ingresa el producto solicitado.');
      return;
    }

    if (
      cantidad.trim() === '' ||
      !Number.isInteger(numeroCantidad) ||
      numeroCantidad <= 0
    ) {
      setTipoMensaje('error');
      setMensaje('La cantidad debe ser un número entero mayor que cero.');
      return;
    }

    if (
      precio.trim() === '' ||
      !Number.isFinite(precioUnitario) ||
      precioUnitario < 0
    ) {
      setTipoMensaje('error');
      setMensaje('Ingresa un precio válido, igual o mayor que cero.');
      return;
    }

    const total = numeroCantidad * precioUnitario;

    setTipoMensaje('exito');
    setMensaje(
      '¡Pedido registrado correctamente!\n\n' +
      'Cliente: ' + nombreCliente + '\n' +
      'Producto: ' + nombreProducto + '\n' +
      'Cantidad: ' + numeroCantidad + '\n' +
      'Total: $' + formatoDinero(total)
    );

    setContador(contador + 1);
  };

  const limpiarFormulario = () => {
    setCliente('');
    setProducto('');
    setCantidad('');
    setPrecio('');
    setMensaje('');
    setTipoMensaje('');
  };

  return (
    <View style={estilos.contenedor}>
      <StatusBar backgroundColor="#344C3A" barStyle="light-content" />

      <ScrollView
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        {/* ENCABEZADO */}
        <View style={estilos.encabezado}>
          <Text style={estilos.etiqueta}>EMPRENDIMIENTO AGROPECUARIO</Text>
          <Text style={estilos.titulo}>AgroPedidos</Text>
          <Text style={estilos.subtitulo}>
            Cultivamos calidad, entregamos confianza.
          </Text>

          <View style={estilos.decoracion}>
            <Text style={estilos.iconoHoja}>✿</Text>
          </View>
        </View>

        {/* CONTADOR */}
        <View style={estilos.tarjetaContador}>
          <View>
            <Text style={estilos.textoPequeno}>RESUMEN DE ACTIVIDAD</Text>
            <Text style={estilos.textoContador}>Pedidos registrados</Text>
          </View>

          <View style={estilos.numeroContador}>
            <Text style={estilos.numero}>{contador}</Text>
          </View>
        </View>

        {/* FORMULARIO */}
        <View style={estilos.formulario}>
          <Text style={estilos.tituloFormulario}>
            Nuevo pedido
          </Text>

          <Text style={estilos.descripcion}>
            Completa los datos para registrar una nueva solicitud.
          </Text>

          <Text style={estilos.etiquetaCampo}>Nombre del cliente</Text>
          <TextInput
            style={estilos.campo}
            placeholder="Ej. María Rodríguez"
            placeholderTextColor="#A49F91"
            value={cliente}
            onChangeText={setCliente}
          />

          <Text style={estilos.etiquetaCampo}>Producto solicitado</Text>
          <TextInput
            style={estilos.campo}
            placeholder="Ej. Tomates"
            placeholderTextColor="#A49F91"
            value={producto}
            onChangeText={setProducto}
          />

          <View style={estilos.fila}>
            <View style={estilos.columna}>
              <Text style={estilos.etiquetaCampo}>Cantidad</Text>
              <TextInput
                style={estilos.campo}
                placeholder="Ej. 5"
                placeholderTextColor="#A49F91"
                keyboardType="numeric"
                value={cantidad}
                onChangeText={setCantidad}
              />
            </View>

            <View style={estilos.columna}>
              <Text style={estilos.etiquetaCampo}>Precio unitario</Text>
              <TextInput
                style={estilos.campo}
                placeholder="Ej. 3000"
                placeholderTextColor="#A49F91"
                keyboardType="decimal-pad"
                value={precio}
                onChangeText={setPrecio}
              />
            </View>
          </View>

          {/* BOTONES */}
          <Pressable
            style={estilos.botonRegistrar}
            onPress={registrarPedido}
          >
            <Text style={estilos.textoBoton}>
              Registrar pedido  →
            </Text>
          </Pressable>

          <View style={estilos.botonLimpiar}>
            <Button
              title="Limpiar formulario"
              color="#75866B"
              onPress={limpiarFormulario}
            />
          </View>

          {/* MENSAJES */}
          {mensaje !== '' && (
            <View
              style={[
                estilos.tarjetaMensaje,
                tipoMensaje === 'error'
                  ? estilos.mensajeError
                  : estilos.mensajeExito
              ]}
            >
              <Text style={estilos.tituloMensaje}>
                {tipoMensaje === 'error'
                  ? 'Atención'
                  : 'Pedido confirmado'}
              </Text>

              <Text style={estilos.textoMensaje}>
                {mensaje}
              </Text>
            </View>
          )}
        </View>

        {/* PIE DE PÁGINA */}
        <View style={estilos.pie}>
          <Text style={estilos.textoPie}>
            AGROPEDIDOS
          </Text>
          <Text style={estilos.frasePie}>
            Del campo a tus manos.
          </Text>
        </View>
      </ScrollView>
    </View>
  );
}

const estilos = StyleSheet.create({
  contenedor: {
    flex: 1,
    backgroundColor: '#F5F2E9',
  },

  encabezado: {
    backgroundColor: '#344C3A',
    paddingTop: 55,
    paddingBottom: 48,
    paddingHorizontal: 25,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },

  etiqueta: {
    color: '#D8DCCB',
    fontSize: 10,
    letterSpacing: 2,
    fontWeight: 'bold',
  },

  titulo: {
    color: '#FFFDF5',
    fontSize: 38,
    fontWeight: 'bold',
    marginTop: 12,
  },

  subtitulo: {
    color: '#E1E6D9',
    fontSize: 13,
    marginTop: 8,
  },

  decoracion: {
    position: 'absolute',
    right: 28,
    bottom: 20,
  },

  iconoHoja: {
    color: '#C6D0AD',
    fontSize: 55,
  },

  tarjetaContador: {
    backgroundColor: '#FFFFFF',
    marginHorizontal: 20,
    marginTop: -24,
    padding: 20,
    borderRadius: 17,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    elevation: 3,
  },

  textoPequeno: {
    color: '#8B927F',
    fontSize: 10,
    fontWeight: 'bold',
    letterSpacing: 1,
  },

  textoContador: {
    color: '#344C3A',
    fontSize: 15,
    fontWeight: 'bold',
    marginTop: 6,
  },

  numeroContador: {
    backgroundColor: '#E9EFE3',
    width: 53,
    height: 53,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },

  numero: {
    color: '#344C3A',
    fontSize: 24,
    fontWeight: 'bold',
  },

  formulario: {
    backgroundColor: '#FFFFFF',
    marginHorizontal: 20,
    marginTop: 22,
    padding: 22,
    borderRadius: 20,
    elevation: 2,
  },

  tituloFormulario: {
    color: '#344C3A',
    fontSize: 23,
    fontWeight: 'bold',
  },

  descripcion: {
    color: '#929083',
    fontSize: 12,
    marginTop: 7,
    marginBottom: 22,
    lineHeight: 19,
  },

  etiquetaCampo: {
    color: '#465746',
    fontSize: 13,
    fontWeight: 'bold',
    marginBottom: 8,
    marginTop: 13,
  },

  campo: {
    backgroundColor: '#F7F7F1',
    borderWidth: 1,
    borderColor: '#E4E6DB',
    borderRadius: 11,
    paddingHorizontal: 14,
    paddingVertical: 13,
    fontSize: 14,
    color: '#344C3A',
  },

  fila: {
    flexDirection: 'row',
    gap: 12,
  },

  columna: {
    flex: 1,
  },

  botonRegistrar: {
    backgroundColor: '#526C4F',
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 27,
  },

  textoBoton: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: 'bold',
  },

  botonLimpiar: {
    marginTop: 10,
    borderRadius: 10,
    overflow: 'hidden',
  },

  tarjetaMensaje: {
    marginTop: 20,
    padding: 17,
    borderRadius: 12,
    borderWidth: 1,
  },

  mensajeError: {
    backgroundColor: '#FFF0EB',
    borderColor: '#E9B9A9',
  },

  mensajeExito: {
    backgroundColor: '#EDF4E8',
    borderColor: '#C8D8BD',
  },

  tituloMensaje: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#344C3A',
    marginBottom: 9,
  },

  textoMensaje: {
    fontSize: 13,
    color: '#465746',
    lineHeight: 23,
  },

  pie: {
    alignItems: 'center',
    paddingVertical: 30,
  },

  textoPie: {
    color: '#526C4F',
    fontSize: 12,
    fontWeight: 'bold',
    letterSpacing: 3,
  },

  frasePie: {
    color: '#999687',
    fontSize: 11,
    marginTop: 6,
  },
});
