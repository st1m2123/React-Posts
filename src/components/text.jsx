import { useState, useEffect, useContext } from "react";
import {Context} from '../components/context'

export default function Test () { 
  const [context, setContext] = useContext(Context);
return(
  <p>Jopa{context.name}</p>
)
}