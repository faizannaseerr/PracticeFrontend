'use client'
import { useState } from "react";
import Project from "../components/project";
import Modal from "../components/modal";

export default function Home() {
  const projects = [
    {
      title: "C2 Montreal",
      src: "C2 Montreal.png",
      colour: "#000000",
    },
    {
      title: "Office Studio",
      src: "Office Studio.png",
      colour: "#8C8C8C",
    },
    {
      title: "Locomotive",
      src: "Locomotive.png",
      colour: "#EFE8D3",
    },
    {
      title: "Silencio",
      src: "Silencio.png",
      colour: "#706D63",
    },
  ];

  const [modal, setModal] = useState({ active: false, index: 0 });
  return (
    <main>
      <div className="py-32">
        {
          projects.map((project, index) => {
            return (
              <Project key={index} index={index} title={project.title} setModal={setModal} />
            )
          })
        }
      </div>
      <Modal modal={modal} projects={projects} />
    </main>

  );
}
