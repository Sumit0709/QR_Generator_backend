
const Create = async (errorCorrectionLevel, dark,light, type, margin, width, url) => {
    console.log("CREATE");

    const fl = "../qr_img/";
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
    QRCode.toFile(`${fl+fileName}`,url,qr_options,(err, file)=>{
        if(err){
            console.log("Error in generating QR Code: " + err);
            return {
                error: true,
                success: false,
                message: err
            }
        }
        else{
            console.log("QR Code created successfully : "+fileName)
            return {
                error: false,
                success: true,
                message: "QR Code created successfully",
                file: fileName
            };
        }
    })

}