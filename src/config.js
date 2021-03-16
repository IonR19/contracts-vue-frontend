// export const API_URL = process.env.ip || 'http://172.20.99.195:5000'
const { VUE_APP_IP: ip, VUE_APP_PORT: port } = process.env;
export const API_URL = `http://${ip}:${port}`
