import React from "react"
import { Route, Routes } from "react-router-dom"
import HomePage from "../../views/homePage"
import UserDetail from './../../views/userDetail'
export default function Content() {
    return (
        <main className="Content">
            <Routes>
                <Route index element={<HomePage />} />
                <Route path="/userdetails" element={<UserDetail />}>
                    <Route path=":email" element={<UserDetail />} />
                </Route>
            </Routes>
        </main>
    )
}