import ClipLoader from "react-spinners/ClipLoader";

const Loading = () => {
    return (
        <center style={{ display : "grid", placeItems : "center" , height : "100vh"}}>
            <div style={{ placeItems : "center"}}>
                {/* <img 
                    src="https://assets.stickpng.com/images/580b57fcd9996e24bc43c543.png"
                    style={{ marginBottom : 50}}
                    height={120}
                /> */}
                <ClipLoader color="#3CBC28" loading={true}  size={70} />
            </div>
        </center>
    )
}

export default Loading;