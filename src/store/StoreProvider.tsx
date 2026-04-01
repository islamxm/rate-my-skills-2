import type { FC, PropsWithChildren } from 'react'
import {Provider} from 'react-redux'
import { store } from './config'

type Props = PropsWithChildren

export const StoreProvider:FC<Props> = ({
  children
}) => {

  return (
    <Provider store={store}>
      {children}
    </Provider>
  )
}