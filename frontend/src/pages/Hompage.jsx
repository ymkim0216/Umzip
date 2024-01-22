import { useDispatch, useSelector } from "react-redux"
import { testAction } from "../store/redux_test"

export default function HomePage() {
    const count = useSelector(state=>state.test.count)
    const dispatch = useDispatch()
    const onClickHandler = ()=>{
        dispatch(testAction.addcount())
    }
    return(<>
        <h1>HomePage</h1>
        <h2>{count}</h2>
        <button onClick={onClickHandler}>Click!</button>
    </>)

}