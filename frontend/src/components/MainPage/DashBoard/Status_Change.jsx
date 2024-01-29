export default function StatusChange({status}){
    let color = null
    if(status ==="신청중") {color = "#8FFF00"}
    else if(status ==="검토중") {color = "#ffc107"}
    else if(status ==="취소" || status === "거절") {color = "#dc3545"}
    else if(status ==="예약확정") {color = "#006EEE"}
    else if(status ==="완료") {color = "#979797"}

    return <>
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="20" height="20">
          <path fill={color} d="M464 256A208 208 0 1 0 48 256a208 208 0 1 0 416 0zM0 256a256 256 0 1 1 512 0A256 256 0 1 1 0 256z"/>
        </svg>
    </>
}