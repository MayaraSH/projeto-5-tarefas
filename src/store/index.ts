import { configureStore } from '@reduxjs/toolkit'

import tarefasReducer from './redurcers/tarefas'
import filtroReducer from './redurcers/filtro'

const store = configureStore({
  reducer: {
    tarefas: tarefasReducer,
    filtro: filtroReducer
  }
})

export type RootReducer = ReturnType<typeof store.getState>

export default store
