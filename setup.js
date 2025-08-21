import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const structure = {
  // Root files
  '.': [
    '.editorconfig',
    '.eslintignore',
    '.eslintrc.cjs',
    '.prettierrc',
    '.gitignore',
    'package.json',
    'pnpm-lock.yaml',
    'vite.config.ts',
    'tsconfig.json',
    'index.html',
    '.env.example',
    'vite-env.d.ts'
  ],
  
  // Public directory
  'public': [
    'favicon.svg',
    'robots.txt',
    'tenant-assets/.gitkeep'
  ],
  
  // App directory
  'src/app': [
    'main.tsx',
    'router.tsx'
  ],
  'src/app/providers': [
    'QueryProvider.tsx',
    'AuthProvider.tsx',
    'ThemeProvider.tsx',
    'I18nProvider.tsx'
  ],
  'src/app/store': [
    'index.ts'
  ],
  'src/app/store/slices': [
    'auth.slice.ts',
    'ui.slice.ts'
  ],
  
  // Shared directory
  'src/shared/api': [
    'http.ts',
    'endpoints.ts'
  ],
  'src/shared/api/hooks': [
    'useApi.ts'
  ],
  'src/shared/config': [
    'env.ts',
    'tenants.ts'
  ],
  'src/shared/constants': [
    'roles.ts',
    'permissions.ts',
    'exam.ts'
  ],
  'src/shared/lib': [
    'date.ts',
    'array.ts',
    'rand.ts'
  ],
  'src/shared/hooks': [
    'useTenant.ts',
    'useAuth.ts',
    'usePagination.ts'
  ],
  'src/shared/ui/form': [
    'Form.tsx',
    'FormField.tsx'
  ],
  'src/shared/ui/table': [
    'DataTable.tsx',
    'useDataTable.ts'
  ],
  'src/shared/ui/modal': [],
  'src/shared/ui/tabs': [],
  'src/shared/ui/badge': [],
  'src/shared/assets': [],
  'src/shared/types': [
    'common.ts',
    'api.ts'
  ],
  
  // Entities
  'src/entities/university': [
    'model.ts',
    'index.ts'
  ],
  'src/entities/subject': [
    'model.ts',
    'index.ts'
  ],
  'src/entities/question': [
    'model.ts',
    'index.ts'
  ],
  'src/entities/exam': [
    'model.ts',
    'index.ts'
  ],
  'src/entities/user': [
    'model.ts',
    'index.ts'
  ],
  
  // Features
  'src/features/auth': [
    'api.ts',
    'hooks.ts'
  ],
  'src/features/auth/components': [
    'LoginForm.tsx'
  ],
  
  'src/features/question-bank': [
    'api.ts',
    'hooks.ts'
  ],
  'src/features/question-bank/components': [
    'QuestionEditor.tsx',
    'QuestionPreview.tsx',
    'QuestionImport.tsx'
  ],
  'src/features/question-bank/utils': [
    'shuffler.ts'
  ],
  
  'src/features/exams': [
    'api.ts',
    'hooks.ts'
  ],
  'src/features/exams/components': [
    'ExamBuilder.tsx',
    'ExamRunner.tsx',
    'ResultReview.tsx'
  ],
  'src/features/exams/utils': [
    'scoring.ts',
    'proctoring.ts'
  ],
  
  'src/features/subjects': [
    'api.ts'
  ],
  'src/features/subjects/components': [
    'SubjectPicker.tsx'
  ],
  
  'src/features/universities': [
    'api.ts'
  ],
  'src/features/universities/components': [
    'TenantSwitcher.tsx'
  ],
  
  'src/features/admin': [
    'api.ts'
  ],
  'src/features/admin/components': [
    'UserManager.tsx',
    'RoleManager.tsx',
    'AuditLog.tsx'
  ],
  
  // Pages
  'src/pages/home': [
    'HomePage.tsx'
  ],
  'src/pages/auth': [
    'LoginPage.tsx',
    'RegisterPage.tsx'
  ],
  'src/pages/dashboard': [
    'DashboardPage.tsx'
  ],
  'src/pages/questions': [
    'ListQuestionsPage.tsx',
    'EditQuestionPage.tsx'
  ],
  'src/pages/exams': [
    'CreateExamPage.tsx',
    'TakeExamPage.tsx',
    'ReviewExamPage.tsx'
  ],
  'src/pages/subjects': [
    'SubjectsPage.tsx'
  ],
  'src/pages/universities': [
    'TenantsPage.tsx'
  ],
  'src/pages/admin': [
    'AdminPage.tsx'
  ],
  
  // Widgets
  'src/widgets': [
    'Header.tsx',
    'Sidebar.tsx',
    'Footer.tsx',
    'Breadcrumbs.tsx'
  ],
  
  // Layouts
  'src/layouts': [
    'PublicLayout.tsx',
    'AuthLayout.tsx',
    'DashboardLayout.tsx'
  ],
  
  // Styles
  'src/styles': [
    'index.css',
    'theme.css'
  ],
  
  // Tests
  'src/test': [
    'setup.ts'
  ],
  'src/test/__mocks__': []
};

function createStructure(basePath, structure) {
  Object.entries(structure).forEach(([dirPath, files]) => {
    const fullPath = path.join(basePath, dirPath);
    
    // Create directory if it doesn't exist
    if (!fs.existsSync(fullPath)) {
      fs.mkdirSync(fullPath, { recursive: true });
      console.log(`Created directory: ${fullPath}`);
    }
    
    // Create files
    files.forEach(file => {
      const filePath = path.join(basePath, dirPath, file);
      const dirName = path.dirname(filePath);
      
      // Create parent directory if needed
      if (!fs.existsSync(dirName)) {
        fs.mkdirSync(dirName, { recursive: true });
      }
      
      // Only create file if it doesn't exist
      if (!fs.existsSync(filePath)) {
        fs.writeFileSync(filePath, '// Auto-generated\n');
        console.log(`Created file: ${filePath}`);
      } else {
        console.log(`Skipped existing file: ${filePath}`);
      }
    });
  });
}

// Only create files that don't exist
createStructure(process.cwd(), structure);
console.log('Project structure setup completed!');