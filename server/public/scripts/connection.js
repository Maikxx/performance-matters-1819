"use strict";window.addEventListener("load",function(){function n(){var n=document.querySelector(".ConnectionMarker");navigator.onLine?(n.textContent="Online",n.classList.add("ConnectionMarker--online")):(n.textContent="Offline",n.classList.remove("ConnectionMarker--online"))}n(),window.addEventListener("online",n),window.addEventListener("offline",n)});