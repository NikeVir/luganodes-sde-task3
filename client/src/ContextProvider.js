import { createContext, useState } from "react";
const UserContext = createContext();


export function ContexProvider({children}){
    const [name,setName] = useState("");
    const [roomid,setRoomid] = useState("")

    return(
        <UserContext.Provider value={{name,setName,roomid,setRoomid}} >
            {children}
        </UserContext.Provider>
    )
}
export default UserContext;