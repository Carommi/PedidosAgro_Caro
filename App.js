
import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  ScrollView,
  StatusBar,
  Pressable,
  Keyboard,
} from 'react-native';

export default function App() {
  const [cliente, setCliente] = useState('');
  const [producto, setProducto] = useState('');
  const [cantidad, setCantidad] = useState('');
  const [precio, setPrecio] = useState('');
  const [mensaje, setMensaje] = useState('');
  const [contador, setContador] = useState(0);
  const [tipoMensaje, setTipoMensaje] = useState('');
  const [pedido, setPedido] = useState(null);

  const formatoDinero = (valor) => {
    return Number(valor).toLocaleString('es-CO');
  };

  const mostrarError = (texto) => {
    setTipoMensaje('error');
    setMensaje(texto);
    setPedido(null);
  };

  const registrarPedido = () => {
    Keyboard.dismiss();

    const nombreCliente = cliente.trim();
    const nombreProducto = producto.trim();
    const numeroCantidad = Number(cantidad);
    const precioUnitario = Number(precio);

    if (nombreCliente === '') {
      mostrarError('Debe ingresar el nombre del cliente');
      return;
    }

    if (nombreProducto === '') {
      mostrarError('Debe ingresar un producto');
      return;
    }

    if (
      cantidad.trim() === '' ||
      !Number.isFinite(numeroCantidad) ||
      !Number.isInteger(numeroCantidad) ||
      numeroCantidad <= 0
    ) {
      mostrarError('Ingrese una cantidad válida');
      return;
    }

    if (
      precio.trim() === '' ||
      !Number.isFinite(precioUnitario) ||
      precioUnitario < 0
    ) {
      mostrarError('Ingrese un precio unitario válido');
      return;
    }

    const total = numeroCantidad * precioUnitario;

    setPedido({
      cliente: nombreCliente,
      producto: nombreProducto,
      cantidad: numeroCantidad,
      precio: precioUnitario,
      total: total,
    });

    setTipoMensaje('exito');
    setMensaje('Pedido registrado correctamente');

    setContador((anterior) => anterior + 1);
  };

  const limpiarFormulario = () => {
    setCliente('');
    setProducto('');
    setCantidad('');
    setPrecio('');
    setMensaje('');
    setTipoMensaje('');
    setPedido(null);
    Keyboard.dismiss();
  };

  return (
    <View style={estilos.contenedor}>
      <StatusBar
        backgroundColor="#344C3A"
        barStyle="light-content"
      />

      <ScrollView
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={estilos.contenido}
      >
        {/* ENCABEZADO */}
        <View style={estilos.encabezado}>
          <View style={estilos.encabezadoSuperior}>
            <Text style={estilos.etiqueta}>
              EMPRENDIMIENTO AGROPECUARIO
            </Text>
            <Text style={estilos.iconoEncabezado}>✿</Text>
          </View>

          <Text style={estilos.titulo}>AgroPedidos</Text>

          <Text style={estilos.subtitulo}>
            ¡Bienvenido! Estamos listos para recibir tus pedidos.
          </Text>

          <View style={estilos.lineaDecorativa} />

          <Text style={estilos.fraseEncabezado}>
            Cultivamos calidad, entregamos confianza.
          </Text>
        </View>

        {/* CONTADOR */}
        <View style={estilos.tarjetaContador}>
          <View style={estilos.infoContador}>
            <Text style={estilos.textoPequeno}>
              RESUMEN DE ACTIVIDAD
            </Text>

            <Text style={estilos.textoContador}>
              Pedidos registrados
            </Text>

            <Text style={estilos.detalleContador}>
              Pedidos válidos durante esta sesión
            </Text>
          </View>

          <View style={estilos.numeroContador}>
            <Text style={estilos.numero}>{contador}</Text>
          </View>
        </View>

        {/* FORMULARIO */}
        <View style={estilos.formulario}>
          <View style={estilos.encabezadoFormulario}>
            <View>
              <Text style={estilos.tituloFormulario}>
                Nuevo pedido
              </Text>

              <Text style={estilos.descripcion}>
                Ingresa la información para registrar la solicitud.
              </Text>
            </View>

            <View style={estilos.iconoFormulario}>
              <Text style={estilos.iconoFormularioTexto}>✎</Text>
            </View>
          </View>

          {/* CLIENTE */}
          <Text style={estilos.etiquetaCampo}>
            Nombre del cliente
          </Text>

          <TextInput
            style={estilos.campo}
            placeholder="Ej. María Rodríguez"
            placeholderTextColor="#A49F91"
            value={cliente}
            onChangeText={setCliente}
            autoCapitalize="words"
          />

          {/* PRODUCTO */}
          <Text style={estilos.etiquetaCampo}>
            Producto solicitado
          </Text>

          <TextInput
            style={estilos.campo}
            placeholder="Ej. Tomates"
            placeholderTextColor="#A49F91"
            value={producto}
            onChangeText={setProducto}
            autoCapitalize="sentences"
          />

          {/* CANTIDAD Y PRECIO */}
          <View style={estilos.fila}>
            <View style={estilos.columna}>
              <Text style={estilos.etiquetaCampo}>
                Cantidad
              </Text>

              <TextInput
                style={estilos.campo}
                placeholder="Ej. 5"
                placeholderTextColor="#A49F91"
                keyboardType="numeric"
                value={cantidad}
                onChangeText={setCantidad}
              />

              <Text style={estilos.ayudaCampo}>
                Número de unidades
              </Text>
            </View>

            <View style={estilos.columna}>
              <Text style={estilos.etiquetaCampo}>
                Precio unitario
              </Text>

              <TextInput
                style={estilos.campo}
                placeholder="Ej. 3000"
                placeholderTextColor="#A49F91"
                keyboardType="decimal-pad"
                value={precio}
                onChangeText={setPrecio}
              />

              <Text style={estilos.ayudaCampo}>
                Valor por unidad ($)
              </Text>
            </View>
          </View>

          {/* BOTÓN REGISTRAR */}
          <Pressable
            style={({ pressed }) => [
              estilos.botonRegistrar,
              pressed && estilos.botonPresionado,
            ]}
            onPress={registrarPedido}
          >
            <Text style={estilos.textoBoton}>
              Registrar pedido
            </Text>

            <Text style={estilos.flechaBoton}>→</Text>
          </Pressable>

          {/* BOTÓN LIMPIAR */}
          <Pressable
            style={({ pressed }) => [
              estilos.botonLimpiar,
              pressed && estilos.botonLimpiarPresionado,
            ]}
            onPress={limpiarFormulario}
          >
            <Text style={estilos.textoBotonLimpiar}>
              ↻  Limpiar formulario
            </Text>
          </Pressable>

          {/* MENSAJES DE VALIDACIÓN */}
          {mensaje !== '' && (
            <View
              style={[
                estilos.tarjetaMensaje,
                tipoMensaje === 'error'
                  ? estilos.mensajeError
                  : estilos.mensajeExito,
              ]}
            >
              <View style={estilos.filaMensaje}>
                <Text style={estilos.iconoMensaje}>
                  {tipoMensaje === 'error' ? '!' : '✓'}
                </Text>

                <View style={estilos.contenidoMensaje}>
                  <Text style={estilos.tituloMensaje}>
                    {tipoMensaje === 'error'
                      ? 'Verifica la información'
                      : 'Pedido registrado correctamente'}
                  </Text>

                  {tipoMensaje === 'error' && (
                    <Text style={estilos.textoMensaje}>
                      {mensaje}
                    </Text>
                  )}
                </View>
              </View>

              {/* RESUMEN DEL PEDIDO */}
              {tipoMensaje === 'exito' && pedido !== null && (
                <View style={estilos.resumenPedido}>
                  <Text style={estilos.subtituloResumen}>
                    RESUMEN DEL PEDIDO
                  </Text>

                  <View style={estilos.filaResumen}>
                    <Text style={estilos.etiquetaResumen}>
                      Cliente
                    </Text>
                    <Text style={estilos.valorResumen}>
                      {pedido.cliente}
                    </Text>
                  </View>

                  <View style={estilos.filaResumen}>
                    <Text style={estilos.etiquetaResumen}>
                      Producto
                    </Text>
                    <Text style={estilos.valorResumen}>
                      {pedido.producto}
                    </Text>
                  </View>

                  <View style={estilos.filaResumen}>
                    <Text style={estilos.etiquetaResumen}>
                      Cantidad
                    </Text>
                    <Text style={estilos.valorResumen}>
                      {pedido.cantidad} unidades
                    </Text>
                  </View>

                  <View style={estilos.filaResumen}>
                    <Text style={estilos.etiquetaResumen}>
                      Precio unitario
                    </Text>
                    <Text style={estilos.valorResumen}>
                      ${formatoDinero(pedido.precio)}
                    </Text>
                  </View>

                  <View style={estilos.separadorResumen} />

                  <View style={estilos.filaTotal}>
                    <Text style={estilos.etiquetaTotal}>
                      TOTAL DEL PEDIDO
                    </Text>

                    <Text style={estilos.valorTotal}>
                      ${formatoDinero(pedido.total)}
                    </Text>
                  </View>
                </View>
              )}
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

          <View style={estilos.detallePie}>
            <Text style={estilos.iconoPie}>✿</Text>
            <Text style={estilos.textoDetallePie}>
              Calidad y confianza en cada pedido
            </Text>
            <Text style={estilos.iconoPie}>✿</Text>
          </View>
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

  contenido: {
    paddingBottom: 15,
  },

  encabezado: {
    backgroundColor: '#344C3A',
    paddingTop: 48,
    paddingBottom: 52,
    paddingHorizontal: 25,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },

  encabezadoSuperior: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  etiqueta: {
    color: '#D8DCCB',
    fontSize: 10,
    letterSpacing: 2,
    fontWeight: 'bold',
  },

  iconoEncabezado: {
    color: '#C6D0AD',
    fontSize: 27,
  },

  titulo: {
    color: '#FFFDF5',
    fontSize: 38,
    fontWeight: 'bold',
    marginTop: 15,
    letterSpacing: 0.5,
  },

  subtitulo: {
    color: '#E1E6D9',
    fontSize: 13,
    marginTop: 9,
    lineHeight: 20,
  },

  lineaDecorativa: {
    width: 48,
    height: 3,
    backgroundColor: '#C6D0AD',
    marginTop: 20,
    borderRadius: 5,
  },

  fraseEncabezado: {
    color: '#D8DCCB',
    fontSize: 11,
    marginTop: 10,
    fontStyle: 'italic',
  },

  tarjetaContador: {
    backgroundColor: '#FFFFFF',
    marginHorizontal: 20,
    marginTop: -25,
    padding: 19,
    borderRadius: 17,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    elevation: 3,
    shadowColor: '#344C3A',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 5,
  },

  infoContador: {
    flex: 1,
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

  detalleContador: {
    color: '#929083',
    fontSize: 10,
    marginTop: 5,
  },

  numeroContador: {
    backgroundColor: '#E9EFE3',
    width: 57,
    height: 57,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 10,
  },

  numero: {
    color: '#344C3A',
    fontSize: 25,
    fontWeight: 'bold',
  },

  formulario: {
    backgroundColor: '#FFFFFF',
    marginHorizontal: 20,
    marginTop: 23,
    padding: 22,
    borderRadius: 20,
    elevation: 2,
    shadowColor: '#344C3A',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 5,
  },

  encabezadoFormulario: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
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
    lineHeight: 18,
  },

  iconoFormulario: {
    width: 43,
    height: 43,
    backgroundColor: '#F1F3EA',
    borderRadius: 13,
    justifyContent: 'center',
    alignItems: 'center',
  },

  iconoFormularioTexto: {
    color: '#526C4F',
    fontSize: 24,
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
    paddingHorizontal: 13,
    paddingVertical: 13,
    fontSize: 14,
    color: '#344C3A',
  },

  ayudaCampo: {
    color: '#999687',
    fontSize: 10,
    marginTop: 6,
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
    paddingHorizontal: 16,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    marginTop: 27,
  },

  botonPresionado: {
    backgroundColor: '#344C3A',
    opacity: 0.9,
  },

  textoBoton: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: 'bold',
  },

  flechaBoton: {
    color: '#FFFFFF',
    fontSize: 19,
    marginLeft: 9,
  },

  botonLimpiar: {
    backgroundColor: '#F1F3EA',
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 11,
    borderWidth: 1,
    borderColor: '#E0E6D8',
  },

  botonLimpiarPresionado: {
    backgroundColor: '#E4EADB',
  },

  textoBotonLimpiar: {
    color: '#526C4F',
    fontSize: 13,
    fontWeight: 'bold',
  },

  tarjetaMensaje: {
    marginTop: 21,
    padding: 16,
    borderRadius: 13,
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

  filaMensaje: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  iconoMensaje: {
    width: 29,
    height: 29,
    borderRadius: 15,
    backgroundColor: '#FFFFFF',
    textAlign: 'center',
    textAlignVertical: 'center',
    fontSize: 18,
    fontWeight: 'bold',
    color: '#526C4F',
    overflow: 'hidden',
    marginRight: 11,
  },

  contenidoMensaje: {
    flex: 1,
  },

  tituloMensaje: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#344C3A',
  },

  textoMensaje: {
    fontSize: 12,
    color: '#76564C',
    lineHeight: 19,
    marginTop: 5,
  },

  resumenPedido: {
    marginTop: 17,
    paddingTop: 15,
    borderTopWidth: 1,
    borderTopColor: '#D6E1CF',
  },

  subtituloResumen: {
    color: '#75866B',
    fontSize: 10,
    fontWeight: 'bold',
    letterSpacing: 1.2,
    marginBottom: 12,
  },

  filaResumen: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 11,
  },

  etiquetaResumen: {
    color: '#7C8275',
    fontSize: 12,
    flex: 1,
  },

  valorResumen: {
    color: '#344C3A',
    fontSize: 12,
    fontWeight: 'bold',
    flex: 1,
    textAlign: 'right',
  },

  separadorResumen: {
    height: 1,
    backgroundColor: '#D6E1CF',
    marginVertical: 7,
  },

  filaTotal: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  etiquetaTotal: {
    color: '#344C3A',
    fontSize: 11,
    fontWeight: 'bold',
    flex: 1,
  },

  valorTotal: {
    color: '#526C4F',
    fontSize: 19,
    fontWeight: 'bold',
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

  detallePie: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 12,
  },

  iconoPie: {
    color: '#75866B',
    fontSize: 12,
    marginHorizontal: 7,
  },

  textoDetallePie: {
    color: '#929083',
    fontSize: 10,
  },
});
