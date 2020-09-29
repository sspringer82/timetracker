import { createContext } from "react";
import Log from "./Log";

export const logContext = createContext<[Log[],React.Dispatch<React.SetStateAction<Log[]>>]>([[],() => {}]);