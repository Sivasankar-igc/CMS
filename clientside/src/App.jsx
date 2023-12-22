import HomePage from "./Components/homePage";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Profile from "./Components/profile";
import UserLP from "./Components/userLogin";
import Signin from "./Components/signin";
const App = () => {
  return (
    <>
      {/* <AdminLP/> */}
      {/* <HomePage/> */}
      {/* <BlogPage/> */}
      {/* <AdminPanel/> */}
      <BrowserRouter>
        <Routes>
          <Route index element={<UserLP/>}/>
          <Route path="profile" element={<Profile/>}/>
          <Route path="userLogin" element={<Signin/>}/>
          <Route path="homepage" element={<HomePage/>}/>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App;