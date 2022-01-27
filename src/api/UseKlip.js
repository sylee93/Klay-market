import axios from "axios";

export const getAddress = (setQrvalue) => {
 
    axios.post(
        "https://a2a-api.klipwallet.com/v2/a2a/prepare",{
            bapp: {
                name: "KLAY_MAKET",
            },
            type : "auth",
        })
        .then((response) => {
        const {request_key} = response.data;
        const qrcode = `https://klipwallet.com/?target=/a2a?request_key=${request_key}`;
        setQrvalue(qrcode);
        let timerId = setInterval(()=> {
            axios.get(`https://a2a-api.klipwallet.com/v2/a2a/result?request_key=${request_key}`).then((res) => {
                if(res.data.result){
                    console.log(`[Result] ${JSON.stringify(res.data.result)}`);
                    clearInterval(timerId);
                }
            });
        }, 1000);
    });
}