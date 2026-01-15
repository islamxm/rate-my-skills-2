import { useDispatch as d, useSelector as s } from "react-redux";

export const useSelector = s.withTypes<StoreType>()
export const useDispatch = d.withTypes<DispatchType>()