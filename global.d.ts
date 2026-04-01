declare module "*.module.scss" {
  const classes: { [key: string]: string };
  export default classes;
}

declare global {
  type StoreType = import('./src/store/config').RootState
  type DispatchType = import('./src/store/config').AppDispatch
  type DefFunc = (...args:any[]) => any
}
export {}