import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const CodeTemplates = ({ onTemplateSelect, className = '' }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const templates = [
    {
      id: 1,
      name: 'React Component',
      category: 'react',
      language: 'javascript',
      description: 'Basic React functional component with hooks',
      code: `import React, { useState, useEffect } from 'react';

const MyComponent = ({ title, onAction }) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Component logic here
  }, []);

  return (
    <div className="component">
      <h2>{title}</h2>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <div>{data}</div>
      )}
    </div>
  );
};

export default MyComponent;`
    },
    {
      id: 2,
      name: 'Express API Route',
      category: 'backend',
      language: 'javascript',
      description: 'Express.js API route with error handling',
      code: `const express = require('express');
const router = express.Router();

// GET route
router.get('/api/data', async (req, res) => {
  try {
    // Your logic here
    const data = await fetchData();
    res.json({ success: true, data });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Internal server error' 
    });
  }
});

module.exports = router;`
    },
    {
      id: 3,
      name: 'Python Class',
      category: 'python',
      language: 'python',
      description: 'Python class with constructor and methods',
      code: `class MyClass:
    def __init__(self, name, value=None):
        self.name = name
        self.value = value
        self._private_var = 0
    
    def get_info(self):
        """Return information about the instance."""
        return f"Name: {self.name}, Value: {self.value}"
    
    def update_value(self, new_value):
        """Update the value with validation."""
        if new_value is not None:
            self.value = new_value
            return True
        return False
    
    def __str__(self):
        return self.get_info()`
    },
    {
      id: 4,
      name: 'SQL Query Template',
      category: 'database',
      language: 'sql',
      description: 'Common SQL operations with joins',
      code: `-- Select with JOIN
SELECT 
    u.id,
    u.name,
    u.email,
    p.title as post_title,
    p.created_at
FROM users u
LEFT JOIN posts p ON u.id = p.user_id
WHERE u.active = 1
ORDER BY p.created_at DESC
LIMIT 10;

-- Insert with validation
INSERT INTO users (name, email, created_at)
VALUES ('John Doe', 'john@example.com', NOW());

-- Update with conditions
UPDATE users 
SET last_login = NOW()
WHERE id = ? AND active = 1;`
    },
    {
      id: 5,
      name: 'CSS Grid Layout',
      category: 'frontend',
      language: 'css',
      description: 'Responsive CSS Grid layout',
      code: `.grid-container {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  grid-gap: 1rem;
  padding: 1rem;
}

.grid-item {
  background: #fff;
  border-radius: 8px;
  padding: 1rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s ease;
}

.grid-item:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
}

@media (max-width: 768px) {
  .grid-container {
    grid-template-columns: 1fr;
  }
}`
    },
    {
      id: 6,
      name: 'Docker Configuration',
      category: 'devops',
      language: 'yaml',
      description: 'Docker Compose for web application',
      code: `version: '3.8'

services:
  web:
    build: .
    ports:
      - "3000:3000"
    environment:
      - NODE_ENV=production
      - DATABASE_URL=postgresql://user:pass@db:5432/myapp
    depends_on:
      - db
      - redis
    volumes:
      - ./uploads:/app/uploads

  db:
    image: postgres:13
    environment:
      - POSTGRES_DB=myapp
      - POSTGRES_USER=user
      - POSTGRES_PASSWORD=pass
    volumes:
      - postgres_data:/var/lib/postgresql/data

  redis:
    image: redis:6-alpine
    ports:
      - "6379:6379"

volumes:
  postgres_data:`
    }
  ];

  const categories = [
    { value: 'all', label: 'All Templates' },
    { value: 'react', label: 'React' },
    { value: 'backend', label: 'Backend' },
    { value: 'python', label: 'Python' },
    { value: 'database', label: 'Database' },
    { value: 'frontend', label: 'Frontend' },
    { value: 'devops', label: 'DevOps' }
  ];

  const filteredTemplates = templates?.filter(template => {
    const matchesSearch = template?.name?.toLowerCase()?.includes(searchTerm?.toLowerCase()) ||
                         template?.description?.toLowerCase()?.includes(searchTerm?.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || template?.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleTemplateSelect = (template) => {
    onTemplateSelect(template);
  };

  return (
    <div className={`space-y-4 ${className}`}>
      {/* Header */}
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-foreground">Code Templates</h3>
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <Icon name="Template" size={14} />
          <span>{filteredTemplates?.length} templates</span>
        </div>
      </div>
      {/* Search and filter */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="flex-1">
          <Input
            type="search"
            placeholder="Search templates..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e?.target?.value)}
            className="w-full"
          />
        </div>
        <div className="flex gap-2 overflow-x-auto pb-2">
          {categories?.map(category => (
            <Button
              key={category?.value}
              variant={selectedCategory === category?.value ? 'default' : 'outline'}
              size="sm"
              onClick={() => setSelectedCategory(category?.value)}
              className="whitespace-nowrap"
            >
              {category?.label}
            </Button>
          ))}
        </div>
      </div>
      {/* Templates grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-h-96 overflow-y-auto">
        {filteredTemplates?.map(template => (
          <div
            key={template?.id}
            className="bg-card border border-border rounded-lg p-4 hover:border-primary/50 transition-colors cursor-pointer"
            onClick={() => handleTemplateSelect(template)}
          >
            <div className="flex items-start justify-between mb-2">
              <div className="flex items-center gap-2">
                <Icon name="FileCode" size={16} className="text-primary" />
                <h4 className="font-medium text-foreground">{template?.name}</h4>
              </div>
              <span className="text-xs bg-muted px-2 py-1 rounded capitalize">
                {template?.language}
              </span>
            </div>
            
            <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
              {template?.description}
            </p>
            
            <div className="flex items-center justify-between">
              <span className="text-xs text-muted-foreground capitalize">
                {template?.category}
              </span>
              <Button
                variant="ghost"
                size="sm"
                className="h-7 px-2 text-xs"
              >
                Use Template
              </Button>
            </div>
          </div>
        ))}
      </div>
      {filteredTemplates?.length === 0 && (
        <div className="text-center py-8 text-muted-foreground">
          <Icon name="Search" size={32} className="mx-auto mb-2 opacity-50" />
          <p className="text-sm">No templates found matching your criteria</p>
        </div>
      )}
    </div>
  );
};

export default CodeTemplates;