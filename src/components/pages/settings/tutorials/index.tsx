"use client"
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Plus, MoreVertical } from "lucide-react";
import { TutorialsEnum } from '@/features/base/types/backend-defined-enums';
import { useGetFAQs } from '@/features/settings/tutorials/services/queries';
import { TutorialData } from '@/features/settings/tutorials/types';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from '@/lib/utils';
import { useGetLandingLanguages } from '@/features/landing-languages/services/queries';
import CreateModal from './components/CreateModal';
import EditModal from './components/EditModal';
import DeleteModal from './components/DeleteModal';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const getYouTubeEmbedUrl = (url: string) => {
  // Handle both regular YouTube URLs and already embedded URLs
  if (url?.includes('youtube.com/embed/')) {
    return url;
  }

  // Extract video ID from various YouTube URL formats
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
  const match = url?.match(regExp);
  
  if (match && match[2].length === 11) {
    return `https://www.youtube.com/embed/${match[2]}`;
  }
  
  // If it's not a YouTube URL, return the original URL
  return url;
};

const Tutorials = () => {
  const [activeTab, setActiveTab] = useState<TutorialsEnum>(TutorialsEnum.LANDING);
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [selectedTutorial, setSelectedTutorial] = useState<TutorialData | null>(null);

  const { data: landingLanguages } = useGetLandingLanguages();
  const { data: tutorialsData, isLoading } = useGetFAQs({ type: activeTab });

  const tabList = [
    { value: TutorialsEnum.LANDING, label: 'Landing Tutorials' },
    { value: TutorialsEnum.PURCHASED_TEMPLATE, label: 'Template Tutorials' }
  ];

  const handleOpenCreateDialog = () => {
    setIsCreateDialogOpen(true);
  };

  const handleOpenEditDialog = (tutorial: TutorialData) => {
    setSelectedTutorial(tutorial);
    setIsEditDialogOpen(true);
  };

  const handleOpenDeleteDialog = (tutorial: TutorialData) => {
    setSelectedTutorial(tutorial);
    setIsDeleteDialogOpen(true);
  };

  return (
    <div className="container mx-auto py-6">
      <div className="flex justify-between items-center gap-4 mb-6">
        <h1 className="text-xl md:text-2xl font-bold">Tutorials</h1>
        <Button onClick={handleOpenCreateDialog}>
          <Plus className="h-4 w-4" /> Create
        </Button>
      </div>

      <div className="flex flex-row flex-wrap gap-2 mb-6 z-60">
        {tabList.map((tab) => (
          <button
            key={tab.value}
            onClick={() => setActiveTab(tab.value)}
            className={cn(
              'py-2 px-4 rounded-xl text-sm',
              activeTab === tab.value
                ? 'bg-brand-secondary text-brand border border-stroke-secondary font-bold'
                : 'bg-[#F7F7F7] text-default-secondary'
            )}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div className="mt-4">
        {isLoading ? (
          <div>Loading...</div>
        ) : (
          <div className="grid gap-4">
            {tutorialsData?.body?.data.map((tutorial) => (
              <Card key={tutorial.id}>
                <CardHeader className='!pb-0'>
                  <div className="flex justify-between items-start">
                    <div className='flex flex-col gap-2'>
                      <CardTitle>
                        {tutorial.TutorialContent.find(content => content.Language.key === "en")?.name || tutorial.TutorialContent[0]?.name}
                      </CardTitle>
                      <CardDescription>
                        {tutorial.TutorialContent.find(content => content.Language.key === "en")?.description || tutorial.TutorialContent[0]?.description}
                      </CardDescription>
                    </div>
                    <div className="hidden md:flex items-center justify-center gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleOpenEditDialog(tutorial)}
                        className="w-full justify-start"
                      >
                        Edit
                      </Button>
                      <Button
                        variant="destructive"
                        size="sm"
                        onClick={() => handleOpenDeleteDialog(tutorial)}
                        className="w-full justify-start"
                      >
                        Delete
                      </Button>
                    </div>
                    <div className="md:hidden">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <MoreVertical className="h-4 w-4" />
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem onClick={() => handleOpenEditDialog(tutorial)}>
                            Edit
                          </DropdownMenuItem>
                          <DropdownMenuItem 
                            onClick={() => handleOpenDeleteDialog(tutorial)}
                            className="text-destructive"
                          >
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className=''>
                  <div className='w-full h-fit'>
                    {tutorial.videoId ? (
                      <video
                        src={tutorial?.Video?.url}
                        controls
                        className="rounded-xl h-full w-full aspect-video object-fill"
                      />
                    ) : (
                      <iframe
                        src={getYouTubeEmbedUrl(tutorial.videoLink)}
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        className="rounded-xl h-full w-full aspect-video"
                        allowFullScreen
                        loading="eager"
                      />
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>

      {isCreateDialogOpen && <CreateModal
        open={isCreateDialogOpen}
        handleClose={() => setIsCreateDialogOpen(false)}
        languages={landingLanguages?.body?.data || []}
      />}

      {isEditDialogOpen && <EditModal
        open={isEditDialogOpen}
        handleClose={() => {
          setIsEditDialogOpen(false);
          setSelectedTutorial(null);
        }}
        tutorial={selectedTutorial}
      />}

      {isDeleteDialogOpen && <DeleteModal
        open={isDeleteDialogOpen}
        handleClose={() => {
          setIsDeleteDialogOpen(false);
          setSelectedTutorial(null);
        }}
        tutorial={selectedTutorial}
      />}
    </div>
  );
};

export default Tutorials;
