import { configureStore } from '@reduxjs/toolkit'

import { rootReducer } from '@/store/rootReducer'

export const createTestStore = () => configureStore({ reducer: rootReducer })
