import { Footer } from "./components/Footer/Footer";
import { Header } from "./components/Header/Header";
import { Dashboard } from "./components/Main/Dashboard/Dashboard";
import { Home } from "./components/Main/Home";
import { Registration } from "./components/Main/Register";

import { Route, Routes } from 'react-router-dom'
import { Login } from "./components/Main/Login";
import { Create } from "./components/Main/CRUD/Create";
import { Details } from "./components/Main/Details.js/Details";

import { getUserData } from "./service/localStorage";
import { useState } from "react";
import { Edit } from "./components/Main/CRUD/Edit";
import { Error404 } from "./components/Errors/404";

import IsGuest from "./components/Guard/IsGuest";
import HasUser from "./components/Guard/HasUser";

import IsOwner from "./components/Guard/IsOwner";

function App() {

  const [user, setUser] = useState(getUserData());

  return (
    <div id="wrapper">
      <Header user={user} setUser={setUser} />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/catalog" element={<Dashboard />} />
        <Route element={<IsGuest user={user} />}>

          <Route path="/create" element={<Create />} />

          <Route element={<IsOwner user={user} />}>
            <Route path="/edit/:id" element={<Edit />} />
          </Route>

        </Route>
        <Route path="/details/:detailId" element={<Details user={user} />} />
        <Route element={<HasUser user={user} />}>

          <Route path="/login" element={<Login setUser={setUser} />} />
          <Route path="/register" element={<Registration setUser={setUser} />} />

        </Route>
        <Route path="*" element={<Error404 />} />
      </Routes>

      <Footer />
    </div>

  );
}

export default App;
