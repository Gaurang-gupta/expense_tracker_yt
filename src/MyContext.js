import { createContext } from "react";

const user = {
    name: "",
    photoUrl: "",
    email: "",
}

export const MyContext = createContext(user)