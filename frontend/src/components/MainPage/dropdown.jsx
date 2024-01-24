import StatusButton from "./statusbutton"

export default function DropDown({companyName,price,text,status}){
    const newprice = price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
    return (<>
        <div className='rounded-3 p-2 d-flex justify-content-around text-center align-items-center position-relative' style={{ border: '1px solid #006EEE', minHeight: "8rem"  }}>
            <img src="/randomimg.png" style={{width:70 ,height:70}} ></img>
            <div className="col-md-2">
                <p className="m-0">업체명 : {companyName} </p>
                <p className="m-0">가격 : {newprice} </p>
        
            </div>
            <p className="m-0 col-md-2">{text}</p>
            <p className="m-0 col-md-2">{status}</p>
            <div className="d-flex gap-1 flex-column align-items-center col-md-2">
             <StatusButton  status={status}/>
            </div>
            
        </div>
    </>)
}