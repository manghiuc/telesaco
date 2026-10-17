// Datos locales verificados en fuentes oficiales (consulta: octubre de 2026).
// Solo se incluye lo leído en la fuente citada; lo no verificado se omite.
// via: trámite para ocupar la vía pública · punto: punto limpio · acceso: restricciones de acceso/horarios
// fuentes: [texto, url]

const LOCAL = {
  'pozuelo-de-alarcon': {
    faq: 'Sí, porque el saco se deja en la vía pública para poder recogerlo. En la calzada, ocupando una plaza de aparcamiento, basta una comunicación previa al Ayuntamiento con 3 días hábiles de antelación y pagar la tasa; sobre la acera, en una reserva de estacionamiento o donde no se puede aparcar hace falta autorización previa.',
    via: 'Si lo dejas en la <strong>calzada, ocupando una plaza de aparcamiento</strong>, basta una <strong>comunicación previa</strong> al Ayuntamiento de Pozuelo con 3 días hábiles de antelación y el pago de la tasa (según la sede electrónica, 30 € por 30 días para un saco). Sobre la <strong>acera</strong>, en una reserva de estacionamiento o donde no se puede aparcar, hace falta <strong>autorización previa</strong> con planos acotados.',
    punto: 'Pozuelo tiene dos puntos limpios: <strong>Vereda de los Zapateros</strong> (acceso desde la antigua carretera M-515, bajo la M-40) y <strong>calle Virgilio, 10</strong> (Ciudad de la Imagen). Abren todos los días de 9:00 a 20:00 y admiten escombros de tipo doméstico con un tope de <strong>100 kg o 5 sacos de 50 litros</strong> por entrega. Un saco de 1 m³ supera con mucho ese límite.',
    acceso: [
      'Aunque la obra menor (cambio de acabados, solados, alicatados, pinturas…) no necesite licencia, sigue haciendo falta autorización para retirar los residuos y ocupar la vía pública (ordenanza de licencias, BOCM 5-7-2024).',
      'Si la obra genera residuos de construcción, el Ayuntamiento exige constituir una garantía de su correcta gestión antes de empezar.',
    ],
    barrios: ['Casco y Avenida de Europa', 'Zona Estación', 'Prado de Somosaguas', 'Colonia de los Ángeles', 'Húmera', 'Ciudad de la Imagen', 'Montealina', 'Monteclaro', 'Somosaguas', 'La Cabaña', 'Bularas', 'Vista Alegre', 'Prado Largo'],
    poligonos: ['Ática', 'Avenida de Europa', 'Ciudad de la Imagen', 'Cerro de los Gamos', 'La Finca'],
    fuentes: [
      ['Sede electrónica: contenedor o saco en estacionamiento', 'https://sede.pozuelodealarcon.es/sede/action/tramitesinfo?id=446'],
      ['BOCM 10-2-2023: ordenanza de obras en la vía pública', 'https://www.bocm.es/boletin/CM_Orden_BOCM/2023/02/10/BOCM-20230210-76.PDF'],
      ['Puntos limpios de Pozuelo', 'https://www.pozuelodealarcon.org/medio-ambiente-y-limpieza/limpieza-viaria-y-recogida-de-residuos/puntos-limpios'],
    ],
  },

  'rivas-vaciamadrid': {
    faq: 'Sí, porque el saco se deja en la vía pública para poder recogerlo. En la vía pública hace falta autorización del Ayuntamiento, que se pide con 7 días de antelación y con el pago previo de la tasa (sede electrónica o cita previa).',
    via: 'En Rivas colocar un contenedor o saco en la calle requiere <strong>autorización</strong>, no solo comunicación. Se solicita con <strong>7 días de antelación</strong> en la sede electrónica (o con cita previa en Atención a la Ciudadanía, 91 670 00 00) y hay que aportar el resguardo de la tasa, que según la sede es de 0,40 € por m² y día, con un mínimo de 20 €.',
    punto: 'Los puntos limpios fijos de la ciudad están en la <strong>calle Fundición, 1</strong> (abre todos los días, de 10:00 a 21:00 de abril a septiembre y de 10:00 a 20:00 el resto del año) y en <strong>calle Severo Ochoa, 2</strong> (10:00–14:15 y 14:45–17:00). Admiten escombros de particulares con un tope de <strong>300 litros por persona y día</strong>, o 6 sacos de 50 litros sin licencia de obra y 20 con licencia. Un saco de 1 m³ queda muy por encima.',
    acceso: [
      'Las zonas de bajas emisiones de Rivas son de <strong>entorno escolar</strong>: restringen el acceso de vehículos solo en las horas de entrada y salida de los colegios en días lectivos. Algunas calles están peatonalizadas todo el año. Si tu calle está junto a un colegio, dínoslo al pedir.',
    ],
    barrios: ['Covibar', 'Pablo Iglesias', 'La Partija', 'La Luna', 'Cristo de Rivas', 'Santa Mónica', 'Bellavista-José Hierro', 'Cómic', 'Rivas Futura', 'Casco Antiguo'],
    poligonos: ['Polígono Industrial Santa Ana'],
    fuentes: [
      ['Sede: contenedor de escombros en vía pública', 'https://sede-electronica.rivasciudad.es/tramite/instalacion-de-contenedor-de-escombros-en-via-publica/'],
      ['Reglamento de puntos limpios (BOCM 26-1-2022)', 'https://sede-electronica.rivasciudad.es/wp-content/uploads/sites/6/2022/01/2022-01-26-BOCM-reglamento-puntos-limpios.pdf'],
      ['Punto limpio calle Fundición', 'https://www.rivasciudad.es/equipamiento/punto-limpio-calle-fundicion/'],
      ['Zonas de bajas emisiones escolares', 'https://www.rivasciudad.es/servicio/transporte-y-movilidad/2021/08/30/zonas-de-bajas-emisiones/862600166192/'],
    ],
  },

  coslada: {
    faq: 'Sí, porque el saco se deja en la vía pública para poder recogerlo. En la vía pública se pide la licencia de contenedor o saco al Ayuntamiento (acto comunicado: si no responde en 15 días se entiende autorizada) tras pagar la autoliquidación de la tasa.',
    via: 'En Coslada la licencia para contenedor o saco en la calle es un <strong>acto comunicado</strong>: presentas el impreso con la autoliquidación de la tasa y, si el Ayuntamiento no responde en <strong>15 días</strong>, se entiende autorizada. Debe ir en la calzada, en zona de aparcamiento, sin tapar registros, pasos de carruajes ni reservas, y sin rebosar.',
    punto: 'El <strong>Punto Limpio de Coslada</strong> está en el camino de Corbeteras. Del 16 de septiembre al 15 de junio abre de martes a viernes de 10:00 a 14:00 y de 16:00 a 19:30, y sábados y domingos de 10:00 a 14:00 (lunes cerrado). Según las ordenanzas fiscales de 2025, los escombros son gratuitos hasta 0,5 m³ y el máximo es de 2 m³ al día.',
    acceso: [
      'Para obras con más de 1 m³ de escombros, la ordenanza de medio ambiente obliga a usar contenedores adecuados, con autorización.',
      'Los trabajos de construcción que aumenten el ruido en propiedades ajenas no pueden hacerse entre las 22:00 y las 08:00.',
    ],
    barrios: ['Casco', 'Barrio del Puerto', 'Valleaguado', 'Las Conejeras', 'El Esparragal', 'La Colina', 'Ciudad 70', 'La Espinilla', 'La Cañada', 'Barrio de Santiago', 'Barrio de la Estación'],
    poligonos: ['Polígono Industrial de Coslada', 'Polígono Las Mercedes'],
    fuentes: [
      ['Ocupación de vía pública: licencia de contenedor', 'https://coslada.es/politica-territorial/urbanismo/impresos-administrativos/ocupacion-via-publica/'],
      ['Punto Limpio de Coslada', 'https://coslada.es/politica-medioambiental/medio-ambiente/punto-limpio/'],
      ['Ordenanzas fiscales 2025', 'https://coslada.es/hacienda-y-contratacion/wp-content/uploads/sites/10/2025/01/ORDENANZAS-FISCALES-2025.pdf'],
    ],
  },

  'arganda-del-rey': {
    faq: 'Sí, porque el saco se deja en la vía pública para poder recogerlo. En la vía pública hace falta autorización de ocupación del Ayuntamiento (tasa y plano de situación); el plazo de resolución puede llegar a 2 meses, así que conviene pedirla con tiempo.',
    via: 'En Arganda, dejar un contenedor o saco en la calle requiere la <strong>autorización de ocupación de la vía pública</strong> (Urbanismo, Avenida del Cañal 44): solicitud, plano de situación y justificante de la tasa. El Ayuntamiento tiene hasta <strong>2 meses</strong> para resolver y el silencio es desestimatorio, así que si lo necesitas en la calle, tramítalo con tiempo. La ordenanza fiscal fija 16,86 € por semana para contenedores de construcción.',
    punto: 'El <strong>Punto Limpio de Arganda</strong> está en la calle Río Tajuña, 24. De octubre a mayo abre de lunes a sábado de 9:00 a 14:30 y de 16:30 a 20:00, y domingos y festivos de 9:00 a 14:30. Admite escombros de pequeñas obras domésticas, <strong>solo de particulares</strong> y con un tope de 300 kg diarios por persona.',
    acceso: [],
    poligonos: ['El Estrechillo', 'Velasco', 'San Sebastián', 'El Rincón', 'El Alquitón', 'El Cañal', 'El Olivar', 'San Roque'],
    fuentes: [
      ['Sede: autorización de ocupación de la vía pública', 'https://sedeelectronica.argandadelrey.es/sta/CarpetaPublic/doEvent?APP_CODE=STA&PAGE_CODE=CATALOGO&DETALLE=6269010508632081705012'],
      ['Punto limpio de Arganda', 'https://www.argandadelrey.es/servicios-cpt/seguridad-ciudadana/vigilancia-administrativa-medio-ambiente/punto-limpio/'],
    ],
  },

  parla: {
    faq: 'Sí, porque el saco se deja en la vía pública para poder recogerlo. En la vía pública hace falta autorización expresa del Ayuntamiento: se registra con un mínimo de 15 días naturales de antelación y la señalización se coloca 48 horas antes.',
    via: 'En Parla, todas las ocupaciones de suelo público requieren <strong>concesión expresa</strong> del Ayuntamiento. La solicitud se registra con un mínimo de <strong>15 días naturales de antelación</strong>, con plano o croquis, y la zona se señaliza con 48 horas hábiles de antelación. Según la sede, la tasa de un contenedor es de 3,35 € por m² o fracción cada 3 días.',
    punto: 'Parla tiene dos puntos limpios: <strong>avenida de Ronda, 10</strong> y <strong>calle Bruselas, 4</strong>. Abren de lunes a viernes de 8:00 a 20:00, sábados de 9:00 a 20:00 y domingos y festivos de 9:00 a 14:00. Admiten escombros de pequeñas obras domésticas de particulares, hasta <strong>1 m³ por entrega y día</strong>.',
    acceso: [
      'La zona de bajas emisiones de Parla no estará operativa antes de 2027 y, según el Ayuntamiento, no habrá prohibiciones permanentes al tráfico general.',
    ],
    poligonos: ['Ciudad de Parla', 'Cerro del Rubal', 'La Ermita', 'García Rivera', 'Los Borrachitos', 'PAU 5 Parla Progresa'],
    fuentes: [
      ['Sede: ocupación de suelo público', 'https://sede.ayuntamientoparla.es/sta/CarpetaPublic/doEvent?APP_CODE=STA&PAGE_CODE=CATALOGO&DETALLE=6269000142947513707756'],
      ['Puntos limpios de Parla', 'https://www.ayuntamientoparla.es/servicios/obras-mantenimiento-limpieza/residuos/puntos-limpios-de-la-ciudad/view'],
      ['Zona de bajas emisiones de Parla', 'https://www.ayuntamientoparla.es/servicios/desarrollo-urbano-e-industrial/zona-de-bajas-emisiones'],
    ],
  },

  'san-sebastian-de-los-reyes': {
    faq: 'Sí, porque el saco se deja en la vía pública para poder recogerlo. En la vía pública hace falta la licencia de ocupación con contenedores o sacas (Licencias Urbanísticas, con el justificante de la tasa); no se pueden colocar en zona ORA de residentes ni zona verde.',
    via: 'En Sanse, ocupar la calle con un contenedor o saca requiere la <strong>licencia de ocupación de la vía pública</strong> (Registro Municipal, con el justificante de la tasa). Debe ir donde esté permitido aparcar, sin sobresalir de la línea de coches, y <strong>no se admite en tramos de ORA de residentes ni en zona verde</strong>. La carga y descarga de contenedores está prohibida sábados, domingos y festivos, y de lunes a viernes de 20:00 a 07:00.',
    punto: 'El punto limpio municipal abre de lunes a viernes de 8:00 a 20:00, sábados de 9:00 a 20:00 y domingos y festivos de 9:00 a 14:00. Admite escombros de particulares con un tope de <strong>60 kg por entrega y día</strong>, muy por debajo de lo que cabe en un saco de 1 m³.',
    acceso: [
      'Aún no hay ordenanza de zona de bajas emisiones en vigor en el municipio: el plan de movilidad la propone como prueba piloto.',
    ],
    poligonos: ['Polígono Industrial Norte', 'Polígono Industrial Sur', 'Moscatelares'],
    fuentes: [
      ['Sede: ocupación con contenedores o sacas de escombros', 'https://sede.ssreyes.es/tr%C3%A1mites/-/asset_publisher/SgMTPjyrfbwA/content/id/2612761'],
      ['Punto limpio de San Sebastián de los Reyes', 'https://www.ssreyes.org/punto-limpio'],
    ],
  },

  'san-fernando-de-henares': {
    faq: 'Sí, porque el saco se deja en la vía pública para poder recogerlo. En la vía pública hace falta autorización municipal y pagar la tasa (9,50 € por día o 40 € por semana para un contenedor o saco de hasta 6 m³ según la ordenanza fiscal).',
    via: 'La ordenanza de convivencia de San Fernando prohíbe ocupar la vía pública con contenedores de escombros <strong>sin autorización municipal</strong>. La tasa de la ordenanza fiscal para un contenedor o saco de hasta 6 m³ es de <strong>9,50 € por día o 40 € por semana</strong>. Si además necesitas un camión grúa o de mudanza, hay un trámite aparte de ocupación de suelo con la Policía Local, que pide al menos 5 días hábiles.',
    punto: null,
    acceso: [
      'Las obras que aumenten el ruido en propiedades ajenas no pueden hacerse entre las 22:00 y las 08:00, y la carga, descarga y transporte de materiales con camiones debe hacerse entre las 08:00 y las 22:00.',
    ],
    barrios: ['Casco Histórico', 'Ciudad Parque Henares', 'Copasa', 'Fuencasas'],
    poligonos: ['Puerta de Madrid', 'Las Fronteras'],
    fuentes: [
      ['Ordenanza fiscal nº 8: aprovechamientos especiales', 'https://www.ayto-sanfernando.com/wp-content/uploads/2026/04/08-aprovechamientos-especiales.pdf'],
      ['Ordenanza de convivencia ciudadana', 'https://www.ayto-sanfernando.com/wp-content/uploads/2016/09/convivencia-ciudadana.pdf'],
      ['Formularios de la Policía Local: ocupación de suelo', 'https://www.ayto-sanfernando.com/formularios-policia-local/'],
    ],
  },

  getafe: {
    faq: 'Sí, porque el saco se deja en la vía pública para poder recogerlo. Si el saco o contenedor va a la vía pública, el Ayuntamiento exige solicitar una autorización de ocupación de la vía pública (con plano y superficie); la consulta se hace en via.publica@ayto-getafe.org.',
    via: 'En Getafe, si hace falta contenedor o saco en la calle, el Ayuntamiento exige <strong>autorización de ocupación de la vía pública</strong>, con declaración de superficie y duración y un plano de la zona. Las consultas se atienden en via.publica@ayto-getafe.org. Una obra que no toca estructura, fachada ni vía pública (cambiar solados, alicatados, muebles de cocina, sanitarios…) no necesita licencia ni declaración responsable.',
    punto: 'El <strong>Punto Limpio del Cementerio</strong> (gestionado por LYMA) abre de lunes a viernes de 10:00 a 18:00 y sábados, domingos y festivos de 9:00 a 15:00. Admite escombros y restos de obra con un tope de <strong>50 kg (5 sacos) por usuario y día</strong>. Las empresas y autónomos de Getafe tienen aparte el ecoparque de Los Olivos, con requisitos de acceso y tarifa.',
    acceso: [
      'Getafe tiene una <strong>zona de bajas emisiones activa</strong> en poco más de 1 km² del centro. Las mudanzas y obras que necesiten acceder, circular o estacionar en ella con un vehículo que no cumpla los requisitos deben pedir autorización municipal (zbe@ayto-getafe.org). Si vives en esa zona, dínoslo al pedir.',
    ],
    barrios: ['Alhóndiga', 'Buenavista', 'Centro', 'El Bercial', 'Getafe Norte', 'Juan de la Cierva', 'Las Margaritas', 'Los Molinos', 'Perales del Río', 'San Isidro', 'Sector III'],
    poligonos: ['San Marcos', 'Los Ángeles', 'El Lomo', 'Carpetania I', 'Los Gavilanes', 'Los Olivos'],
    fuentes: [
      ['Preguntas frecuentes de licencias de obra de Getafe', 'https://getafe.es/delegaciones/urbanismo/urbanismo-y-obras-publicas/actuaciones/preguntas-frecuentes-en-materia-de-licencias-de-obra-y-actividades/8/'],
      ['Puntos limpios de LYMA', 'https://lymagetafe.es/puntos-limpios'],
      ['Zona de bajas emisiones de Getafe', 'https://zbe.getafe.es/la-zbe/'],
    ],
  },

  leganes: {
    faq: 'Sí, porque el saco se deja en la vía pública para poder recogerlo. En la vía pública hace falta la licencia de ocupación (sacos, contenedores y casetas de obra), que se pide en la sede electrónica con hasta 15 días de antelación, seguro de responsabilidad civil y pago de la tasa.',
    via: 'En Leganés la licencia de obra no autoriza el contenedor en la calle: es un trámite aparte, <strong>«Ocupación de vía pública: sacos, contenedores y casetas de obra»</strong>. Se pide en la sede electrónica o en el Registro General (hasta 15 días antes), con certificado del seguro de responsabilidad civil, plano o croquis y autoliquidación, y no se puede ocupar la calle hasta que se conceda. La ordenanza de medio ambiente fija además que no se instalen en pasos de peatones, vados, reservas ni tapas de servicios, y que la ocupación máxima sea de 10 días salvo permiso especial.',
    punto: 'El <strong>Punto Limpio de la calle El Maestro</strong> abre todos los días del año de 9:00 a 13:00 y de 16:00 a 19:00. Admite escombros con un tope de <strong>60 kg</strong> por entrega, muy por debajo de lo que cabe en un saco de 1 m³.',
    acceso: [
      'El centro de Leganés tiene calles peatonalizadas con controles de acceso (Espejo, Sol, Vicente Aleixandre, La Luna, Ordóñez, Barrionuevo y Charco). Si tu portal está allí, avísanos al pedir.',
    ],
    barrios: ['Zarzaquemada', 'San Nicasio', 'Carrascal', 'Fortuna', 'Polvoranca', 'Leganés Norte', 'Leganés Sur'],
    poligonos: ['Nuestra Señora de Butarque', 'Ciudad del Automóvil', 'Parque Leganés Tecnológico', 'Puerta de Carabanchel', 'La Laguna', 'Prado Overa'],
    fuentes: [
      ['Sede: ocupación de vía pública con sacos, contenedores y casetas', 'https://sede.leganes.org/sta/CarpetaPublic/doEvent?APP_CODE=STA&PAGE_CODE=CATALOGO&DETALLE=6269002145829819909840'],
      ['Punto limpio de Leganés', 'https://www.leganes.org/punto-limpio'],
      ['Peatonalización del centro', 'https://www.leganes.org/w/el-ayuntamiento-da-finalizadas-obras-proyecto-peatonalizacion-zona-centro-leganes-financiadas-fondos-next-generation-eu'],
    ],
  },

  fuenlabrada: {
    faq: 'Sí, porque el saco se deja en la vía pública para poder recogerlo. En la vía pública hace falta autorización del Ayuntamiento (ocupación de vía pública, Policía Local), con al menos 15 días hábiles entre la solicitud y la ocupación.',
    via: 'En Fuenlabrada la ocupación de la vía pública (Policía Local) se solicita con <strong>al menos 15 días hábiles</strong> de antelación, en Atención Ciudadana o por la sede electrónica, indicando tipo de ocupación, fecha y horario. La tasa para escombros en contenedor es de 10,64 € por cada 3 días o fracción (ordenanza fiscal nº 19). La ordenanza de convivencia prohíbe colocar contenedores o sacas sin identificar y que estén llenos más de 24 horas.',
    punto: 'El <strong>Punto Limpio</strong> está en la calle Canario, esquina con la avenida de la Cantueña. En invierno abre todos los días de 9:00 a 13:45 y de 16:00 a 20:00. Es solo para vecinos con DNI o certificado de empadronamiento (<strong>no admite empresas ni autónomos</strong>) y recibe escombros de reparaciones domiciliarias hasta <strong>1 m³</strong>.',
    acceso: [
      'Fuenlabrada tiene una <strong>zona de bajas emisiones activa</strong> (aprox. 1 km² en el centro, con sanciones desde febrero de 2025). Los vehículos que prestan servicios o entregan suministros pueden quedar exentos con inscripción previa. Si vives dentro, dínoslo al pedir.',
    ],
    barrios: ['Naranjo-La Serna', 'Avanzada-La Cueva', 'Centro-Arroyo-La Fuente', 'Cerro-El Molino', 'Vivero-Hospital-Universidad', 'Loranca-Nuevo Versalles-Parque Miraflores'],
    poligonos: ['Cobo Calleja', 'El Palomo', 'Cantueña', 'Acedinos', 'La Vega II', 'Vereda del Tempranar', 'Sonsoles'],
    fuentes: [
      ['Solicitud de ocupación de vía pública', 'https://www.ayto-fuenlabrada.es/web/portal/w/solicitud-renovacion-de-ocupacion-de-via-publica'],
      ['Puntos limpios de Fuenlabrada', 'https://www.ayto-fuenlabrada.es/web/portal/w/puntos-limpios'],
      ['Ordenanza de la zona de bajas emisiones', 'https://transparencia.ayto-fuenlabrada.es/wp-content/uploads/2024/06/Ordenanza-reguladora-Zona-de-Bajas-Emisiones-Fuenlabrada-junio-2024.pdf'],
    ],
  },
  'madrid-capital': {
    faq: 'Sí, porque el saco se deja en la vía pública para poder recogerlo. En la calzada, ocupando una plaza de aparcamiento, basta una comunicación previa con 2 días hábiles de antelación y el pago de la tasa; en la acera, en una reserva de estacionamiento o donde no se puede aparcar hace falta autorización con 10 días hábiles de antelación.',
    via: 'En Madrid, si lo dejas en la <strong>calzada, ocupando una plaza de aparcamiento</strong>, basta una <strong>comunicación previa</strong> en el Registro Electrónico con 2 días hábiles de antelación y acreditar el pago de la tasa; el saco no puede sobresalir de la línea de coches bien aparcados. En la <strong>acera</strong>, en una reserva especial o donde no se puede aparcar hace falta <strong>autorización</strong>, con al menos 10 días hábiles de antelación. La obligada es la persona que promueve la obra y quien instala sin trámite responde también. Según la tasa de 2024, un contenedor o saco de hasta 4 m³ cuesta entre 0,64 € y 4,78 € por día, según la categoría de la calle.',
    punto: 'Madrid tiene 16 puntos limpios fijos repartidos por la ciudad, que abren de lunes a sábado de 8:00 a 20:00 y domingos y festivos de 9:00 a 14:00. Admiten escombros de pequeñas obras domésticas con un tope de <strong>120 kg</strong> (unos 4 sacos pequeños). El de Arganzuela está cerrado temporalmente por obras desde septiembre de 2026.',
    acceso: [
      'Según la ordenanza, en aceras de menos de 2,5 m no se admite ningún contenedor ni saco; entre 2,5 y 3,5 m solo sacos, y a partir de 3,5 m sacos o contenedores. Si te toca acera estrecha, el saco es la opción.',
      'En las zonas que fija el Ayuntamiento no pueden colocarse contenedores ni sacos (llenos o vacíos) en fines de semana, festivos ni días de eventos.',
      'Madrid tiene zona de bajas emisiones en todo el municipio, y en Distrito Centro (zona de especial protección) el reparto está limitado por etiqueta ambiental y franja horaria. Si tu portal está en Centro, dínoslo al pedir.',
      'Cambiar acabados interiores (azulejos, pintura) en edificios sin protección arquitectónica no requiere licencia ni declaración responsable.',
    ],
    poligonos: ['Polígono de Vicálvaro', 'Polígono de Vallecas', 'Polígono de Villaverde', 'Las Mercedes y Julián Camarillo (San Blas)', 'Manoteras (Hortaleza)', 'Cuatro Vientos (Latina)'],
    fuentes: [
      ['Sede: contenedores de RCD en vía pública', 'https://sede.madrid.es/portal/site/tramites/menuitem.1f3361415fda829be152e15284f1a5a0/?vgnextoid=3309a1de35580210VgnVCM2000000c205a0aRCRD&vgnextchannel=518aa38813180210VgnVCM100000c90da8c0RCRD&vgnextfmt=default'],
      ['Puntos limpios fijos de Madrid', 'https://www.madrid.es/portales/munimadrid/es/Inicio/Medio-ambiente/Recogida-de-residuos/Puntos-Limpios-Fijos/?vgnextfmt=default&vgnextoid=b49b217058662110VgnVCM2000000c205a0aRCRD&vgnextchannel=f81379ed268fe410VgnVCM1000000b205a0aRCRD'],
      ['Ordenanzas fiscales 2024', 'https://agenciatributaria.madrid.es/FWProjects/contribuyente/contenidos/06InfoDocu/01Ordenanzas/Libros/2023.2024/Libro2024.pdf'],
    ],
  },

  alcorcon: {
    faq: 'Sí, porque el saco se deja en la vía pública para poder recogerlo. En la vía pública hace falta autorización municipal solicitada por el promotor antes de colocarlo, con pago de la tasa; en el casco antiguo (zona de acceso restringido) solo se permiten sacas de hasta 1 m³.',
    via: 'En Alcorcón, colocar contenedores o sacas en la calle requiere la <strong>autorización municipal</strong> del promotor, solicitada antes de colocarlos y con pago de la tasa. La solicitud indica el lugar de la obra, el de colocación y las fechas de colocación y retirada. La saca debe ir donde se permita aparcar, sin sobresalir de la línea de coches y sin tapar pasos, vados ni tapas de servicios. Se colocan y retiran entre las 7:30 y las 23:30 y, una vez llenas, se retiran en 48 horas.',
    punto: 'El <strong>Punto Limpio de Químicas</strong> (calle Químicas, 4, polígono Urtinsa I) es el único de los dos puntos limpios de la ciudad que admite escombros. Abre de lunes a viernes de 8:00 a 21:00 y sábados, domingos y festivos de 8:00 a 14:00.',
    acceso: [
      'En la <strong>zona de acceso restringido de vehículos industriales del casco antiguo</strong> no se permiten contenedores metálicos: solo sacas de hasta 1 m³, que es justo el tamaño de nuestro telesaco, y el acceso del camión lo autoriza la Concejalía de Circulación.',
      'Las obras menores sin licencia (cambiar solados, alicatados, yesos o pintura de una vivienda) igualmente necesitan las autorizaciones de retirada de residuos u ocupación de vía pública.',
      'La ordenanza de zona de bajas emisiones de Alcorcón está en tramitación: se aprobó inicialmente en mayo de 2026 y afectaría al casco urbano, sin los polígonos industriales.',
    ],
    barrios: ['Casco Antiguo', 'San José de Valderas', 'Parque Lisboa', 'Parque Oeste', 'Ensanche Sur', 'Retamar de la Huerta', 'Torres Bellas', 'Parque Ondarreta', 'Fuente Cisneros', 'Campodón', 'Prado de Santo Domingo', 'Hogar 68'],
    poligonos: ['Urtinsa I y II', 'Ventorro del Cano', 'Industrias Especiales', 'El Lucero'],
    fuentes: [
      ['Normas de contenedores y sacas (ordenanza de residuos)', 'https://www.ayto-alcorcon.es/sites/default/files/2022-10/Normas%20de%20instalacion%2C%20colocacion%20y%20uso%20%20de%20contenedores_sacas.pdf'],
      ['Puntos limpios (ESMASA)', 'https://esmasalcorcon.com/rsu/'],
      ['Información de obras menores 2025', 'https://www.ayto-alcorcon.es/sites/default/files/2025-09/INFORMACION%20OBRAS%20MENORES%202025.pdf'],
      ['BOCM 22-6-2026: zona de bajas emisiones', 'https://www.bocm.es/boletin/CM_Orden_BOCM/2026/06/22/BOCM-20260622-59.PDF'],
    ],
  },

  mostoles: {
    faq: 'Sí, porque el saco se deja en la vía pública para poder recogerlo. En la calzada, ocupando una plaza de aparcamiento, basta una comunicación previa con 2 días hábiles de antelación y el pago de la tasa; en la acera o en una zona reservada o prohibida hace falta autorización con 15 días hábiles de antelación.',
    via: 'En Móstoles, si lo dejas en la <strong>calzada, ocupando una plaza de aparcamiento</strong>, basta una <strong>comunicación previa</strong> con 2 días hábiles de antelación y el justificante de la tasa, sin sobresalir de la línea de coches. En la <strong>acera</strong> o donde el estacionamiento esté reservado o prohibido hace falta <strong>autorización</strong> con 15 días hábiles de antelación y un plano acotado. Según la ordenanza fiscal de 2026, si no indicas superficie un saco industrial se computa como 2 m² y la liquidación mínima es de 16,58 €. Debe taparse entre las 20:00 y las 08:00 y retirarse en 24 horas cuando esté lleno.',
    punto: 'El <strong>Punto Limpio Río Guadiana</strong> (calle Guadiana, junto al paseo de Arroyomolinos) abre en invierno de lunes a viernes de 9:00 a 14:00 y de 16:00 a 19:00, y sábados y domingos de 9:00 a 15:00. Admite escombros de pequeñas obras domiciliarias con un tope de <strong>60 kg</strong>, solo de vecinos de Móstoles.',
    acceso: [
      'La <strong>zona de bajas emisiones</strong> de Móstoles es el anillo interior delimitado por las calles del Cristo, Juan XXIII, Reyes Católicos, Independencia, Ricardo Medem y Andrés Torrejón. Se circula libremente por esas calles; dentro, las empresas que entregan o recogen suministros (excluidos turismos y motos) pueden acceder con sujeción a las normas del Ayuntamiento. Si vives dentro, dínoslo al pedir.',
    ],
    barrios: ['Centro', 'Norte-Universidad', 'Sur-Este', 'Oeste', 'Parque Coimbra-Guadarrama', 'Sur', 'El Soto', 'Villaeuropa', 'Pinares Llanos', 'Sotoverde'],
    poligonos: ['Polígono Industrial nº 1'],
    fuentes: [
      ['Residuos de obra menor en Móstoles', 'https://www.mostoles.es/en/ayuntamiento/concejalias/concejalia-seguridad-emergencias-medioambiente/gestion-residuos/recogida-residuos-fracciones/recogida-residuos-domesticos-obra-menor-construccion-repara'],
      ['Punto Limpio Río Guadiana', 'https://www.mostoles.es/en/ayuntamiento/concejalias/concejalia-seguridad-emergencias-medioambiente/puntos-limpios/punto-limpio-paseo-arroyomolinos-c-v-calle-rio-guadiana'],
      ['BOCM 17-10-2024: ordenanza de tráfico y ZBE', 'https://www.bocm.es/boletin/CM_Orden_BOCM/2024/10/17/BOCM-20241017-62.PDF'],
    ],
  },
};

module.exports = { LOCAL };
