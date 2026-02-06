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
                    
                    # Replacements for layout components
                    new_content = new_content.replace("import Header from './Header';", "import Header from './header';")
                    new_content = new_content.replace("import SideBar from './SideBar';", "import SideBar from './side-bar';")
                    new_content = new_content.replace("import Header from '@/components/layouts/Header';", "import Header from '@/components/layouts/header';")
                    new_content = new_content.replace("import SideBar from '@/components/layouts/SideBar';", "import SideBar from '@/components/layouts/side-bar';")
                    
                    if new_content != content:
                        print(f"Updating {filepath}")
                        with open(filepath, 'w') as f:
                            f.write(new_content)
                except Exception as e:
                    print(f"Error processing {filepath}: {e}")

replace_imports('src')
