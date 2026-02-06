import Quill from 'quill';

// Quill's BlockEmbed type is not exported, so we cast it as any
const BlockEmbed = Quill.import('blots/block/embed') as any;

class CustomVideoBlot extends BlockEmbed {
  static blotName = 'video';
  static tagName = 'div';

  static create(value: string) {
    const wrapper = super.create() as HTMLDivElement;
    wrapper.classList.add('video-wrapper');
    wrapper.style.position = 'relative';
    wrapper.style.display = 'block';

    const iframe = document.createElement('iframe');
    iframe.setAttribute('src', value);
    iframe.setAttribute('frameborder', '0');
    iframe.setAttribute('allowfullscreen', 'true');

    iframe.setAttribute(
      'allow',
      'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share',
    );
    iframe.setAttribute('sandbox', 'allow-scripts allow-same-origin allow-presentation');

    // Dynamically set height based on source - keep original sizing
    if (value.includes('tiktok.com')) {
      iframe.setAttribute('height', '750');
      iframe.setAttribute('width', '500px');
    } else if (value.includes('youtube.com') || value.includes('facebook.com')) {
      iframe.setAttribute('height', '700');
      iframe.setAttribute('width', '100%');
    } else {
      iframe.setAttribute('height', '400'); // default fallback
      iframe.setAttribute('width', '500px');
    }

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
    deleteBtn.className = 'video-delete-btn';
    deleteBtn.setAttribute('type', 'button');
    deleteBtn.setAttribute('contenteditable', 'false');

    // Add click handler for delete
    deleteBtn.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      const blot = Quill.find(wrapper) as any;
      if (blot && typeof blot.remove === 'function') {
        blot.remove();
      }
    });

    wrapper.appendChild(iframe);
    wrapper.appendChild(deleteBtn);

    return wrapper;
  }

  static value(node: HTMLDivElement) {
    const iframe = node.querySelector('iframe');
    return iframe?.getAttribute('src') ?? '';
  }
}

export default CustomVideoBlot;
