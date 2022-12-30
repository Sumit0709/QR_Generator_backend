const QRCode = require("qrcode");
const fs = require("fs");


exports.createQR = (req, res, next) => {

    // console.log(req.body);
    const errorCorrectionLevel = req.body.errorCorrectionLevel? req.body.errorCorrectionLevel: 'M';
    
    const dark = req.body.dark? req.body.dark: '#000000';
    const light = req.body.light? req.body.light: "#FFFFFF";
    
    const type = req.body.type? req.body.type: "jpeg";
    const margin = req.body.margin? parseInt(req.body.margin): 3;
    const width = req.body.width? parseInt(req.body.width): 500;
    const url = req.body.url? req.body.url: "www.google.com";

    // console.log("File type = "+type);

    const fl = "./qr_img/";
    // const fl = "../projfrontend/img/";
    const qr_options = {
        errorCorrectionLevel,
        version: "auto",
        mode: 'auto',
        color:{
            dark,
            light
        },
        type,
        quality: 0.95,
        margin,
        width
    }
    const fileName = Date.now()+"."+type;
    const filePath = fl+fileName;
    QRCode.toFile(`${fl+fileName}`,url,qr_options,(err, file)=>{
        if(err){
            console.log("Error in generating QR Code: " + err);
            return res.status(400).json({
                error: true,
                success: false,
                message: err
            })
        }
        else{
            console.log("QR Code created successfully : "+fileName)
            req.filePath = filePath;
            req.fileName = fileName
            next();
        }
    })

}

exports.getQR = (req, res) => {
    if(req.fileName && req.filePath){

        // Sending image File

        fs.access(req.filePath,fs.constants.F_OK,err => {
            if(err){
                return res.status(400).json({
                    error: true,
                    success: false,
                    message: "Error in generating QR Cod"
                })
            }
        });

        fs.readFile(req.filePath, (err, file)=>{
            
            if(err){
                return res.status(400).json({
                    error: true,
                    success: false,
                    message: "Error in generating QR Cod"
                })
            }
            else{
                res.writeHead(200, {
                    'Content-Length': Buffer.byteLength(file),
                    "Content-Type":"image.jpg"
                });
                return res.end(file);
            }
        })
        
    }else{
        return res.status(400).json({
            error: true,
            success: false,
            message: "Error in creating QR Code file"
        })
    }
}