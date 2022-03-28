let paso=1;const pasoInicial=1,pasoFinal=3;let total=0;const cita={id:"",nombre:"",fecha:"",hora:"",total:0,servicios:[]};function iniciarApp(){mostrarSeccion(),tabs(),botonesPaginador(),paginaSiguiente(),paginaAnterior(),consultarAPI(),idCliente(),nombreCliente(),seleccionarFecha(),seleccionarHora(),mostrarResumen()}function mostrarSeccion(){const e=document.querySelector(".mostrar"),t=document.querySelector(".actual");e&&(e.classList.remove("mostrar"),t.classList.remove("actual"));const o="#paso-"+paso;document.querySelector(o).classList.add("mostrar");document.querySelector(`[data-paso="${paso}"]`).classList.add("actual")}function tabs(){document.querySelectorAll(".tabs button").forEach(e=>{e.addEventListener("click",(function(e){paso=parseInt(e.target.dataset.paso),mostrarSeccion(),botonesPaginador()}))})}function botonesPaginador(){const e=document.querySelector("#anterior"),t=document.querySelector("#siguiente");1===paso?(e.classList.add("ocultar"),t.classList.remove("ocultar")):3===paso?(e.classList.remove("ocultar"),t.classList.add("ocultar"),mostrarResumen()):(e.classList.remove("ocultar"),t.classList.remove("ocultar")),mostrarSeccion()}function paginaAnterior(){document.querySelector("#anterior").addEventListener("click",()=>{paso<=1||(paso--,botonesPaginador())})}function paginaSiguiente(){document.querySelector("#siguiente").addEventListener("click",()=>{paso>=3||(paso++,botonesPaginador())})}async function consultarAPI(){try{const e="http://localhost:3000/api/servicios",t=await fetch(e);mostrarServicios(await t.json())}catch(e){console.log(e)}}function mostrarServicios(e){e.forEach(e=>{const{id:t,nombre:o,precio:a}=e,n=document.createElement("P");n.classList.add("nombre-servicio"),n.textContent=o;const c=document.createElement("P");c.classList.add("precio-servicio"),c.textContent="$"+a;const r=document.createElement("DIV");r.classList.add("servicio"),r.dataset.idServicio=t,r.onclick=function(){seleccionarServicio(e)},r.appendChild(n),r.appendChild(c),document.querySelector(".listado-servicios").appendChild(r)})}function seleccionarServicio(e){const{id:t}=e,{servicios:o}=cita,a=document.querySelector(`[data-id-servicio="${t}"]`);o.some(e=>e.id===t)?(cita.servicios=o.filter(e=>e.id!==t),cita.total-=parseInt(e.precio),a.classList.remove("seleccionado")):(cita.servicios=[...o,e],cita.total+=parseInt(e.precio),a.classList.add("seleccionado"))}function idCliente(){const e=document.querySelector("#id").value;cita.id=e}function nombreCliente(){const e=document.querySelector("#nombre").value;cita.nombre=e}function seleccionarFecha(){document.querySelector("#fecha").addEventListener("input",(function(e){const t=new Date(e.target.value).getUTCDay();[6,0].includes(t)?(e.target.value="",mostrarAlerta("Fines de semana no permitidos","error",".formulario")):cita.fecha=e.target.value}))}function seleccionarHora(){document.querySelector("#hora").addEventListener("input",(function(e){const t=e.target.value.split(":");t[0]<10||t[0]>=18?(e.target.value="",mostrarAlerta("Esta cerrado","error",".formulario")):cita.hora=e.target.value}))}function mostrarAlerta(e,t,o,a=!0){const n=document.querySelector(".alerta");n&&n.remove();const c=document.createElement("DIV");c.textContent=e,c.classList.add("alerta"),c.classList.add(t);document.querySelector(o).appendChild(c),a&&setTimeout(()=>{c.remove()},3e3)}function mostrarResumen(){const e=document.querySelector(".contenido-resumen");for(;e.firstChild;)e.removeChild(e.firstChild);if(Object.values(cita).includes("")||0==cita.servicios.length)return void mostrarAlerta("Faltan datos de Servicios, Fecha u Hora","error",".contenido-resumen",!1);const{nombre:t,fecha:o,hora:a,total:n,servicios:c}=cita,r=document.createElement("H3");r.textContent="Resumen de Servicios",e.appendChild(r),c.forEach(t=>{const{id:o,precio:a,nombre:n}=t,c=document.createElement("DIV");c.classList.add("contenedor-servicio");const r=document.createElement("P");r.textContent=n;const i=document.createElement("P");i.innerHTML="<span>Precio: $</span>"+a,c.appendChild(r),c.appendChild(i),e.appendChild(c)});const i=document.createElement("H3");i.textContent="Resumen de Cita",e.appendChild(i);const s=document.createElement("P");s.innerHTML="<span>Nombre:</span> "+t;const d=new Date(o),l=d.getMonth(),u=d.getDate()+2,m=d.getFullYear(),p=new Date(Date.UTC(m,l,u)).toLocaleDateString("es-MX",{weekday:"long",year:"numeric",month:"long",day:"numeric"}),v=document.createElement("P");v.innerHTML="<span>Fecha:</span> "+p;const h=document.createElement("P");h.innerHTML=`<span>Hora:</span> ${a} Horas`;const f=document.createElement("P");f.innerHTML="<span>Total:</span> $"+n;const C=document.createElement("BUTTON");C.classList.add("boton"),C.textContent="Reservar Cita",C.onclick=reservarCita,e.appendChild(s),e.appendChild(v),e.appendChild(h),e.appendChild(f),e.appendChild(C)}async function reservarCita(){const{id:e,fecha:t,hora:o,servicios:a}=cita,n=new FormData,c=a.map(e=>e.id);n.append("usuarioId",e),n.append("fecha",t),n.append("hora",o),n.append("servicios",c);try{const e="http://localhost:3000/api/citas",t=await fetch(e,{method:"POST",body:n});(await t.json()).resultado&&(Swal.fire({icon:"success",title:"Cita Creada.",text:"Tu cita fue creada correctamente",button:"OK"}).then(()=>{window.location.reload()}),setTimeout(()=>{window.location.reload()},3e3))}catch(e){Swal.fire({icon:"error",title:"Error",text:"Hubo un error al guardar la cita. Pero no te preocupes, no es tu culpa :)"})}}document.addEventListener("DOMContentLoaded",()=>{iniciarApp()});