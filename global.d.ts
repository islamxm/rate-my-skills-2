declare module "*.module.scss" {
  const classes: { [key: string]: string };
  export default classes;
}

declare global {
  type StoreType = import('./src/app/providers/redux/config').RootState
  type DispatchType = import('./src/app/providers/redux/config').AppDispatch
  type DefFunc = (...args:any[]) => any
}
export {}