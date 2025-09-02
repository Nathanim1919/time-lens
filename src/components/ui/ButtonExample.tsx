import Button from './Button';

export default function ButtonExample() {
  return (
    <div className="p-8 space-y-8">
      <h2 className="text-2xl font-bold text-white mb-6">Button Variants</h2>
      
      {/* Variants */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-gray-300">Variants</h3>
        <div className="flex flex-wrap gap-4">
          <Button variant="primary">Primary</Button>
          <Button variant="secondary">Secondary</Button>
          <Button variant="outline">Outline</Button>
          <Button variant="ghost">Ghost</Button>
          <Button variant="danger">Danger</Button>
          <Button variant="success">Success</Button>
          <Button variant="warning">Warning</Button>
          <Button variant="gradient">Gradient</Button>
          <Button variant="glass">Glass</Button>
        </div>
      </div>

      {/* Sizes */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-gray-300">Sizes</h3>
        <div className="flex flex-wrap items-center gap-4">
          <Button variant="primary" size="xs">Extra Small</Button>
          <Button variant="primary" size="sm">Small</Button>
          <Button variant="primary" size="md">Medium</Button>
          <Button variant="primary" size="lg">Large</Button>
          <Button variant="primary" size="xl">Extra Large</Button>
        </div>
      </div>

      {/* States */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-gray-300">States</h3>
        <div className="flex flex-wrap gap-4">
          <Button variant="primary">Normal</Button>
          <Button variant="primary" disabled>Disabled</Button>
          <Button variant="primary" loading>Loading</Button>
        </div>
      </div>

      {/* With Icons */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-gray-300">With Icons</h3>
        <div className="flex flex-wrap gap-4">
          <Button variant="gradient">
            <span className="mr-2">✨</span>
            Upgrade
          </Button>
          <Button variant="outline">
            <span className="mr-2">⚙️</span>
            Settings
          </Button>
          <Button variant="danger">
            <span className="mr-2">🗑️</span>
            Delete
          </Button>
        </div>
      </div>
    </div>
  );
}
