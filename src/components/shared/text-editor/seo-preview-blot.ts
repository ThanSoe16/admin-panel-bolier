import Quill from 'quill';
import 'react-quill-new/dist/quill.snow.css';
import { SEOPreviewData } from '@/features/base/types';

// Custom Blot for SEO Preview
const BlockEmbed = Quill.import('blots/block/embed') as any;

class SEOPreviewBlot extends BlockEmbed {
  static blotName = 'seo-preview';
  static tagName = 'div';
  static className = 'seo-preview-block';

  static create(value: SEOPreviewData) {
    const node = super.create();
    node.setAttribute('contenteditable', 'false');
    node.setAttribute('class', 'seo-preview-block');
    node.setAttribute('data-url', value?.url || '');

    // Add a wrapper with expected class
    const container = document.createElement('div');
    container.className = 'seo-preview-container';

    // Outer container (same as before)
    const outer = document.createElement('div');
    outer.classList.add('seo-preview-outer');
    outer.style.border = '1px solid #D3D3D3';
    outer.style.padding = '8px';
    outer.style.paddingTop = '0';
    outer.style.borderRadius = '8px';
    outer.style.width = '100%';
    outer.style.maxWidth = '500px';
    outer.style.boxSizing = 'border-box';
    outer.style.position = 'relative';
    outer.style.marginLeft = 'auto';
    outer.style.marginRight = 'auto';

    // URL (header)
    const url = document.createElement('a');
    url.href = value?.url || '';
    url.target = '_blank';
    url.className = 'seo-preview-url';
    url.style.color = '#4380ED';
    url.style.fontSize = '14px';
    url.style.textDecoration = 'underline';
    url.style.cursor = 'pointer';
    url.style.fontWeight = 'normal';
    url.style.marginBottom = '4px';
    url.textContent = value?.url?.includes('http') ? value.url : `https://${value?.url || ''}`;
    outer.appendChild(url);

    // Inner box
    const innerBox = document.createElement('a');
    innerBox.style.display = 'flex';
    innerBox.style.flexDirection = 'row';
    innerBox.style.gap = '6px';
    innerBox.style.backgroundColor = '#f9f9f9';
    innerBox.style.padding = '8px';
    innerBox.style.borderRadius = '8px';
    innerBox.style.overflow = 'hidden';
    innerBox.style.marginTop = '4px';
    innerBox.href = value?.url || '';
    innerBox.target = '_blank';
    innerBox.style.textDecoration = 'none';

    // Image
    const imgSrc = value?.ogImage || (value as any)?.image;
    if (imgSrc) {
      const img = document.createElement('img');
      img.src = imgSrc;
      img.alt = value?.ogTitle || '';
      img.style.width = '70px';
      img.style.height = '70px';
      img.style.objectFit = 'cover';
      img.style.borderRadius = '8px';
      img.style.border = '1px solid #D3D3D3';
      innerBox.appendChild(img);
    }

    // Text section
    const textSection = document.createElement('div');
    textSection.style.display = 'flex';
    textSection.style.flexDirection = 'column';
    textSection.style.gap = '4px';
    textSection.style.flexGrow = '1';
    textSection.style.flexShrink = '1';
    textSection.style.flexBasis = '0%';

    const title = document.createElement('div');
    title.className = 'seo-preview-title';
    title.style.fontWeight = 'bold';
    title.style.fontSize = '16px';
    title.style.color = '#4380ED';
    title.textContent = value?.ogTitle || value?.title || 'No title';

    const description = document.createElement('div');
    description.className = 'seo-preview-description';
    description.style.fontSize = '14px';
    description.textContent = value?.ogDescription || value?.description || 'No description';
    description.style.color = 'black';

    textSection.appendChild(title);
    textSection.appendChild(description);
    innerBox.appendChild(textSection);

    // Create delete button
    const deleteBtn = document.createElement('button');
    deleteBtn.innerHTML = `
         <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
           <path d="M3 6H5H21" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
           <path d="M8 6V4C8 3.46957 8.21071 2.96086 8.58579 2.58579C8.96086 2.21071 9.46957 2 10 2H14C14.5304 2 15.0391 2.21071 15.4142 2.58579C15.7893 2.96086 16 3.46957 16 4V6M19 6V20C19 20.5304 18.7893 21.0391 18.4142 21.4142C18.0391 21.7893 17.5304 22 17 22H7C6.46957 22 5.96086 21.7893 5.58579 21.4142C5.21071 21.0391 5 20.5304 5 20V6H19Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
           <path d="M10 11V17" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
           <path d="M14 11V17" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
         </svg>
       `;

    deleteBtn.classList.add('seo-preview-delete-btn');
    deleteBtn.style.display = 'none';
    deleteBtn.setAttribute('type', 'button');
    deleteBtn.setAttribute('contenteditable', 'false');

    // Add click handler for delete
    deleteBtn.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      const blot = Quill.find(node) as any;
      if (blot && typeof blot.remove === 'function') {
        blot.remove();
      }
    });

    outer.appendChild(deleteBtn);
    outer.appendChild(innerBox);
    container.appendChild(outer);
    node.appendChild(container);

    return node;
  }

  static value(node: any) {
    const container = node.querySelector('.seo-preview-container');
    const img = container.querySelector('img');
    const title = container.querySelector('.seo-preview-title');
    const description = container.querySelector('.seo-preview-description');
    const url = container.querySelector('.seo-preview-url');

    return {
      ogImage: img ? img.src : '',
      ogTitle: title ? title.textContent : '',
      ogDescription: description ? description.textContent : '',
      url: url ? url.textContent : '',
    };
  }
}

export default SEOPreviewBlot;
