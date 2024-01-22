import { configureStore } from "@reduxjs/toolkit"
import testSlice from "./redux_test"
const store =configureStore({
    reducer:{ test :  testSlice}
})
export default store