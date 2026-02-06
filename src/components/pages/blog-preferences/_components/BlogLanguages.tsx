"use client";

import React, { useState } from "react";
import CreateButton from "@/components/shared/buttons/CreateButton";
import { Icons } from "@/components/ui/icons";
import { CreateStoreLanguageDialog } from "./CreateStoreLanguageDialog";
import { useGetBloglanguages } from "@/features/blog-preferences/services/queries";
import { Loading } from "@/components/shared/loading";
import { useReOrderBlogLanguages } from "@/features/blog-preferences/services/mutations";
import {
  DndContext,
  DragEndEvent,
  KeyboardSensor,
  MouseSensor,
  TouchSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  restrictToVerticalAxis,
  restrictToWindowEdges,
} from "@dnd-kit/modifiers";
import LangageItem from "./LanguageItem";
import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";

const BlogLanguages = () => {
  const [createDialogOpen, setCreateDialogOpen] = useState(false);

  const { data, isLoading } = useGetBloglanguages();
  const { mutateAsync: dragHandler } = useReOrderBlogLanguages();

  const sensors = useSensors(
    useSensor(MouseSensor, {}),
    useSensor(TouchSensor, {}),
    useSensor(KeyboardSensor, {})
  );

  if (isLoading) {
    return <Loading />;
  }

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;

    if (!data?.body?.data) return;

    const oldIndex = data?.body?.data.findIndex(
      (item: any) => item.id === active.id
    );
    const newIndex = data?.body?.data.findIndex(
      (item: any) => item.id === over.id
    );

    const newItems = [...data?.body?.data];
    const [movedItem] = newItems.splice(oldIndex, 1);
    newItems.splice(newIndex, 0, movedItem);

    const newArr = newItems.map((item, idx) => ({
      id: String(item.id),
      index: idx + 1,
    }));

    dragHandler({ items: newArr });
  };

  return (
    <div className="w-full p-4  border rounded-2xl">
      <div className="flex items-center justify-between pb-4">
        <div className="flex items-center gap-2">
          <Icons.Languages className="w-6 h-6" />
          <h2 className="text-sm md:text-base lg:text-lg font-bold">
            Blog Languages
          </h2>
        </div>
        <CreateButton asBtn onClick={() => setCreateDialogOpen(true)} />
      </div>
      <DndContext
        sensors={sensors}
        modifiers={[restrictToVerticalAxis, restrictToWindowEdges]}
        onDragEnd={handleDragEnd}
      >
        <SortableContext
          items={data?.body?.data.map((item: any) => item.id) ?? []}
          strategy={verticalListSortingStrategy}
        >
          {data?.body?.data.map((data, index) => (
            <LangageItem
              data={data}
              key={data.id}
              index={index + 1}
              disabled={data.key === "en"}
            />
          ))}
        </SortableContext>
      </DndContext>

      {createDialogOpen && (
        <CreateStoreLanguageDialog
          open={createDialogOpen}
          onClose={() => setCreateDialogOpen(false)}
        />
      )}
    </div>
  );
};

export default BlogLanguages;
