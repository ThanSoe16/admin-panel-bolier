'use client';
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { FormControl, FormField, FormItem, Form } from '@/components/ui/form';
import { Image } from '@/components/ui/image';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { LandingLanguage } from '@/features/landing-languages/types';
import { TutorialsEnum } from '@/features/base/types/backend-defined-enums';
import { CreateTutorialRequest } from '@/features/settings/tutorials/types';
import VideoUploader from '@/components/shared/input/video-uploader';
import { X } from 'lucide-react';

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

interface TutorialFormProps {
  form: any;
  handleClose: () => void;
  languages?: LandingLanguage[];
  mode: 'create' | 'update' | 'view';
  isLoading?: boolean;
  onSubmit: (data: CreateTutorialRequest) => void;
  defaultVideoSource?: 'youtube' | 'upload';
  tutorial?: any;
}

const TutorialForm: React.FC<TutorialFormProps> = ({
  form,
  handleClose,
  languages,
  mode = 'create',
  isLoading = false,
  onSubmit,
  defaultVideoSource = 'youtube',
  tutorial,
}) => {
  const [videoSource, setVideoSource] = useState<'youtube' | 'upload'>(defaultVideoSource);

  // Update videoSource when defaultVideoSource changes
  useEffect(() => {
    setVideoSource(defaultVideoSource);
  }, [defaultVideoSource]);

  const handleSubmit = (data: CreateTutorialRequest) => {
    // Validate that either YouTube link or video file is provided
    if (videoSource === 'youtube' && !data.videoLink) {
      form.setError('videoLink', { message: 'Please provide a YouTube link' });
      return;
    }
    if (videoSource === 'upload' && !data.videoId) {
      form.setError('videoFile', { message: 'Please upload a video' });
      return;
    }
    onSubmit(data);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="VideoType"
          render={({ field }) => (
            <FormItem>
              <Label>Video Type</Label>
              <Select
                value={field.value}
                onValueChange={field.onChange}
                disabled={mode === 'view' || mode === 'update'}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select video type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value={TutorialsEnum.LANDING}>Landing</SelectItem>
                  <SelectItem value={TutorialsEnum.PURCHASED_TEMPLATE}>
                    Purchased Template
                  </SelectItem>
                </SelectContent>
              </Select>
            </FormItem>
          )}
        />

        <div className="space-y-4">
          <div className="flex gap-4">
            <Button
              type="button"
              variant={videoSource === 'youtube' ? 'default' : 'outline'}
              onClick={() => {
                setVideoSource('youtube');
                form.setValue('videoId', '');
                form.setValue('videoFile', '');
              }}
            >
              YouTube Link
            </Button>
            <Button
              type="button"
              variant={videoSource === 'upload' ? 'default' : 'outline'}
              onClick={() => {
                setVideoSource('upload');
                form.setValue('videoLink', '');
              }}
            >
              Upload Video
            </Button>
          </div>

          {videoSource === 'youtube' ? (
            <>
              {mode === 'update' &&
                form.getValues('videoLink') &&
                form.getValues('videoLink').trim() !== '' && (
                  <div className="mb-4">
                    <Label>Current Video Preview</Label>
                    <div className="aspect-video mt-2">
                      <iframe
                        src={getYouTubeEmbedUrl(form.getValues('videoLink'))}
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        className="rounded-xl h-full w-full aspect-video"
                        allowFullScreen
                        loading="eager"
                      />
                    </div>
                  </div>
                )}
              <FormField
                control={form.control}
                name="videoLink"
                render={({ field }) => (
                  <FormItem>
                    <Label>YouTube Video Link</Label>
                    <FormControl>
                      <Input
                        placeholder="Enter YouTube video link"
                        {...field}
                        disabled={mode === 'view'}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
            </>
          ) : (
            <>
              {mode === 'update' && form.getValues('videoId') ? (
                <div className="mb-4">
                  <div className="flex justify-between items-center mb-2">
                    <Label>Current Video Preview</Label>
                  </div>
                  <div className="relative aspect-video mt-2">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="absolute right-1 -top-1 h-6 w-6 text-white bg-error hover:bg-error-secondary rounded-full p-1 z-50"
                      onClick={() => {
                        form.setValue('videoId', '');
                        form.setValue('videoLink', '');
                      }}
                    >
                      <X className="w-4 h-4" />
                    </Button>
                    <video
                      src={form.getValues('videoFile') || tutorial?.Video?.url}
                      controls
                      className="rounded-xl h-full w-full aspect-video object-fill"
                      preload="auto"
                    />
                  </div>
                </div>
              ) : (
                <FormField
                  control={form.control}
                  name="videoFile"
                  render={({ field }) => (
                    <FormItem>
                      <Label>Upload Video</Label>
                      <FormControl>
                        <VideoUploader
                          disabled={mode === 'view'}
                          videoURL={field.value || ''}
                          setVideoURL={(url) => {
                            field.onChange(url);
                            if (!url) {
                              form.setValue('videoId', '');
                            }
                          }}
                          setVideoID={(value: string) => form.setValue('videoId', value)}
                          limitations="Acceptable formats: MP4, WebM. Max file size: 100MB"
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
              )}
            </>
          )}
        </div>

        <div className="space-y-4">
          <Label>Content</Label>
          {languages ? (
            languages.map((language, index) => (
              <div key={language.id} className="p-4 border rounded-lg space-y-4">
                <div className="flex items-center space-x-2">
                  <Image
                    src={language?.File?.url}
                    width={20}
                    height={20}
                    alt="icon"
                    className="rounded-full w-5 h-5"
                  />
                  <p className="font-bold text-default text-base">For {language.name}</p>
                </div>

                <FormField
                  control={form.control}
                  name={`TutorialContent.${index}.name`}
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input
                          placeholder="Enter tutorial title"
                          {...field}
                          disabled={mode === 'view'}
                          maxLength={60}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name={`TutorialContent.${index}.description`}
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Textarea
                          placeholder="Enter tutorial description"
                          {...field}
                          disabled={mode === 'view'}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name={`TutorialContent.${index}.languageId`}
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input type="hidden" {...field} value={language.id} />
                      </FormControl>
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name={`TutorialContent.${index}.id`}
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input type="hidden" {...field} />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>
            ))
          ) : (
            <p className="text-muted">No languages available.</p>
          )}
        </div>

        <div className="flex flex-row gap-4 justify-end items-center mt-4">
          <Button
            variant="outline"
            className="text-text-primary"
            type="button"
            onClick={handleClose}
          >
            Cancel
          </Button>
          {mode !== 'view' && (
            <Button loading={isLoading} addDoneIcon>
              {mode === 'create' ? 'Create' : 'Update'}
            </Button>
          )}
        </div>
      </form>
    </Form>
  );
};

export default TutorialForm;
