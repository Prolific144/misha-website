import React, { useState } from 'react';
import { useCart } from '@/hooks/useCart';
import { RefreshCw, Trash2, Copy, Download, Upload, AlertCircle } from 'lucide-react';
import { cartStorage } from '@/hooks/useCart';
import { formatPrice } from '@/utils/helpers';

export const CartDebug: React.FC = () => {
  const { cart, clearCart, totalItems, subtotal, discount, deliveryFee, finalTotal, exportCart, importCart } = useCart();
  const [importData, setImportData] = useState('');
  const [showImport, setShowImport] = useState(false);
  const [importStatus, setImportStatus] = useState<'idle' | 'success' | 'error'>('idle');
  
  const handleRefresh = () => {
    window.location.reload();
  };
  
  const handleExport = () => {
    const cartData = exportCart();
    navigator.clipboard.writeText(cartData);
    alert('Cart data copied to clipboard!');
  };
  
  const handleImport = () => {
    try {
      const success = importCart(importData);
      if (success) {
        setImportStatus('success');
        setImportData('');
        setTimeout(() => {
          setImportStatus('idle');
          setShowImport(false);
        }, 2000);
      } else {
        setImportStatus('error');
      }
    } catch (error) {
      setImportStatus('error');
    }
  };
  
  const handleDownload = () => {
    const cartData = exportCart();
    const blob = new Blob([cartData], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `cart-backup-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };
  
  if (process.env.NODE_ENV !== 'development') return null;

  return (
    <div className="fixed bottom-4 left-4 z-50 bg-white dark:bg-gray-800 p-4 rounded-lg shadow-lg border dark:border-gray-700 max-w-md">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center">
          <AlertCircle className="w-4 h-4 text-yellow-500 mr-2" />
          <div className="font-bold text-sm">Cart Debug (Development)</div>
        </div>
        <button
          onClick={() => setShowImport(!showImport)}
          className="text-xs text-blue-600 dark:text-blue-400 hover:underline"
        >
          {showImport ? 'Hide Import' : 'Show Import'}
        </button>
      </div>
      
      <div className="space-y-2 text-sm">
        <div className="flex justify-between">
          <span className="text-gray-600 dark:text-gray-400">Items:</span>
          <span className="font-medium">{totalItems}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-600 dark:text-gray-400">Subtotal:</span>
          <span className="font-medium">{formatPrice(subtotal)}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-600 dark:text-gray-400">Discount:</span>
          <span className="font-medium text-green-600 dark:text-green-400">{discount}%</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-600 dark:text-gray-400">Delivery:</span>
          <span className="font-medium">{formatPrice(deliveryFee)}</span>
        </div>
        <div className="flex justify-between border-t dark:border-gray-700 pt-2">
          <span className="text-gray-900 dark:text-white font-bold">Total:</span>
          <span className="font-bold">{formatPrice(finalTotal)}</span>
        </div>
        <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
          {cart.length} products in cart
        </div>
      </div>
      
      {/* Import Section */}
      {showImport && (
        <div className="mt-3 pt-3 border-t dark:border-gray-700">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-medium">Import Cart</span>
            {importStatus === 'success' && (
              <span className="text-xs text-green-600">✓ Imported</span>
            )}
            {importStatus === 'error' && (
              <span className="text-xs text-red-600">✗ Failed</span>
            )}
          </div>
          <textarea
            value={importData}
            onChange={(e) => setImportData(e.target.value)}
            placeholder="Paste cart JSON data..."
            className="w-full text-xs p-2 border dark:border-gray-600 rounded mb-2 bg-gray-50 dark:bg-gray-900"
            rows={3}
          />
          <button
            onClick={handleImport}
            className="w-full py-1.5 bg-blue-600 text-white text-xs rounded hover:bg-blue-700 transition-colors"
            disabled={!importData.trim()}
          >
            Import Cart
          </button>
        </div>
      )}
      
      {/* Action Buttons */}
      <div className="grid grid-cols-2 gap-2 mt-3">
        <button
          onClick={handleRefresh}
          className="flex items-center justify-center px-3 py-1.5 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 rounded text-xs hover:bg-blue-200 dark:hover:bg-blue-900/50 transition-colors"
        >
          <RefreshCw className="w-3 h-3 mr-1" />
          Refresh
        </button>
        <button
          onClick={clearCart}
          className="flex items-center justify-center px-3 py-1.5 bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400 rounded text-xs hover:bg-red-200 dark:hover:bg-red-900/50 transition-colors"
        >
          <Trash2 className="w-3 h-3 mr-1" />
          Clear
        </button>
        <button
          onClick={handleExport}
          className="flex items-center justify-center px-3 py-1.5 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 rounded text-xs hover:bg-green-200 dark:hover:bg-green-900/50 transition-colors"
        >
          <Copy className="w-3 h-3 mr-1" />
          Copy Data
        </button>
        <button
          onClick={handleDownload}
          className="flex items-center justify-center px-3 py-1.5 bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-400 rounded text-xs hover:bg-purple-200 dark:hover:bg-purple-900/50 transition-colors"
        >
          <Download className="w-3 h-3 mr-1" />
          Download
        </button>
      </div>
    </div>
  );
};

// Only show in development
export const CartDebugWrapper: React.FC = () => {
  if (process.env.NODE_ENV !== 'development') return null;
  return <CartDebug />;
};