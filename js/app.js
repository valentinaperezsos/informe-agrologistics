
const $ = s => document.querySelector(s), $$ = s => [...document.querySelectorAll(s)];
const P = [["index.html", "Inicio"], ["El problema", [["introduccion.html", "Introducción"], ["diagnostico.html", "Diagnóstico"], ["fundamentacion.html", "Fundamentación teórica"]]], ["La solución", [["diseno.html", "Diseño de la solución"], ["monitoreo.html", "Monitoreo"], ["qos.html", "Calidad de servicio"], ["seguridad.html", "Seguridad"]]], ["Análisis", [["innovacion.html", "Innovación"], ["discusion.html", "Discusión"], ["conclusiones.html", "Conclusiones"]]], ["quiz.html", "Quiz"], ["referencias.html", "Referencias"]];
const cur = location.pathname.split("/").pop() || "index.html", flat = P.flatMap(x => Array.isArray(x[1]) ? x[1] : [x]);
const A = l => `<a href="${l[0]}"${l[0] == cur ? ' class="on"' : ''}>${l[1]}</a>`;
$("#nav").innerHTML = `<div class="bar"><a class="br" href="index.html">AgroLogistics Global</a><button id="mb" aria-label="Abrir menú">Menú</button><ul id="mn">` + P.map(x => Array.isArray(x[1]) ? `<li class="dd"><button aria-haspopup="true">${x[0]} ▾</button><ul class="sub">${x[1].map(l => "<li>" + A(l) + "</li>").join("")}</ul></li>` : `<li>${A(x)}</li>`).join("") + `</ul><button id="th">Modo oscuro</button></div>`;
$$(".dd").forEach(d => { if (d.querySelector("a.on")) d.firstChild.classList.add("on") });
$$(".dd>button").forEach(b => b.onclick = e => { e.stopPropagation(); const l = b.parentElement, o = l.classList.contains("open"); $$(".dd").forEach(x => x.classList.remove("open")); if (!o) l.classList.add("open") });
document.onclick = () => $$(".dd").forEach(x => x.classList.remove("open"));
$("#mb").onclick = () => $("#mn").classList.toggle("show");
try { if (localStorage.th) document.documentElement.dataset.theme = localStorage.th } catch (e) { }
$("#th").onclick = () => { const d = document.documentElement; d.dataset.theme = d.dataset.theme == "dark" ? "" : "dark"; try { localStorage.th = d.dataset.theme } catch (e) { } };
const ix = flat.findIndex(x => x[0] == cur), mm = document.querySelector("main");
if (mm && ix > 0) mm.insertAdjacentHTML("beforeend", `<div class="pg" style="max-width:1000px;margin:0 auto;padding:0 20px 40px"><a class="btn alt" href="${flat[ix - 1][0]}">← ${flat[ix - 1][1]}</a>${ix < flat.length - 1 ? `<a class="btn" href="${flat[ix + 1][0]}">${flat[ix + 1][1]} →</a>` : ""}</div>`);
// inicio: antes y después
const H = { hoy: ["Routers y firewalls físicos que se saturan y cuestan mantener", "Sensores rurales que pierden señal y dejan datos incompletos", "Telefonía análoga con mala calidad entre sucursales", "AWS y Azure aislados, sin visibilidad ni políticas de acceso"], pro: ["Red definida por software, gestionada desde un solo punto", "LoRaWAN que cubre cultivos lejanos con pocos gateways", "VoIP y comunicaciones unificadas con calidad medida", "Nube híbrida con monitoreo continuo e identidades controladas"] };
$$("[data-h]").forEach(b => b.onclick = () => { $$("[data-h]").forEach(x => x.classList.add("off")); b.classList.remove("off"); $("#hl").innerHTML = H[b.dataset.h].map(t => `<li>${t}</li>`).join("") });
if ($$("[data-h]")[0]) $$("[data-h]")[0].click();
// quiz
if (document.getElementById("quiz")) {
    const Q = [["¿Qué separa una red SDN?", ["El cableado del wifi", "El plano de control del plano de datos", "La nube pública de la privada"], 1, "El controlador decide y los equipos solo reenvían (Subramanian & Voruganti, 2016)."],
    ["¿Qué tecnología LPWAN es la principal para cultivos lejanos?", ["LoRaWAN", "Sigfox", "Wi-Fi"], 0, "LoRaWAN es abierto, llega hasta unos 15 km en zona rural y usa banda libre."],
    ["¿Para qué sirve el SIP Trunking?", ["Cifrar los datos de sensores", "Conectar la PBX con la red telefónica pública por IP", "Priorizar el tráfico de video"], 1, "Permite que las llamadas salgan a la red pública sin líneas análogas."],
    ["¿Qué es una VPC o una VNet?", ["Una red privada virtual dentro de la nube", "Un tipo de sensor", "Un cable de fibra"], 0, "Es la red aislada donde se definen subredes, rutas y políticas (Soni, 2018)."],
    ["¿Cuál es la latencia máxima recomendada para voz (un sentido)?", ["50 ms", "150 ms", "500 ms"], 1, "Por encima de 150 ms aparecen eco y pausas."],
    ["¿Qué significa mínimo privilegio?", ["Cada usuario tiene solo los permisos que necesita", "Todos son administradores", "Nadie accede a la nube"], 0, "Reduce la exposición si una cuenta es comprometida (Guijarro Olivares et al., 2019)."],
    ["¿Qué caracteriza al monitoreo pasivo?", ["Genera paquetes de prueba", "Analiza el tráfico existente sin sobrecargar la red", "Solo funciona en la nube"], 1, "El activo envía pruebas; el pasivo observa. Se complementan."],
    ["En el modelo de responsabilidad compartida, ¿quién protege los datos y accesos del cliente?", ["El proveedor de nube", "El cliente", "Nadie en particular"], 1, "El proveedor asegura la infraestructura; el cliente, sus datos y configuraciones."]];
    let i = 0, s = 0; const z = $("#quiz");
    function show() {
        if (i >= Q.length) { z.innerHTML = `<h3>Resultado: ${s} de ${Q.length}</h3><p>${s >= 7 ? "Excelente dominio del tema." : s >= 5 ? "Buen nivel; repasa los temas que fallaste." : "Conviene repasar la fundamentación y volver a intentarlo."}</p><button class="b" id="rs">Intentar de nuevo</button>`; $("#rs").onclick = () => { i = 0; s = 0; show() }; return }
        const q = Q[i]; z.innerHTML = `<p class="mut">Pregunta ${i + 1} de ${Q.length}</p><h3>${q[0]}</h3>` + q[1].map((o, k) => `<button class="op" data-k="${k}">${o}</button>`).join("") + `<p id="fb"></p>`;
        $$(".op").forEach(b => b.onclick = () => { const k = +b.dataset.k; $$(".op").forEach(x => x.disabled = true); $$(".op")[q[2]].classList.add("ok"); if (k == q[2]) s++; else b.classList.add("no"); $("#fb").innerHTML = `<b>${k == q[2] ? "Correcto." : "No exactamente."}</b> ${q[3]}<br><button class="b" id="nx" style="margin-top:10px">${i < Q.length - 1 ? "Siguiente" : "Ver resultado"}</button>`; $("#nx").onclick = () => { i++; show() } })
    }
    show()
}
// carruseles
$$("[data-car]").forEach(c => {
    const s = [...c.querySelectorAll(".sl")]; let i = 0;
    const ct = document.createElement("div"); ct.className = "ctl"; ct.innerHTML = '<button class="b off">Anterior</button><span></span><button class="b off">Siguiente</button>'; c.append(ct);
    const show = n => { i = (n + s.length) % s.length; s.forEach((x, k) => x.classList.toggle("on", k == i)); ct.children[1].textContent = (i + 1) + " / " + s.length };
    ct.children[0].onclick = () => show(i - 1); ct.children[2].onclick = () => show(i + 1); show(0)
});

