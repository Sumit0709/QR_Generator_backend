const QRCode = require("qrcode");

const url = "www.github.com";
const ext = ".png";
const qr_options = {
    errorCorrectionLevel: 'M',
    version: "auto",
    mode: 'auto',
    color: {
        dark: '#FFF',  // Black dots
        light: '#fff' // Transparent background
    },
    type: 'jpeg',
    quality: 0.95,
    margin: 3,
    scale: 7,
    width: 5000
}

QRCode.toFile(`./qr_img/${Date.now()}${ext}`,url,qr_options,(err, file)=>{
    if(err){
        console.log("Error in generating QR Code: " + err);
    }
    else{
        console.log("QR Code created successfully : "+file)
    }
})