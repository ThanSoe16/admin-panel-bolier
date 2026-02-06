'use client';
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import baseApiService from '@/features/base/services/api';
import formatAnchorTagValue from '@/utils/formatAnchorTagValue';

const SEOLinkDialog = ({
  isOpen,
  onClose,
  onInsert,
  insertLink,
  useCustomPreview,
}: {
  isOpen: boolean;
  onClose: () => void;
  onInsert: (data: any) => void;
  insertLink: (url: string) => void;
  useCustomPreview?: boolean;
}) => {
  const [url, setUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // const isValidBrowserLink = (url: string): boolean => {
  //   if (!url) return false;
  //   url = url.trim().toLowerCase();

  //   // Exclude non-web protocols
  //   if (
  //     url.startsWith("mailto:") ||
  //     url.startsWith("tel:") ||
  //     url.startsWith("ftp:")
  //   ) {
  //     return false;
  //   }

  //   // If user typed without protocol, prepend https:// for validation
  //   const testUrl =
  //     url.startsWith("http://") || url.startsWith("https://")
  //       ? url
  //       : `https://${url}`;

  //   try {
  //     const parsed = new URL(testUrl);
  //     const host = parsed.hostname;

  //     const hasValidDomain = /^[a-z0-9.-]+\.[a-z]{2,}$/i.test(host);

  //     return hasValidDomain;
  //   } catch {
  //     return false;
  //   }
  // };

  const handleInsert = async () => {
    if (!url) {
      setError('Please enter a URL');
      return;
    }

    // const formattedUrl = url.includes(":") ? url : `https://${url}`;

    const formattedUrl = formatAnchorTagValue(url);

    // const isValid = isValidBrowserLink(url);

    // if (!isValid) {
    //   setError("Please enter a valid URL");
    //   return;
    // }

    if (!(formattedUrl.startsWith('http://') || formattedUrl.startsWith('https://'))) {
      insertLink(url);
      handleClose();
      return;
    }

    if (!useCustomPreview) {
      insertLink(url);
      handleClose();
      return;
    }

    setLoading(true);
    setError('');

    try {
      const response = await baseApiService.getSeoPreview({
        url: encodeURIComponent(formattedUrl),
      });

      if (!response?.meta?.success) {
        throw new Error('Failed to fetch URL');
      }

      const data = response?.body?.data;

      if (data) {
        onInsert(data);
        handleClose();
      }
    } catch (err) {
      insertLink(formattedUrl);
      handleClose();
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    setUrl('');
    setError('');
    setLoading(false);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle> Link </DialogTitle>
        </DialogHeader>

        <div className="flex flex-col gap-2 w-full">
          <div className="flex flex-row gap-2 w-full ">
            <div className="flex-1">
              <Input
                type="url"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                placeholder="https://example.com"
                autoFocus={false}
              />
            </div>
          </div>
          <div className="w-full flex flex-row justify-end gap-2">
            <Button onClick={handleClose} type="button" variant="outline">
              Cancel
            </Button>
            <Button onClick={handleInsert} disabled={loading || !url} className="w-fit">
              {loading ? 'Loading...' : 'Okay'}
            </Button>
          </div>
        </div>

        {error && <div className="text-red-500">{error}</div>}
      </DialogContent>
    </Dialog>
  );
};

export default SEOLinkDialog;
