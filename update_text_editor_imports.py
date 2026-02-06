import os

def replace_imports(directory):
    for root, dirs, files in os.walk(directory):
        for file in files:
            if file.endswith('.tsx') or file.endswith('.ts'):
                filepath = os.path.join(root, file)
                try:
                    with open(filepath, 'r') as f:
                        content = f.read()
                    
                    new_content = content
                    
                    # Replacements for text-editor directory files, specifically looking at relative imports inside index.tsx
                    if filepath.endswith('src/components/shared/text-editor/index.tsx'):
                         # CSS replacements
                        new_content = new_content.replace("import './text-editor.css';", "import './quill-overrides.css';")
                        new_content = new_content.replace("import './TextEditor.css';", "import './text-editor.css';")
                        
                        # Component replacements
                        new_content = new_content.replace("import PhoneDialog from './PhoneDialog';", "import PhoneDialog from './phone-dialog';")
                        new_content = new_content.replace("import EmailDialog from './EmailDialog';", "import EmailDialog from './email-dialog';")
                        new_content = new_content.replace("import SEOLinkDialog from './SEOLinkDialog';", "import SEOLinkDialog from './seo-link-dialog';")
                        new_content = new_content.replace("import('./CustomVideoBlot')", "import('./custom-video-blot')")
                        new_content = new_content.replace("import('./SEOPreviewBlot')", "import('./seo-preview-blot')")
                        new_content = new_content.replace("import('./CustomLInkBlot')", "import('./custom-link-blot')")
                    
                    # If there are other imports referencing these files from outside (unlikely for blots/dialogs typically kept internal, but good to check)
                    # No obvious outside usage seen in previous grep/searches, usually index.tsx is the entry point.
                    
                    if new_content != content:
                        print(f"Updating {filepath}")
                        with open(filepath, 'w') as f:
                            f.write(new_content)
                except Exception as e:
                    print(f"Error processing {filepath}: {e}")

replace_imports('src')
