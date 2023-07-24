import {createRoutesFromElements, defer, Route} from "react-router";
import {createBrowserRouter} from "react-router-dom";
import {ProtectedLayout} from "./Routing/ProtectedLayout";
import {HomeLayout} from "./Routing/HomeLayout";
import {AuthLayout} from "./Routing/AuthLayout";
import NewsAndAbout from "./Pages/NewsAndAbout";
import {LoginPage} from "./Pages/LoginPage";
import {RegisterPage} from "./Pages/RegisterPage";
import {GardenPage} from "./Pages/GardenPage";
import {DiscussionPage} from "./Pages/DiscussionPage";
import SinglePostPage from "./Pages/SinglePostPage";

const getUserData = () =>
    new Promise((resolve) =>
        setTimeout(() => {
            const user = window.localStorage.getItem("user");
            resolve(user);
        }, 0)
    );
export const router = createBrowserRouter(
    createRoutesFromElements(
        <Route
            element={<AuthLayout />}
            loader={() => defer({ userPromise: getUserData() })}>

            <Route element={<HomeLayout />}>
                <Route path="/" element={<NewsAndAbout />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/register" element={<RegisterPage />} />
            </Route>

            <Route path="/dashboard" element={<ProtectedLayout />}>
                <Route path="about" element={<NewsAndAbout />} />
                <Route path="discussion" element={<DiscussionPage />} />
                <Route path="discussion/:postID" element={<SinglePostPage/>} />
                <Route path="garden" element={<GardenPage />} />
            </Route>
        </Route>
    )
);