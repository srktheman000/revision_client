"use client";
import { type FC } from "react";
import Layout from "./layout";
import TopBar from "@/components/pages/chat/TopBar";
import Sidebar from "@/components/pages/chat/Sidebar";
import ChatArea from "@/components/pages/chat/ChatArea";
import data from "../../lib/testData";

const App: FC = () => {
  return (
    <Layout>
      <div className="flex flex-col h-screen w-full">
        <TopBar
          title="Science"
          grade="7Th"
          onBackClick={() => console.log("Back clicked")}
        />
        <div className="flex-1 flex flex-col lg:flex-row overflow-hidden">
          <div className="w-full lg:w-1/4 border-b lg:border-r border-zinc-800">
            <Sidebar data={data} />
          </div>
          <div className="flex-1">
            <ChatArea />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default App;
