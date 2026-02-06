"use client";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import dynamic from "next/dynamic";

import "react-quill-new/dist/quill.snow.css";
import "react-quill-new/dist/quill.core.css";
// import 'quill-emoji/dist/quill-emoji.css';
import { Quill as QuillType } from "react-quill-new";
import { toast } from "sonner";
import { useFileUpload } from "@/features/base/services/mutations";
import "./text-editor.css";
import "./TextEditor.css";
import PhoneDialog from "./PhoneDialog";
import EmailDialog from "./EmailDialog";
import SEOLinkDialog from "./SEOLinkDialog";
import { SEOPreviewData } from "@/features/base/types";
import { emailSVGString, phoneSVGString } from "@/utils/textEditor";
import { cleanAndRenameFile } from "@/utils/cleanAndRenameFile";

const Quill = dynamic(
  async () => {
    const { default: RQ } = await import("react-quill-new");
    if (typeof window !== "undefined") {
      const { ImageResize } = await import("quill-image-resize-module-ts");
      const CustomVideoBlot = (await import("./CustomVideoBlot")).default;
      const SEOPreviewBlot = (await import("./SEOPreviewBlot")).default;
      const CustomLinkBlot = (await import("./CustomLInkBlot")).default;

      RQ.Quill.register("modules/imageResize", ImageResize);
      RQ.Quill.register(CustomVideoBlot);
      RQ.Quill.register(SEOPreviewBlot);

      RQ.Quill.register(CustomLinkBlot);

      const icons: any = RQ.Quill.import("ui/icons");
      icons["phone"] = phoneSVGString;
      icons["email"] = emailSVGString;
    }

    const QuillComponent = ({ forwardedRef, ...props }: any) => (
      <RQ ref={forwardedRef} {...props} />
    );
    QuillComponent.displayName = "QuillComponent";
    return QuillComponent;
  },
  { ssr: false }
);

interface TextEditorProps {
  value: string;
  height?: string;
  setValue: (value: string) => void;
  error?: boolean;
  setImageId?: (id: string) => void;
  useCustomPreview?: boolean;
}

const toolbarOptions = {
  container: [
    ["bold", "italic", "underline"],
    ["blockquote", "code-block"],
    ["link", "phone", "email", "image"],
    [{ header: 1 }, { header: 2 }, { header: 3 }],
    [{ list: "ordered" }, { list: "bullet" }, { list: "check" }],
    [{ script: "sub" }, { script: "super" }],
    [{ indent: "-1" }, { indent: "+1" }],
    // [{ header: [1, 2, 3, 4, 5, 6, false] }],
    [{ align: "center" }, { align: "right" }, { align: "justify" }],
    ["video"],
    ["size"],
  ],
};

type DialogTypes = "" | "phone" | "email" | "seo-preview"; //empty string for close state

