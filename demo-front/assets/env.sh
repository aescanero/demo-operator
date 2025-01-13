#!/bin/sh

# Ruta al archivo de configuración
CONFIG_FILE="/usr/share/nginx/html/config.js"

# Crear/sobrescribir el archivo de configuración
cat << EOF > $CONFIG_FILE
window.__RUNTIME_CONFIG__ = {
  VITE_AUTH_URL: "${VITE_AUTH_URL}",
  VITE_CLIENT_ID: "${VITE_CLIENT_ID}"
  VITE_TENNANT_ID: "${VITE_TENNANT_ID}"
};
EOF
