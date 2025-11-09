import Home from "./componets/Home"
import Login from "./componets/login"
import QuoteCard from "./componets/QuoteCard"
import Register from "./componets/register"
import { Route, Routes } from "react-router"
import Navbar from "./componets/Navbar"
import UserLayout from "./componets/UserLayout"
import ProtectedRoute from "./componets/ProtectedRoute"
import NotFound from "./componets/NotFound"
import Profile from "./componets/Profile"
import Logout from "./componets/LogOut"
import AddQuotes from "./componets/AddQuotes"

function App() {


  return (
    <>
      <div >
        <Routes>
          <Route index element=<Login /> />
          <Route path='/register' element=<Register /> />
          <Route path='/login' element=<Login /> />
          <Route path="/logout" element=<Logout /> />
          <Route path="/" element=<UserLayout /> >
            {/* <Route path="profile" element=<Profile /> /> */}
            <Route path="/my-quotes" element=<QuoteCard /> ></Route>
            <Route path="/add-quote" element=<AddQuotes /> ></Route>
            <Route path="home" element=<ProtectedRoute>
              <Home />
            </ProtectedRoute> />
            <Route path="profile" element=<ProtectedRoute>
              <Profile />
            </ProtectedRoute> />
            <Route path="my-quotes" element=<ProtectedRoute>
              <QuoteCard />
            </ProtectedRoute> />

          </Route>
          <Route path="*" element=<NotFound /> />

        </Routes>

      </div>

    </>
  )
}

export default App
