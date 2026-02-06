'use client';
import React from 'react';
import { Form, FormControl, FormField, FormItem, FormLabel } from '@/components/ui/form';
import * as z from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { TextEditor } from '@/components/shared/text-editor';
import { Button } from '@/components/ui/button';

const textEditorSchema = z.object({
  text: z.string().min(1, { message: 'This field is required' }),
});

type TextEditorType = z.infer<typeof textEditorSchema>;

interface TextEditorFormProps {
  onSubmit: (text: string) => void;
  text: string;
}

const TextEditorForm: React.FC<TextEditorFormProps> = ({ onSubmit, text }) => {
  const form = useForm<TextEditorType>({
    resolver: zodResolver(textEditorSchema),
    defaultValues: {
      text: text,
    },
  });

  const submit = async (data: TextEditorType) => {
    try {
      await onSubmit(data.text);
    } catch (error: any) {}
  };
  return (
    <div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(submit)} className="w-full space-y-4">
          <FormField
            control={form.control}
            name="text"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <TextEditor value={field.value} setValue={field.onChange} />
                </FormControl>
              </FormItem>
            )}
          />
          <div className="w-full flex items-center justify-end gap-4">
            <Button
              variant="outline"
              className="normal-text rounded-lg"
              disabled={!form.formState.isValid}
            >
              Cancel
            </Button>
            <Button
              addDoneIcon
              variant="default"
              className="normal-text rounded-lg"
              disabled={!form.formState.isValid}
            >
              Update
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default TextEditorForm;