export const TextEditor: React.FC<TextEditorProps> = ({
  value,
  height = "125px",
  setValue,
  error,
  setImageId,
  useCustomPreview = false,
}) => {
  const quillRef = useRef<any>(null);
  const [isQuillReady, setIsQuillReady] = useState(false);
  const [activeDialogType, setActiveDialogType] = useState<DialogTypes>("");

  const { mutateAsync: uploadFile } = useFileUpload();

  const insertSEOPreview = (seoData: SEOPreviewData) => {
    const quill = quillRef.current.getEditor();
    const range = quill.getSelection(true);
    quill.insertEmbed(range.index, "seo-preview", seoData, "user");
    quill.setSelection(range.index + 1);
  };

  const insertLink = (url: string) => {
    const quill = quillRef.current.getEditor();
    const range = quill.getSelection(true);
    if (range.length === 0) {
      quill.insertText(range.index, url, "link", url);
      quill.setSelection(range.index + url.length);
    } else {
      quill.format("link", url);
    }
  };

  const phoneHandler = (phone: string) => {
    const editor = quillRef.current.getEditor();
    const range = editor.getSelection(true);

    if (!editor || !range) return;

    const href = `tel:${phone.replace(/\s+/g, "")}`;

    if (range.length === 0) {
      editor.insertText(range.index, phone, "link", href);
      editor.setSelection(range.index + phone.length);
    } else {
      editor.format("link", href);
    }
    setActiveDialogType("");
  };

  const emailHandler = (email: string) => {
    const editor = quillRef.current.getEditor();
    const range = editor.getSelection(true);

    if (!editor || !range) return;

    const href = `mailto:${email}`;

    if (range.length === 0) {
      editor.insertText(range.index, email, "link", href);
      editor.setSelection(range.index + email.length);
    } else {
      editor.format("link", href);
    }

    setActiveDialogType("");
  };

  const handleSingleUpload = () => {
    const input = document.createElement("input");
    try {
      // toast.success("Image upload started");
      input.setAttribute("type", "file");
      input.setAttribute("accept", "image/*");
      input.click();

      document.body.appendChild(input);

      // toast.success("input started");

      input.onchange = async () => {
        // toast.success("onChange handler started");
        let file = input?.files?.[0];
        input?.remove();

        if (!file) {
          toast.error("Failed to upload the image");
          return;
        }
        file = cleanAndRenameFile(file);
        // toast.success("Start calling api");

        const response = await uploadFile({ file });
        if (response?.meta?.success) {
          toast.success("Image uploaded successfully.");
          const editor = quillRef.current.getEditor();
          const range = editor.getSelection();
          if (range && response?.body?.data?.url) {
            editor.insertEmbed(range.index, "image", response?.body?.data?.url);
            const newPosition = editor.getLength();
            editor.setSelection(newPosition);
          }
        } else {
          toast.error(`Failed to upload image: ${response?.meta?.message}`);
        }
      };
    } catch (error: any) {
      const errorString =
        typeof error === "string" ? error : JSON.stringify(error);
      toast.error(`${errorString}`);
    } finally {
      // toast.success("input will be removed");
      input?.remove();
      // toast.success("input removed");
    }
  };

  const handleDrop = useCallback(
    async (event: DragEvent) => {
      event.preventDefault();
      event.stopPropagation();
      const files = event.dataTransfer?.files;

      if (files?.length) {
        const file = files[0];
        if (!file.type.startsWith("image/")) {
          toast.error("Only image files are allowed");
          return;
        }

        // Get editor instance
        const editor = quillRef.current.getEditor();
        const range = editor.getSelection() || { index: editor.getLength() };

        await uploadFile(
          { file },
          {
            onSuccess: (res) => {
              toast.success("Image uploaded successfully.");

              // Insert the S3 image at the cursor position or end of document
              editor.insertEmbed(range.index, "image", res?.body?.data?.url);
              const newPosition = editor.getLength();
              editor.setSelection(newPosition);
            },
            onError: () => {
              toast.error("Failed to upload image");
            },
          }
        );
      }
    },
    [uploadFile]
  );

  const isBase64Image = useCallback((url: string): boolean => {
    return /^data:image\/(png|jpeg|jpg|gif|webp);base64,/.test(url);
  }, []);

  const uploadImageToS3 = useCallback(
    async (file: File, editor: QuillType, range: { index: number }) => {
      try {
        const res = await uploadFile({ file });
        if (res?.body?.data?.url && !isBase64Image(res?.body?.data?.url)) {
          editor.insertEmbed(range.index, "image", res?.body?.data?.url);
          setImageId?.(res?.body?.data?.id);
          const newPosition = editor.getLength();
          editor.setSelection(newPosition);
          toast.success("Image uploaded successfully.");
        } else {
          toast.error("Failed to upload image.");
        }
      } catch (error) {
        console.error(error);
        toast.error("Failed to upload image.");
      }
    },
    [uploadFile]
  );

  const deleteBase64Images = useCallback(
    (editor: QuillType) => {
      try {
        const contents = editor.getContents();
        let hasBase64Image = false;

        let currentPosition = 0;
        contents.ops.forEach((op) => {
          if (op.insert) {
            if (typeof op.insert === "string") {
              currentPosition += op.insert.length;
            } else if ((op.insert as { image: string }).image) {
              if (isBase64Image((op.insert as { image: string }).image)) {
                // Delete the image at the current position
                editor.deleteText(currentPosition, 1);
                // Don't increment position since we're removing this item
                hasBase64Image = true;
              } else {
                // Move past this insert (1 for the image)
                currentPosition += 1;
              }
            }
          }
        });

        if (hasBase64Image) {
          // console.log("Base64 images have been removed from the editor.");
        }
      } catch (error) {
        // console.error("error on deleting base64 images", error);
      }
    },
    [isBase64Image]
  );

  useEffect(() => {
    if (isQuillReady && quillRef.current) {
      const editor = quillRef.current.getEditor();
      const editorContainer = editor.root;

      const handlePaste = async (event: ClipboardEvent) => {
        event.preventDefault();
        event.stopPropagation();

        const clipboardData = event.clipboardData;
        if (!clipboardData) return;

        const items = Array.from(clipboardData.items) ?? [];

        const filesToUpload: { file: File; range: { index: number } }[] = [];
        for (let i = 0; i < items.length; i++) {
          if (items[i].type.startsWith("image/")) {
            const file = items[i].getAsFile();
            if (!file) {
              toast.error("Failed to process the pasted image.");
              return;
            }

            const range = editor.getSelection() || {
              index: editor.getLength(),
            };
            filesToUpload.push({ file, range });
            // await uploadImageToS3(file, editor, range);
          }
        }

        for (const fileToUpload of filesToUpload) {
          await uploadImageToS3(fileToUpload.file, editor, fileToUpload.range);
          // console.log("fileToUpload", fileToUpload.range.index);
        }

        // Check for pasted base64 images in HTML content
        const pastedHtml = clipboardData.getData("text/html");
        if (pastedHtml && /<img[^>]+src="data:image\//i.test(pastedHtml)) {
          const base64Data = pastedHtml.match(
            /src="(data:image\/[^;]+;base64[^"]+)"/i
          )?.[1];
          if (!base64Data) {
            toast.error("Failed to process the pasted image.");
            return;
          }

          const byteString = atob(base64Data.split(",")[1]);
          const mimeString = base64Data.match(
            /^data:(image\/[^;]+);base64,/i
          )?.[1];
          const arrayBuffer = new ArrayBuffer(byteString.length);
          const uint8Array = new Uint8Array(arrayBuffer);
          for (let i = 0; i < byteString.length; i++) {
            uint8Array[i] = byteString.charCodeAt(i);
          }
          const file = new File([arrayBuffer], "pasted-image", {
            type: mimeString,
          });

          const range = editor.getSelection() || { index: editor.getLength() };
          await uploadImageToS3(file, editor, range);
          const newPosition = editor.getLength();
          editor.setSelection(newPosition);
        }

        deleteBase64Images(editor);
      };

      editorContainer.addEventListener("paste", handlePaste);

      return () => {
        editorContainer.removeEventListener("paste", handlePaste);
      };
    }
  }, [isQuillReady, deleteBase64Images, uploadImageToS3]);

  useEffect(() => {
    const checkQuillReady = () => {
      if (quillRef.current?.getEditor()) {
        setIsQuillReady(true);
      } else {
        setTimeout(checkQuillReady, 100);
      }
    };

    checkQuillReady();
  }, []);

  useEffect(() => {
    if (isQuillReady && quillRef.current) {
      const editor = quillRef.current.getEditor();
      const editorContainer = editor.root;

      // Handle backspace/delete key for video removal
      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === "Backspace" || e.key === "Delete") {
          const selection = editor.getSelection();
          if (!selection) return;

          const delta = editor.getContents();
          let position = 0;
          const videoPositions: number[] = [];

          // Find all video positions
          for (let i = 0; i < delta.ops.length; i++) {
            const op = delta.ops[i];
            if (op.insert) {
              if (typeof op.insert === "string") {
                position += op.insert.length;
              } else if (op.insert.video) {
                videoPositions.push(position);
                position += 1;
              } else {
                position += 1;
              }
            }
          }

          // Check for backspace - remove video that ends right before cursor
          if (e.key === "Backspace") {
            for (const videoPos of videoPositions) {
              if (selection.index === videoPos + 1) {
                e.preventDefault();
                editor.deleteText(videoPos, 1);
                return;
              }
            }
          }

          // Check for delete - remove video that starts at cursor position
          if (e.key === "Delete") {
            for (const videoPos of videoPositions) {
              if (selection.index === videoPos) {
                e.preventDefault();
                editor.deleteText(videoPos, 1);
                return;
              }
            }
          }
        }
      };

      // Prevent the default drop behavior entirely
      const preventDefaultDrop = (e: DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
      };

      editorContainer.addEventListener("keydown", handleKeyDown);
      editorContainer.addEventListener("dragover", preventDefaultDrop);
      // Use drop handler only through our custom function
      editorContainer.addEventListener("drop", handleDrop, { capture: true });

      return () => {
        editorContainer.removeEventListener("keydown", handleKeyDown);
        editorContainer.removeEventListener("dragover", preventDefaultDrop);
        editorContainer.removeEventListener("drop", handleDrop, {
          capture: true,
        });
      };
    }
  }, [handleDrop, isQuillReady]);

  // ---------------------------------------------------------------------------
  // Guarantee there is always a trailing newline so the cursor can be placed after a block embed (e.g. SEOPreviewBlot or Custom Video blot) that sits at the end of the document. Without this, the user cannot click or arrow-right to position the blot because Quill has no empty line to focus.---------------------------------------------------------------------------
  useEffect(() => {
    if (!isQuillReady || !quillRef.current) return;

    const editor = quillRef.current.getEditor();
    const delta = editor.getContents();
    if (!delta?.ops?.length) return;

    const lastOp = delta.ops[delta.ops.length - 1];
    const endsWithNewline =
      typeof lastOp.insert === "string" && /\n$/.test(lastOp.insert);

    if (!endsWithNewline) {
      // Position after the current last character
      const length = editor.getLength();
      editor.insertText(length, "\n");
    }
  }, [isQuillReady, value]);

  const videoHandler = async () => {
    const editor = quillRef.current?.getEditor();
    const range = editor?.getSelection();

    const url = prompt("Enter video URL:");
    if (!url || !range) return;

    let finalUrl = url;

    // Detect short TikTok link and resolve redirect
    if (url.includes("vt.tiktok.com")) {
      try {
        const response = await fetch(url, {
          method: "HEAD",
          redirect: "follow",
        });
        finalUrl = response.url;
      } catch (error) {
        alert("Failed to resolve TikTok short URL.");
        return;
      }
    }

    let embedUrl = "";

    const isTikTok = finalUrl.includes("tiktok.com");
    const isFacebook = finalUrl.includes("www.facebook.com");
    const isYouTubeEmbed = finalUrl.includes("embed");
    const isYouTubeWatch = finalUrl.includes("watch");
    const isYouTubeShort = /youtu\.be\//.test(finalUrl);

    if (isTikTok) {
      const match = finalUrl.match(/\/video\/(\d+)/);
      const videoId = match ? match[1] : null;
      if (videoId) {
        embedUrl = `https://www.tiktok.com/embed/${videoId}`;
      } else {
        alert("Invalid TikTok URL format.");
        return;
      }
    } else if (isFacebook) {
      const match =
        finalUrl.match(/\/videos\/(\d+)/) ||
        finalUrl.match(/[?&]v=([^&]+)/) ||
        finalUrl.match(/\/reel\/(\d+)/) ||
        finalUrl.match(/\/share\/v\/([a-zA-Z0-9]+)/);
      const videoId = match ? match[1] : null;
      if (videoId) {
        embedUrl = `https://www.facebook.com/plugins/video.php?href=${encodeURIComponent(
          finalUrl
        )}&show_text=0&width=560`;
      }
    } else if (isYouTubeEmbed) {
      embedUrl = finalUrl;
    } else if (isYouTubeWatch) {
      const match = finalUrl.match(/v=([^&]+)/);
      const videoId = match ? match[1] : null;
      if (videoId) {
        embedUrl = `https://www.youtube.com/embed/${videoId}`;
      }
    } else if (isYouTubeShort) {
      const match = finalUrl.match(/youtu\.be\/([^&#]+)/);
      const videoId = match ? match[1] : null;
      if (videoId) {
        embedUrl = `https://www.youtube.com/embed/${videoId}`;
      }
    } else {
      const ulrToInsert = finalUrl?.includes("://")
        ? finalUrl
        : `https://${finalUrl}`;
      insertLink(ulrToInsert);
    }

    if (embedUrl) {
      editor.insertEmbed(range.index, "video", embedUrl);
      const newPosition = editor.getLength();
      editor.setSelection(newPosition);
    }
  };

  const modules = useMemo(
    () => ({
      toolbar: {
        container: toolbarOptions.container,
        handlers: {
          image: () => handleSingleUpload(),
          video: videoHandler,
          phone: () => setActiveDialogType("phone"),
          email: () => setActiveDialogType("email"),
          link: () => setActiveDialogType("seo-preview"),
        },
      },
      imageResize: {
        modules: ["Resize", "DisplaySize"],
      },
    }),
    []
  );

  return (
    <>
      <Quill
        forwardedRef={quillRef}
        theme="snow"
        value={value}
        onChange={(value: any) => setValue(value)}
        modules={modules}
        height={height}
        placeholder={value ? "" : "Write something..."}
      />

      {activeDialogType === "phone" && (
        <PhoneDialog
          open={activeDialogType === "phone"}
          handleClose={() => setActiveDialogType("")}
          handleOkay={phoneHandler}
        />
      )}

      {activeDialogType === "email" && (
        <EmailDialog
          open={activeDialogType === "email"}
          handleClose={() => setActiveDialogType("")}
          handleOkay={emailHandler}
        />
      )}

      {activeDialogType === "seo-preview" && (
        <SEOLinkDialog
          isOpen={activeDialogType === "seo-preview"}
          onClose={() => setActiveDialogType("")}
          onInsert={insertSEOPreview}
          insertLink={insertLink}
          useCustomPreview={useCustomPreview}
        />
      )}
    </>
  );
};
