"use client";
import { useState } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import ChapterChip from "@/components/ui/chapterchip";
import SectionChip from "@/components/ui/sectionchip";

export interface ChapterData {
  chapter_number: string;
  chapter_name: string;
  chapter_source: string;
  section_count: number;
  section_list: string[];
}

const Sidebar: React.FC<{
  data: { chapter_count: number; chapter_details: ChapterData[] };
}> = ({ data }) => {
  const [activeChapter, setActiveChapter] = useState<string | null>(null);
  const [activeSection, setActiveSection] = useState<string | null>(null);

  const handleChapterClick = (chapterNumber: string) => {
    setActiveChapter(chapterNumber === activeChapter ? null : chapterNumber);
    setActiveSection(null);
  };

  const handleSectionClick = (section: string) => {
    setActiveSection(section === activeSection ? null : section);
  };

  return (
    <div className="w-full h-[300px] lg:h-[calc(100vh-4rem)] my-4">
      <ScrollArea
        className="h-[calc(100vh-2rem)] overflow-x-hidden px-4 mb-4"
        style={{
          scrollbarWidth: "thin",
        }}
      >
        <div className="space-y-6">
          {data.chapter_details.map((chapter) => (
            <div key={chapter.chapter_number} className="space-y-3">
              <ChapterChip
                chapter={chapter}
                isActive={activeChapter === chapter.chapter_number}
                onClick={() => handleChapterClick(chapter.chapter_number)}
              />

              {activeChapter === chapter.chapter_number && (
                <div className="ml-4 grid grid-cols-1 gap-2">
                  {chapter.section_list.map((section) => (
                    <SectionChip
                      key={section}
                      section={section}
                      isActive={activeSection === section}
                      onClick={() => handleSectionClick(section)}
                    />
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
};

export default Sidebar;