// pestañas
$$("[data-tabs]").forEach(t => {
    const bs = [...t.children], ps = []; let n = t.nextElementSibling; while (n && n.classList.contains("pn")) { ps.push(n); n = n.nextElementSibling }
    bs.forEach((b, i) => b.onclick = () => { bs.forEach((x, k) => x.classList.toggle("off", k != i)); ps.forEach((p, k) => p.classList.toggle("on", k == i)) })
});

if (document.getElementById('mx')) {
    // matriz de riesgos
    const R = [["Accesos indebidos en la nube", 4, 5, "Datos expuestos y sanciones por privacidad.", "IAM/RBAC con mínimo privilegio, autenticación multifactor y auditoría."],
    ["Caída de la nube sin respaldo", 3, 5, "Se detienen procesos completos.", "Alta disponibilidad entre AWS y Azure y Plan B documentado."],
    ["Pérdida de datos de sensores", 5, 3, "Decisiones agrícolas con información parcial.", "Red LoRaWAN con gateways redundantes y NB-IoT de apoyo."],
    ["Saturación del enlace principal", 4, 3, "Lentitud generalizada en horas pico.", "Monitoreo de uso, ampliación anticipada y enlace secundario."],
    ["Mala calidad de voz", 5, 2, "Fallas de coordinación entre sucursales.", "VoIP con VLAN de voz priorizada y monitoreo de QoS."],
    ["Falla de hardware envejecido", 3, 3, "Paradas por equipos obsoletos.", "Virtualizar funciones de red (NFV) y reducir equipos físicos."]];
    let h = ''; for (let im = 5; im >= 1; im--) {
        h += `<div>${im}</div>`; for (let p = 1; p <= 5; p++) {
            const v = p * im, col = v >= 15 ? "#555" : v >= 8 ? "#999" : "#ccc";
            h += `<div class="c" style="background:${col}">` + R.map((r, k) => r[1] == p && r[2] == im ? `<button class="chip" data-k="${k}" aria-label="${r[0]}">${k + 1}</button>` : "").join("") + "</div>"
        }
    }
    h += "<div></div>" + [1, 2, 3, 4, 5].map(p => `<div>${p}</div>`).join(""); $("#mx").innerHTML = h;
    $$(".chip").forEach(b => b.onclick = () => {
        $$(".chip").forEach(x => x.classList.remove("sel")); b.classList.add("sel"); const r = R[b.dataset.k];
        $("#rinfo").innerHTML = `<b>${r[0]}</b> (probabilidad ${r[1]}, impacto ${r[2]})<br><b>Efecto:</b> ${r[3]}<br><b>Mitigación:</b> ${r[4]}`
    });

}
if (document.getElementById('dg')) {
    // diagrama
    const N = {
        se: [20, 30, "Sensores LoRaWAN", "Miden suelo, clima y riego en cultivos lejanos. Consumen muy poco y pueden durar años con una batería."],
        gw: [20, 150, "Gateways rurales", "Reciben señales hasta unos 15 km y las envían a la red. Pocos gateways cubren grandes extensiones, lo que baja costos de instalación."],
        ln: [230, 90, "Servidor LoRaWAN", "Gestiona identidad, cifrado AES-128 y actualizaciones de miles de sensores, y entrega los datos a la nube."],
        sd: [400, 185, "Controlador SDN + VNF", "Centraliza las políticas de red y ejecuta firewall y router virtuales. Un cambio se hace una sola vez y no equipo por equipo."],
        br: [20, 300, "Sucursales", "Switches y borde SD-WAN con túneles cifrados. Un DHCP local mantiene la sede operando si cae el enlace central."],
        px: [230, 300, "PBX virtual / UCaaS", "Reemplaza la telefonía análoga. SIP Trunking para salir a la red pública, con VLAN de voz priorizada."],
        aw: [620, 60, "AWS VPC", "Red privada virtual con subredes y balanceo de carga. Aloja la ingestión y el análisis de datos en contenedores Kubernetes."],
        az: [620, 300, "Azure VNet", "Segunda nube que da respaldo y alta disponibilidad. Se conecta con AWS y las sedes por VPN o enlace dedicado."],
        sc: [400, 40, "IAM/RBAC + WAF", "Controla quién entra con mínimo privilegio y filtra ataques a las aplicaciones web antes de que lleguen a los servicios."],
        bk: [230, 195, "Enlace secundario", "Ruta de respaldo (por ejemplo, otro proveedor o enlace celular). Está en espera y entra en servicio solo si falla el enlace principal de las sucursales."],
        mo: [400, 330, "Monitoreo PRTG / Splunk", "Vigila enlaces, voz, sensores y accesos. Genera alertas verde, amarillo o rojo y guarda histórico para planear ampliaciones."]
    };
    const E = [["se", "gw"], ["gw", "ln"], ["ln", "sd"], ["br", "sd"], ["br", "px"], ["px", "sd"], ["sd", "aw"], ["sd", "az"], ["aw", "az"], ["sc", "sd"], ["mo", "sd"], ["br", "bk"], ["bk", "sd"]];
    $("#dg").innerHTML = E.map(e => `<line class="ln" data-e="${e[0] + e[1]}" x1="${N[e[0]][0] + 70}" y1="${N[e[0]][1] + 23}" x2="${N[e[1]][0] + 70}" y2="${N[e[1]][1] + 23}"/>`).join("") +
        Object.entries(N).map(([k, v]) => `<g class="nd" tabindex="0" role="button" data-k="${k}"><rect x="${v[0]}" y="${v[1]}" width="140" height="46" rx="5"/><text x="${v[0] + 70}" y="${v[1] + 27}">${v[2]}</text></g>`).join("");
    $$(".nd").forEach(g => { const f = () => { $$(".nd").forEach(x => x.classList.remove("sel")); g.classList.add("sel"); const v = N[g.dataset.k]; $("#dinfo").innerHTML = `<b>${v[2]}</b><br>${v[3]}` }; g.onclick = f; g.onkeydown = e => { if (e.key == "Enter" || e.key == " ") { e.preventDefault(); f() } } });
    const PB = {
        n: { t: "Operación normal", x: "Todo funciona. El enlace secundario queda en espera como respaldo.", f: [], a: [], d: [] },
        l: { t: "Falla del enlace principal", x: "El tráfico de las sucursales pasa al enlace secundario. La voz conserva su prioridad en la VLAN 20 y el monitoreo genera una alerta roja. Habrá menos ancho de banda, pero las llamadas y los datos críticos siguen.", f: ["brsd"], a: ["brbk", "bksd"], d: [] },
        a: { t: "Falla de AWS", x: "Los servicios críticos se activan en Azure gracias a la alta disponibilidad entre nubes y el DNS redirige el tráfico. Se pierde capacidad, pero no el servicio.", f: ["sdaw"], a: ["sdaz"], d: ["aw"] },
        z: { t: "Falla de Azure", x: "AWS asume la carga: los servicios críticos siguen en AWS mientras Azure se recupera.", f: ["sdaz"], a: ["sdaw"], d: ["az"] }
    };
    function pb(k) {
        const m = PB[k]; $$("#dg line").forEach(l => { const e = l.dataset.e, f = m.f.includes(e), a = m.a.includes(e); l.style.stroke = f ? "#c0392b" : a ? "var(--hi)" : ""; l.style.strokeDasharray = f ? "2 6" : a ? "none" : ""; l.style.strokeWidth = a || f ? 3 : "" });
        $$(".nd").forEach(g => { const r = g.querySelector("rect"), d = m.d.includes(g.dataset.k); r.style.stroke = d ? "#c0392b" : ""; r.style.strokeWidth = d ? 4 : "" });
        $$(".pbb").forEach(b => b.classList.toggle("off", b.dataset.k != k)); $("#pbt").innerHTML = `<b>${m.t}.</b> ${m.x}`
    }
    $$(".pbb").forEach(b => b.onclick = () => pb(b.dataset.k)); pb("n");

}
if (document.getElementById('kp')) {
    // tablero
    const K = [["Disponibilidad de enlaces", "%", 99.95, 99.5, 99, 1], ["Latencia de voz", "ms", 40, 100, 150, 0], ["Uso de ancho de banda", "%", 55, 70, 90, 0], ["Batería de sensores", "%", 78, 30, 20, 1], ["Accesos fallidos por hora", "", 2, 10, 30, 0]];
    const sb = i => { $("#inc").className = "b " + (i ? "act-r" : "off"); $("#ok").className = "b " + (i ? "off" : "act-g"); $("#inc").setAttribute("aria-pressed", !!i); $("#ok").setAttribute("aria-pressed", !i) }; let kv = K.map(k => k[2]); const st = (k, v) => k[5] ? (v < k[4] ? "r" : v < k[3] ? "y" : "g") : (v > k[4] ? "r" : v > k[3] ? "y" : "g");
    const lb = { g: "Normal", y: "Atención", r: "Crítico" };
    function dk() { $("#kp").innerHTML = K.map((k, i) => { const s = st(k, kv[i]); return `<div class="card kp ${s}"><span class="mut">${k[0]}</span><b>${kv[i]} ${k[1]}</b>${lb[s]}</div>` }).join("") }
    $("#inc").onclick = () => { kv = K.map(k => { const r = Math.random(); const bad = k[5] ? k[4] - 5 : k[4] + 20, mid = k[5] ? k[3] - 3 : k[3] + 8; return +(r < .35 ? bad : r < .7 ? mid : k[2]).toFixed(2) }); dk(); sb(1) };
    $("#ok").onclick = () => { kv = K.map(k => k[2]); dk(); sb(0) }; dk(); sb(0);

}
if (document.getElementById('s1')) {
    // QoS
    function q() {
        const a = +$("#s1").value, b = +$("#s2").value, c = +$("#s3").value, n = +$("#s4").value;
        $("#o1").textContent = a; $("#o2").textContent = b; $("#o3").textContent = c; $("#o4").textContent = n;
        const m = (a > 150) + (b > 30) + (c > 1), v = $("#vd"), mb = (n * 0.087).toFixed(1);
        v.textContent = ["Buena", "Regular", "Mala", "Mala"][m]; v.style.background = ["#3d9a5a", "#d9a21b", "#c0392b", "#c0392b"][m];
        $("#vt").textContent = `${n} llamadas necesitan unos ${mb} Mbps solo para voz. ` + (m == 0 ? "Todos los parámetros están dentro de lo recomendado." : m == 1 ? "Un parámetro supera el umbral: la voz se nota afectada." : "Varios parámetros fallan: la llamada es poco usable.")
    }
    $$("input[type=range]").forEach(r => r.oninput = q); q();

}
if (document.getElementById('fl')) {
    // tarjetas
    const S = [["Accesos con permisos de más", "IAM/RBAC con mínimo privilegio y autenticación multifactor"], ["Ataques a aplicaciones web", "WAF delante de los servicios"], ["Datos expuestos", "Cifrado en reposo y en tránsito; claves en KMS o Key Vault"], ["Dispositivos IoT vulnerables", "AES-128 en LoRaWAN y gestión de identidades y firmware"], ["Errores de configuración en la nube", "Responsabilidad compartida clara y auditorías periódicas"], ["Fallas no detectadas", "Registro continuo de accesos y cambios"]];
    $("#fl").innerHTML = S.map(s => `<button class="fl"><div class="in"><i class="f">${s[0]}</i><i class="k">${s[1]}</i></div></button>`).join("");
    $$(".fl").forEach(b => b.onclick = () => b.classList.toggle("on"));

}
if (document.getElementById('cmp')) {
    // comparativa
    const C = [["Gestión", "Equipo por equipo", "Centralizada desde el controlador SDN"], ["Costos", "Comprar hardware para crecer", "Software y nube bajo demanda"], ["Conectividad", "Sensores rurales con pérdidas", "LPWAN de largo alcance"], ["Voz", "Análoga, mala calidad interurbana", "VoIP/UCaaS con QoS"], ["Visibilidad", "Se reacciona al reclamo", "Monitoreo continuo con alertas"], ["Seguridad", "Perimetral", "Por identidad y segmentación"]];
    $("#cmp").innerHTML = C.map(r => `<tr data-c="${r[0]}"><td>${r[0]}</td><td>${r[1]}</td><td>${r[2]}</td></tr>`).join("");
    $("#flt").innerHTML = ["Todos", ...C.map(r => r[0])].map((c, i) => `<button class="b${i ? " off" : ""}">${c}</button>`).join("");
    $$("#flt button").forEach(b => b.onclick = () => {
        $$("#flt button").forEach(x => x.classList.add("off")); b.classList.remove("off");
        $$("#cmp tr").forEach(r => r.classList.toggle("hide", b.textContent != "Todos" && r.dataset.c != b.textContent))
    });

}