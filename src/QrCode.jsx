import { useState } from "react"





const QrCode = () => {

    const [img, setImg] = useState("")

    const [loading, setLoading] = useState(false)

    const [qr,setQr] = useState('')

    const [qrsize,setQrsize] =useState("150")

  async  function generateQR() {
        setLoading(true);
        try{
            const url = `https://api.qrserver.com/v1/create-qr-code/?size=${qrsize}x${qrsize}&data=${encodeURIComponent(qr)}`

            setImg(url);
        }catch(err){
            console.log(err)
        }finally{
            setLoading(false)
        }
    }

    function downloadQR() {
        fetch(img).then((response)=>response.blob()).then((blob)=>{
            const link=document.createElement("a")
            link.href = URL.createObjectURL(blob)
            link.download="qr.png"
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        })
    }

    return (
        <div className="app-container">
            <h1>QR CODE GENERATOR</h1>
            {loading && <p>Please Wait...</p> }
            {img && <img className="qr-img" src={img} alt="" />}
            <div>
                <label htmlFor="dataInput" className="input-label">
                    Data for QR code :
                </label>

                <input onChange={(e)=>setQr(e.target.value)} value={qr} type="text" id="dataInput" placeholder="Enter url or paste " />

                <label htmlFor="sizeInput" className="input-label">
                    Image size (e.g., 150 - max : 450)
                </label>

                <input value={qrsize} onChange={(e)=>setQrsize(e.target.value)} type="text" id="sizeInput" placeholder="Enter image Size" />

                <button onClick={generateQR} className="generate-btn" disabled = {loading}>Generate QR Code</button>

                <button onClick={downloadQR} className="download-btn">Download QR Code</button>

            </div>
            <p className="footer">Designed by <a href=""> Karthik</a></p>
        </div>
    )
}




export default QrCode