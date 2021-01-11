import React from "react";

import { Track } from "../components";
import { FullPageLayout } from "./utils";

export default { title: "Components / Track", component: Track };

export const base = () => (
  <FullPageLayout>
    <Track
      goBack={() => console.log("goBack")}
      goHome={() => console.log("goHome")}
      goData={() => console.log("goData")}
      goCompletedTask={() => console.log("goCompletedTask")}
      goFeedback={() => console.log("goFeedback")}
      goSetting={() => console.log("goSetting")}
    />
  </FullPageLayout>
);
