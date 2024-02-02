export default function StatusButton({ status }) {
    let returnButton = null
    const newStatus = status%100
    if (newStatus === 1) {
        returnButton = <>
        <button type="button"style={{width:"80%"}}  className="btn btn-primary btn-sm d-flex px-3 gap-2 justify-content-center align-items-center" ><p className="m-0">1대1채팅 </p> <img style={{ width: 20, height: 20 }} src="/chat-dots.png" ></img></button>
        <button type="button" style={{width:"80%"}}  className="btn btn-danger btn-sm d-flex px-3 gap-2 justify-content-center align-items-center"><p className="m-0">취소하기  </p> <img style={{width:20, height:20}} src="/Close_MD.png" ></img></button>  </>
    }
    else if (newStatus === 2) {
        returnButton =<>
        <button type="button" style={{width:"80%"}} className="btn btn-success btn-sm d-flex px-3 gap-2 justify-content-center align-items-center"><p className="m-0">예약하기  </p> <img style={{width:20, height:20}} src="/Done_fill.png" ></img></button> 
        <button type="button" style={{width:"80%"}} className="btn btn-primary btn-sm d-flex px-3 gap-2 justify-content-center align-items-center" ><p className="m-0">1대1채팅 </p> <img style={{ width: 20, height: 20 }} src="/chat-dots.png" ></img></button>
        <button type="button" style={{width:"80%"}} className="btn btn-danger btn-sm d-flex px-3 gap-2 justify-content-center align-items-center"><p className="m-0">취소하기  </p> <img style={{width:20, height:20}} src="/Close_MD.png" ></img></button>  </>
            
    }
    else if (newStatus === 3) {
        returnButton = <>
        <button style={{width:"80%"}} type="button" className="btn btn-success btn-sm d-flex px-3 gap-2 justify-content-center align-items-center"><p className="m-0">영수중보기  </p> <img style={{ width: 20, height: 20 }} src="/File_Document.png" ></img></button>
            <button style={{width:"80%"}} type="button" className="btn btn-primary btn-sm d-flex px-3 gap-2 justify-content-center align-items-center" ><p className="m-0">1대1채팅 </p> <img style={{ width: 20, height: 20 }} src="/chat-dots.png" ></img></button> </>
    }
    else if (newStatus === 4) {
        returnButton = 
        <button  style={{ visibility: 'hidden' , width:"85%"}}  type="button" className="btn btn-success btn-sm d-flex px-3 gap-2  d-flex justify-content-center align-items-center"><p className="m-0">영수중보기</p> <img style={{ width: 20, height: 20 }} src="/File_Document.png" ></img></button>
    }
    else if (newStatus === 5) {
        returnButton = <>
        <button type="button"style={{width:"80%"}} className="btn btn-success btn-sm d-flex px-3 justify-content-center gap-2 align-items-center"><p className="m-0">재작성  </p> <img style={{ width: 20, height: 20 }} src="/File_Edit.svg" ></img></button></>
            
    }
    else if (newStatus ===6) {
        returnButton = <>
        <button type="button"  style={{width:"80%"}} className="btn btn-light btn-sm d-flex px-3 justify-content-center gap-2 align-items-center"><p className="m-0">후기작성  </p> <img style={{ width: 20, height: 20 }} src="/File_Edit_black.png" ></img></button></>
        
    }

    return (<>
        {returnButton}

    </>)
}