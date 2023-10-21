import { configureStore } from '@reduxjs/toolkit'

import operationReducer from './userSlice'

export default configureStore({
    reducer: {
        operation: operationReducer
    }
})