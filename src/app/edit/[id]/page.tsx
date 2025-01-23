"use client";

import dynamic from "next/dynamic";

const Editor = dynamic(
  () => import("../../features/editor/editor").then((mod) => mod.Editor),
  {
    ssr: false,
  }
);

export default function Edit() {
  return <Editor />;
}
