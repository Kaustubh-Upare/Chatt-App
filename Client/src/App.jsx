import "./app.css"
import { lazy, Suspense, useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ProtectRoute from "./components/auth/ProtectRoute";
import { LayoutLoaders } from "./components/layout/Loaders";
import Groups from "./pages/Groups";
import {server} from './components/constants/config'
import axios from "axios"
import {useDispatch, useSelector} from "react-redux"
import { userExists, userNotExists } from "./redux/reducers/auth";
import {Toaster} from "react-hot-toast"
import { useGetNotificationsQuery } from "./redux/api/api";
import { SocketProvider } from "./Socket";
import AuthPage from "./pages/AuthPage";

const Home=lazy(()=> import("./pages/Home"));
const Login=lazy(()=> import("./pages/Login"))
const ChatsGroup=lazy(()=> import("./pages/Chats"))

const AdminPage=lazy(()=>import("./pages/Admin/AdminPage"))
const DashBoard=lazy(()=>import("./pages/Admin/Dashboard"))
const AdminUsers=lazy(()=>import("./pages/Admin/AdminUsers"))
const AdminGroups=lazy(()=>import("./pages/Admin/AdminGroups"))
const AdminMsgs=lazy(()=>import("./pages/Admin/AdminMsgs"))

// let user=true;

function App() {

  const {user}=useSelector(state=> state.auth)
  const dispatch=useDispatch();

  useEffect(()=>{
    // console.log(server);
    axios.get(`${server}/user/me`,{ withCredentials:true })
          .then(({data})=>dispatch(userExists(data.data)))
          .catch((err)=>dispatch(userNotExists()))
  },[])


  return (
    <>
    <BrowserRouter>
    <Suspense fallback={<LayoutLoaders />}>
    <Routes>

      <Route element={<SocketProvider> <ProtectRoute user={user} /> </SocketProvider>}>

        <Route path="/" element={<Home/>} />
        <Route path="/about" element={<h1>About</h1>} />
        <Route path="/chats/:id" element={<ChatsGroup />} />
        <Route path="/groups" element={<Groups />} />
      </Route>

        <Route path='/a' element={<AuthPage />} />

        <Route path="/login" element={
          <ProtectRoute user={!user} redirect="/">
          <Login />
          </ProtectRoute>
          } />
        <Route />

          <Route path="/admin" element={<AdminPage />} />
          <Route path="/admin/dashboard" element={<DashBoard />} />
          <Route path="/admin/user" element={<AdminUsers />} />
          <Route path="/admin/group" element={<AdminGroups />} />
          <Route path="/admin/message" element={<AdminMsgs />} />

    </Routes>
    </Suspense>

    <Toaster position="bottom-center" />
    </BrowserRouter>
   
    </>
  )
}

export default App
