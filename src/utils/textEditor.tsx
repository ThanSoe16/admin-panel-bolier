import baseApiService from '@/features/base/services/api';

const replaceLinksWithPreview = async (htmlString: string): Promise<string> => {
  const parser = new DOMParser();
  const doc = parser.parseFromString(htmlString, 'text/html');

  const nodes = Array.from(doc.querySelectorAll('a.seo-preview-block[href]'));

  for (const a of nodes) {
    const url = a.getAttribute('href') || '';

    const response = await baseApiService.getSeoPreview({
      url: encodeURIComponent(url),
    });

    if (!response?.meta?.success) {
      throw new Error('Failed to fetch URL');
    }

    const data = response?.body?.data;

    if (!data) {
      throw new Error('Failed to fetch URL');
    }

    const SEOPreviewBlot = (await import('../components/shared/text-editor/seo-preview-blot'))
      .default;

    const blotNode = SEOPreviewBlot.create(data);

    a.replaceWith(blotNode);
  }

  return doc.body.innerHTML;
};

function replacePreviewWithLink(htmlString: string): string {
  const parser = new DOMParser();
  const doc = parser.parseFromString(htmlString, 'text/html');

  const nodes = Array.from(doc.querySelectorAll('div.seo-preview-block[data-url]'));

  nodes.forEach((div) => {
    const url = div.getAttribute('data-url');
    if (!url) return;

    const a = doc.createElement('a');
    a.setAttribute('href', url);
    a.setAttribute('class', 'seo-preview-block');
    a.textContent = url; // set content to just the URL

    div.replaceWith(a);
  });

  return doc.body.innerHTML;
}

const phoneSVGString = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-telephone" viewBox="0 0 16 16">
      <path d="M3.654 1.328a.678.678 0 0 1 .736-.072l2.261.9a.678.678 0 0 1 .393.529l.39 2.647a.678.678 0 0 1-.217.583L5.3 7.56a11.745 11.745 0 0 0 5.14 5.14l1.214-1.234a.678.678 0 0 1 .583-.217l2.647.39a.678.678 0 0 1 .529.393l.9 2.261a.678.678 0 0 1-.072.736l-2.034 2.448a.678.678 0 0 1-.645.215c-2.234-.598-4.482-2.095-6.71-4.322-2.227-2.228-3.724-4.476-4.322-6.71a.678.678 0 0 1 .215-.645L3.654 1.328z"/>
    </svg>`;

const emailSVGString = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-envelope-fill" viewBox="0 0 16 16">
    <path d="M.05 3.555A2 2 0 0 1 2 2h12a2 2 0 0 1 1.95 1.555L8 8.414.05 3.555zM0 4.697v7.104l5.803-3.803L0 4.697zm6.761 3.396L16 11.801V4.697l-5.803 3.803L8 9.586l-1.239-.493zm-6.761 4.11a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V4.697l-7.761 5.506-7.761-5.506V12.203z"/>
  </svg>`;

export { replaceLinksWithPreview, replacePreviewWithLink, phoneSVGString, emailSVGString };
