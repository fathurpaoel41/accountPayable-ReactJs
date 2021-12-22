import React from "react";
import { Redirect } from "react-router-dom";

// Layout Types
import { DefaultLayout } from "./layouts";

// Route Views
import BlogOverview from "./views/BlogOverview";
import UserProfileLite from "./views/UserProfileLite";
import AddNewPost from "./views/AddNewPost";
import Errors from "./views/Errors";
import ComponentsOverview from "./views/ComponentsOverview";
import Tables from "./views/Tables";
import BlogPosts from "./views/BlogPosts";
import BlankPage from "./views/BlankPage";
import Dashboard from "./views/Page/Dashboard/Dashboard";
import RequestStatus from "./views/Page/RequestStatus/RequestStatus";
import InsertRequest from "./views/Page/RequestStatus/InsertRequest";
import EditRequest from "./views/Page/RequestStatus/EditRequest";
import Invoice from "./views/Page/Invoice/Invoice";
import Tagihan from "./views/Page/Tagihan/Tagihan";

export default [
  {
    path: "/",
    exact: true,
    layout: DefaultLayout,
    component: () => <Redirect to="/dashboard" />
  },
  {
    path: "/dashboard",
    layout: DefaultLayout,
    component: Dashboard
  },
  {
    path: "/request-status",
    layout: DefaultLayout,
    component: RequestStatus
  },
  {
    path: "/insert-request",
    layout: DefaultLayout,
    component: InsertRequest
  },
  {
    path: "/edit-request",
    layout: DefaultLayout,
    component: EditRequest
  },
  {
    path: "/invoice",
    layout: DefaultLayout,
    component: Invoice
  },
  {
    path: "/tagihan",
    layout: DefaultLayout,
    component: Tagihan
  },
  {
    path: "/blog-overview",
    layout: DefaultLayout,
    component: BlogOverview
  },
  {
    path: "/user-profile-lite",
    layout: DefaultLayout,
    component: UserProfileLite
  },
  {
    path: "/add-new-post",
    layout: DefaultLayout,
    component: AddNewPost
  },
  {
    path: "/errors",
    layout: DefaultLayout,
    component: Errors
  },
  {
    path: "/components-overview",
    layout: DefaultLayout,
    component: ComponentsOverview
  },
  {
    path: "/tables",
    layout: DefaultLayout,
    component: Tables
  },
  {
    path: "/blog-posts",
    layout: DefaultLayout,
    component: BlogPosts
  },
  {
    path: "/blank-page",
    layout: DefaultLayout,
    component: BlankPage
  }
];
