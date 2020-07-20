import React from "react";

import { Error } from "../components/flow/Error";
import { Loading } from "../components/flow/Loading";

export default { title: "Pages / Flow" };

export const error = () => <Error />;
export const loading = () => <Loading />;
